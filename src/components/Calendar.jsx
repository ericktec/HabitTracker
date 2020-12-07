import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '..//contexts/AuthContext'
import {db} from '../firebase';

//https://fullcalendar.io/docs/react

function Calendar() {

  const [events, setEvents] = useState([
  ]);


  const { currentUser } = useAuth();


  useEffect(() => {
    db.collection('users').doc(currentUser.uid).collection('hobbies').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(event => {
        if(event.type === 'added'){
          setEvents(oldEvents => [...oldEvents, event.doc.data()]);
        }else if(event.type === 'removed'){
          setEvents(oldEvents => {
            return oldEvents.filter(currentEvent => {
              let tempEvent = event.doc.data();
              return tempEvent.title !== currentEvent.title && tempEvent.date !== currentEvent.date
            })
          })
        }
      })
    })
  }, [])


  const handleDateClick = (info) => {
    let answer = window.confirm("Did you completed your habit?");
    if(!answer){
      return;
    }
    let response = prompt("Which one?");
    let event = {
      title: response,
      date: info.dateStr
    };
    db.collection('users').doc(currentUser.uid).collection('hobbies').add(event)
    .then(doc => console.log('doc written with id ',doc.id))
    .catch(e => {
      console.log(e);
    })
  }

  return <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} 
  events={events}
  initialView="dayGridMonth" dateClick={handleDateClick} 
  />;
}

export default Calendar;
