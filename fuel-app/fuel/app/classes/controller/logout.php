<?php

namespace Controller;

class Logout extends \Controller
{
    public function action_index()
    {
      if (isset($array['http_header_name'])) {
        \Session::destroy();
        return \Response::forge(200);
      } else {
        return \Response::forge(200);
      }
    }
}