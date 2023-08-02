import React, { useState } from "react";

const CompleteWorkForm = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedWork, setSelectedWork] = useState("");
  // セレクトボックスの選択肢
  const options = [
    { value: "you", label: "あなた" },
    { value: "rena", label: "れな" },
  ];

  const works = [
    { value: "you", label: "洗い物" },
    { value: "rena", label: "れな" },
  ];

  // セレクトボックスの変更時に呼び出される関数
  const handleSelectChange = (user, work) => {
    setSelectedUser(user.target.value);
    setSelectedWork(work.target.value);
  };

    // 選択されたチェックボックスの値を更新する関数
    const handleCheckboxChange = (event) => {
      const value = event.target.value;
      if (selectedWork.includes(value)) {
        setSelectedWork(selectedWork.filter((work) => work !== value));
      } else {
        setSelectedWork([...selectedWork, value]);
      }
    };

  
  // 送信ボタンがクリックされたときに呼び出される関数
  //const handleSubmit = (user) => {
  //  user.preventDefault();
  //  console.log(selectedUser);
  //};

  return (
    <div>
      <p className="AppSubtitle">家事完了ページ</p>
      {/* セレクトボックス */}

      <div className="completeForm">
        <label className="userSelect">
          <select value={selectedUser} onChange={handleSelectChange}>
            <option value="">誰が完了しましたか？</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      <div>
        {works.map((work) => (
        <label key={work.value}>
          <input
            type="checkbox"
            value={work.value}
            checked={selectedWork.includes(work.value)}
            onChange={handleCheckboxChange}
          />
          {work.label}
        </label>
      ))}
      </div>
      <div>
        <p>選択されたオプション:</p>
        <ul>
          {selectedWork.map((work) => (
            <li key={work}>{work}</li>
          ))}
        </ul>
      </div>
      </div>
      {/* 送信ボタン */}
     {/*<button className="LoginButton" onClick={handleSubmit}>送信</button>*/}
    </div>
  );
};

export default CompleteWorkForm;

