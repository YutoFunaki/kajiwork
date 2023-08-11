import React, { useEffect, useState, useRef } from "react";
import ko from "knockout";
import { useNavigate } from "react-router-dom"; 

const loginAPI = async (username, password) => {
  // 非同期処理
  await fetch('http://localhost:8080/login', {
    method: 'POST',
    // mode: 'cors',
    headers: {
      "Content-Type": "application/json"

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({'username': username, 'password': password}),
  }) 
  .then(response => response.text()) //2
    .then(user => {  //3
      console.log(user);
    })
  .catch((error) => {
    // 非同期処理が失敗した場合
    console.log('失敗 : ' + error)
  })
}

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



  const handleLoginSubmit = async () => {
    // ここでフォームのデータをサーバーに送信するなどの処理を追加
    await loginAPI(inputEmail, inputPassword);
  };

  return (
    <div ref={containerRef}><p className="AppSubtitle">
      ログインページ
    </p><form>
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
            placeholder="パスワード"
            type="password"
            className="inputPersonalData"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)} />
        </div>
        <button 
        type="button" 
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
