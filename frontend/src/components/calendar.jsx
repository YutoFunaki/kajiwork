import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import "./MyComponent.css";


const Calendar = ({ onDateClick, onMonthChange, userData, isReady }) => {
  if (!isReady) {
    return <div>Loading...</div>;
  }
  const calendarRef = useRef(null);
  //userDataからfinish_task_dateとfinish_task_nameを取得
  const finish_task_date = userData.finish_task_date;
  const finish_task_name = userData.finish_task_name;
  const person_finish_task_date = userData.person_finish_task_date;
  const person_finish_task_name = userData.person_finish_task_name;
  
  //finish_task_date_arrayをYYYY-MM-DDの形式に変換
  for (let i = 0; i < finish_task_date.length; i++) {
    const date = new Date(finish_task_date[i]);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    finish_task_date[i] = `${year}-${month}-${day}`;
  }

  //person_finish_task_date_arrayもYYYY-MM-DDの形式に変換
  for (let i = 0; i < person_finish_task_date.length; i++) {
    const date = new Date(person_finish_task_date[i]);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    person_finish_task_date[i] = `${year}-${month}-${day}`;
  }
 

  // 家事完了日と家事名を組み合わせた配列
  const combinedArray = finish_task_date.map((date, index) => ({
    title: finish_task_name[index],
    date: date,
    status: 'username'
  }));
  const person_combinedArray = person_finish_task_date.map((date, index) => ({
    title: person_finish_task_name[index],
    date: date,
    status: 'person'
  }));

  // カレンダーに表示するイベントの配列
  const events = [
    ...combinedArray.map(item => ({
      title: item.title,
      start: item.date,
      status: 'username'
    })),
    ...person_combinedArray.map(item => ({
      title: item.title,
      start: item.date,
      status: 'person'
    }))
  ];

  // カレンダーの日付をクリックした時の処理
  const handleDateClick = (info) => {
    // クリックされた日付のeventsを取得してアラートを表示
    const clickedDate = formatDate(info.dateStr);
    //eventsの中のstartとclickdateが同じ配列のみ取得する
    const clickedEvents = events.filter(event => event.start === clickedDate);
    onDateClick(clickedDate, clickedEvents);
  };

  // 日付をyyyy/mm/ddの形式に整形
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    dateObj.setHours(0, 0, 0, 0); 
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 月が変わった時に前月と次月の日付を取得
  const handleDateSet = (dateInfo) => {
    const selectedMonth = dateInfo.view.currentStart;
    const prevMonth = new Date(selectedMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    onMonthChange(selectedMonth, prevMonth);
  };




    return (
      <><FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        datesSet={handleDateSet}
        titleFormat={{ month: 'numeric', year: 'numeric' }}
        events={events} />

        <button className="completeFormButton"><a href="/completeForm">家事完了</a></button>
      </>
    );
}

export default Calendar;
