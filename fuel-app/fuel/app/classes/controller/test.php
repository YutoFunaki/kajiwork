<?php
namespace Controller;
class Test extends \Controller
{
  public function before()
  {
      parent::before();
      // CORSヘッダーを設定
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
      header('Access-Control-Allow-Headers: *');
  }

  public function action_index(){
    $d1 = "セッション";
    var_dump($d1);
    echo '</br>';
    \Session::set('d1', $d1);
  }

  public function action_test1(){
    $d1 = \Session::get('d1');
    var_dump($d1);
    echo '</br>';
  }
}