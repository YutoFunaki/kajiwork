<?php
namespace Model;
class Room extends \Model
{
	protected static $_table_name = 'rooms';
    
	protected static $_properties = array(
			'id' => array(
					'data_type' => 'varchar',
					'label' => 'Room ID',
			),
			'lifemoney' => array(
					'data_type' => 'int',
					'label' => '生活費',
			),
			'created_at' => array(
					'data_type' => 'timestamp',
					'label' => 'Created At',
			),
	);

	//rooms作成
	public static function create_room($room_id)
	{
			$query = \DB::insert(static::$_table_name);
			$query->set([
							'id' => $room_id,
					]);
			$result = $query->execute();

      if ($result) {
          return $result[0];
      } else {
          return false;
      }
	}

	public static function get_lifemoney($room_id)
	{
			$query = \DB::select('lifemoney')
						->from(static::$_table_name)
						->where('id', '=', $room_id)
						->execute();
			$result = $query->as_array();

			if ($result) {
					return $result[0]['lifemoney'];
			} else {
					return false; 
		}
	}

	public static function update_lifemoney($room_id, $inputlifemoney)
	{
		$query = \DB::update(static::$_table_name);
		$query->set([
				'lifemoney' => $inputlifemoney,
		]);
		$query->where('id', '=', $room_id);
		$result = $query->execute();
		if ($result) {
				return true;
		} else {
				return false; // 挿入に失敗した場合はfalseを返す
		}
	}
}
