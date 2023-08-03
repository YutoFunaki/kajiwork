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
  ];

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedWork.includes(value)) {
      setSelectedWork(selectedWork.filter((work) => work !== value));
    } else {
      setSelectedWork([...selectedWork, value]);
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
        <div className="choseCompleteWork">
          <p>選択された家事:</p>
          <ul>
            {selectedWork.map((work) => (
              <li key={work}>{work}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className="LoginButton" onClick={handleSubmit}>送信</button>
    </div>
  );
};

export default CompleteWorkForm;
