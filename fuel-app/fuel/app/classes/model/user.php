<?php

// app/classes/model/user.php
class Model_User extends Orm\Model
{
    protected static $_table_name = 'users'; // テーブル名

    protected static $_properties = array(
        'id',
        'username',
        'email',
        'password',
        'created_at'
    );

    // 他のプロパティやメソッドを定義することも可能
}

?>
