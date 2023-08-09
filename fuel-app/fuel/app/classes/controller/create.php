<?php

class Controller_Create extends Controller
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
        $input = Input::json();

        if (isset($input['username']) && isset($input['email']) && isset($input['password'])) {
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
              return Response::forge(json_encode(['message' => 'Signup successful']), 200);
          } else {
              return Response::forge(json_encode(['message' => 'Signup failed']), 500);
          }
      } else {
          return Response::forge(json_encode(['message' => 'Invalid input data']), 400);
      }
    }
}
