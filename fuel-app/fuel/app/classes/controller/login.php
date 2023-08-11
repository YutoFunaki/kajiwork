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

    $username = Input::json('username');
    $password = Input::json('password');
    
    $query= DB::query('SELECT * FROM `users` WHERE username = :username AND password = :password', DB::SELECT);
    $user = $query->bind('username', $username)->bind('password', $password)->execute()->as_array();
    
    if (empty($user))
    {
      return Response::forge('ログインできませんでした。', 401);
    }

    // ログイン成功
    $json = Format::forge($user)->to_json();
    return Response::forge($json, 200);     
  }
}
//ログインできたらページ遷移できるようにする