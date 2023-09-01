<?php

use Fuel\Core\Config;
use Fuel\Core\Controller;
use Fuel\Core\Response;
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
      // サーバーサイドでセッションを無効化
      Session::destroy();

      // ログアウト後にリダイレクト
      Response::redirect('login'); // ログインページにリダイレクト

    }
}
//セッションを削除する処理を書く