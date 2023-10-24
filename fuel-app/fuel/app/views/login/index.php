<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="ログインフォーム">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php echo \Asset::css('bootstrap.css'); ?>
    <?php echo \Asset::css('templete.css'); ?>
    <?php echo \Asset::css('login.css'); ?>
    <title>ログインフォーム</title>
</head>
<body>
    <?php echo \View::forge('header/index');?>
    <h1>ログインフォーム</h1>
    <form action="login/login" method="post">

        <input type="text" 
               class="inputPersonalData" 
               name="email" 
               placeholder="メールアドレス"
               required><br><br>

        <input type="password" 
               class="inputPersonalData" 
               name="password" 
               placeholder="パスワード"
               required><br><br>

        <button type="submit" class="LoginButton">ログイン</button>
    </form>
</body>
</html>