import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const FinishAPI = async (selectedUser, selectedWork, selectedDate, navigate) => {
  console.log("送信するデータ");
  console.log(selectedUser);
  console.log(selectedWork);

  // 非同期処理
  await fetch('http://localhost:8080/api/finishwork', {
    method: 'POST',
    mode: 'cors',
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({'selectedUser': selectedUser, 'selectedWork': selectedWork, 'selectedDate': selectedDate}),
  }) 
  .then(async response => {
    // 成功
    if (response.status === 200) {
      const data = await response.json();
      console.log("受け取ったデータ");
      console.log(data);
      console.log("成功 : " + response.status);
      navigate("/connectwork");
    } else if(response.status === 401) {
      console.log('失敗 : ' + response.status)
      alert("エラーが発生しました。");
    }
  }) //2
};

const CompleteWorkForm = () => {
  const room_id = getCookie('room_id');
  const username = getCookie('username');
  const personname = getCookie('personname');
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [workname, setWorkname] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedWork, setSelectedWork] = useState([]);
  const [task_id, setTask_id] = useState([]);
  const [user_id, setUser_id] = useState([]);
  const [person_id, setPerson_id] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // APIからデータを取得する
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api/workfinishEffect?room_id=${room_id}&username=${username}&personname=${personname}`);
        const data = await response.json();
        setUserData(data);
        setUser_id(data.user_id);
        setPerson_id(data.person_id);
        setWorkname(data.tasks_name);
        setTask_id(data.tasks_id);
        console.log(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }

    fetchData();
  }, []);

  const chengeUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatData = workname.map((work, index) => ({
    value: task_id[index],
    label: workname[index],
  }));

  const handleWorkClick = (item) => {
    setSelectedWork((prevSelectedWork) =>
    prevSelectedWork === item ? "" : item
    );
  };

  const handleSubmit = async() => {
    await FinishAPI(selectedUser, selectedWork, selectedDate, navigate);
  };

  return (
    <div>
      <p className="AppSubtitle">家事完了ページ</p>

      <div className="completeForm">
        <label className="userSelect">
          <select onChange={chengeUser}>
            <option value="">誰がしたか</option>
            <option value={user_id}>{username}</option>
            <option value={person_id}>{personname}</option>
          </select>
        </label>
        <div className="workSelect">
        {formatData.map((work) => (
            <button
              key={work.value}
              onClick={() => handleWorkClick(work.value)}
              className={(selectedWork.includes(work.value) ? "selectedWorkButton" : "selectWorkButton")}
            >
              {work.label}
            </button>
          ))}
      </div>
      <DatePicker
        selected={selectedDate}
        defaultValue={new Date()}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd" 
        className="datePicker"
      />
      </div>
      <button className="LoginButton" onClick={handleSubmit}>完了</button>
    </div>
  );
};

export default CompleteWorkForm;
