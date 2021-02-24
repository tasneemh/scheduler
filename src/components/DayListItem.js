import React from "react";
import "components/DayListItem.scss";
//importing classnames library for refactoring DayListItem component
import classnames from "classnames";

function formatSpots(spots){
  if (spots){
    if (spots>1){
      return `${spots} spots remaining`;
    } else if (spots ===1){
      return `${spots} spot remaining`;
    }  
  } else {
    return `no spots remaining`;
  }
}

export default function DayListItem(props){ 
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0
  });
  return (
    //li represents entire day item, h2 displays the day name, h3 displays the remaining spots for a day
    <li data-testid ="day" className = {dayClass} onClick = {()=> props.setDay(props.name)}>
    <h2 className = "text--regular">{props.name}</h2>
    <h3 className = "text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

