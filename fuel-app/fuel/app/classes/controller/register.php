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
      header('Access-Control-Allow-Headers: *');
      // header('Access-Control-Allow-Credentials: true');


      if (Input::method() == 'OPTIONS') {
          exit;
      }
    }

  public function action_index()
  {
      \Session::instance();
      $sessid = "tstsessid";
      session_id($sessid);

      if (Input::method() !== 'POST') {
        return Response::forge('新規登録できませんでした。', 401);
      }

      $username = Input::json('username');
      $email = Input::json('email');
      $password = Input::json('password');
      $room_id = Input::json('room_id');

      $query= DB::query('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)', DB::INSERT);
      $query->bind("username", $username)->bind('email', $email)->bind('password', $password)->execute();
      $query= DB::query('SELECT * FROM `users` WHERE email = :email AND password = :password', DB::SELECT);
      $user = $query->bind('email', $email)->bind('password', $password)->execute()->as_array();
      $user_id = $user[0]['id'];

      //room作成
      $query = DB::query('INSERT INTO room_users (room_id, user_id) VALUES (:room_id, :user_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->bind('user_id', $user_id)->execute();

      // //セッションに保存
      \Session::set(array(
        'username' => $username,
        'user_id' => $user_id,
        'room_id' => $room_id
      ));
      //ここまではsetもgetもできてる
      // $room_id = Session::get('room_id');
      // var_dump($room_id);
      // $sessid = $session->key();
      // var_dump($sessid);
      \Session::rotate();
      
      return Response::forge(200); 

    }

    public function action_person()
  {
      \Session::instance();
      $sessid = 'testsessid';
      session_id($sessid);

      if (Input::method() !== 'POST') {
        return Response::forge('新規登録できませんでした。', 401);
      }
  
      $username = Input::json('username');
      $email = Input::json('email');
      $password = Input::json('password');
      $room_id = \Session::get('room_id');



      
      $query= DB::query('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)', DB::INSERT);
      $query->bind("username", $username)->bind('email', $email)->bind('password', $password)->execute();
      $query= DB::query('SELECT * FROM `users` WHERE email = :email AND password = :password', DB::SELECT);
      $user = $query->bind('email', $email)->bind('password', $password)->execute()->as_array();
      $user_id = $user[0]['id'];

      //room作成
      $query = DB::query('INSERT INTO room_users (room_id, user_id) VALUES (:room_id, :user_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->bind('user_id', $user_id)->execute();

      //rooms作成
      $query = DB::query('INSERT INTO rooms (id) VALUES (:room_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->execute();

      // //セッションに保存
      \Session::set('person_id', $user_id);
      \Session::set('personname', $username);

      // $sessid = session_id();
      // var_dump($sessid);
      return Response::forge(200); 

    }
}