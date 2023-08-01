//import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import "./MyComponent.css";

const Home = () => {

  handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  return (
    <div className="homestyle">
      <div className="homeleft">
        <p className="">7月の生活費</p>
      </div>
      <div className="homeright">
      <FullCalendar
       plugins={[dayGridPlugin, interactionPlugin]}
       dateClick={this.handleDateClick}
        initialView="dayGridMonth"
        locale={"ja"} 
        weekends={false}
        events={[
          {title: '家賃', date: '2023-08-01'},
          {title: '光熱費', date: '2023-08-01'},
        ]}
      />
      </div>

    </div>
  );
};

export default Home;
