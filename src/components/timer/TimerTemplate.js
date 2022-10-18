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
    const [pausedTime,setPausedTime] = useState(null);
    
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
    } = useTimer({expiryTimestamp, onExpire: () => {
        if(isStart){
            setIsStart(false);
        }
    }});

    const [isStart,setIsStart] = useState(false);
    const [isPaused,setIsPaused] = useState(false);

    const setMinute = (number) => {
        var current = new Date();
        if(!isStart){
            expiryTimestamp.setTime(current.getTime());
        }
        setIsStart(true);
        if(isPaused){
            
            let resumeTime= new Date().getTime();
            expiryTimestamp.setTime(expiryTimestamp.getTime() + resumeTime - pausedTime);///

        } 
        // else if(!isRunning){
        //     expiryTimestamp.setTime(current.getTime());
        // }
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + number);
        
        restart(expiryTimestamp);
        if(!isRunning){
            pause();
        }
    }
    const onReset = () => {
        let current = new Date();
        expiryTimestamp.setTime(current.getTime());
        setIsStart(false);
        restart(expiryTimestamp);
    }
    const onStart = () => {
        setIsStart(true);
        setIsPaused(true);
        resume();
    }
    const onPause = () => {
        setIsPaused(true);
        setIsStart(false);
        setPausedTime(new Date().getTime());
        console.log('test', pausedTime);
        pause();
    }


    return(
        <TimerTemplateContainer>
            <div style={{fontSize: '100px'}} className="timeDisplay">
                <span>{String(hours).padStart(2,'0')}</span>:<span>{String(minutes).padStart(2,'0')}</span>:<span>{String(seconds).padStart(2,'0')}</span>
            </div>
            <div>
                <div>
                    <button onClick={() => setMinute(1)}>1초</button>
                    <button onClick={() => setMinute(3)}>3초</button>
                    <button onClick={() => setMinute(5)}>5초</button>
                    <button onClick={() => setMinute(10)}>10초</button>
                </div> 
                <div>
                    <button onClick={() => setMinute(60)}>1분</button>
                    <button onClick={() => setMinute(180)}>3분</button>
                    <button onClick={() => setMinute(300)}>5분</button>
                    <button onClick={() => setMinute(600)}>10분</button>
                </div>
                {/* <button onClick={() => console.log(expiryTimestamp)}>test</button> */}
            </div>
            <div>
                <button onClick={onStart}>start</button> 
                <button onClick={onPause}>Pause</button> 
                <button onClick={onReset}>reset</button>
            </div>
        </TimerTemplateContainer>
    )
}



export default TimerTemplate;