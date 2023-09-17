<?php
namespace Model;
class Roomuser extends \Model
{
	protected static $_table_name = 'room_users';
	protected static $_primary_key = array('id');
	
	protected static $_properties = array(
			'id' => array(
					'data_type' => 'int',
					'label' => 'Id',
			),
			'room_id' => array(
					'data_type' => 'varchar',
					'label' => 'Room ID',
			),
			'user_id' => array(
					'data_type' => 'int',
					'label' => 'User ID',
			),
	);

	public static function create_roomuser($user_id, $room_id)
    {
        $query = \DB::insert(static::$_table_name);
        $query->set([
                'user_id' => $user_id,
								'room_id' => $room_id,
            ]);
				$result = $query->execute();
        
        if ($result) {
            return $result[0];
        } else {
            return false; // 挿入に失敗した場合はfalseを返す
        }
    }

}
