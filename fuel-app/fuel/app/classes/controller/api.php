<?php

namespace Controller;

use Fuel\Core\DB;
use Fuel\Core\Format;
use Fuel\Core\Input;
use Fuel\Core\Response;
use Fuel\Core\Session;

class Api extends \Controller
{
  public function before()
  {
      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
      header('Access-Control-Allow-Headers: *');

      if (Input::method() == 'OPTIONS') {
          exit;
      }
  }

  public function action_index()
  {
    $username = $_GET['username'];
    $personname = $_GET['personname'];
    $id = $_GET['room_id'];

    //取得した情報をもとに最終的には完了した家事を取得し返す
    //usernameからuser_idを取得
    $query = DB::query('SELECT * FROM `users` WHERE username = :username', DB::SELECT);
    $users = $query->bind('username', $username)->execute()->as_array();
    $user_id = $users[0]['id'];

    //room_idからroomsテーブル特定し生活費の取得
    $query = DB::query('SELECT * FROM `rooms` WHERE id = :id', DB::SELECT);
    $rooms = $query->bind('id', $id)->execute()->as_array();
    $lifemoney = $rooms[0]['lifemoney'];

    //personnameからperson_idを取得
    $query = DB::query('SELECT * FROM `users` WHERE username = :username', DB::SELECT);
    $users = $query->bind('username', $personname)->execute()->as_array();
    $person_id = $users[0]['id'];

    //完了した家事をfinish_tasksから持ってくる
    $query = DB::query('SELECT * FROM `finish_tasks` WHERE user_id = :user_id', DB::SELECT);
    $finish_tasks = $query->bind('user_id', $user_id)->execute()->as_array();
    $finish_task_name = array_column($finish_tasks, 'tasks_name');
    $finish_task_date = array_column($finish_tasks, 'finish_date');

    $query = DB::query('SELECT YEAR(finish_date) AS year, MONTH(finish_date) AS month, count(*) AS count FROM `finish_tasks` WHERE user_id = :user_id GROUP BY YEAR(finish_date), MONTH(finish_date) ORDER BY year ASC, month ASC', DB::SELECT);
    $finish_tasks = $query->bind('user_id', $user_id)->execute()->as_array();
    $finish_task_month = array_column($finish_tasks, 'month');
    $finish_task_count = array_column($finish_tasks, 'count');

    $query = DB::query('SELECT YEAR(finish_date) AS year, MONTH(finish_date) AS month, count(*) AS count FROM `finish_tasks` WHERE user_id = :user_id GROUP BY YEAR(finish_date), MONTH(finish_date) ORDER BY year ASC, month ASC', DB::SELECT);
    $finish_tasks = $query->bind('user_id', $person_id)->execute()->as_array();
    $person_finish_task_month = array_column($finish_tasks, 'month');
    $person_finish_task_count = array_column($finish_tasks, 'count');

    $query = DB::query('SELECT * FROM `finish_tasks` WHERE user_id = :person_id', DB::SELECT);
    $person_finish_tasks = $query->bind('person_id', $person_id)->execute()->as_array();
    $person_finish_task_name = array_column($person_finish_tasks, 'tasks_name');
    $person_finish_task_date = array_column($person_finish_tasks, 'finish_date');

    // 各room_idに関連付けられたfrequency値を合計する
    $query = DB::query('SELECT * FROM `tasks` WHERE room_id = :id', DB::SELECT);
    $tasks = $query->bind('id', $id)->execute()->as_array();
    $tasks_frequency = array_column($tasks, 'frequency');
    $tasks_frequency = array_sum($tasks_frequency);
    

    $json = Format::forge([
      'room_id' => $id,
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
    return Response::forge($json, 200);
  }

  public function action_new()
  {
     // 新しいAPIエンドポイントにもCORSヘッダーを追加
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
     header('Access-Control-Allow-Headers: *');

    if (Input::method() !== 'POST') {
      return Response::forge('新規登録できませんでした。', 401);
    }

    $workname = Input::json('workname');
    $frequency = Input::json('frequency');
    $room_id = Input::json('room_id');

    //tasksにworkname,frequency,room_idを登録
    $query = DB::query('INSERT INTO tasks (name, room_id, frequency) VALUES (:workname, :room_id, :frequency)', DB::INSERT);
    $query->bind('workname', $workname)->bind('room_id', $room_id)->bind('frequency', $frequency)->execute();
  
     return Response::forge(200);
  }

  public function action_workmanage()
  {
     // 新しいAPIエンドポイントにもCORSヘッダーを追加
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
     header('Access-Control-Allow-Headers: *');

     $room_id = $_GET['room_id'];

      //room_idからtasksを取得
      $query = DB::query('SELECT * FROM `tasks` WHERE room_id = :room_id', DB::SELECT);
      $tasks = $query->bind('room_id', $room_id)->execute()->as_array();
      $tasks_name = array_column($tasks, 'name');
      $tasks_frequency = array_column($tasks, 'frequency');
      $tasks_id = array_column($tasks, 'id');

    
      $json = Format::forge([
        'tasks_name' => $tasks_name,
        'tasks_frequency' => $tasks_frequency,
        'tasks_id' => $tasks_id,
        ])->to_json();
      return Response::forge($json, 200);
  }

  public function action_workdelete()
  {
     // 新しいAPIエンドポイントにもCORSヘッダーを追加
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
     header('Access-Control-Allow-Headers: *');

    if (Input::method() !== 'POST') {
      return Response::forge('削除できませんでした。', 401);
    }

    $id = Input::json('selectedWork');

    //tasksからidをもとに削除
    $query = DB::query('DELETE FROM `tasks` WHERE id = :id', DB::DELETE);
    $query->bind('id', $id)->execute();
  
     return Response::forge(200);
  }

  public function action_workrename()
  {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: *');

    if (Input::method() !== 'POST') {
      return Response::forge('変更できませんでした。', 401);
    }

    $id = Input::json('selectedWork');
    $workname = Input::json('workname');
    $frequency = Input::json('frequency');
    $room_id = Input::json('room_id');

    if ($workname === "") {
      $query = DB::query('UPDATE `tasks` SET frequency = :frequency WHERE id = :id', DB::UPDATE);
      $query->bind('frequency', $frequency)->bind('id', $id)->execute();
    } else if ($frequency === 0) {
      $query = DB::query('UPDATE `tasks` SET name = :workname WHERE id = :id', DB::UPDATE);
      $query->bind('workname', $workname)->bind('id', $id)->execute();
    } else {
      $query = DB::query('UPDATE `tasks` SET name = :workname, frequency = :frequency WHERE id = :id', DB::UPDATE);
      $query->bind('workname', $workname)->bind('frequency', $frequency)->bind('id', $id)->execute();
    }
  
    $json = Format::forge([
      'workname' => $workname,
      'frequency' => $frequency,
      'room_id' => $room_id,
      'id' => $id,
      ])->to_json();
    return Response::forge($json, 200);
  }

  public function action_workfinishEffect()
  {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: *');

    $username = $_GET['username'];
    $personname = $_GET['personname'];
    $room_id = $_GET['room_id'];

    //usernameからuser_idを取得
    $query = DB::query('SELECT * FROM `users` WHERE username = :username', DB::SELECT);
    $users = $query->bind('username', $username)->execute()->as_array();
    $user_id = $users[0]['id'];

    //personnameからperson_idを取得
    $query = DB::query('SELECT * FROM `users` WHERE username = :username', DB::SELECT);
    $users = $query->bind('username', $personname)->execute()->as_array();
    $person_id = $users[0]['id'];

    //room_idからtasksを取得
    $query = DB::query('SELECT * FROM `tasks` WHERE room_id = :room_id', DB::SELECT);
    $tasks = $query->bind('room_id', $room_id)->execute()->as_array();
    $tasks_name = array_column($tasks, 'name');
    $tasks_id = array_column($tasks, 'id');

  
    $json = Format::forge([
      'user_id' => $user_id,
      'person_id' => $person_id,
      'tasks_name' => $tasks_name,
      'tasks_id' => $tasks_id,
      ])->to_json();
    return Response::forge($json, 200);
  }

  public function action_finishwork()
  {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: *');

    if (Input::method() !== 'POST') {
      return Response::forge('完了できませんでした。', 401);
    }

    $user_id = Input::json("selectedUser");
    $tasks_id = Input::json("selectedWork");
    $room_id = Input::json("room_id");
    $selectedDate = Input::json("selectedDate");
    $finish_date = date('Y-m-d H:i:s', strtotime($selectedDate));

    //tasks_idからtasks_nameを取得
    $query = DB::query('SELECT * FROM `tasks` WHERE id = :tasks_id', DB::SELECT);
    $tasks = $query->bind('tasks_id', $tasks_id)->execute()->as_array();
    $tasks_name = $tasks[0]['name'];

    //finish_tasksにuser_id,room_id,tasks_name,tasks_idを登録
    $query = DB::query('INSERT INTO finish_tasks (user_id, tasks_name, tasks_id, finish_date) VALUES (:user_id, :tasks_name, :tasks_id, :finish_date)', DB::INSERT);
    $query->bind('user_id', $user_id)->bind('room_id', $room_id)->bind('tasks_name', $tasks_name)->bind('tasks_id', $tasks_id)->bind('finish_date', $finish_date)->execute();

    return Response::forge(200);
  }

  public function action_mypageEffect()
  {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: *');


    $room_id = $_GET['room_id'];

    //room_idからlifemoneyを取得
    $query = DB::query('SELECT * FROM `rooms` WHERE id = :room_id', DB::SELECT);
    $rooms = $query->bind('room_id', $room_id)->execute()->as_array();
    $lifemoney = $rooms[0]['lifemoney'];

    $json = Format::forge([
      'lifemoney' => $lifemoney,
      ])->to_json();
    return Response::forge($json, 200);
  }

  public function action_changepersonnal()
  {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: *');

    if (Input::method() !== 'POST') {
      return Response::forge('変更できませんでした。', 401);
    }

    $username = Input::json('username');
    $personname = Input::json('personname');
    $lifemoney = Input::json('lifemoney');
    $inputPersonname = Input::json('inputPersonname');
    $inputUsername = Input::json('inputUsername');
    $room_id = Input::json('room_id');
    $inputLifemoney = Input::json('inputLifemoney');

    if ($inputUsername !== "") {
      //usernameからinputUsernameへ変更
      $query = DB::query('UPDATE `users` SET username = :inputUsername WHERE username = :username', DB::UPDATE);
      $query->bind('inputUsername', $inputUsername)->bind('username', $username)->execute();
      $username = $inputUsername;
    };
    if ($inputPersonname !== "") {
      $query = DB::query('UPDATE `users` SET username = :inputPersonname WHERE username = :personname', DB::UPDATE);
      $query->bind('inputPersonname', $inputPersonname)->bind('personname', $personname)->execute();
      $personname = $inputPersonname;
    };
    if ($inputLifemoney !== "") {
      //lifemoneyからinputLifemoneyへ変更
      $query = DB::query('UPDATE `rooms` SET lifemoney = :inputLifemoney WHERE id = :room_id', DB::UPDATE);
      $query->bind('inputLifemoney', $inputLifemoney)->bind('room_id', $room_id)->execute();
    }
    

    $json = Format::forge([
      'username' => $username,
      'personname' => $personname,
      ])->to_json();
    return Response::forge($json, 200);
  }
}
