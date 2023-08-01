//import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import "./MyComponent.css";
import Calendarcomponent from './calendar2';


const Home = () => {

  return (
    <div className="homestyle">
      <div className="homeleft">
        <p className="">7月の生活費</p>
      </div>
      <div className="homeright">
       <Calendarcomponent />
      </div>

    </div>
  );
};

export default Home;
