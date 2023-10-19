<?php

namespace Model;
class User extends \Model
{
    protected static $_table_name = 'users';
    protected static $_primary_key = array('id');
    
    // プロパティの定義
    protected static $_properties = array(
        'id' => array(
            'data_type' => 'int',
            'label' => 'Id',
        ),
        'username' => array(
            'data_type' => 'varchar',
            'label' => 'ユーザー名',
        ),
        'password' => array(
            'data_type' => 'varchar',
            'label' => 'パスワード',
        ),
        'email' => array(
            'data_type' => 'varchar',
            'label' => 'メールアドレス',
        ),
        'created_at' => array(
            'data_type' => 'timestamp',
            'label' => '作成日',
        ),
				'last_login' => array(
						'data_type' => 'int',
						'label' => '最終ログイン日',
				),
				'login_hash' => array(
						'data_type' => 'varchar',
				)
    );
		protected static $_created_at = 'created_at';

		//新規ユーザー登録
		public static function create_user($username, $email, $password)
		{
				$query = \DB::insert(static::$_table_name);
				$query->set([
						'username' => $username,
						'email' => $email,
						'password' => $password,
				])->execute();
				return $query;
		}

		public static function get_user_id($username)
		{
				$select = "SELECT id FROM users WHERE username = :username";
				$query = \DB::query($select)->bind("username", $username)->execute()->as_array();

				if ($query) {
						return $query[0]['id'];
				} else {
						return false; // 挿入に失敗した場合はfalseを返す
				}
		}

		public static function login_user($email, $password)
		{
				$select = "SELECT id FROM users WHERE email = :email AND password = :password";
				$query = \DB::query($select)
						->bind("email", $email)
						->bind("password", $password)
						->execute();

				if ($query && $query->count() > 0) {
						$result = $query->current();
						return $result['id'];
				} else {
						return false; // ユーザーが見つからなかった場合は false を返す
				}
		}

		public static function update_username($username, $inputUsername)
		{
				$update = "UPDATE users SET username = :inputUsername WHERE username = :username";
				$query = \DB::query($update)
						->bind("inputUsername", $inputUsername)
						->bind("username", $username)
						->execute();

				if ($query) {
						return true;
				} else {
						return false; // 挿入に失敗した場合はfalseを返す
				}
		}

		public static function get_username($email, $password)
		{
				$select = "SELECT username FROM users WHERE email = :email AND password = :password";
				$query = \DB::query($select)
						->bind("email", $email)
						->bind("password", $password)
						->execute();

				if ($query && $query->count() > 0) {
						$result = $query->current();
						return $result['username'];
				} else {
						return false; // ユーザーが見つからなかった場合は false を返す
				}
		}

		public static function get_personname($person_id)
		{
				$select = "SELECT username FROM users WHERE id = :person_id";
				$query = \DB::query($select)
						->bind("person_id", $person_id)
						->execute();

				if ($query && $query->count() > 0) {
						$result = $query->current();
						return $result['username'];
				} else {
						return false; // ユーザーが見つからなかった場合は false を返す
				}
		}

		public static function get_person_id($personname)
		{
				$select = "SELECT id FROM users WHERE username = :personname";
				$query = \DB::query($select)
						->bind("personname", $personname)
						->execute();

				if ($query && $query->count() > 0) {
						$result = $query->current();
						return $result['id'];
				} else {
						return false; // ユーザーが見つからなかった場合は false を返す
				}
		}
}
