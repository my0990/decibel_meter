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
    const [firstTime,setFirstTime] = useState(null);
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
        let current = new Date();
        if(!isStart){
            //아예 처음 클릭했을때와 그 다음 클릭했을때
            if(!firstTime){
                expiryTimestamp.setTime(current.getTime());
            } else {
                expiryTimestamp.setTime(expiryTimestamp.getTime() + current.getTime() - firstTime.getTime());
            }
            
        }
        setFirstTime(current);
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + number);
        restart(expiryTimestamp);
        if(!isStart){
            pause();
        }
    }
    const onReset = () => {
        let current = new Date();
        expiryTimestamp.setTime(current.getTime());
        setIsStart(false);
        setFirstTime(null);
        restart(expiryTimestamp);
    }
    const onStart = () => {
        if(!firstTime){
            return null;
        }
        let current = new Date();
        expiryTimestamp.setTime(expiryTimestamp.getTime() + current.getTime() - firstTime.getTime());
        setIsStart(true);
        setFirstTime(current);
        resume();
    }
    const onPause = () => {
        if(!firstTime){
            return null;
        }
        let current = new Date();
        expiryTimestamp.setTime(expiryTimestamp.getTime() - current.getTime() + firstTime.getTime());
        setIsPaused(true);
        setIsStart(false);
        pause();
    }


    return(
        <TimerTemplateContainer>
            <div style={{fontSize: '100px'}} className="timeDisplay">
                <span>{String(hours).padStart(2,'0')}</span>:<span>{String(minutes).padStart(2,'0')}</span>:<span>{String(seconds).padStart(2,'0')}</span>
            </div>
            <div>
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