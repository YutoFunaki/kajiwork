<?php

namespace Model;
use Fuel\Core\Session;

class SessionModel  {
  public $session;

    public function __construct()
    {
        $this->session = Session::instance();
    }

    public function getSession($key)
    {
        return $this->session->get($key);
    }
    
    public function setSession($key, $value)
    {
        return $this->session->set($key, $value);
    }

    public function hasSession($key)
    {
        return $this->session->has($key);
    }

    public function setFlashSession($key, $value)
    {
        return $this->session->set_flash($key, $value);
    }

    public function getFlashSession($key)
    {
        return $this->session->get_flash($key);
    }
}