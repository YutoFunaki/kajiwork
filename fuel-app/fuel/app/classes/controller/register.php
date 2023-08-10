<?php
namespace Controller;

class Register extends \Controller
{
    public function before()
    {
        parent::before();

        // CORSヘッダーを設定
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');

        if (Input::method() == 'OPTIONS') {
            exit;
        }
    }

  public function action_index()
  {
    $data["title"] = "新規登録";
    if (
      empty(\Input::post('username'))
      || empty(\Input::post('email'))
      || empty(\Input::post('password'))
    )
    {
      $data["subnav"] = array('register'=> 'active');
      $view = \View::forge('auth/register', $data);
      return $view;
    }

    try {
      \Auth::create_user(
        \Input::post('username'),
        \Input::post('email'),
        \Input::post('password')
      );
       } catch (\Exception $e) {
      \Session::set_flash('error', '登録に失敗しました。');
      $data["subnav"] = array('register'=> 'active');
      $view = \View::forge('auth/register', $data);
      return $view;
    }
    \Response::redirect('/home');
  }
}
?>