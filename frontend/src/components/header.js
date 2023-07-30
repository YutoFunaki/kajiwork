import React, { useState} from "react";
import "./MyComponent.css";
import { Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';

const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="HeaderList">
       <button onClick={handleClick} className="HeaderListButton">< ListIcon className="ListIcon" /></button>
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="HeaderListMenu"
      >
        <MenuItem onClick={handleClose}>家事の新規登録　＞＞</MenuItem>
        <MenuItem onClick={handleClose}>家事の管理　　　＞＞</MenuItem>
        <MenuItem onClick={handleClose}>ログアウト　　　＞＞</MenuItem>
      </Menu>
      </div>
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
