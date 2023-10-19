<?php
namespace Controller;

class Logout extends \Controller
{

    public function before()
    {
        parent::before();
       // CORSヘッダーを設定
       header('Access-Control-Allow-Origin: http://localhost:3000');
       header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
       header('Access-Control-Allow-Headers: Content-Type, x-csrf-token');
       header('Access-Control-Allow-Credentials: true');
       header('X-Frame-Options: DENY');
  
        if (\Input::method() == 'OPTIONS') {
            exit;
        }
    }
    public function action_index()
    {
        \Session::destroy();
        //cookieを削除
        \Cookie::delete('fuelcid');
        \Cookie::delete('csrf_token');

        return \Response::forge(200);
    }
}