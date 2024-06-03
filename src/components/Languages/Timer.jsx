import React, { useState, useEffect } from 'react';
import { styles } from "./LanguageQuestionsStyles";
import {
    Box,
    Typography}from "@mui/material";

function Timer({limit,handleAllAns}) {
    const [minutes, setMinutes] = useState(limit ? limit : 0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timer);
                handleAllAns();
                // Timer reached 0:00, you can add your logic here
            } else {
                if (seconds === 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds(prevSeconds => prevSeconds - 1);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);

    return (
        <Box sx={styles.timerSection} className="timezone">
            <Typography sx={styles.timeLeft} variant="h6">
                Time Left :{" "}
            </Typography>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
            <Typography sx={styles.timeDetails}>
                {minutes < 10 ? `0${minutes}` : minutes}
            </Typography>
            <Typography sx={styles.timeDetails}>:</Typography>
            <Typography sx={styles.timeDetails}>
                {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
        </Box>
    );
}

export default Timer;