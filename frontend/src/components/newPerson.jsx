import React, { useState, useEffect, useRef } from "react";
import ko from "knockout";
import { useNavigate } from "react-router-dom";


const SignupAPI = async (username, password, email, nav) => {
  await fetch('http://localhost:8080/register/person', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"username": username, 'password': password, 'email': email}),
  }) 
  .then(async response => {
    if (response.status === 200) {
      console.log("成功");
      nav("/home");
    } else if(response.status === 401) {
      console.log('失敗')
    }
  })
}


const NewPersonForm = () => {
  const containerRef = useRef(null);
  const nav = useNavigate();
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

  const handleSigninSubmit = async() => {
    console.log("inputUsername:", inputUsername);
    console.log("inputPassword:", inputPassword);
    console.log("inputEmail:", inputEmail);
    await SignupAPI(inputUsername, inputPassword, inputEmail, nav);
  };

  return (
    <div ref={containerRef}><p className="AppSubtitle">
      一緒に家事をする人を登録してください
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
      </div>
  );
};

export default NewPersonForm;
