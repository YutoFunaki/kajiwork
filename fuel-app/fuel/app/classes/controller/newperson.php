<?php
// namespace Controller;

use Fuel\Core\Controller;
use Fuel\Core\Input;
use Fuel\Core\Response;
use Fuel\Core\DB;
use Model\SessionModel;

class Controller_Newperson extends Controller
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