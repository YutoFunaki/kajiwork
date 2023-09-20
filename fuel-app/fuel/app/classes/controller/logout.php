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
        header('Access-Control-Allow-Headers: Content-Type, *');
        header('Access-Control-Allow-Credentials: true');
    }
    public function action_index()
    {
      $auth = \Auth::instance();
      $auth->logout();

      // ログアウト後にリダイレクト
      \Response::redirect('login'); // ログインページにリダイレクト

    }
}
//セッションを削除する処理を書く