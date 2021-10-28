import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { formatDate } from '@fullcalendar/core'
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './App.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventIcon from '@mui/icons-material/Event';

function App() {

  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [currentView, setView] = useState("dayGridMonth");
  const [today, setToday] = useState("");

  const events = [
    { title: 'Event 1', date: '2021-10-01', backgroundColor: 'red' },
    { title: 'Event 2', date: '2021-10-25', backgroundColor: 'yellow' },
    { title: 'Event 3', date: '2021-10-26', backgroundColor: 'green' }
  ];

  const goPrev = () => {
    calendarRef.current.getApi().prev();
    setTitle(calendarRef.current.getApi().view.title);
  };

  const goNext = () => {
    calendarRef.current.getApi().next();
    setTitle(calendarRef.current.getApi().view.title);
  };

  const goToday = () => {
    calendarRef.current.getApi().today();
    setTitle(calendarRef.current.getApi().view.title);
  }

  const changeView = (viewName) => {
    calendarRef.current.getApi().changeView(viewName);
    setTitle(calendarRef.current.getApi().view.title);
    setView(viewName);
  } 

  useEffect(() => {
    setToday(formatDate(calendarRef.current.getApi().getDate(), {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      locale: 'fr'
    }));
  }, [])
  
  return (
    <>
    <br />
    <Grid item container spacing={2} xs={12} md={8}>

      <Grid item xs={12} md={5}>
        <Button variant="outlined"  onClick={goToday}><EventIcon /> {today}</Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button variant="text" onClick={goPrev}><ArrowBackIosIcon color="disabled"/></Button>
        <span className="cap">{title}</span>
        <Button variant="text" onClick={goNext}><ArrowForwardIosIcon  color="disabled"/></Button>
      </Grid>
      <Grid item xs={12} md={3} style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'right'
      }}>
          <Button variant="outlined" onClick={() => changeView("dayGridMonth")} disabled={currentView === "dayGridMonth"}>Month</Button>
        
          <Button variant="outlined" onClick={() => changeView("timeGridWeek")} disabled={currentView === "timeGridWeek"}>Week</Button>
        
          <Button variant="outlined" onClick={() => changeView("timeGridDay")} disabled={currentView === "timeGridDay"}>Day</Button>
      </Grid>
    
      <Grid item xs={12}>
        <Item>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={false}
          // headerToolbar={{
          //   left: 'prev next today',
          //   center: 'title',
          //   right: 'dayGridMonth timeGridWeek timeGridDay'
          // }}
          locale="fr"
          selectable={true}
          // titleFormat={{month:'long'}}
          dayHeaderFormat={{weekday: 'long'}}
          firstDay={1}
          eventTextColor={'#000000'}
          aspectRatio={2}
          viewDidMount={(view) => {
            setTitle(view.view.title)
          }}
          eventDisplay="list-item"
        />
        </Item>
      </Grid>
    </Grid>
    </>
    
  );
}

export default App;
