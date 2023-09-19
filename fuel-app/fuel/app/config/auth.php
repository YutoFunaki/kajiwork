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
 * NOTICE:
 *
 * If you need to make modifications to the default configuration, copy
 * this file to your app/config folder, and make them in there.
 *
 * This will allow you to upgrade fuel without losing your custom config.
 */

return array(
    'driver'                 => array('Simpleauth'),
    'verify_multiple_logins' => false,
    'salt'                   => '********',
    'iterations'             => 10000,

    // ユーザーモデルのクラス名
    'model' => 'User',

    // ユーザーのログインIDカラム名
    'login_id_column' => 'email',
    // ユーザーのパスワードカラム名
    'password_column' => 'password',
    // セッションIDを保持するHTTPヘッダーの名前
    'http_header_name' => 'Session-Id',
    // ログアウト後のリダイレクト先
    'redirect_after_logout' => '/',
);
