import React, { useState} from "react";
import "./MyComponent.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';

const Header = () => {

  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="header">
      <div className="HeaderList">
       <button onClick={handleButtonClick} className="HeaderListButton">< ListIcon className="ListIcon" /></button>
      {showDropdown && (
          <ul className="DropdownMenu">
            <li><a href="/newWork">家事の新規登録　　＞＞</a></li>
            <li><a href="/manage">家事の管理　　　　＞＞</a></li>
            <li><a href="/">ログアウト　　　　＞＞</a></li>
          </ul>
      )}
      </div>
      <p className="AppTitle">
        <a href="/home">KajiWork</a>
      </p>
      <div className="AccountCircleIconBackground">
        <a href="/mypage">
        <AccountCircleIcon className="AccountCircleIcon" />
        </a>
      </div>
    </div>  
  );
};

export default Header;
