import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteWorkForm = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedWork, setSelectedWork] = useState([]); // 初期値として空の配列を設定

  const options = [
    { value: "you", label: "あなた" },
    { value: "rena", label: "れな" },
  ];

  const works = [
    { value: "washing", label: "洗い物" },
    { value: "cleaning", label: "掃除" },
    { value: "cooking", label: "料理" },
    { value: "laundry", label: "洗濯uiuuuuiui" },
  ];

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleWorkClick = (item) => {
    // ボタンがクリックされたときの処理
    if (selectedWork.includes(item)) {
      // 選択されている状態なら、選択を解除する
      setSelectedWork(selectedWork.filter((selectedWork) => selectedWork !== item));
    } else {
      // 選択されていない状態なら、選択する
      setSelectedWork([...selectedWork, item]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedUser, selectedWork);
    navigate("/connectWork");
  };

  return (
    <div>
      <p className="AppSubtitle">家事完了ページ</p>

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
        <div className="workSelect">
          {works.map((work) => (
          <button
            key={work.value}
            onClick={() => handleWorkClick(work.value)}
            className={(selectedWork.includes(work.value) ? "selectedWorkButton" : "selectWorkButton")}
          >
            {work.label}
          </button>
        ))}
        </div>
        <div className="choseCompleteWork">
          <p>今回の家事合計:</p>
        </div>
      </div>
      <button className="LoginButton" onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default CompleteWorkForm;
