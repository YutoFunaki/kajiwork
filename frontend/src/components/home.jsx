import React from "react";
//import {Link} from 'react-router-dom';
import "./MyComponent.css";
import Calendarcomponent from './calendar';


const Home = () => {

  return (
    <div className="homestyle">
      <div className="homeleft">
        <div className="lastMonth">
          <p className="monthMoney">7月の生活費(確定)</p>
          <p className="lastMonthMoney">あなた：　○○○円</p>
          <p className="lastMonthMoney">れな：　○○○円</p>
        </div>
        <div className="thisMonth">
          <p className="monthMoney">8月の生活費(未確定)</p>
          <p className="thisMonthMoney">あなた：　○○○円</p>
          <p className="thisMonthMoney">れな：　○○○円</p>
        </div>
        <div className="thisdayCompleteWork">
          <p className="todayCompleteWork">2023/7/6に行った家事</p>
          <p className="todayCompleteWorkTitle">あなた：</p>
          <p className="todayCompleteWorkTitle">れな：</p>
        </div>

      </div>
      <div className="homeright">
       <Calendarcomponent />
      </div>

    </div>
  );
};

export default Home;
