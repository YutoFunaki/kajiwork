<?php

use Fuel\Core\Controller;
use Fuel\Core\DB;
use Fuel\Core\Format;
use Fuel\Core\Input;
use Fuel\Core\Response;

class Controller_Login extends Controller
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
      return Response::forge('ログインできませんでした。', 401);
    }

    $email = Input::json('email');
    $password = Input::json('password');
    
    $query= DB::query('SELECT * FROM `users` WHERE email = :email AND password = :password', DB::SELECT);
    $user = $query->bind('email', $email)->bind('password', $password)->execute()->as_array();

    if (empty($user)) {
      return Response::forge('ログインできませんでした。', 401);
    }

    // ログイン成功
    $user_id = $user[0]['id'];
    $username = $user[0]['username'];
    $json = Format::forge(['username' => $username, 'user_id' => $user_id])->to_json();
    // $json = Format::forge($user)->to_json();
    return Response::forge($json, 200);     
  }
}
//ログインできたらページ遷移できるようにする