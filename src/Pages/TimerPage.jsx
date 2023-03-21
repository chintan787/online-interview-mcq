import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => {console.warn('onExpire called');console.log("onExpire call")} });


  return (
    <div style={{textAlign: 'center'}}>
      
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      
    </div>
  );
}


export default function TimerPage() {

    const time = new Date();
    time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
    console.log("time",time)
  return (
    <div>
    <MyTimer expiryTimestamp={time} />
  </div>
  )
}
