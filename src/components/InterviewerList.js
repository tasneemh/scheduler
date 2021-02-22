import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from "prop-types";
export default function InterviewerList(props){
  
  const interviewersArray = props.interviewers;
  //console.log(interviewersArray);
  /*
  interviewersArray = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }]
  */
  //Build an array of interviewer list items and render
  const interviewerList = interviewersArray.map(interviewer => <InterviewerListItem 
    key = {interviewer.id}
    name = {interviewer.name}
    avatar = {interviewer.avatar}
    selected = {props.value ===interviewer.id}
    //selected = {props.interviewer === interviewer.id}
    setInterviewer = {()=>props.onChange(interviewer.id)}
    //setInterviewer = {()=>props.setInterviewer(interviewer.id)}
    />);
  
  return (
    <section className = "interviewers">
      <h4 className = "interviewers__header text--light">Interviewer</h4>
      <ul className = "interviewers__list">{interviewerList}</ul>   
    </section>
  );
}
//Runtime test to restrict prop types to only accept specific data types i.e. arrays
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
