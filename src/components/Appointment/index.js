import React from "react";
import "../Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
//importing Form component
import Form from "components/Appointment/Form";

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("props: ", props);
  //props.interviewers = [];
  return (
    <article className = "appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        />
      )} 
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back}/>)}
      
    
      
    </article>
  );
}