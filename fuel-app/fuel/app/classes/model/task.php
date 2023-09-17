<?php

class Model_Task extends \Orm\Model
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
	);
}
