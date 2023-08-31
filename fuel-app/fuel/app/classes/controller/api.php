<?php

use Fuel\Core\Controller;
use Fuel\Core\DB;
use Fuel\Core\Format;
use Fuel\Core\Input;
use Fuel\Core\Response;
use Fuel\Core\Session;

class Controller_Api extends Controller
{
  public function before()
  {
      parent::before();

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

    $query = DB::query('SELECT * FROM `finish_tasks` WHERE user_id = :person_id', DB::SELECT);
    $person_finish_tasks = $query->bind('person_id', $person_id)->execute()->as_array();
    $person_finish_task_name = array_column($person_finish_tasks, 'tasks_name');
    $person_finish_task_date = array_column($person_finish_tasks, 'finish_date');



    $json = Format::forge([
      'room_id' => $id,
      'lifemoney' => $lifemoney,
      'finish_task_name' => $finish_task_name,
      'finish_task_date' => $finish_task_date,
      'person_finish_task_name' => $person_finish_task_name,
      'person_finish_task_date' => $person_finish_task_date,
      ])->to_json();
    return Response::forge($json, 200);
  }
}
