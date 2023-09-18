<?php

namespace Controller;

class Register extends \Controller
{
  public function before()
  {
      parent::before();

      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Allow-Methods: POST');
      header('Access-Control-Allow-Headers: *');

      if (\Input::method() == 'OPTIONS') {
          exit;
      }
    }

  public function action_index()
  {
    if (\Input::method() !== 'POST') {
      return \Response::forge('新規登録できませんでした。', 401);
    }

    $username = \Input::json('username');
    $email = \Input::json('email');
    $password = \Input::json('password');

    // Userモデルのcreate_userメソッドを呼び出し
    $user = \Model\User::create_user($username, $email, $password);
      
    if ($user) {
        // room_users作成
        $user_id = \Model\User::login_user($email,$password);
        $room_id = \Input::json('room_id');
        \Model\Roomuser::create_roomuser($user_id, $room_id);
        return \Response::forge(200);
     } else {
        return \Response::forge('新規登録できませんでした。', 401);
     }
  }

    public function action_person()
  {

    if (\Input::method() !== 'POST') {
      return \Response::forge('新規登録できませんでした。', 401);
    }

    $username = \Input::json('username');
    $email = \Input::json('email');
    $password = \Input::json('password');

    // Userモデルのcreate_userメソッドを呼び出し
    $user = \Model\User::create_user($username, $email, $password);
      
    if ($user) {
        // room_users作成
        $user_id = \Model\User::get_id_by_username($username,$password);
        $room_id = \Input::json('room_id');
        \Model\Roomuser::create_roomuser($user_id, $room_id);
     } else {
        return \Response::forge('新規登録できませんでした。', 401);
     }

      //rooms作成
      \Model\Room::create_room($room_id);

      return \Response::forge(200); 
    }
}