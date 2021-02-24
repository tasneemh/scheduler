import React from "react";
import "../Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
//importing Form component
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props){
  //below const are used for modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    //Call the props.bookInterview function with the appointment id and interview as arguments from within the save function. 
    //Within the save function in our Appointment component transition to the SHOW mode after calling props.bookInterview.
    props.bookInterview(props.id, interview).then(()=>{transition(SHOW)})
    .catch(error => transition(ERROR_SAVE, true));    
  };
  function destroy(){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY);
    }).catch(error => {transition(ERROR_DELETE, true)});

  }
  //console.log("props: ", props);
  //props.interviewers = [];
  return (
    <article className = "appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete = {()=>transition(CONFIRM)}
        //we are transitioning to edit mode after clocking onEdit 
        onEdit = {()=>{transition(EDIT)}}
        />
      )} 
      {/*passing save function to the form component. Form is capturng name & interviewer & pass them to onSave as arguments*/}
      {mode === CREATE && (<Form interviewers={props.interviewers} name = {props.name} onSave = {save} onCancel={back}/>)}
      
      {mode === SAVING && <Status message = "Saving"/>}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm onCancel= {back} onConfirm = {destroy}/>}
      {mode === EDIT && (<Form interviewers={props.interviewers} name = {props.name} onSave = {save} onCancel={back}/>)}
      {mode === ERROR_SAVE && <Error message = "Could not save appointment." onClose = {back}/>}
      {mode === ERROR_DELETE && <Error message = "Could not cancel appointment"/>}
    </article>
  );
}