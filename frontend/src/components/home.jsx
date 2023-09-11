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
  const [isReady, setIsReady] = useState(false);
  const username = getCookie('username') || '';
  const personname = getCookie('personname') || '';
  const room_id = getCookie('room_id') || '';
  const [userData, setUserData] = useState(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [clickedEvents, setClickedEvents] = useState(null);
  const [usernameEventsTitle, setUsernameEventsTitle] = useState([]); // 新たに追加
  const [personnameEventsTitle, setPersonnameEventsTitle] = useState([]); // 新たに追
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [prevMonth, setPrevMonth] = useState(new Date());
  const [lifemoney, setLifemoney] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const count = lifemoney / frequency;


  //もしcookieにroom_idがなければ、localhost:3000に飛ばす
  if (room_id === '') {
    window.location.href = 'http://localhost:3000/';
  }

  useEffect(() => {
    // APIからデータを取得する
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api?username=${username}&personname=${personname}&room_id=${room_id}`);
        const data = await response.json();
        setUserData(data);
        setIsReady(true);
        setLifemoney(data.lifemoney);
        setFrequency(data.frequency);
        
        console.log(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }
  
    fetchData();
  }, []); 

  const handleDateClick = (clickedDate, clickedEvents) => {
    setClickedDate(clickedDate);
    setClickedEvents(clickedEvents);
    //clickedEventsの中身をtitleとstatusだけにする
    clickedEvents = clickedEvents.map((item) => ({
      title: item.title,
      status: item.status
    }));
    //statusがusernameのものとpersonnameのもので分ける
    const usernameEvents = clickedEvents.filter((item) => item.status === 'username');
    const personnameEvents = clickedEvents.filter((item) => item.status === 'person');
    //titleを取り出す
    const usernameEventsTitle = usernameEvents.map((item) => item.title);
    const personnameEventsTitle = personnameEvents.map((item) => item.title);
    //stateにセット
    setUsernameEventsTitle(usernameEventsTitle);
    setPersonnameEventsTitle(personnameEventsTitle);
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
          <p className="lastMonthMoney">{username} : {lifemoney}円</p>
          <p className="lastMonthMoney">{personname} : 円</p>
        </div>
        <div className="thisMonth">
          <p className="monthMoney">{selectedMonth.toLocaleString("default", { month: "long", year: "numeric" })}の生活費({determineStatus(selectedMonth)})</p>
          <p className="thisMonthMoney">{username} : 円</p>
          <p className="thisMonthMoney">{personname} : 円</p>
        </div>
        <div className="thisdayCompleteWork">
          <p className="todayCompleteWork">{clickedDate}に行った家事</p>
          <p className="todayCompleteWorkTitle">{username} : <span className="userEventsTitle">{usernameEventsTitle.join('  ')}</span></p>
          <p className="todayCompleteWorkTitle">{personname} : <span className="userEventsTitle">{personnameEventsTitle.join(' ')}</span></p>
        </div>

      </div>
      <div className="homeright">
       <Calendarcomponent 
       onDateClick={handleDateClick}
       onMonthChange={handleMonthChange}
       selectedMonth={selectedMonth}
       prevMonth={prevMonth}
       userData={userData}
       isReady={isReady}
       />
      </div>

    </div>
  );
};

export default Home;
