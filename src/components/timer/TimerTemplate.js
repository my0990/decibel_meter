import React, { useEffect } from 'react'
import styled from "styled-components";
import { useTimer } from 'react-timer-hook';
import { useState, useMemo,useRef } from 'react';
import audioSrc from '../../audios/beef.mp3';
import useResizeObserver from '../../api/useResizeObserver';

const TimerTemplateContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    background: gray;
    padding: 1rem;
    .btnWrapper {
        min-width: 500px;
        text-algin: center;
    }
    .btnWrapperBelow {
        text-align: end;
        margin-right: 10px;
    }
    .timeDisplay {
        font-family: Gugi;
        // font-size: 15rem;
        background: black;
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 20px;
        color: white;
        border: 10px solid white;
        text-align: center;
        display: flex;
        justify-content: center;
        align-item: center;
        .caret {
            caret-color: transparent;
        }
        input {
            width: 25%;
            // height: 240px;
            display: inline;
            background-color: black;
            border: none;
            color: white;
            // font-size: 15rem; 
            font-family: Gugi;
            border-radius: 20px;
            outline: none;

        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
  
        input[type=number] {
            -moz-appearance: textfield;
        }
    }
    .timeDisplayWrapper {
        background: white;
        border-radius: 20px;
        padding-bottom: 10px;
    }


`
const MinuteBtn = styled.button`
    align-self: center;
    background-color: #fff;
    background-image: none;
    background-position: 0 90%;
    background-repeat: repeat no-repeat;
    background-size: 4px 3px;
    border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
    box-sizing: border-box;
    color: #41403e;
    cursor: pointer;
    display: inline-block;
    font-family: Noto Sans KR;
    font-size: 2rem;
    line-height: 23px;
    outline: none;
    padding: .75rem;
    text-decoration: none;
    transition: all 235ms ease-in-out;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    }
    width: 100px;
    margin: 10px;

    &:hover {
    box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
    transform: translate3d(0, -2px, 0);
    }

    &:focus {
    box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
    }
`
const ClockBtn = styled.button`
    appearance: none;
    background-color: #000000;
    border: 2px solid #1A1A1A;
    border-radius: 15px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    min-height: 60px;
    min-width: 0;
    outline: none;
    padding: 12px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    will-change: transform;

   
    margin: 15px;
    
    &:disabled {
    pointer-events: none;
    }

    &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: none;
    transform: translateY(0);
    }
`
const audio = new Audio(audioSrc);
function TimerTemplate() {

    const componentRef = useRef();
    const [width, height, top, left] = useResizeObserver(
        componentRef,
        printResize,
        true
      );


    function printResize(width,height) {
        // console.log(entry.target);
        console.log(`width: ${width}px; height: ${height}px`);
        console.log(`top: ${top}px; left: ${left}px`);
    }
    const expiryTimestamp = useMemo(()=> new Date(),[]);
    
    const [firstTime,setFirstTime] = useState(null);
    const [isStart,setIsStart] = useState(false);
    const [isPaused,setIsPaused] = useState(false);
    const [isAlarmStarted,setIsAlarmStarted] = useState(false);
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
            // setIsStart(false);
            onReset();
            setIsAlarmStarted(false);
            
        } 
    }});


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
        if(!firstTime || isStart){
            return null;
        }
        let current = new Date();
        expiryTimestamp.setTime(expiryTimestamp.getTime() + current.getTime() - firstTime.getTime());
        setIsStart(true);
        setFirstTime(current);
        setIsPaused(false);

        resume();
    }
    const onPause = () => {
        
        if(!firstTime || isPaused){
            console.log(firstTime, isPaused)
            return null;
        }
        
        let current = new Date();
        expiryTimestamp.setTime(expiryTimestamp.getTime() - current.getTime() + firstTime.getTime());
        
        
        setIsPaused(true);
        setIsStart(false);
        audio.pause();
        setIsAlarmStarted(false);
        pause();
    }
    if(!isPaused && hours == 0 && minutes == 0 &&  seconds < 4 && seconds != 0 && !isAlarmStarted && isStart){
        audio.currentTime = 3 - seconds;
        audio.play()
        setIsAlarmStarted(true);
    }
    const onChange = (e) => {
        const { value, name } = e.target;
        if(value.length <= 2){
            setTexts({
                ...texts,
                [name]: value
            });
        }

        
    }
    const onBlur = (e) => {
        const { name } = e.target;
        if(texts.hour != '' || texts.minute != '' || texts.second != ''){
            if(name === 'hour'){
                expiryTimestamp.setHours(expiryTimestamp.getHours() - parseInt(hours) * 1);
                setMinute(texts.hour * 60 * 60);  
            } else if(name === 'minute'){
                expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() - parseInt(minutes) * 1);
                setMinute(texts.minute * 60);  
            } else {
                expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - parseInt(seconds) * 1);
                setMinute(texts.second * 1);
            }
        }

        
        setIsFocused({
            hour: false,
            minute: false,
            second: false
        });
        setTexts({
            hour: '',
            minute: '',
            second: ''
        });
    }
    const onFocus = (e) => {
        const { name } = e.target;
        if(!isStart){
            setIsFocused({
                ...isFocused,
                [e.target.name]: true
            })
        }
  
    }
    const [isFocused,setIsFocused] = useState({
        hour: false,
        minute: false,
        second: false
    });
    const [texts,setTexts] = useState({
        hour: '',
        minute: '',
        second: ''
    });
    return(
        <TimerTemplateContainer ref={componentRef}>
            <div className='btnWrapper'>
                <MinuteBtn onClick={() => setMinute(60)}>1분</MinuteBtn>
                <MinuteBtn onClick={() => setMinute(180)}>3분</MinuteBtn>
                <MinuteBtn onClick={() => setMinute(300)}>5분</MinuteBtn>
                <MinuteBtn onClick={() => setMinute(600)}>10분</MinuteBtn>
                {/* <button onClick={() => console.log(expiryTimestamp)}>test</button> */}
            </div>
            <div className='timeDisplayWrapper'>
                <div className="timeDisplay" style={{width:width,height:height,fontSize:width * 0.22 + 'px'}}>
                    <input style={{fontSize:width * 0.22 + 'px'}} className={isStart ? 'caret' : null} type="number" name="hour" value={isFocused.hour ? texts.hour : String(hours).padStart(2,'0')} onFocus={onFocus} onBlur={onBlur} onChange={onChange}></input>:
                    <input style={{fontSize:width * 0.22 + 'px'}} className={isStart ? 'caret' : null} type="number" name="minute" value={isFocused.minute ? texts.minute : String(minutes).padStart(2,'0')} onFocus={onFocus} onBlur={onBlur} onChange={onChange}></input>:
                    <input style={{fontSize:width * 0.22 + 'px'}} className={isStart ? 'caret' : null} type="number" name="second" value={isFocused.second ? texts.second : String(seconds).padStart(2,'0')} onFocus={onFocus} onBlur={onBlur} onChange={onChange}></input>
                </div>
                <div className='btnWrapperBelow'>
                    {isStart ? <ClockBtn onClick={onPause}>Pause</ClockBtn>  : <ClockBtn onClick={onStart}>start</ClockBtn> }
                    <ClockBtn onClick={onReset}>reset</ClockBtn>
                </div>
            </div>
        </TimerTemplateContainer>
    )
}



export default TimerTemplate;