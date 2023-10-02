<?php
namespace Model;
class Finishtask extends \Model
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

        public static function create_finish_tasks($user_id, $tasks_name, $tasks_id, $finish_date)
    {
        $query = \DB::insert(static::$_table_name);
        $query->set([
            'user_id' => $user_id,
            'tasks_name' => $tasks_name,
            'tasks_id' => $tasks_id,
            'finish_date' => $finish_date,
        ])->execute();
        return $query;
    }

    public static function get_finish_tasks_name($user_id)
    {
        $select = "SELECT tasks_name FROM finish_tasks WHERE user_id = :user_id";
        $query = \DB::query($select)->bind("user_id", $user_id)->execute();
        $result = $query->as_array();
        $finish_tasks_name = array_column($result, 'tasks_name');
        return $finish_tasks_name;
    }

    public static function get_finish_tasks_date($user_id)
    {
        $select = "SELECT finish_date FROM finish_tasks WHERE user_id = :user_id";
        $query = \DB::query($select)->bind("user_id", $user_id)->execute();
        $result = $query->as_array();
        $finish_tasks_date = array_column($result, 'finish_date');
        return $finish_tasks_date;
    }

    public static function get_finish_tasks_month($user_id)
    {
        $select = \DB::select(array(\DB::expr('YEAR(finish_date)'), 'year'), array(\DB::expr('MONTH(finish_date)'), 'month'))
            ->from('finish_tasks')
            ->where('user_id', '=', $user_id)
            ->group_by(array(\DB::expr('YEAR(finish_date)'), \DB::expr('MONTH(finish_date)')))
            ->order_by('year', 'ASC')
            ->order_by('month', 'ASC');
        $result = $select->execute()->as_array();

        $finish_tasks_month = array_column($result, 'month');
        return $finish_tasks_month;
    }

    public static function get_finish_tasks_count($user_id)
    {
        $select = \DB::select(array(\DB::expr('YEAR(finish_date)'), 'year'), array(\DB::expr('MONTH(finish_date)'), 'month'), array(\DB::expr('count(*)'), 'count'))
            ->from('finish_tasks')
            ->where('user_id', '=', $user_id)
            ->group_by(array(\DB::expr('YEAR(finish_date)'), \DB::expr('MONTH(finish_date)')))
            ->order_by('year', 'ASC')
            ->order_by('month', 'ASC');
        $result = $select->execute()->as_array();

        $finish_tasks_count = array_column($result, 'count');
        return $finish_tasks_count;
    }
}

