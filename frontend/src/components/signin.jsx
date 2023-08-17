import React, { useState, useEffect, useRef } from "react";
import ko from "knockout";
import { useNavigate } from "react-router-dom";


const SignupAPI = async (username, password, email, room_id, nav) => {
  // 非同期処理
  await fetch('http://localhost:8080/register', {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({"username": username, 'password': password, 'email': email, 'room_id': room_id}),
  }) 
  .then(async response => {
    // 成功
    if (response.status === 200) {
      console.log("成功 : " + response.status);
      const userData = await response.json();
      const username = userData.username;
    
      // Cookieにユーザー名を保存
      document.cookie = `username=${username}`;
      nav("/newPerson"); 
    } else if(response.status === 401) {
      console.log('失敗 : ' + response.status)
      alert("ユーザー名またはメールアドレスが既に登録されています。");
    }
  }) //2
}


const SigninForm = () => {
  const containerRef = useRef(null);
  const nav = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [room_id, setRoom_id] = useState(Math.floor(Date.now()));

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

    viewModel.room_id.subscribe((newValue) => {
      setRoom_id(newValue);
    });
  }, []);

  const createKnockoutViewModel = () => {
    var viewModel = {};

    viewModel.inputUsername = ko.observable("");
    viewModel.inputEmail = ko.observable("");
    viewModel.inputPassword = ko.observable("");
    viewModel.room_id = ko.observable();

    viewModel.canSubmitLogin = ko.computed(function () {
      return (
        viewModel.inputUsername().length > 0 &&
        viewModel.inputEmail().length > 0 &&
        viewModel.inputPassword().length > 0 &&
        viewModel.room_id().length > 0
      );
    });

    return viewModel;
  };

  const handleSigninSubmit = async() => {
    console.log("inputUsername:", inputUsername);
    console.log("inputPassword:", inputPassword);
    console.log("inputEmail:", inputEmail);
    console.log("room_id:", room_id);
    await SignupAPI(inputUsername, inputPassword, inputEmail, room_id, nav);
  };


  return (
    <div ref={containerRef}><p className="AppSubtitle">
      新規登録ページ
    </p><form>
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
        type="button" 
        className="LoginButton"
        onClick={handleSigninSubmit}
        disabled={!inputUsername || !inputEmail || !inputPassword}
        >新規登録</button>
      </form>
      <a href="/" className="SigninHref">ログイン</a>
      </div>
  );
};

export default SigninForm;
