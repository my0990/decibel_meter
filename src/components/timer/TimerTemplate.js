import React, { useEffect } from 'react'
import styled from "styled-components";
import { useTimer } from 'react-timer-hook';
import { useState, useMemo } from 'react';

const TimerTemplateContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    overflow: hidden;
`

function TimerTemplate() {

    const expiryTimestamp = useMemo(()=> new Date(),[]);
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds());
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
    } = useTimer({expiryTimestamp});
    const [isStart,setIsStart] = useState(false);

    const setMinute = (number) => {
        var current = new Date();
        if(!isRunning){
            expiryTimestamp.setTime(current.getTime());
        }
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + number);
        restart(expiryTimestamp)
    }
    const onReset = () => {
        var current = new Date();
        expiryTimestamp.setTime(current.getTime());
        setIsStart(false);
        restart(expiryTimestamp);
    }
    const onStart = () => {
        setIsStart(true);
        resume();
    }
    const onPause = () => {
        setIsStart(false);
        pause();
    }

    return(
        <TimerTemplateContainer>
            <div style={{fontSize: '100px'}} className="timeDisplay">
                <span>{String(hours).padStart(2,'0')}</span>:<span>{String(minutes).padStart(2,'0')}</span>:<span>{String(seconds).padStart(2,'0')}</span>
            </div>
            <div>
                <button onClick={() => setMinute(1)}>1분</button>
                <button onClick={() => setMinute(180)}>3분</button>
                <button onClick={() => setMinute(300)}>5분</button>
                <button onClick={() => setMinute(600)}>10분</button>
                {/* <button onClick={() => console.log(time)}>test</button> */}
            </div>
            <div>
                <button onClick={onStart}>start</button> 
                <button onClick={onPause}>Pause</button> 
                <button onClick={onReset}>reset</button>
            </div>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
            {/* <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
            // Restarts to 5 minutes timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            restart(time)
            }}>Restart</button> */}
        </TimerTemplateContainer>
    )
}



export default TimerTemplate;