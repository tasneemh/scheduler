import React, {Fragment} from "react";

import { addParameters, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem.js"
import InterviewerList from "components/InterviewerList.js"
import Appointment from "../src/components/Appointment/index";
import Header from "../src/components/Appointment/Header";
import Empty from "../src/components/Appointment/Empty";
import Show from "../src/components/Appointment/Show";
import Confirm from "../src/components/Appointment/Confirm";
import Status from "../src/components/Appointment/Status";
import Error from "../src/components/Appointment/Error";
import Form from "../src/components/Appointment/Form";


storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
  storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));
  //stories for DayList component
  const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};
// adding stories for InterviewListItem
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event =>action("setInterviewer")(interviewer.id)}
    />
  ));
  //adding stories for InterviewerList component

  const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("setInterviewer")}
    />
  ));

  //adding stories for Appointment component
  //use the background add-on to set the Storybook preview background colour to white. We can configure the background for a group of stories by chaining the addParameters function
  
  storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", ()=><Header time="12pm"/>)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", ()=> <Show 
  interviewer={interviewer.name}
  onEdit ={action("onEdit")}
  onDelete = {action("onDelete")}
  student = {"Lydia McJones"}
  />)
  .add("Confirm", ()=><Confirm onConfirm = {action("onConfirm")}
  onCancel = {action("onCancel")}/>)
  .add("Saving", ()=><Status message = "Saving"/>)
  .add("Deleting", ()=><Status message = "Deleting"/>)
  .add("Error", ()=><Error message = "Could not delete appointment."
  onClose = {action("onClose")}/>)
  .add("Appointment Empty", () => (
  <Fragment>
    <Appointment id={1} time="12pm" />
    <Appointment id="last" time="1pm" />
  </Fragment>
))
.add("Appointment Booked", () => (
  <Fragment>
    <Appointment
      id={1}
      time="12pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment id="last" time="1pm" />
  </Fragment>
));

  //add stories for Appointment Form
  storiesOf("Form", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Form", ()=><Form interviewers = {interviewers}/>)
  .add("Form with Edit", ()=><Form
  name = "Tasneem Burmawala"
  interviewers = {interviewers}
  interviewer = {3}
  onSave = {action("onSave")}
  onCancel = {action("onCancel")}
  />)
  .add("Form with Create", ()=><Form
  interviewers = {interviewers}
  onSave = {action("onSave")}
  onCancel = {action("onCancel")}
  />)
  ;