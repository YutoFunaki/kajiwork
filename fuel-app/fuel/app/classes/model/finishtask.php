<?php

class Model_Finish_Task extends \Orm\Model
{
	protected static $_table_name = 'finish_tasks';
    protected static $_primary_key = array('id');
    
    protected static $_properties = array(
        'id' => array(
            'data_type' => 'int',
            'label' => 'Id',
        ),
        'tasks_id' => array(
            'data_type' => 'int',
            'label' => 'Task ID',
        ),
        'tasks_name' => array(
            'data_type' => 'varchar',
            'label' => 'Task Name',
        ),
        'user_id' => array(
            'data_type' => 'int',
            'label' => 'User ID',
        ),
        'finish_date' => array(
            'data_type' => 'timestamp',
            'label' => 'Finish Date',
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
