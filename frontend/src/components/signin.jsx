import React, { useState, useEffect, useRef } from "react";
import ko from "knockout";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const viewModel = createKnockoutViewModel();

    viewModel.inputUsername.subscribe((newValue) => {
      setInputUsername(newValue);
    });

    viewModel.inputEmail.subscribe((newValue) => {
      setInputEmail(newValue);
    });

    viewModel.inputPassword.subscribe((newValue) => {
      setInputPassword(newValue);
    });


  }, []);

  const createKnockoutViewModel = () => {
    var viewModel = {};

    viewModel.inputUsername = ko.observable("");
    viewModel.inputEmail = ko.observable("");
    viewModel.inputPassword = ko.observable("");

    viewModel.canSubmitLogin = ko.computed(function () {
      return (
        viewModel.inputUsername().length > 0 &&
        viewModel.inputEmail().length > 0 &&
        viewModel.inputPassword().length > 0
      );
    });

    return viewModel;
  };

  const handleSigninSubmit = async(event) => {
    event.preventDefault();
   
    try {
      const response = await fetch('http://localhost:8080/Registar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputUsername,
          email: inputEmail,
          password: inputPassword,
        }),
      });
  
      if (response.ok) {
        // 成功した場合の処理
        navigate('/home');
      } else {
        // エラーの場合の処理
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div ref={containerRef}><p className="AppSubtitle">
      新規登録ページ
    </p><form onSubmit={handleSigninSubmit}>
        <div>
          <input
            placeholder="ユーザー名"
            type="text"
            className="inputPersonalData"
            id="username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)} />
        </div>
        <div>
          <input
            placeholder="メールアドレス"
            type="text"
            id="mail"
            className="inputPersonalData"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)} />
        </div>
        <div>
          <input
            className="inputPersonalData"
            placeholder="パスワード"
            type="password"
            id="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)} />
        </div>
        <button 
        type="submit" 
        className="LoginButton"
        disabled={!inputUsername || !inputEmail || !inputPassword}
        >新規登録</button>
      </form>
      <a href="/" className="SigninHref">ログイン</a>
      </div>
  );
};

export default SigninForm;
