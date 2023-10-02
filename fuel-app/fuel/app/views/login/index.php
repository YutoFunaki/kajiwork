<!DOCTYPE html>
<html>
<head>
    <title>ログインフォーム</title>
</head>
<body>
    <h2>ログイン</h2>
    <form action="login/process" method="post">
        <label for="email">メールアドレス:</label>
        <input type="text" id="email" name="email" required><br><br>

        <label for="password">パスワード:</label>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">ログイン</button>
    </form>
</body>
</html>
