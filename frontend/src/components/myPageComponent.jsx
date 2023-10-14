import React, {useEffect, useState} from "react";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};


const MyPageComponent = () => {
  const [username, setUsername] = useState();
  const [personname, setPersonname] = useState();
  const [, setUserData] = useState(null);
  const [lifemoney, setLifemoney] = useState(null);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPersonname, setInputPersonname] = useState("");
  const [inputLifemoney, setInputLifemoney] = useState("");
  const csrf_token = getCookie('csrf_token');

  useEffect(() => {
    // APIからデータを取得する
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api/mypageEffect`,{
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            'X-CSRF-Token': csrf_token
          },
        });
        const data = await response.json();
        setUserData(data);
        //dataからlifemoneyを取り出す
        setUsername(data.username);
        setPersonname(data.personname);
        setLifemoney(data.lifemoney);
        
        console.log(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }
  
    fetchData();
  }, []); 

  const ChangeAPI = async (inputUsername, inputPersonname, inputLifemoney,) => {
    await fetch('http://localhost:8080/api/changepersonnal', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': csrf_token
      },
      body: JSON.stringify({"inputUsername": inputUsername, 'inputPersonname': inputPersonname, 'inputLifemoney': inputLifemoney}),
    }) 
    .then(async response => {
      // 成功
      if (response.status === 200) {
        console.log("成功");
        window.location.reload();
      } else if(response.status === 401) {
        console.log('失敗');
      }
    }) //2
  }


  const handleChangeSubmit = async() => {
    await ChangeAPI(inputUsername, inputPersonname, inputLifemoney);
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