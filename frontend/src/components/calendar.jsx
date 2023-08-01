import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import "./MyComponent.css";

class Calendar extends React.Component {
  handleDateClick = (info) => {
    // クリックした日付の情報を取得してアラートを表示
    console.log(info.dateStr);
  }

  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} 
        initialView="dayGridMonth" 
        dateClick={this.handleDateClick} 
        titleFormat={{ month: 'numeric', year: 'numeric' }}
        events= {[
          {
            title: 'カラオケ',
            start: '2023-08-02'
          },
          {
            title: 'ショッピング',
            start: '2023-08-01'
          },
          {
            title: '打ち合わせ',
            start: '2023-08-06T10:00:00',
            end: '2023-08-07T11:00:00'
          },
          {
            title: '打ち上げ',
            start: '2023-08-05T19:00:00'
          }
        ]}
      />
    );
  }
}

export default Calendar;

