import React from "react";

import "components/Button.scss";
//importing classnames library for refactoring Button component
import classnames from "classnames";
// renders the button element & uses props.children value as button text
export default function Button(props) {
   const buttonClass = classnames("button", {
      //these are classes
      "button--confirm" : props.confirm,
      "button--danger" : props.danger
   });
   
   return <button 
   className = {buttonClass}
   //onClick is a function
   onClick = {props.onClick}
   //disabled is a boolean value 
   disabled = {props.disabled}
   >
    {props.children}
    </button>;
   
}
