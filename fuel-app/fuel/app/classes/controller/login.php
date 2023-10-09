<?php
namespace Controller;


class Login extends \Controller
{
  public function before()
  {

      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: http://localhost:3000');
      header('Access-Control-Allow-Methods: POST');
      header('Access-Control-Allow-Headers: Content-Type, *');
      header('Access-Control-Allow-Credentials: true');
      header('X-Frame-Options: DENY');


      if (\Input::method() == 'OPTIONS') {
          exit;
      }
  }

  public function action_index()
  {
    return \Response::forge(\View::forge('login/index'));
  }

  public function action_process()
  {
    if (\Input::method() !== 'POST') {
      return \Response::forge('ログインできませんでした。', 401);
    }

    $email = \Input::json('email');
    $password = \Input::json('password');
    $hash_password = \Auth::hash_password($password);

    if (\Auth::login($email, $password)){
      $user_id = \Model\User::login_user($email,$hash_password);
      $username = \Model\User::get_username($email,$hash_password);
      $room_id = \Model\Roomuser::get_room_id($user_id);
      \Session::instance();
      \Session::set('roomid', $room_id);
      \Session::set('email', $email);
      \Session::set('user_name', $username);
      $room_users = \Model\Roomuser::get_users($room_id);
      if ($room_users[0]['user_id'] === $user_id) {
        $user_id = $room_users[0]['user_id'];
        $person_id = $room_users[1]['user_id'];
        $personname = \Model\User::get_personname($person_id);
        \Session::set('user_id', $user_id);
        \Session::set('personname', $personname);
      } else {
        $user_id = $room_users[1]['user_id'];
        $person_id = $room_users[0]['user_id'];
        $personname = \Model\User::get_personname($person_id);
        \Session::set('personname', $personname);
      }
    } else {
      return \Response::forge($hash_password, 401);
    }


    return \Response::forge(200);     
  }
}