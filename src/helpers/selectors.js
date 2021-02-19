const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
  "1": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
    },
  "2": {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

const day = "Monday";

export function getAppointmentsForDay(state, day){
  const arr = state.days;
  let dayObj = null;
  for (let ele of arr){
    if (ele.name === day){
      dayObj = ele;
    }
  }
  if (!dayObj){
    return [];
  }
  //console.log("dayObj: ", dayObj);
  const appointmentIds = dayObj.appointments;
  const appointmentsForDay = [];
  for (const id in state.appointments){
    //console.log("id: ", id);
    if (appointmentIds.includes(Number(id))){
      //console.log("state.appointments[id]: ", state.appointments[id]);
      appointmentsForDay.push(state.appointments[id]);
    } 
  }
  //console.log("appointmentsForDay: ", appointmentsForDay);
  return appointmentsForDay;
};

 export function getInterviewersForDay(state, day){
  const arr = state.days;
  //console.log("arr: ", arr);
  let dayObj = null;
  for (let ele of arr){
    if (ele.name === day){
      dayObj = ele;
    }
  }
  //console.log("dayObj: ", dayObj);
  if (!dayObj){
    return [];
  }
  const interviewerIds = dayObj.interviewers;
  //console.log("interviewerIds: ", interviewerIds);
  const interviewersForDay = [];
  for (const id in state.interviewers){
    if (interviewerIds.includes(Number(id))){
      interviewersForDay.push(state.interviewers[id]);
    } 
  }
  return interviewersForDay;
}

//console.log(getInterviewersForDay(state, day));

 export function getInterview(state, interview){
  //console.log(state.interviewers);
  if (!interview) {
    return null;
  }
  //console.log("interview.interviewer: ", interview.interviewer);
  const interviewerInfo = state.interviewers[interview.interviewer];
  //console.log("interviewerInfo: ", interviewerInfo);
  return {
    ...interview,
    interviewer: interviewerInfo
  }; 
};
//console.log(getInterview(state, interview));
