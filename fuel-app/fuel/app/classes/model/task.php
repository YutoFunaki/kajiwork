<?php
namespace Model;
class Task extends \Model
{
	protected static $_table_name = 'tasks';
	protected static $_primary_key = array('id');
	
	protected static $_properties = array(
			'id' => array(
					'data_type' => 'int',
					'label' => 'Id',
			),
			'name' => array(
					'data_type' => 'varchar',
					'label' => 'Task Name',
			),
			'room_id' => array(
					'data_type' => 'varchar',
					'label' => 'Room ID',
			),
			'frequency' => array(
					'data_type' => 'int',
					'label' => '頻度',
			),
			'created_at' => array(
					'data_type' => 'timestamp',
					'label' => 'Created At',
			),
			'updated_at' => array(
					'data_type' => 'timestamp',
					'label' => 'Updated At',
			),
			'deleted_at' => array(
          'data_type' => 'timestamp',
          'label' => 'Deleted At',
      ),
	);

		public static function get_tasks_name_by_id($id)
		{
				$select = "SELECT name FROM tasks WHERE id = :id";
				$query = \DB::query($select)->bind("id", $id)->execute();
				$result = $query->as_array();
				$tasks_name = array_column($result, 'name');
				return $tasks_name[0];
		}

		public static function get_tasks_name($room_id)
		{
				$select = "SELECT name FROM tasks WHERE room_id = :room_id AND deleted_at IS NULL";
				$query = \DB::query($select)->bind("room_id", $room_id)->execute();
				$result = $query->as_array();
				$tasks_name = array_column($result, 'name');
				return $tasks_name;
		}

		public static function get_tasks_frequency($room_id)
		{
				$select = "SELECT frequency FROM tasks WHERE room_id = :room_id AND deleted_at IS NULL";
				$query = \DB::query($select)->bind("room_id", $room_id)->execute();
				$result = $query->as_array();
				$tasks_frequency = array_column($result, 'frequency');
				return $tasks_frequency;
		}

		public static function get_tasks_id($room_id)
		{
				$select = "SELECT id FROM tasks WHERE room_id = :room_id AND deleted_at IS NULL";
				$query = \DB::query($select)->bind("room_id", $room_id)->execute();
				$result = $query->as_array();
				$tasks_id = array_column($result, 'id');
				return $tasks_id;
		}

		public static function get_frequency_sum($room_id)
		{
				$select = "SELECT frequency FROM tasks WHERE room_id = :room_id AND deleted_at IS NULL";
				$query = \DB::query($select)->bind("room_id", $room_id)->execute();
				$result = $query->as_array();
				$task_frequency = array_column($result, 'frequency');
				$task_frequency = array_sum($task_frequency);
				return $task_frequency;
		}

		public static function create_task($workname, $room_id, $frequency)
		{
				$query = \DB::insert(static::$_table_name);
				$query->set([
						'name' => $workname,
						'room_id' => $room_id,
						'frequency' => $frequency,
				]);
				$result = $query->execute();
				
				return $result;
		}

		public static function delete_task($id)
		{
				$update = \DB::update(static::$_table_name);
				$update->set([
						'deleted_at' => \DB::expr('NOW()'), // 削除日時を設定
				]);
				$update->where('id', '=', $id);
				$result = $update->execute();
				return $result;
		}

		public static function update_tasks_name($id, $workname)
		{
				$update = \DB::update(static::$_table_name);
				$update->set([
						'name' => $workname,
				]);
				$update->where('id', '=', $id);
				$result = $update->execute();
				return $result;
		}

		public static function update_tasks_frequency($id, $frequency)
		{
				$update = \DB::update(static::$_table_name);
				$update->set([
						'frequency' => $frequency,
				]);
				$update->where('id', '=', $id);
				$result = $update->execute();
				return $result;
		}

}
