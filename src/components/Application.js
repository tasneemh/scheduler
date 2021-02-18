import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay} from "../helpers/selectors";
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Cohen",
//       interviewer: {
//         id: 1,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
// ];



export default function Application(props) {
  
  // const [days, setDays] = useState([]);
  // const [day, setDay]=useState("Monday");
  // const [appointment, setAppointment] = useState("12pm");

  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
});
const dailyAppointments = getAppointmentsForDay(state, state.day);
const setDay = day => setState({ ...state, day });
const setDays = days => {
  setState({ ...state, days });
  setState(prev => ({ ...prev, days }));
};

  useEffect(()=>{
    // const testURL = "/api/days";
    // axios.get(testURL).then(response=>{
    //   //console.log("response.data", response.data);
    //   setDays(response.data);
    //   }  
    // ).catch((error)=>{
    //   console.log(error);
    // });
     Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      console.log("days: ", all[0].data); // first
      console.log("appointments: ", all[1].data); // second
      console.log("interviewers: ", all[2].data); // third
      setState(prev => ({...prev, days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data }));
      //setDays(all[0].data);
      //setAppointments(dailyAppointments)
      console.log(state);
    });
  }, []);
   
  const schedule = dailyAppointments.map(appointment=>{
    return <Appointment
    key={appointment.id} 
    //{...appointment}
    interview = {appointment.interview}
    time= {appointment.time}
    />
  });
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */
        <>
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </>
        }
      </section>
      <section className="schedule">
        {schedule}
       <Appointment key="last" time="5pm" />
      </section>
    </main>);
}
