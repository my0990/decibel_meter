import React from 'react'
import styled from "styled-components";
import { useTimer } from 'react-timer-hook';
import { useState, useMemo,useRef } from 'react';
import audioSrc from '../../audios/beef.mp3';
import useResizeObserver from '../../api/useResizeObserver';
import StartBtnStyle from '../commons/StartBtnStyle';
import MinuteBtnStyle from '../commons/MinuteBtnStyle';
import timerApi from '../../api/timerApi';


const TimerTemplateContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    background: gray;
    padding: 1rem;
    .btnWrapper {
        text-algin: center;
        min-width: 161px;
    }
    .btnWrapperBelow {
        text-align: end;
        margin-right: 10px;
    }
    .timeDisplay {
        font-family: Gugi;
        background: black;
        padding: 1rem;
        // margin: 0.5rem;
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
        // padding-bottom: 10px;
    }


`

const audio = new Audio(audioSrc);
function TimerTemplate() {
    const expiryTimestamp = useMemo(()=> new Date(),[]);
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

    const {onChange,setMinute,onFocus,onBlur,onReset,onStart,onPause} = timerApi({texts,expiryTimestamp,setIsFocused,hours,minutes,seconds,setTexts,isStart,firstTime,setFirstTime,isFocused,restart,pause,resume,isPaused,setIsPaused,setIsStart,audio,setIsAlarmStarted});
    
    if(!isPaused && hours == 0 && minutes == 0 &&  seconds < 4 && seconds != 0 && !isAlarmStarted && isStart){
        audio.currentTime = 3 - seconds;
        audio.play()
        setIsAlarmStarted(true);
    }


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

    const StartBtn = styled(StartBtnStyle)`
        // width: ${width * 0.45}px;
        font-size: ${width * 0.04}px;
        padding: ${width*0.015*0.6}px ${width * 0.015}px;
        margin: ${width*0.02}px;
        border-radius: ${width * 0.02}px;
        `;
    const MinuteBtn = styled(MinuteBtnStyle)`
        padding: ${width*0.015*0.6}px ${width * 0.015}px;
        margin: ${width*0.01}px;
        font-size: ${width * 0.04}px;

    `
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
                <div className="timeDisplay" style={{width:width,height:height,fontSize:width * 0.22 + 'px',lineHeight: width * 0.2 + 'px'}}>
                    <input 
                        style={{fontSize:width * 0.22 + 'px'}} 
                        className={isStart ? 'caret' : null} 
                        type="number" 
                        name="hour" 
                        value={isFocused.hour ? texts.hour : String(hours).padStart(2,'0')} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={onChange} />:
                    <input 
                        style={{fontSize:width * 0.22 + 'px'}} 
                        className={isStart ? 'caret' : null} 
                        type="number" 
                        name="minute" 
                        value={isFocused.minute ? texts.minute : String(minutes).padStart(2,'0')} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={onChange} />:
                    <input 
                        style={{fontSize:width * 0.22 + 'px'}} 
                        className={isStart ? 'caret' : null} 
                        type="number" 
                        name="second" 
                        value={isFocused.second ? texts.second : String(seconds).padStart(2,'0')} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={onChange} />
                </div>
                <div className='btnWrapperBelow'>
                    {isStart ? <StartBtn onClick={onPause}>Pause</StartBtn>  : <StartBtn onClick={onStart}>start</StartBtn> }
                    <StartBtn onClick={onReset}>reset</StartBtn>
                </div>
            </div>
        </TimerTemplateContainer>
    )
}



export default TimerTemplate;