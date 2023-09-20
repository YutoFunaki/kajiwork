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
  const [userData, setUserData] = useState(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [clickedEvents, setClickedEvents] = useState(null);
  const [usernameEventsTitle, setUsernameEventsTitle] = useState([]); // 新たに追加
  const [personnameEventsTitle, setPersonnameEventsTitle] = useState([]); // 新たに追
  const [finish_task_month, setFinish_task_month] = useState([]);
  const [finish_task_count, setFinish_task_count] = useState([]);
  const [person_finish_task_month, setPerson_finish_task_month] = useState([]);
  const [person_finish_task_count, setPerson_finish_task_count] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [prevMonth, setPrevMonth] = useState(new Date());
  const [lifemoney, setLifemoney] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const countmoney = lifemoney / frequency;
  const monthmoney = lifemoney / 2;
  const finish_tasks_dictionary = [];
  const person_finish_tasks_dictionary = [];
  





  useEffect(() => {
    // APIからデータを取得する
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api?username=${username}&personname=${personname}`,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await response.json();
        setUserData(data);
        setIsReady(true);
        setLifemoney(data.lifemoney);
        setFrequency(data.tasks_frequency);
        setFinish_task_month(data.finish_task_month);
        setFinish_task_count(data.finish_task_count);
        setPerson_finish_task_month(data.person_finish_task_month);
        setPerson_finish_task_count(data.person_finish_task_count);
        
        console.log(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }
  
    fetchData();
  }, []); 

  //受け取ったfinish_task_monthとfinish_task_countを辞書型にする
  if (finish_task_month.length === finish_task_count.length) {
    for (let i = 0; i < finish_task_month.length; i++) {
      const item1 = finish_task_month[i];
      const item2 = finish_task_count[i];
      
      // 辞書型のオブジェクトを作成し、dictionaryArray に追加
      finish_tasks_dictionary.push({ month: item1, count: item2 });
    }
  } else {
    console.error('失敗');
  }

  //受け取ったperson_finish_task_monthとperson_finish_task_countを辞書型にする
  if (person_finish_task_month.length === person_finish_task_count.length) {
    for (let i = 0; i < person_finish_task_month.length; i++) {
      const item1 = person_finish_task_month[i];
      const item2 = person_finish_task_count[i];
      
      // 辞書型のオブジェクトを作成し、dictionaryArray に追加
      person_finish_tasks_dictionary.push({ month: item1, count: item2 });
    }
  } else {
    console.error('person失敗');
  }

  
      // finish_tasks_dictionary から先月の count を取得
  const lastselectedMonthCount = finish_tasks_dictionary.find(item => parseInt(item.month) === prevMonth.getMonth() + 1);
  // selectedMonthCount が存在する場合は count を、存在しない場合は 0 を表示
  const lastcountForSelectedMonth = lastselectedMonthCount ? lastselectedMonthCount.count : 0;
  // person_finish_tasks_dictionary から先月の count を取得
  const lastselectedPersonMonthCount = person_finish_tasks_dictionary.find(item => parseInt(item.month) === prevMonth.getMonth() + 1);
  // selectedPersonMonthCount が存在する場合は count を、存在しない場合は 0 を表示
  const lastcountForSelectedPersonMonth = lastselectedPersonMonthCount ? lastselectedPersonMonthCount.count : 0;

  
  const lastmonthmoney = Math.round(monthmoney - (lastcountForSelectedMonth * countmoney) + (lastcountForSelectedPersonMonth * countmoney));
  const lastpersonmonthmoney = Math.round(monthmoney - (lastcountForSelectedPersonMonth * countmoney) + (lastcountForSelectedMonth * countmoney));



    // finish_tasks_dictionary から今月の count を取得
  const selectedMonthCount = finish_tasks_dictionary.find(item => parseInt(item.month) === selectedMonth.getMonth() + 1);
  // selectedMonthCount が存在する場合は count を、存在しない場合は 0 を表示
  const countForSelectedMonth = selectedMonthCount ? selectedMonthCount.count : 0;
  // person_finish_tasks_dictionary から今月の count を取得
  const selectedPersonMonthCount = person_finish_tasks_dictionary.find(item => parseInt(item.month) === selectedMonth.getMonth() + 1);
  // selectedPersonMonthCount が存在する場合は count を、存在しない場合は 0 を表示
  const countForSelectedPersonMonth = selectedPersonMonthCount ? selectedPersonMonthCount.count : 0;

  const thismonthmoney = Math.round(monthmoney - (countForSelectedMonth * countmoney) + (countForSelectedPersonMonth * countmoney));
  const thispersonmonthmoney = Math.round(monthmoney - (countForSelectedPersonMonth * countmoney) + (countForSelectedMonth * countmoney));


  //日付がクリックされた時の処理
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
          <p className="lastMonthMoney">{username} : {lastmonthmoney}円</p>
          <p className="lastMonthMoney">{personname} : {lastpersonmonthmoney}円</p>
        </div>
        <div className="thisMonth">
          <p className="monthMoney">{selectedMonth.toLocaleString("default", { month: "long", year: "numeric" })}の生活費({determineStatus(selectedMonth)})</p>
          <p className="thisMonthMoney">{username} : {thismonthmoney}円</p>
          <p className="thisMonthMoney">{personname} : {thispersonmonthmoney}円</p>
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
