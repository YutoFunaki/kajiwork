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
      $password = Input::json('password');
      $email = Input::json('email');
      
      $query= DB::query('INSERT INTO users (username, password, email) VALUES (:username, :password,:email)', DB::INSERT);
      $query->bind("username", $username)->bind('password', $password)->bind('email', $email)->execute();
    
      return Response::forge(200);     
    }
}
//新規登録できたらページ遷移できるようにする