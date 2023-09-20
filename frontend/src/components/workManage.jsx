import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const ReWorkAPI = async (selectedWork, inputWorkname, frequency, room_id, nav) => {
  console.log("送信するデータ");
  console.log(selectedWork);

  // 非同期処理
  await fetch('http://localhost:8080/api/workrename', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({'selectedWork': selectedWork, 'workname': inputWorkname, 'frequency': frequency, 'room_id': room_id}),
  }) 
  .then(async response => {
    // 成功
    if (response.status === 200) {
      const data = await response.json();
      console.log("受け取ったデータ");
      console.log(data);
      console.log("成功 : " + response.status);
      window.location.reload();
    } else if(response.status === 401) {
      console.log('失敗 : ' + response.status)
      alert("エラーが発生しました。");
    }
  }) //2
};

const DeleteWorkAPI = async (selectedWork) => {
  console.log(selectedWork)
  // 非同期処理
  await fetch('http://localhost:8080/api/workdelete', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({'selectedWork': selectedWork}),
  }) 
  .then(async response => {
    // 成功
    if (response.status === 200) {
      console.log("成功 : " + response.status);
      window.location.reload(); 
    } else if(response.status === 401) {
      console.log('失敗 : ' + response.status)
      alert("エラーが発生しました。");
    }
  }) //2
};

const WorkManage = () => {
  const room_id = getCookie('room_id');
  const [userData, setUserData] = useState(null);
  const [workname, setWorkname] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [task_id, setTask_id] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [inputDate, setInputDate] = useState("");
  const refrequency = selectedDate && inputDate ? Number(selectedDate) * Number(inputDate) : 0;
  const [selectedWork, setSelectedWork] = useState([]);
  const [inputWorkname, setInputWorkname] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    // APIからデータを取得する
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api/workmanage?room_id=${room_id}`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await response.json();
        setUserData(data);
        setWorkname(data.tasks_name);
        setFrequency(data.tasks_frequency);
        setTask_id(data.tasks_id);
        console.log(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }

    fetchData();
  }, []);



  const handleSigninSubmit = async() => {
    console.log("ReWorkAPI 関数が呼び出されました");
    await ReWorkAPI(selectedWork, inputWorkname, refrequency, room_id, nav);
  };



  //家事を選択する時
  const handleWorkClick = (item) => {
    setSelectedWork((prevSelectedWork) =>
    prevSelectedWork === item ? "" : item
    );
  };

  const formatData = workname.map((work, index) => ({
    value: task_id[index],
    label: workname[index],
  }));

  //頻度変更する時
  const handleSelectChange = (event) => {
    setSelectedDate(event.target.value);
  };
  
  const worksfrequency = [
    { value: 30, label: "日に" },
    { value: 4, label: "週に" },
    { value: 1, label: "月に" },
  ];


  

  const handleDeleteSubmit = async() => {
    console.log("DeleteWorkAPI 関数が呼び出されました");
    await DeleteWorkAPI(selectedWork);
  };

  return (
    <div>
      <p className="AppSubtitle">家事の管理ページ</p>
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
      <form>
      <div>
          <input
            placeholder="名前を変更する場合は入力"
            type="text"
            className="inputPersonalData"
            id="username"
            value={inputWorkname}
            onChange={(e) => setInputWorkname(e.target.value)} />
        </div>
      <div className="frequency">
          <label className="userSelect">
            <select value={selectedDate} onChange={handleSelectChange}>
              <option>何日に</option>
              {worksfrequency.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
        </label>
        <input
            placeholder="何回"
            type="text"
            className="workcount"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)} />
        </div>
        <div className="buttons">
          <button 
          type="button" 
          className="LoginButton"
          onClick={handleDeleteSubmit}
          >削除</button>
          <button
            type="button"
            className="LoginButton"
            onClick={handleSigninSubmit}
          >更新
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkManage;
