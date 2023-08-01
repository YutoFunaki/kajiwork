//import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Home = () => {

  return (
    <div className="homestyle">
      <div className="homeleft">
        <p className="">7月の生活費</p>
      </div>
      <div className="homeright">
      <FullCalendar
       plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={"ja"} />
      </div>

    </div>
  );
};

export default Home;
