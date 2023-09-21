<?php
namespace Controller;


class Login extends \Controller
{
  public function before()
  {

      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: http://localhost:3000');
      header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
      header('Access-Control-Allow-Headers: Content-Type, *');
      header('Access-Control-Allow-Credentials: true');



      if (\Input::method() == 'OPTIONS') {
          exit;
      }
  }

  public function action_index()
  {
    if (\Input::method() !== 'POST') {
      return \Response::forge('ログインできませんでした。', 401);
    }

    $email = \Input::json('email');
    $password = \Input::json('password');
    $hash_password = \Auth::hash_password($password);
    $sesskey = \Session::key();
    
    if (\Auth::login($email, $password)){
      $user_id = \Model\User::login_user($email,$hash_password);
      $username = \Model\User::get_username($email,$hash_password);
      $room_id = \Model\Roomuser::get_room_id($user_id);
      \Session::instance();
      \Session::set('roomid', $room_id);
      \Session::set('email', $email);
      \Session::set('username', $username);
      $room_users = \Model\Roomuser::get_users($room_id);
      if ($room_users[0]['user_id'] === $user_id) {
        $user_id = $room_users[0]['user_id'];
        $person_id = $room_users[1]['user_id'];
        $personname = \Model\User::get_personname($person_id);
      } else {
        $user_id = $room_users[1]['user_id'];
        $person_id = $room_users[0]['user_id'];
        $personname = \Model\User::get_personname($person_id);
      }
    } else {
      return \Response::forge($hash_password, 401);
    }
    $json = \Format::forge([
      'sessionkey' => $sesskey,
      'username' => $username, 
      'personname' => $personname,
      'room_id' => $room_id,
      ])->to_json();
    return \Response::forge($json, 200);     
  }
}