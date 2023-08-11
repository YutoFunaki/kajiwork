<?php

class Controller_Logout extends Controller
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
    public function action_logout()
    {
      // remember-me クッキーを削除し、意図的にログアウト
      \Auth::dont_remember_me();

      // ログアウト
      \Auth::logout();

      // ログアウトの成功をユーザーに知らせる
      \Messages::success(__('login.logged-out'));

      // そして、あなたがやってきたところに (もしくは、前のページを
      // 決定することができない場合はアプリケーションのホームページに) 戻る
      \Response::redirect_back();
    }
}
//セッションを削除する処理を書く