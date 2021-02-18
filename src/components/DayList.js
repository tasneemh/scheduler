import React from "react";
import DayListItem from "components/DayListItem"
export default function DayList(props){
  /*
  props = {
    days:Array a list of day objects (each object includes an id, name, and spots)
    day:String the currently selected day
    setDay:Function
  }
  */ 
const daysArray = props.days;
//dayList is an array of DayListItem components
/*
day = {
  id: 2,
  name: "Tuesday",
  spots: 5,
}
*/ 
const dayList = daysArray.map((day)=> <DayListItem key = {day.id} name = {day.name} spots = {day.spots} selected = {props.day === day.name} setDay = {props.setDay} />);
return <ul>
{dayList}
</ul>;
}
