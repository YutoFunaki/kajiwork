import React, { useState } from "react";

const CompleteWorkForm = () => {
  const [selectedUser, setSelectedUser] = useState("");

  // セレクトボックスの選択肢
  const options = [
    { value: "you", label: "あなた" },
    { value: "rena", label: "れな" },
  ];

  // セレクトボックスの変更時に呼び出される関数
  const handleSelectChange = (user) => {
    setSelectedUser(user.target.value);
  };

  // 送信ボタンがクリックされたときに呼び出される関数
  const handleSubmit = (user) => {
    user.preventDefault();
    console.log(selectedUser);
  };

  return (
    <div>
      <h1>セレクトボックスの例</h1>
      {/* セレクトボックス */}
      <label className="userSelect">
        <select value={selectedUser} onChange={handleSelectChange}>
          <option value="">選択してください</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {/* 送信ボタン */}
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default CompleteWorkForm;

