import React, { useEffect } from 'react'
import styled from "styled-components";
import { useTimer } from 'react-timer-hook';
import { useState, useMemo } from 'react';

const TimerTemplateContainer = styled.div`

    // width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    overflow: hidden;
`

function TimerTemplate() {

    const expiryTimestamp = new Date();
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
    const [plusMinute,setPlusMinute] = useState(0);
    let time = useMemo(()=> new Date(),[]);
    const setMinute = (number) => {
        let tmp = new Date();
        if(isRunning){
            time.setSeconds(time.getSeconds() + number);
        }

        
        restart(time)

    }

    return(
        <TimerTemplateContainer>
            <div style={{fontSize: '100px'}} className="timeDisplay">
                <span>{String(hours).padStart(2,'0')}</span>:<span>{String(minutes).padStart(2,'0')}</span>:<span>{String(seconds).padStart(2,'0')}</span>
                <div>
                {plusMinute}
                </div>
            </div>
            <div>
                <button onClick={() => setMinute(60)}>1분</button>
                <button onClick={() => setMinute(180)}>3분</button>
                <button onClick={() => setMinute(300)}>5분</button>
                <button onClick={() => setMinute(600)}>10분</button>
                <button onClick={()=>{console.log(time)}}>test</button>
            </div>
            <div>
                <button onClick={resume}>start</button> 
                <button onClick={pause}>Pause</button> 
                <button onClick={() => {
                    // Restarts to 5 minutes timer
                    const time = new Date();
                    time.setSeconds(time.getSeconds());
                    restart(time)
                }}>Restart</button>
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