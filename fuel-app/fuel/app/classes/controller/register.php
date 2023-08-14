<?php
//namespace Controller;

use Fuel\Core\Controller;
use Fuel\Core\Input;
use Fuel\Core\Response;
use Fuel\Core\DB;

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
      if (Input::method() !== 'POST') {
        return Response::forge('新規登録できませんでした。', 401);
      }
  
      $username = Input::json('username');
      $email = Input::json('email');
      $password = Input::json('password');
      
      $query= DB::query('SELECT * FROM `users` WHERE email = :email', DB::SELECT)
              ->bind(':email', $email )
              ->execute();
      
      
      if( !empty($query) ) {
        return Response::forge(401);
      } else {
        $query= DB::query('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)', DB::INSERT);
        $query->bind("username", $username)->bind('email', $email)->bind('password', $password)->execute();
        return Response::forge(200);   
      }  
    }
}
//新規登録できたらページ遷移できるようにする