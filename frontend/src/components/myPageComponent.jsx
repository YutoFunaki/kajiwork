import React, {useEffect, useState} from "react";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const ChangeAPI = async (username, personname, lifemoney, inputUsername, inputPersonname, inputLifemoney, room_id, nav) => {
  await fetch('http://localhost:8080/api/changepersonnal', {
    method: 'POST',
    mode: 'cors',
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({"username": username, "personname": personname, "lifemoney": lifemoney, "inputUsername": inputUsername, 'inputPersonname': inputPersonname, 'inputLifemoney': inputLifemoney, 'room_id': room_id}),
  }) 
  .then(async response => {
    // 成功
    if (response.status === 200) {
      console.log("成功 : " + response.status);
      const userData = await response.json();
      const username = userData.username;
      const personname = userData.personname;
      document.cookie = `username=${username}`
      document.cookie = `personname=${personname}`
      window.location.reload()
    } else if(response.status === 401) {
      console.log('失敗 : ' + response.status)
      alert("ユーザー名またはメールアドレスが既に登録されています。");
    }
  }) //2
}

const MyPageComponent = () => {
  const room_id = getCookie('room_id');
  const username = getCookie('username');
  const personname = getCookie('personname');
  const [userData, setUserData] = useState(null);
  const [lifemoney, setLifemoney] = useState(null);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPersonname, setInputPersonname] = useState("");
  const [inputLifemoney, setInputLifemoney] = useState("");

  useEffect(() => {
    // APIからデータを取得する
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api/mypageEffect`,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
        });
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


  const handleChangeSubmit = async() => {
    console.log(username);
    console.log(inputUsername);
    console.log(personname);
    console.log(inputPersonname);
    console.log(lifemoney);
    console.log(inputLifemoney);
    await ChangeAPI(username, personname, lifemoney, inputUsername, inputPersonname, inputLifemoney, room_id);
  };

  return (
    <div>
      <p className="AppSubtitle">マイページ</p>
      <div className="mypage">
        <div className="inputcontainer">
          <p>ユーザー名：{username}</p>
          <input
            placeholder="変更する場合は入力"
            type="text"
            className="inputPersonalData"
            id="username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)} />
        </div>
        
        <div className="inputcontainer">
          <p>パートナー名：{personname}</p>
          <input
            placeholder="変更する場合は入力"
            type="text"
            className="inputPersonalData"
            id="personname"
            value={inputPersonname}
            onChange={(e) => setInputPersonname(e.target.value)} />
        </div>
      
        <div className="inputcontainer">
          <p>月の生活費：{lifemoney}</p>
          <input
            placeholder="変更する場合は入力"
            type="text"
            className="inputPersonalData"
            id="lifemoney"
            value={inputLifemoney}
            onChange={(e) => setInputLifemoney(e.target.value)} />
        </div>
        
        </div>
        <button
                type="button"
                className="LoginButton"
                onClick={handleChangeSubmit}
              >変更
            </button>
    </div>
  );
}

export default MyPageComponent;