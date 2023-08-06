import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import "./MyComponent.css";

const Calendar = ({ onDateClick }) => {
  const calendarRef = useRef(null);
    
  const handleDateClick = (info) => {
    // クリックした日付の情報を取得してアラートを表示
    const clickedDate = formatDate(info.dateStr);
    console.log(info.dateStr);
    onDateClick(clickedDate);
  }

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };


    return (
      <><FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        titleFormat={{ month: 'numeric', year: 'numeric' }}
        events={[
          {
            title: '皿洗い',
            start: '2023-08-02'
          },
          {
            title: '洗濯',
            start: '2023-08-01'
          },
          {
            title: '洗濯',
            start: '2023-08-01'
          },
          {
            title: '洗濯',
            start: '2023-08-01'
          },
          {
            title: '洗濯',
            start: '2023-08-01'
          },
          {
            title: '洗濯',
            start: '2023-08-01'
          },
          {
            title: '料理',
            start: '2023-08-05'
          }
        ]} /><button className="completeFormButton"><a href="/completeForm">家事完了</a></button></>
    );
}

export default Calendar;

