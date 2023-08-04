import React, { useEffect, useState, useRef } from "react";
import ko from "knockout";
import { useNavigate } from "react-router-dom"; 

const LoginForm = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();  
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const viewModel = createKnockoutViewModel();

    viewModel.inputEmail.subscribe((newValue) => {
      setInputEmail(newValue);
    });

    viewModel.inputPassword.subscribe((newValue) => {
      setInputPassword(newValue);
    });


  }, []);

  const createKnockoutViewModel = () => {
    var viewModel = {};

    viewModel.inputEmail = ko.observable("");
    viewModel.inputPassword = ko.observable("");

    viewModel.canSubmitLogin = ko.computed(function () {
      return (
        viewModel.inputEmail().length > 0 &&
        viewModel.inputPassword().length > 0
      );
    });

    return viewModel;
  };

  const handleLoginSubmit = (event) => {
    // ここでフォームのデータをサーバーに送信するなどの処理を追加
    console.log(inputEmail, inputPassword);
    navigate("/home");
  };

  return (
    <div ref={containerRef}><p className="AppSubtitle">
      ログインページ
    </p><form onSubmit={handleLoginSubmit}>
        <div>
          <input
            placeholder="メールアドレス"
            type="text"
            id="mail"
            className="mail"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)} />
        </div>
        <div>
          <input
            placeholder="パスワード"
            type="password"
            id="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)} />
        </div>
        <button 
        type="submit" 
        className="LoginButton"
        disabled={!inputEmail || !inputPassword}
        onClick={handleLoginSubmit}
        >ログイン</button>
      </form>
        <a href="/Signin" className="SigninHref">新規登録</a>
      </div>
  );
};

export default LoginForm;
