import React from 'react';
import {
    Box,
    Typography}from "@mui/material";
import { styles } from "./LanguageQuestionsStyles";
import { useTimer } from "react-timer-hook";


export default function MyTimer(props) {

    console.log("expiryTimestamp",props.expiryTimestamp)
    let tempCount = 0;
  const { seconds, minutes, isRunning, pause } = useTimer({
    expiryTimestamp,
    onExpire : () => 
      { 
        console.log("onExpire called");
      tempCount ++ ;
      console.log("tempCount",tempCount)
      // setTimeExpire(tempCount)
      // handleAllAns()
    }
  });

  if(seconds ===0)
{
tempCount ++;
console.log("temp",tempCount ++)
}   


  return (
    <Box sx={styles.timerSection} className="timezone">
      <Typography sx={styles.timeLeft} variant="h6">
        Time Left :{" "}
      </Typography>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Typography sx={styles.timeDetails}>
        {minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Typography>
      <Typography sx={styles.timeDetails}>:</Typography>
      <Typography sx={styles.timeDetails}>
        {seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Typography>
    </Box>
  )
}
