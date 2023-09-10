import React, {useEffect, useState} from "react";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};


const MyPageComponent = () => {
  const room_id = getCookie('room_id');
  const username = getCookie('username');
  const personname = getCookie('personname');
  const [userData, setUserData] = useState(null);
  const [lifemoney, setLifemoney] = useState(null);

  useEffect(() => {
    // APIからデータを取得する
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api/mypageEffect?room_id=${room_id}`);
        const data = await response.json();
        setUserData(data);
        //dataからlifemoneyを取り出す
        setLifemoney(data.lifemoney);
        
        console.log(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }
  
    fetchData();
  }, []); 


  return (
    <div>
      <p className="AppSubtitle">マイページ</p>
      <p>ユーザー名：{username}</p>
      <p>パートナー名：{personname}</p>
      <p>ルームID：{room_id}</p>
      <p>家計簿：{lifemoney}</p>
    </div>
  );
}

export default MyPageComponent;