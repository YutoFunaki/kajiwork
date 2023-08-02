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
      <><FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={this.handleDateClick}
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
            title: '料理',
            start: '2023-08-05'
          }
        ]} /><button className="completeFormButton">家事完了</button></>
    );
  }
}

export default Calendar;

