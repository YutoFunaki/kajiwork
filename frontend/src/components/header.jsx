import React, { useState} from "react";
import "./MyComponent.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // 全てのCookieを削除する
    const cookies = document.cookie.split(';')

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;max-age=0'
      }
      
    navigate("/");
  };

  return (
    <div className="header">
      <div className="HeaderList">
       <button onClick={handleButtonClick} className="HeaderListButton">< ListIcon className="ListIcon" /></button>
      {showDropdown && (
          <ul className="DropdownMenu">
            <li><a href="/newWork">家事の新規登録　　＞＞</a></li>
            <li><a href="/manage">家事の管理　　　　＞＞</a></li>
            <li><a href="/" onClick={handleLogout}>ログアウト　　　　＞＞</a></li>
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
