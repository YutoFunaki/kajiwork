//import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import "./MyComponent.css";
import Calendar from './calendar';

const Home = () => {

  return (
    <div className="homestyle">
      <div className="homeleft">
        <p className="">7月の生活費</p>
      </div>
      <div className="homeright">
       <Calendar />
      </div>

    </div>
  );
};

export default Home;
