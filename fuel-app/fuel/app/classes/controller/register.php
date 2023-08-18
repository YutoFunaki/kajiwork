<?php
// namespace Controller;

use Fuel\Core\Controller;
use Fuel\Core\Input;
use Fuel\Core\Response;
use Fuel\Core\DB;
use Model\SessionModel;

class Controller_Register extends Controller
{
  public function before()
  {
      parent::before();

      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Allow-Methods: POST');
      header('Access-Control-Allow-Headers: *');


      if (Input::method() == 'OPTIONS') {
          exit;
      }
    }

  public function action_index()
  {
      $sessionmodel = new SessionModel();

      if (!session_start()) {
        return Response::forge("セッションが起動していない");
      }

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

      //セッションに保存
      $sessionmodel -> setSession('room_id', $room_id);
      $sessionmodel -> setSession('user_id', $user_id);
      $sessionmodel -> setSession('username', $username);

      // if ($sessionmodel -> getSession('room_id') === $room_id) {
      //   return Response::forge('ok');
      // }
      // $saved_room_id = $sessionmodel->getSession('room_id');
      // $saved_user_id = $sessionmodel->getSession('user_id');
      // $saved_username = $sessionmodel->getSession('username');
      // $session_data = [$saved_room_id, $saved_user_id, $saved_username];
      // var_dump($session_data);


      return Response::forge(200); 

    }

    public function action_person()
  {
      $sessionmodel = new SessionModel();
      $room_id = $sessionmodel->getSession('room_id');
      var_dump($room_id);

      if (Input::method() !== 'POST') {
        return Response::forge('新規登録できませんでした。', 401);
      }
  
      $username = Input::json('username');
      $email = Input::json('email');
      $password = Input::json('password');

      
      $query= DB::query('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)', DB::INSERT);
      $query->bind("username", $username)->bind('email', $email)->bind('password', $password)->execute();
      $query= DB::query('SELECT * FROM `users` WHERE email = :email AND password = :password', DB::SELECT);
      $user = $query->bind('email', $email)->bind('password', $password)->execute()->as_array();
      $user_id = $user[0]['id'];

      //room作成
      $query = DB::query('INSERT INTO room_users (room_id, user_id) VALUES (:room_id, :user_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->bind('user_id', $user_id)->execute();

      //セッションに保存
      $sessionmodel -> getSession('user_id2');
      $sessionmodel -> getSession('username2');
      $sessionmodel -> setSession('user_id2', $user_id);
      $sessionmodel -> setSession('username2', $username);


      return Response::forge(200); 

    }
}