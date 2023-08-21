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
      header('Access-Control-Allow-Methods: POST');
      header('Access-Control-Allow-Headers: *');

      if (Input::method() == 'OPTIONS') {
          exit;
      }
  }

  public function action_index()
  {
    //セッションからuser_id,person_id,room_idを取得
    $user_id = Session::get('user_id');
    $person_id = Session::get('person_id');
    $room_id = Session::get('room_id');

    //取得した情報をもとに最終的には完了した家事を取得し返す
    //room_idからroomsテーブル特定し生活費の取得
    $query = DB::query('SELECT * FROM `rooms` WHERE id = :room_id', DB::SELECT);
    $rooms = $query->bind('room_id', $room_id)->execute()->as_array();
    $lifemoney = $rooms[0]['lifemoney'];

    //完了した家事をfinish_tasksから持ってくる
    $query = DB::query('SELECT * FROM `finish_tasks` WHERE user_id = :user_id', DB::SELECT);
    $finish_tasks = $query->bind('user_id', $user_id)->execute()->as_array();
    $finish_task_id = $finish_tasks['tasks_id'];
    $finish_task_date = $finish_tasks['finish_date'];

    $query = DB::query('SELECT * FROM `finish_tasks` WHERE user_id = :user_id', DB::SELECT);
    $finish_tasks = $query->bind('user_id', $person_id)->execute()->as_array();
    $person_finish_task_id = $finish_tasks['tasks_id'];
    $person_finish_task_date = $finish_tasks['finish_date'];

    //finish_task_idを使ってtasksからnameを持ってくる
    $query = DB::query('SELECT * FROM `tasks` WHERE id = :finish_task_id', DB::SELECT);
    $finish_task_name = $query->bind('finish_task_id', $finish_task_id)->execute()->as_array();

    

    $json = Format::forge([
      'lifemoney' => $lifemoney,
      'finish_task_id' => $finish_task_id,
      'finish_task_date' => $finish_task_date,
      'person_finish_task_id' => $person_finish_task_id,
      'person_finish_task_date' => $person_finish_task_date,
      'finish_task_name' => $finish_task_name,
      
      ])->to_json();
    return Response::forge($json, 200);
  }
}
