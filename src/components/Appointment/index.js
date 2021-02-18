import React from "react";
import "../Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props){
  console.log("props: ", props);
  return (
    <article className = "appointment">
      <Header time={props.time}/>
        {props.interview ? <Show student = {props.interview.student} interviewer = {props.interview.interviewer.name}
        onEdit = {props.onEdit} 
        /> : <Empty/>}
    </article>
  );
}