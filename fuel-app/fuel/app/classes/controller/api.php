<?php

namespace Controller;

class Api extends \Controller
{
  public function before()
  {
      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
      header('Access-Control-Allow-Headers: *');

      if (\Input::method() == 'OPTIONS') {
          exit;
      }
  }

  public function action_index()
  {
    $username = $_GET['username'];
    $personname = $_GET['personname'];
    $room_id = $_GET['room_id'];

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
    $person_finish_task_month = \Model\Finishtask::get_finish_tasks_month($person_id);
    $person_finish_task_count = \Model\Finishtask::get_finish_tasks_count($person_id);

    // 各room_idに関連付けられたfrequency値を合計する
    $tasks_frequency = \Model\Task::get_frequency_sum($room_id);
    

    $json = \Format::forge([
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

    if (\Input::method() !== 'POST') {
      return \Response::forge('入力項目に空欄がある', 401);
    }

    $workname = \Input::json('workname');
    $frequency = \Input::json('frequency');
    $room_id = \Input::json('room_id');

    $result = \Model\Task::create_task($workname, $room_id, $frequency);

    if ($result) {
      return \Response::forge(200);
    } else {
      return \Response::forge('新規登録できませんでした。', 401);
    }
  }

  public function action_workmanage()
  {
     $room_id = $_GET['room_id'];

      //room_idからtasksを取得
      $tasks_name = \Model\Task::get_tasks_name($room_id);
      $tasks_frequency = \Model\Task::get_tasks_frequency($room_id);
      $tasks_id = \Model\Task::get_tasks_id($room_id);

    
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

    $id = \Input::json('selectedWork');

    //tasksからidをもとに削除
    \Model\Task::delete_task($id);
  
     return \Response::forge(200);
  }

  public function action_workrename()
  {
    if (\Input::method() !== 'POST') {
      return \Response::forge('変更できませんでした。', 401);
    }

    $id = \Input::json('selectedWork');
    $workname = \Input::json('workname');
    $frequency = \Input::json('frequency');
    $room_id = \Input::json('room_id');

    if ($workname === "") {
      \Model\Task::update_tasks_name($id, $workname);
    } else if ($frequency === 0) {
      \Model\Task::update_tasks_frequency($id, $frequency);
    } else {
      \Model\Task::update_tasks_name($id, $workname);
      \Model\Task::update_tasks_frequency($id, $frequency);
    }
  
    $json = \Format::forge([
      'workname' => $workname,
      'frequency' => $frequency,
      'room_id' => $room_id,
      'id' => $id,
      ])->to_json();
    return \Response::forge($json, 200);
  }

  public function action_workfinishEffect()
  {
    $username = $_GET['username'];
    $personname = $_GET['personname'];
    $room_id = $_GET['room_id'];

    //usernameからuser_idを取得
    $user_id = \Model\User::get_user_id($username);

    //personnameからperson_idを取得
    $person_id = \Model\User::get_user_id($personname);

    //room_idからtasksを取得
    $tasks_name = \Model\Task::get_tasks_name($room_id);
    $tasks_id = \Model\Task::get_tasks_id($room_id);

  
    $json = \Format::forge([
      'user_id' => $user_id,
      'person_id' => $person_id,
      'tasks_name' => $tasks_name,
      'tasks_id' => $tasks_id,
      ])->to_json();
    return \Response::forge($json, 200);
  }

  public function action_finishwork()
  {
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
    $room_id = $_GET['room_id'];

    //room_idからlifemoneyを取得
    $lifemoney = \Model\Room::get_lifemoney($room_id);

    $json = \Format::forge([
      'lifemoney' => $lifemoney,
      ])->to_json();
    return \Response::forge($json, 200);
  }

  public function action_changepersonnal()
  {
    if (\Input::method() !== 'POST') {
      return \Response::forge('変更できませんでした。', 401);
    }

    $username = \Input::json('username');
    $personname = \Input::json('personname');
    $room_id = \Input::json('room_id');
    $inputPersonname = \Input::json('inputPersonname');
    $inputUsername = \Input::json('inputUsername');
    $room_id = \Input::json('room_id');
    $inputLifemoney = \Input::json('inputLifemoney');

    if ($inputUsername !== "") {
      //usernameからinputUsernameへ変更
      \Model\User::update_username($username, $inputUsername);
      $username = $inputUsername;
    };
    if ($inputPersonname !== "") {
      //personnameからinputPersonnameへ変更
      \Model\User::update_username($personname, $inputPersonname);
      $personname = $inputPersonname;
    };
    if ($inputLifemoney !== "") {
      //lifemoneyからinputLifemoneyへ変更
      \Model\Room::update_lifemoney($room_id, $inputLifemoney);
    }
    

    $json = \Format::forge([
      'username' => $username,
      'personname' => $personname,
      ])->to_json();
    return \Response::forge($json, 200);
  }
}
