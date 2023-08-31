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
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Allow-Methods: POST');
      header('Access-Control-Allow-Headers: *');
      // header('Access-Control-Allow-Credentials: true');
      Session::instance();


      if (Input::method() == 'OPTIONS') {
          exit;
      }
    }

  public function action_index()
  {
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

      // room作成
      $query = DB::query('INSERT INTO room_users (room_id, user_id) VALUES (:room_id, :user_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->bind('user_id', $user_id)->execute();
    
       return Response::forge(200);
    }

    public function action_person()
  {

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

      // room_users作成
      $query = DB::query('INSERT INTO room_users (room_id, user_id) VALUES (:room_id, :user_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->bind('user_id', $user_id)->execute();

      //rooms作成
      $query = DB::query('INSERT INTO rooms (id) VALUES (:room_id)', DB::INSERT);
      $query->bind('room_id', $room_id)->execute();

      return Response::forge(200); 
    }

    public function action_testsession1(){
      Session::set('userid', 'あいうえお');
      $s1 = Session::get('userid', '失敗1');
      var_dump($s1);
      echo '</br>';
      var_dump(Session::key('session_id'));
  }

  public function action_testsession2(){
      echo '2desu</br>';
      $s2 = Session::get('userid', '失敗2');
      var_dump($s2);
      echo '</br>';
      var_dump(Session::key('session_id'));
  }
}