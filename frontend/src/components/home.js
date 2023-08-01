//import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import "./MyComponent.css";
import Calendarcomponent from './calendar';


const Home = () => {

  return (
    <div className="homestyle">
      <div className="homeleft">
        <p className="monthMoney">7月の生活費(確定)</p>
        <p className="lastMonthMoney">あなた：　○○○円</p>
        <p className="lastMonthMoney">れな：　○○○円</p>
        <p className="monthMoney">8月の生活費(未確定)</p>
        <p className="nowMonthMoney">あなた：　○○○円</p>
        <p className="nowMonthMoney">れな：　○○○円</p>
        <p className="todayCompleteWork">2023/7/6に行った家事</p>
        <p className="todayCompleteWorktitle">あなた：</p>
        <p className="todayCompleteWorktitle">れな：</p>
      </div>
      <div className="homeright">
       <Calendarcomponent />
      </div>

    </div>
  );
};

export default Home;
