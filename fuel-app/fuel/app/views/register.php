<h2>新規登録</h2>

<?php if (Session::get_flash('error')): ?>
<div class="alert alert-error">
    <?php echo Session::get_flash('error'); ?>
</div>
<?php endif; ?>

<?php echo Form::open(array('class' => 'form-horizontal')); ?>

<div class="control-group">
    <?php echo Form::label('ユーザー名', 'username', array('class' => 'control-label')); ?>

    <div class="controls">
        <?php echo Form::input('username', Input::post('username', isset($user) ? $user->username : ''), array('class' => 'span4', 'placeholder' => 'ユーザー名')); ?>
    </div>
</div>

<div class="control-group">
    <?php echo Form::label('パスワード', 'password', array('class' => 'control-label')); ?>

    <div class="controls">
        <?php echo Form::password('password', '', array('class' => 'span4', 'placeholder' => 'パスワード')); ?>
    </div>
</div>

<div class="control-group">
    <?php echo Form::label('メールアドレス', 'email', array('class' => 'control-label')); ?>

    <div class="controls">
        <?php echo Form::input('email', Input::post('email', isset($user) ? $user->email : ''), array('class' => 'span4', 'placeholder' => 'メールアドレス')); ?>
    </div>
</div>

<div class="form-actions">
    <?php echo Form::submit('submit', '登録', array('class' => 'btn btn-primary')); ?>
</div>

<?php echo Form::close(); ?>
