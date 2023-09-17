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
            ]);
				$result = $query->execute();
				
				if ($result) {
						return $result[0];
				} else {
						return false; // 挿入に失敗した場合はfalseを返す
				}
    }

		//ユーザーID取得
		public static function get_id_by_username($username,$password)
    {
        $query = \DB::select('id')
                    ->from(static::$_table_name)
                    ->where('username', '=', $username)
										->where('password', '=', $password)
                    ->execute();

        if ($query && $query->count() > 0) {
            $result = $query->current();
            return $result['id'];
        } else {
            return false; // ユーザーが見つからなかった場合は false を返す
        }
    }
}
