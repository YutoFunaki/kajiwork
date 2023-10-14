import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const WorkManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const room_id = getCookie('room_id');
  const [, setUserData] = useState(null);
  const [workname, setWorkname] = useState([]);
  const [, setFrequency] = useState([]);
  const [task_id, setTask_id] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [inputDate, setInputDate] = useState("");
  const refrequency = selectedDate && inputDate ? Number(selectedDate) * Number(inputDate) : 0;
  const [selectedWork, setSelectedWork] = useState([]);
  const [inputWorkname, setInputWorkname] = useState("");
  const nav = useNavigate();
  const csrf_token = getCookie('csrf_token');

  useEffect(() => {
    getData();
  }, []); 
  

  const getData = () => {
    fetch('http://localhost:8080/api/workmanage', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include', 
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': csrf_token
      },
    })
      .then(response => response.json()) 
      .then(data => {
        setUserData(data);
        setWorkname(data.tasks_name);
        setFrequency(data.tasks_frequency);
        setTask_id(data.tasks_id);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    }

    const ReWorkAPI = async (selectedWork, inputWorkname, frequency, room_id, nav) => {
      console.log("送信するデータ");
      console.log(selectedWork);
      console.log(inputWorkname);
    
      // 非同期処理
      await fetch('http://localhost:8080/api/workrename', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          'X-CSRF-Token': csrf_token
        },
        body: JSON.stringify({'selectedWork': selectedWork, 'workname': inputWorkname, 'frequency': frequency, 'room_id': room_id}),
      }) 
      .then(async response => {
        // 成功
        if (response.status === 200) {
          const data = await response.json();
          console.log("受け取ったデータ");
          console.log(data);
          console.log("成功");
        } else if(response.status === 401) {
          console.log('失敗')
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
          'X-CSRF-Token': csrf_token
        },
        body: JSON.stringify({'selectedWork': selectedWork}),
      }) 
      .then(async response => {
        // 成功
        if (response.status === 200) {
          console.log("成功");
        } else if(response.status === 401) {
          console.log('失敗')
          alert("エラーが発生しました。");
        }
      }) //2
    };

  const handleSigninSubmit = async() => {
    setIsLoading(true); // ローディングを有効
    
    try {
      const selectedWorkItem = formatData.find((item) => item.value === selectedWork);
  
      if (selectedWorkItem) {

        await ReWorkAPI(selectedWork, inputWorkname, refrequency, room_id, nav);
        
        getData();
        setInputWorkname("");
        setSelectedWork([]);
      } else {
        alert("家事を選択してください。");
      }
    } catch (error) {
      console.error("APIエラー:", error);
      // エラー処理
    } finally {
      setIsLoading(false); // ローディングを無効
    }
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
    setIsLoading(true); // ローディングを有効
    
    try {
      const selectedWorkItem = formatData.find((item) => item.value === selectedWork);
    
    if (selectedWorkItem) {
      await DeleteWorkAPI(selectedWork);
      getData();
      //selectedworkをリセット
      setSelectedWork([]);
      } else {
        alert("家事を選択してください。");
      }
    } catch (error) {
      console.error("error");
      // エラー処理
    } finally {
      setIsLoading(false); // ローディングを無効
    }
  };

  return (
    <div>
      <p className="AppSubtitle">家事の管理ページ</p>
      {isLoading && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
        <path fill="#e6edf3"
              d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12,12-5.4,12-12S18.6,0,12,0m0,3c5,0,9,4,9,9s-4,9-9,9S3,17,3,12,7,3,12,3"/>
        <path fill="#2589d0" d="M12,0c6.6,0,12,5.4,12,12h-3c0-5-4-9-9-9V0Z">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
                              from="0 12 12" to="360 12 12" dur="1s"/>
        </path>
    </svg>
      )}
      {!isLoading &&(
         <><div className="workSelect">
          {formatData.map((work) => (
            <button
              key={work.value}
              onClick={() => handleWorkClick(work.value)}
              className={(selectedWork.includes(work.value) ? "selectedWorkButton" : "selectWorkButton")}
            >
              {work.label}
            </button>
          ))}
        </div><form>
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
          </form></>
      )}
     
    </div>
  );
};

export default WorkManage;
