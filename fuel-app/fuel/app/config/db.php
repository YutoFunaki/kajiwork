<?php
/**
 * Fuel is a fast, lightweight, community driven PHP 5.4+ framework.
 *
 * @package    Fuel
 * @version    1.9-dev
 * @author     Fuel Development Team
 * @license    MIT License
 * @copyright  2010 - 2019 Fuel Development Team
 * @link       https://fuelphp.com
 */

/**
 * -----------------------------------------------------------------------------
 *  Global database settings
 * -----------------------------------------------------------------------------
 *
 *  Set database configurations here to override environment specific
 *  configurations
 *
 */

return array(
  'default' => array(
    'connection'  => array(
            'dsn'        => 'mysql:host=mysql;dbname=kajiwork;charset=utf8mb4;unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock',
//unix_socketを指定
            'username'   => 'root',
            'password'   => 'root',
    ),
  ),
);
