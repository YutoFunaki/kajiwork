import React from "react";
//import ko from "knockout";
import "./MyComponent.css";
import { useNavigate } from "react-router-dom";

const ConnectWorkForm = () => {
   const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home");
  };
  const nextSubmit = () => {
    navigate("/completeform");
  };

  return (
    <div>
      <p className="AppSubtitle">送信完了しました！お疲れ様でした！</p>

      <div className="buttons">
        <button className="LoginButton" onClick={handleSubmit}>TOPへ</button>
        <button className="LoginButton" onClick={nextSubmit}>続けて登録</button>
      </div>
    </div>
  );
};

export default ConnectWorkForm;
