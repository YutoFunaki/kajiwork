import React, { useState } from "react";

const LoginForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ログイン処理書くとこ
    console.log("Mail:", mail);
    console.log("Password:", password);
  };

  return (
    <><p className="AppSubtitle">
      ログインページ
    </p><form onSubmit={handleSubmit}>
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

export default LoginForm;
