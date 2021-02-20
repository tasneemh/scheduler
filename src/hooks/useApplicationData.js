import { useEffect, useState } from "react";
import axios from "axios";
import {getNewSpotsForDays} from "helpers/selectors";

export default function useApplicationData(){
  //updates state object
  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {}
  });

  //updates state for day
  const setDay = day => setState({ ...state, day });
  
  // Gets data from db to set state, ran on initial render
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
      //console.log("days: ", all[0].data); // first
      //console.log("appointments: ", all[1].data); // second
      //console.log("interviewers: ", all[2].data); // third
      setState(prev => ({...prev, days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data }));
      //setDays(all[0].data);
      //setAppointments(dailyAppointments)
      //console.log(state);
    });
  }, []);

  //books or updates an interview, updates db and state
  function bookInterview(id, interview){
  console.log(id, interview);
  const appointment = {
  ...state.appointments[id],
  interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const newState = {...state, appointments};
  const newDays = getNewSpotsForDays(newState, id);
  //make PUT request to update the db with interview data
  return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
  .then((response)=> { 
    //console.log("response: ", response);
    //prev is the most upto date version of the state and avoide stale
    setState(prev=>({
    ...prev,
    appointments,
    days: newDays
  }))});
};

//cancels an interview, updates db and state
function cancelInterview(id){
  console.log("id: ", id);
  const appointment = {
  ...state.appointments[id],
  interview: null
  };
  console.log("cancelInterview appointment: ", appointment);
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  console.log("cancelInterview appointments: ", appointments);
  const newState = {...state, appointments};
  const newDays = getNewSpotsForDays(newState, id);
  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  .then((response)=> { 
    console.log("response: ", response);
    // setState({
    // ...state,
    // appointments
    // })});
    setState(prev=>({
    ...prev,
    appointments,
    days: newDays
  }))});
  }
  //returns an object with 4 keys
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}