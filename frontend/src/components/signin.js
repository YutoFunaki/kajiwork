import React, { useState } from "react";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 新規登録処理書くとこ
    console.log("Username:", username);
    console.log("Mail:", mail);
    console.log("Password:", password);
  };

  return (
    <><p className="AppSubtitle">
      新規登録ページ
    </p><form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="ユーザー名"
            type="text"
            id="username"
            className="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input
            placeholder="メールアドレス"
            type="text"
            id="mail"
            className="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <input
            placeholder="パスワード"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="LoginButton">ログイン</button>
      </form>
      <a href="https://google.co.jp" className="SigninHref">新規登録</a>
      </>
  );
};

export default SigninForm;
