<?php

use Fuel\Core\Controller;
use Fuel\Core\Session;

class Controller_Logout extends Controller
{

  public function before()
    {
        parent::before();

        // CORSヘッダーを設定
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }
    public function action_logout()
    {
      Session::delete('user');
    }
}
//セッションを削除する処理を書く