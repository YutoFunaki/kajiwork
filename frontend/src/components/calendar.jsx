import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import "./MyComponent.css";

//Cookieからusernameを取得
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const Calendar = ({ onDateClick, onMonthChange, selectedDate }) => {
  const calendarRef = useRef(null);
  const finish_task_date = getCookie('finish_task_date');
  const finish_task_name = getCookie('finish_task_name');
  const person_finish_task_date = getCookie('person_finish_task_date');
  const person_finish_task_name = getCookie('person_finish_task_name');
  const finish_task_date_array = finish_task_date.split(',');
  const finish_task_name_array = finish_task_name.split(',');
  const person_finish_task_date_array = person_finish_task_date.split(',');
  const person_finish_task_name_array = person_finish_task_name.split(',');
  
  const combinedArray = finish_task_date_array.map((date, index) => ({
    title: finish_task_name_array[index],
    date: date,
    status: 'username'
  }));
  const person_combinedArray = person_finish_task_date_array.map((date, index) => ({
    title: person_finish_task_name_array[index],
    date: date,
    status: 'person'
  }));

  const events = [
    ...combinedArray.map(item => ({
      title: item.title,
      start: item.date,
    })),
    ...person_combinedArray.map(item => ({
      title: item.title,
      start: item.date,
    }))
  ];

  const handleDateClick = (info) => {
    // クリックした日付の情報を取得してアラートを表示
    const clickedDate = formatDate(info.dateStr);
    onDateClick(clickedDate);
  }

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

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
