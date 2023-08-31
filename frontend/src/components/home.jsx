import React, { useState, useEffect } from "react";
//import {Link} from 'react-router-dom';
import "./MyComponent.css";
import Calendarcomponent from './calendar';

//Cookieからusernameを取得
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};


const Home = () => {
  const [userData, setUserData] = useState(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [clickedEvents, setClickedEvents] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [prevMonth, setPrevMonth] = useState(new Date());
  //usernameのvalueを取得
  const username = getCookie('username') || '';
  const personname = getCookie('personname') || '';
  const room_id = getCookie('room_id') || '';
  

  useEffect(() => {
    // APIからデータを取得する
    fetch(`http://localhost:8080/api?username=${username}&personname=${personname}&room_id=${room_id}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        document.cookie = `lifemoney=${data.lifemoney}`;
        document.cookie = `finish_task_name=${data.finish_task_name}`;
        document.cookie = `finish_task_date=${data.finish_task_date}`;
        document.cookie = `person_finish_task_name=${data.person_finish_task_name}`;
        document.cookie = `person_finish_task_date=${data.person_finish_task_date}`;
        
      })
      .catch(error => console.error('データの取得に失敗しました', error));
     }, []);

  const handleDateClick = (clickedDate, clickedEvents) => {
    setClickedDate(clickedDate);
    console.log('Clicked Date:', clickedDate);
    console.log('Clicked Events:', clickedEvents);
  };

  const handleMonthChange = (newMonth, prevMonth) => {
    setSelectedMonth(newMonth);
    setPrevMonth(prevMonth);
  };

  const determineStatus = (selectedMonth) => {
    const currentDate = new Date();
    const selectedDate = new Date(selectedMonth);

    if (selectedDate.getFullYear() < currentDate.getFullYear() ||
        (selectedDate.getFullYear() === currentDate.getFullYear() && selectedDate.getMonth() < currentDate.getMonth())) {
      return '確定';
    } else {
      return '未確定';
    }
  };



  return (
    <div className="homestyle">
      <div className="homeleft">
        <div className="lastMonth">
          <p className="monthMoney">{prevMonth.toLocaleString("default", { month: "long", year: "numeric" })}の生活費({determineStatus(prevMonth)})</p>
          <p className="lastMonthMoney">{username} : 円</p>
          <p className="lastMonthMoney">{personname} : 円</p>
        </div>
        <div className="thisMonth">
          <p className="monthMoney">{selectedMonth.toLocaleString("default", { month: "long", year: "numeric" })}の生活費({determineStatus(selectedMonth)})</p>
          <p className="thisMonthMoney">{username} : 円</p>
          <p className="thisMonthMoney">{personname} : 円</p>
        </div>
        <div className="thisdayCompleteWork">
          <p className="todayCompleteWork">{clickedDate}に行った家事</p>
          <p className="todayCompleteWorkTitle">{username} : </p>
          <p className="todayCompleteWorkTitle">{personname} :</p>
        </div>

      </div>
      <div className="homeright">
       <Calendarcomponent 
       onDateClick={handleDateClick}
       onMonthChange={handleMonthChange}
       selectedMonth={selectedMonth}
       prevMonth={prevMonth} />
      </div>

    </div>
  );
};

export default Home;
