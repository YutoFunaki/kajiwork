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

return [
	'auto_initialize' => true,
	'auto_start' => true,
	'driver' => 'cookie',
	'match_ip' => false,
	'match_ua' => true,
	'cookie_domain'    => '',
	'cookie_path'      => '/',
	'cookie_http_only' => null,
	'cookie_same_site' => null,
	'encrypt_cookie' => false,
	'expire_on_close' => false,
	'expiration_time' => 300,
	'rotation_time' => 3000,
	'flash_id' => 'flash',
	'flash_auto_expire' => true,
	'flash_expire_after_get' => true,
	'post_cookie_name' => '',
	'http_header_name' => 'Session-Id',
	'enable_cookie' => true,
	'native_emulation' => false,

	'cookie' => array(
		'cookie_name' => 'fuelcid',
		'encrypted' => true, // セッションIDを暗号化しない
		'lifetime' => 3600,   // セッションの有効期限
		'path' => '/',
		'domain' => null,
		'http_only' => false,
		'secure' => false,
		'session_id' => 'testsessid', // ここにセッションIDを指定
	),

	'file' => array(
		'cookie_name' => 'fuelfid',
		'path' => '/tmp',
		'gc_probability' => 5,
	),

	'memcached' => array(
		'cookie_name' => 'fuelmid',
		'servers' => array(
			'default' => array(
				'host'   => '127.0.0.1',
				'port'   => 11211,
				'weight' => 100
			),
		),
	),

	'db' => array(
		'cookie_name' => 'fueldid',
		'table' => 'sessions',
		'gc_probability' => 5,
	),

	'redis' => array(
		'cookie_name' => 'fuelrid',
		'database' => 'default',
	),
];
