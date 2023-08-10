<?php
use \Orm\Model;
class Model_User extends Model
{
    protected static $_properties = array(
        'id',
        'username',
        'email',
        'password',
    );
    
    protected static $_validations = array(
        'username' => array('required'),
        'email' => array('required', 'valid_email'),
        'password' => array('required'),
    );
    
    // その他のメソッドやリレーションの定義
}
