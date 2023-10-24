<?php

namespace Controller;
class Api extends \Controller_Rest
//Restコントローラーを調べる
{
  public function before()
  {
      parent::before();
     
      header('Access-Control-Allow-Origin: http://localhost:3000');
      header('Access-Control-Allow-Methods: POST, GET');
      header('Access-Control-Allow-Headers: Content-Type, x-csrf-token');
      header('Access-Control-Allow-Credentials: true');
      header('X-Frame-Options: DENY');

      if (\Input::method() == 'OPTIONS') {
          exit;
      }
  }

  private function validateCsrfToken()
  {
      $submitted_token = \Input::headers('X-CSRF-Token');
      $stored_token = \Cookie::get('csrf_token');
      if ($submitted_token !== $stored_token) {
          return \Response::forge('CSRF攻撃の疑いがあるため、リクエストを拒否しました。', 500);
      }
  }

  public function action_index()
  {
    $username = \Session::get('user_name');
    $personname = \Session::get('personname');
    $room_id = \Session::get('roomid');
    $csrf_token = \Security::generate_token();
    \Cookie::set('csrf_token', $csrf_token);

    //セッションに何も値が入っていない場合エラーを返す
    if ($username === null || $personname === null || $room_id === null) {
      return \Response::forge('セッションが切れました。', 401);
    }

    //user_id取得
    $user_id = \Model\User::get_user_id($username);
    $person_id = \Model\User::get_user_id($personname);

    //room_idからroomsテーブル特定し生活費の取得
    $lifemoney = \Model\Room::get_lifemoney($room_id);

    //personnameからperson_idを取得
    $person_id = \Model\User::get_user_id($personname);

    //完了した家事をfinish_tasksから持ってくる
    $finish_task_name = \Model\Finishtask::get_finish_tasks_name($user_id);
    $finish_task_date = \Model\Finishtask::get_finish_tasks_date($user_id);
    $person_finish_task_name = \Model\Finishtask::get_finish_tasks_name($person_id);
    $person_finish_task_date = \Model\Finishtask::get_finish_tasks_date($person_id);

    $finish_task_month = \Model\Finishtask::get_finish_tasks_month($user_id);
    $finish_task_count = \Model\Finishtask::get_finish_tasks_count($user_id);
    if ($finish_task_count === []) {
      $finish_task_count = [0];
      $finish_task_month = [0];
    };
    $person_finish_task_month = \Model\Finishtask::get_finish_tasks_month($person_id);
    $person_finish_task_count = \Model\Finishtask::get_finish_tasks_count($person_id);
    if ($person_finish_task_count === []) {
      $person_finish_task_count = [0];
      $person_finish_task_month = [0];
    };

    // 各room_idに関連付けられたfrequency値を合計する
    $tasks_frequency = \Model\Task::get_frequency_sum($room_id);
    

    $json = \Format::forge([
      'username' => $username,
      'personname' => $personname,
      'room_id' => $room_id,
      'lifemoney' => $lifemoney,
      'finish_task_name' => $finish_task_name,
      'finish_task_date' => $finish_task_date,
      'person_finish_task_name' => $person_finish_task_name,
      'person_finish_task_date' => $person_finish_task_date,
      'tasks_frequency' => $tasks_frequency,
      'finish_task_month' => $finish_task_month,
      'finish_task_count' => $finish_task_count,
      'person_finish_task_month' => $person_finish_task_month,
      'person_finish_task_count' => $person_finish_task_count,
      ])->to_json();
    return \Response::forge($json, 200);
  }

  public function action_new()
  {
    $this->validateCsrfToken();

    if (\Input::method() !== 'POST') {
      return \Response::forge('入力項目に空欄がある', 401);
    }

    $workname = \Input::json('workname');
    $frequency_key = \Input::json('selectedDate');
    $frequency_config = \Config::load('frequency');
    $frequency_value = $frequency_config[$frequency_key];
    $frequency_count = \Input::json('frequency');
    $frequency = $frequency_value * $frequency_count;
    $room_id = \Session::get('roomid');

    $result = \Model\Task::create_task($workname, $room_id, $frequency);

    if ($result) {
      return \Response::forge(200);
    } else {
      return \Response::forge('新規登録できませんでした。', 401);
    }
  }

  public function action_workmanage()
  {
     $this->validateCsrfToken();
     $room_id = \Session::get('roomid');

      //room_idからtasksを取得
      $tasks_name = \Model\Task::get_tasks_name($room_id);
      $tasks_frequency = \Model\Task::get_tasks_frequency($room_id);
      $tasks_id = \Model\Task::get_tasks_id($room_id);
      \Session::set('tasks_id', $tasks_id);

    
      $json = \Format::forge([
        'tasks_name' => $tasks_name,
        'tasks_frequency' => $tasks_frequency,
        'tasks_id' => $tasks_id,
        ])->to_json();
      return \Response::forge($json, 200);
  }

  public function action_workdelete()
  {
    if (\Input::method() !== 'POST') {
      return \Response::forge('削除できませんでした。', 401);
    } 
    $this->validateCsrfToken();
    $task_id =  \Session::get("tasks_id");
    $id = \Input::json('selectedWork');
    
    //tasks_idが一致するか確認
    if (in_array($id, $task_id)) {
      \Model\Task::delete_task($id);
      return \Response::forge(200); 
    } else {
      return \Response::forge('削除できませんでした。', 401);
    }
  }

  public function action_workrename()
  {
    if (\Input::method() !== 'POST') {
      return \Response::forge('変更できませんでした。', 401);
    }

    $this->validateCsrfToken();
    $task_id =  \Session::get("tasks_id");
    $id = \Input::json('selectedWork');
    $workname = \Input::json('workname');
    $frequency_key = \Input::json('selectedDate');
    $frequency_config = \Config::load('frequency');
    $frequency_value = $frequency_config[$frequency_key];
    $frequency_count = \Input::json('inputDate');
    $frequency = $frequency_value * $frequency_count;

    if (in_array($id, $task_id)) {
      if ($workname !== "" && $frequency !== 0) {
        \Model\Task::update_tasks_name($id, $workname);
        \Model\Task::update_tasks_frequency($id, $frequency);
      } else if ($frequency !== 0 && $workname === "") {
        \Model\Task::update_tasks_frequency($id, $frequency);
      } else if ($workname !== "" && $frequency === 0){
        \Model\Task::update_tasks_name($id, $workname);
      }
    
      $json = \Format::forge([
        'workname' => $workname,
        'frequency' => $frequency,
        'id' => $id,
        ])->to_json();
      return \Response::forge($json, 200);
    } else {
      return \Response::forge('変更できませんでした。', 401);
    }
  }

  public function action_workfinishEffect()
  {
    $this->validateCsrfToken();
    $username = \Session::get('user_name');
    $personname = \Session::get('personname');
    $room_id = \Session::get('roomid');

    //usernameからuser_idを取得
    $user_id = \Model\User::get_user_id($username);

    //personnameからperson_idを取得
    $person_id = \Model\User::get_user_id($personname);

    //room_idからtasksを取得
    $tasks_name = \Model\Task::get_tasks_name($room_id);
    $tasks_id = \Model\Task::get_tasks_id($room_id);

  
    $json = \Format::forge([
      'username' => $username,
      'personname' => $personname,
      'user_id' => $user_id,
      'person_id' => $person_id,
      'tasks_name' => $tasks_name,
      'tasks_id' => $tasks_id,
      ])->to_json();
    return \Response::forge($json, 200);
  }

  public function action_finishwork()
  {
    $this->validateCsrfToken();
    if (\Input::method() !== 'POST') {
      return \Response::forge('完了できませんでした。', 401);
    }


    $user_id = \Input::json("selectedUser");
    $tasks_id = \Input::json("selectedWork");
    $selectedDate = \Input::json("selectedDate");
    $finish_date = date('Y-m-d H:i:s', strtotime($selectedDate));

    //tasks_idからtasks_nameを取得
    $tasks_name = \Model\Task::get_tasks_name_by_id($tasks_id);

    //finish_tasksにuser_id,room_id,tasks_name,tasks_idを登録
    \Model\Finishtask::create_finish_tasks($user_id, $tasks_name, $tasks_id, $finish_date);

    return \Response::forge(200);
  }

  public function action_mypageEffect()
  {
    $this->validateCsrfToken();
    $room_id = \Session::get('roomid');
    $username = \Session::get('user_name');
    $personname = \Session::get('personname');

    //room_idからlifemoneyを取得
    $lifemoney = \Model\Room::get_lifemoney($room_id);

    $json = \Format::forge([
      'lifemoney' => $lifemoney,
      'username' => $username,
      'personname' => $personname,
      ])->to_json();
    return \Response::forge($json, 200);
  }

  public function action_changepersonnal()
  {
    $this->validateCsrfToken();
    if (\Input::method() !== 'POST') {
      return \Response::forge('変更できませんでした。', 401);
    }

    $room_id = \Session::get('roomid');
    $username = \Session::get('user_name');
    $personname = \Session::get('personname');
    $lifemoney = \Model\Room::get_lifemoney($room_id);
    $inputPersonname = \Input::json('inputPersonname');
    $inputUsername = \Input::json('inputUsername');
    $inputLifemoney = \Input::json('inputLifemoney');

    if ($inputUsername !== "") {
      //usernameからinputUsernameへ変更
      \Model\User::update_username($username, $inputUsername);
      $username = $inputUsername;
      \Session::set('username', $username);
    };
    if ($inputPersonname !== "") {
      //personnameからinputPersonnameへ変更
      \Model\User::update_username($personname, $inputPersonname);
      $personname = $inputPersonname;
      \Session::set('personname', $personname);
    };
    if ($inputLifemoney !== $lifemoney && $inputLifemoney !== '') {
      //lifemoneyからinputLifemoneyへ変更
      \Model\Room::update_lifemoney($room_id, $inputLifemoney);
    };
    

    $json = \Format::forge([
      'username' => $username,
      'personname' => $personname,
      ])->to_json();
    return \Response::forge($json, 200);
  }

}

