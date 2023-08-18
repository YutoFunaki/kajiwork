<?php
// namespace Controller;

use Fuel\Core\Controller;
use Fuel\Core\Input;
use Fuel\Core\Response;
use Fuel\Core\DB;
use Fuel\Core\Session;

class Controller_Register extends Controller
{
  public function before()
  {
      parent::before();

      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: http://localhost:3000');
      header('Access-Control-Allow-Methods: POST');
      header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
      header('Access-Control-Allow-Credentials: true');


      if (Input::method() == 'OPTIONS') {
          exit;
      }
    }

  public function action_index()
  {


      if (Input::method() !== 'POST') {
        return Response::forge('新規登録できませんでした。', 401);
      }

      $sessionId = Input::json('sessionId');
      session_id($sessionId);
      session::start();

      $username = Input::json('username');
      $email = Input::json('email');
      $password = Input::json('password');
      $room_id = Input::json('room_id');
      var_dump($room_id=Session::get('room_id', $room_id));

      $session_id = session::key();
        echo "Session ID in action_index: " . $session_id;
      $query= DB::query('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)', DB::INSERT);
      $query->bind("username", $username)->bind('email', $email)->bind('password', $password)->execute();
      $query= DB::query('SELECT * FROM `users` WHERE email = :email AND password = :password', DB::SELECT);
      $user = $query->bind('email', $email)->bind('password', $password)->execute()->as_array();
      $user_id = $user[0]['id'];

      // //room作成
      $query = DB::query('INSERT INTO room_users (room_id, user_id) VALUES (:room_id, :user_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->bind('user_id', $user_id)->execute();

      // //セッションに保存
      Session::set('room_id', $room_id);
      Session::set('user_id', $user_id);
      Session::set('username', $username);
      //ここまではsetもgetもできてる

      return Response::forge(200); 

    }

    public function action_person()
  {
      $sessionId = Input::json('sessionId');
      session_id($sessionId);

      if (Input::method() !== 'POST') {
        return Response::forge('新規登録できませんでした。', 401);
      }
  
      $username = Input::json('username');
      $email = Input::json('email');
      $password = Input::json('password');
      $room_id = Session::get('room_id');

      
      $query= DB::query('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)', DB::INSERT);
      $query->bind("username", $username)->bind('email', $email)->bind('password', $password)->execute();
      $query= DB::query('SELECT * FROM `users` WHERE email = :email AND password = :password', DB::SELECT);
      $user = $query->bind('email', $email)->bind('password', $password)->execute()->as_array();
      $user_id = $user[0]['id'];

      // //room作成
      $query = DB::query('INSERT INTO room_users (room_id, user_id) VALUES (:room_id, :user_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->bind('user_id', $user_id)->execute();

      // //セッションに保存
      Session::set('user_id2', $user_id);
      Session::set('username2', $username);

      return Response::forge(200); 

    }
}