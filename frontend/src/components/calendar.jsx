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

      />
    );
  }
}

export default Calendar;

