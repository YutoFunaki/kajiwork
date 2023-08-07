import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import "./MyComponent.css";
import Calendarcomponent from './calendar';


const Home = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [prevMonth, setPrevMonth] = useState(new Date());

  

  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
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

  const determineStatus2 = (prevMonth) => {
    const currentDate = new Date();
    const selectedDate = new Date(prevMonth);

    if (prevMonth.getFullYear() < currentDate.getFullYear() ||
        (prevMonth.getFullYear() === currentDate.getFullYear() && selectedDate.getMonth() < currentDate.getMonth())) {
      return '確定';
    } else {
      return '未確定';
    }
  };

  return (
    <div className="homestyle">
      <div className="homeleft">
        <div className="lastMonth">
          <p className="monthMoney">{prevMonth.toLocaleString("default", { month: "long", year: "numeric" })}の生活費({determineStatus(selectedMonth)})</p>
          <p className="lastMonthMoney">あなた：　○○○円</p>
          <p className="lastMonthMoney">れな：　○○○円</p>
        </div>
        <div className="thisMonth">
          <p className="monthMoney">{selectedMonth.toLocaleString("default", { month: "long", year: "numeric" })}の生活費({determineStatus(prevMonth)})</p>
          <p className="thisMonthMoney">あなた：　○○○円</p>
          <p className="thisMonthMoney">れな：　○○○円</p>
        </div>
        <div className="thisdayCompleteWork">
          <p className="todayCompleteWork">{selectedDate}に行った家事</p>
          <p className="todayCompleteWorkTitle">あなた：</p>
          <p className="todayCompleteWorkTitle">れな：</p>
        </div>

      </div>
      <div className="homeright">
       <Calendarcomponent 
       onDateClick={handleDateClick}
       onMonthChange={handleMonthChange}
       selectedMonth={selectedMonth} />
      </div>

    </div>
  );
};

export default Home;
