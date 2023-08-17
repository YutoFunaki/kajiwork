<?php
// namespace Controller;

use Fuel\Core\Controller;
use Fuel\Core\Input;
use Fuel\Core\Log;
use Fuel\Core\Response;
use Fuel\Core\DB;
use Fuel\Core\Session;
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
      $sessionmodel -> getSession('room_id');
      $sessionmodel -> getSession('user_id');
      $sessionmodel -> getSession('username');
      $sessionmodel -> setSession('room_id', $room_id);
      $sessionmodel -> setSession('user_id', $user_id);
      $sessionmodel -> setSession('username', $username);


      return Response::forge(200); 

    }
}
//新規登録できたらページ遷移できるようにする