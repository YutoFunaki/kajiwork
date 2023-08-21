<?php

use Fuel\Core\Controller;
use Fuel\Core\DB;
use Fuel\Core\Format;
use Fuel\Core\Input;
use Fuel\Core\Response;
use Fuel\Core\Session;

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
    //room情報を引っ張ってくる
    $query = DB::query('SELECT * FROM `room_users` WHERE user_id = :user_id', DB::SELECT);
    $room_users = $query->bind('user_id', $user_id)->execute()->as_array();
    $room_id = $room_users[0]['room_id'];

    //room_idからroom_users特定し取得
    $query = DB::query('SELECT * FROM `room_users` WHERE room_id = :room_id', DB::SELECT);
    $room_users = $query->bind('room_id', $room_id)->execute()->as_array();

    //どちらがログインしたか判断する文
    if ($room_users[0]['user_id'] === $user_id) {
      $user_id = $room_users[0]['user_id'];
      $person_id = $room_users[1]['user_id'];
    } else {
      $user_id = $room_users[1]['user_id'];
      $person_id = $room_users[0]['user_id'];
    }

    $query = DB::query('SELECT * FROM `users` WHERE id = :id', DB::SELECT);
    $person = $query->bind('id', $person_id)->execute()->as_array();
    $personname = $person[0]['username'];

    //ログインユーザーとその相方のIDと名前をセッションが使えないからひとまずcookieへ持ってく
    $json = Format::forge([
      'username' => $username, 
      'user_id' => $user_id,
      'personname' => $personname,
      'person_id' => $person_id,
      ])->to_json();
    return Response::forge($json, 200);     
  }
}
//ログインできたらページ遷移できるようにする