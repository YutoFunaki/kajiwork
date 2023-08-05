import React from "react";
//import ko from "knockout";
import "./MyComponent.css";
import { useNavigate } from "react-router-dom";

const ConnectWorkForm = () => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home");
  };

  return (
    <div>
      <p className="AppSubtitle">送信完了しました！お疲れ様でした！</p>
      <p>あなた</p>
      <p>完了した家事：</p>
      <p>今回の家事合計：</p>

      <button className="LoginButton" onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default ConnectWorkForm;
