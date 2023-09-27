import React, { useState, useEffect, useRef } from "react";
import ko from "knockout";
import { useNavigate } from "react-router-dom";


const NewWorkRegisterAPI = async (workname, frequency, room_id, nav) => {
  // 非同期処理
  await fetch('http://localhost:8080/api/new', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({"workname": workname, 'frequency': frequency, 'room_id': room_id}),
  }) 
  .then(async response => {
    // 成功
    if (response.status === 200) {
      console.log("成功 : " + response.status);
      alert("新規登録完了しました。");
    } else if(response.status === 401) {
      console.log('失敗 : ' + response.status)
      alert("既に登録されています。");
    }
  }) //2
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const newWork = () => {
  const containerRef = useRef(null);
  const nav = useNavigate();
  const [inputWorkname, setInputWorkname] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [inputDate, setInputDate] = useState("");
  const frequency = selectedDate * inputDate;
  const room_id = getCookie('room_id') || '';

  useEffect(() => {
    const viewModel = createKnockoutViewModel();

    viewModel.inputWorkname.subscribe((newValue) => {
      setInputWorkname(newValue);
    });

    viewModel.selectedDate.subscribe((newValue) => {
      setSelectedDate(newValue);
    });

    viewModel.inputDate.subscribe((newValue) => {
      setInputDate(newValue);
    });

    viewModel.frequency.subscribe((newValue) => {
      frequency(newValue);
    });
  }, []);

  const createKnockoutViewModel = () => {
    var viewModel = {};

    viewModel.inputWorkname = ko.observable("");
    viewModel.selectedDate = ko.observable("");
    viewModel.inputDate = ko.observable("");
    viewModel.frequency = ko.observable();

    viewModel.canSubmitLogin = ko.computed(function () {
      return (
        viewModel.inputWorkname().length > 0 &&
        viewModel.selectedDate().length > 0 &&
        viewModel.inputDate().length > 0 &&
        viewModel.frequency().length > 0
      );
    });

    return viewModel;
  };

  const handleSigninSubmit = async() => {
    await NewWorkRegisterAPI(inputWorkname, frequency, room_id, nav);
  };

  const handleSelectChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const works = [
    { value: 30, label: "日に" },
    { value: 4, label: "週に" },
    { value: 1, label: "月に" },
  ];


  return (
    <div ref={containerRef}><p className="AppSubtitle">
      家事の新規登録ページ
    </p><form>
        <div>
          <input
            placeholder="家事の名前"
            type="text"
            className="inputPersonalData"
            id="username"
            value={inputWorkname}
            onChange={(e) => setInputWorkname(e.target.value)} />
        </div>
        <div className="frequency">
          <label className="userSelect">
            <select value={selectedDate} onChange={handleSelectChange}>
              <option>何日に</option>
              {works.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
        </label>
        <input
            placeholder="何回"
            type="text"
            className="workcount"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)} />
        </div>
        <button 
        type="button" 
        className="LoginButton"
        onClick={handleSigninSubmit}
        disabled={!inputWorkname || !frequency}
        >新規登録</button>
      </form>
      </div>
  );
};

export default  newWork;
