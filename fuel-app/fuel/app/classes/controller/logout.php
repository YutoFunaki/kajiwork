<?php
namespace Controller;

class Logout extends \Controller
{

  public function before()
    {
        parent::before();

        // CORSヘッダーを設定
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
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