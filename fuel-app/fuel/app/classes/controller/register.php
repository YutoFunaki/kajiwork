<?php
namespace Controller;

class Register extends \Controller
{
  public function before()
  {
      parent::before();
    
      header('Access-Control-Allow-Origin: http://localhost:3000');
      header('Access-Control-Allow-Methods: POST');
      header('Access-Control-Allow-Headers: Content-Type');
      header('Access-Control-Allow-Credentials: true');
      header('X-Frame-Options: DENY');
    
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
    $hash_password = \Auth::hash_password($password);

    // Userモデルのcreate_userメソッドを呼び出し
    $user = \Model\User::create_user($username, $email, $hash_password);
    \Session::set('user_name', $username);
      
    if ($user) {
        // room_users作成
        $user_id = \Model\User::login_user($email,$hash_password);
        $room_id = \Input::json('room_id');
        \Model\Roomuser::create_roomuser($user_id, $room_id);
        \Session::set('roomid', $room_id);
        return \Response::forge(200);
     } else {
        return \Response::forge('新規登録できませんでした。', 401);
     }
  }
}