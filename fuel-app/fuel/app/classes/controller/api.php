<?php

class Controller_Api extends Controller
{
    public function post_signup()
    {
      echo "test";
        $input = Input::json();
        $username = $input['username'];
        $email = $input['email'];
        $password = $input['password'];

        // ここでデータベースに新規ユーザーを保存する処理を追加
        $user = Model_User::forge(array(
          'username' => $username,
          'email' => $email,
          'password' => $password,
      ));

      if ($user->save()) {
        return $this->response(['message' => 'Signup successful']);
    } else {
        return $this->response(['message' => 'Signup failed'], 500);
    }
    }
};
