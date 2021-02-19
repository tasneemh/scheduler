import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false){
    setHistory();
    if (replace){
      setMode(newMode);
      setHistory([...history.slice(0, -1), newMode]);
    } else{
      setMode(newMode);
      //newHistory is new array which is a copy of history array and we have added newMode element
      const newHistory = [...history, newMode];
      setHistory(newHistory);
    }
  }

  function back(){
    if (history.length>1){
    const newHistory = history.slice(0,-1);
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
    } 
  };
  return { mode, transition, back };
}