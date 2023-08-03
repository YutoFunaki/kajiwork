import React, { useRef, useEffect, useState } from "react";
import ko from "knockout";

const ConnectWorkForm = () => {
  const containerRef = useRef(null);

  // Reactの状態としてKnockout.jsのオブザーバブルを管理する
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  // 他のReactのコンポーネントの状態を追加する場合はここに追加する

  useEffect(() => {
    // Reactコンポーネントがマウントされた後にKnockout.jsのビューモデルを紐付ける
    const viewModel = createKnockoutViewModel();

    // Knockout.jsのオブザーバブルが変更されたらReactの状態を更新する
    viewModel.inputUsername.subscribe((newValue) => {
      setInputUsername(newValue);
    });

    viewModel.inputPassword.subscribe((newValue) => {
      setInputPassword(newValue);
    });

    viewModel.inputEmail.subscribe((newValue) => {
      setInputEmail(newValue);
    });

    // 他のKnockout.jsのロジックをここに追加
  }, []);

  const createKnockoutViewModel = () => {
    var viewModel = {};

    viewModel.inputUsername = ko.observable("");
    viewModel.inputPassword = ko.observable("");
    viewModel.inputEmail = ko.observable("");

    viewModel.canSubmitLogin = ko.computed(function () {
      return (
        viewModel.inputUsername().length > 0 &&
        viewModel.inputPassword().length > 0
      );
    });

    viewModel.canSubmitRegister = ko.computed(function () {
      return (
        viewModel.inputUsername().length > 0 &&
        viewModel.inputPassword().length > 0 &&
        viewModel.inputEmail().length > 0
      );
    });

    // 他のKnockout.jsのロジックをここに追加

    return viewModel;
  };

  const handleLoginSubmit = () => {
    console.log("Login button clicked!");
    // ログインの処理を追加する
  };

  const handleRegisterSubmit = () => {
    console.log("Register button clicked!");
    // 登録の処理を追加する
  };

  return (
    <div ref={containerRef}>
      <p className="AppSubtitle">家事完了ページ</p>

      <div className="completeForm">
        <label className="userSelect">
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Username"
          />
        </label>
        <label className="userSelect">
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <label className="userSelect">
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        {/* 他の入力項目をReactの状態でバインド */}
        <button
          type="submit"
          disabled={!inputUsername || !inputPassword}
          onClick={handleLoginSubmit}
        >
          ログイン
        </button>
        <button
          type="submit"
          disabled={!inputUsername || !inputPassword || !inputEmail}
          onClick={handleRegisterSubmit}
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default ConnectWorkForm;
