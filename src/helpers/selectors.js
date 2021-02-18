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
  //console.log("appointmentIds: ", appointmentIds);
  //console.log("state.appointments: ", state.appointments);
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
console.log(getAppointmentsForDay(state, day));