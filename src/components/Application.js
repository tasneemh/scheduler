import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

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



export default function Application() {
  
  // const [days, setDays] = useState([]);
  // const [day, setDay]=useState("Monday");
  // const [appointment, setAppointment] = useState("12pm");

  //state helps to keep data to application component which is sent as props to children 
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  
// const setDays = days => {
//   setState({ ...state, days });
//   setState(prev => ({ ...prev, days }));
// };
 
  const schedule = dailyAppointments.map(appointment=>{
    //const interview = getInterview(state, appointment.interview);
    return <Appointment
    key={appointment.id} 
    {...appointment}
    id = {appointment.id}
    interview = {getInterview(state, appointment.interview)}
    time= {appointment.time}
    interviewers = {dailyInterviewers}
    //passing bookInterview as props to Appointment component
    bookInterview = {bookInterview}
    //passing cancelInterview as props to Appointment component
    cancelInterview = {cancelInterview}
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
