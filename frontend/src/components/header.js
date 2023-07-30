//import React, { useContext } from "react";
import "./MyComponent.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';

const Header = () => {
  return (
    <div className="header">
      <ListIcon className="ListIcon" />
      <p className="AppTitle">
        KajiWork
      </p>
      <div className="AccountCircleIconBackground">
        <AccountCircleIcon className="AccountCircleIcon" />
      </div>
    </div>  
  );
};

export default Header;
