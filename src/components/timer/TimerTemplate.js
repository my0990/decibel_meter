import React from 'react'
import styled from "styled-components";
import { useTimer } from 'react-timer-hook';
import { useState, useMemo,useRef, useEffect } from 'react';
import audioSrc from '../../audios/beef.mp3';
import useResizeObserver from '../../api/useResizeObserver';
import StartBtn from '../commons/StartBtn';
import MinuteBtn from '../commons/MinuteBtn';
import timerApi from '../../api/timerApi';
import getAudioApi from '../../api/getAudioApi';
import TimeDisplayWrapper from '../commons/TimeDisplayWrapper';
import TimeDisplay from '../commons/TimeDisplay';
import decibelMeterIcon from '../../imgs/measure.png';

const TimerTemplateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    background-color:  ${props => props.decibelData >= 1000 ? "#6FD1B5" : props.decibelData > 30 ? "orange" :  props.decibelData > 20? "yellow" : "green"};
    transition: all 1.5s ease;
    WebkitTransition: all 1.5s ease;
    MozTransition: all 1.5s ease;
    position: relative;
    .decibelNum{
        font-family: Major Mono Display;
        color: #E97777;
        font-size: ${props => props.width * 0.05 + 'px'};
        margin-left: ${props => props.width * 0.02 + 'px'};
        vertical-align: top;
    }

    button {
        transition: none;
    }

    .btnWrapper {
        text-algin: center;
        position: absolute;
    }
    .startBtnWrapper{
        position: absolute;
    }
    .decibelBtn{
        transition: all 0.1s ease;
        WebkitTransition: all 0.1s ease;
        MozTransition: all 0.1s ease;
        cursor: pointer;
        opacity: 30%;
        &:hover {
            scale: 1.1;
            opacity: 100;
        }
        &:active{
            scale: 0.9;
        }

    }
`



const bell = new Audio(audioSrc);
function TimerTemplate() {
    const [audio,setAudio] = useState();
    const [decibelData,setDecibelData] = useState(1000);
    const {getMicrophone, stopMicrophone, toggleMicrophone, draw} = getAudioApi({audio,setAudio,setDecibelData});

    useEffect(()=>{
        draw();
    },[audio]);


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
    const [isDecibelStarted,setIsDecibelStarted] = useState(false);
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

    const {onChange,setMinute,onFocus,onBlur,onReset,onStart,onPause} = timerApi({texts,expiryTimestamp,setIsFocused,hours,minutes,seconds,setTexts,isStart,firstTime,setFirstTime,isFocused,restart,pause,resume,isPaused,setIsPaused,setIsStart,bell,setIsAlarmStarted});
    
    if(!isPaused && hours === 0 && minutes === 0 &&  seconds < 4 && seconds !== 0 && !isAlarmStarted && isStart){
        bell.currentTime = 3 - seconds;
        bell.play()
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


    
    return(
        <TimerTemplateContainer ref={componentRef} decibelData={decibelData} width={width}>
            <div style={{width:width,marginLeft:width*0.05,marginBottom: width*0.005}}>
                <img className="decibelBtn" src={decibelMeterIcon} alt='decibel meter' style={{width:width * 0.05,height:width * 0.05}} onClick={getMicrophone}></img>
                <button onClick={stopMicrophone}>test</button>
                <span className='decibelNum'>{decibelData >= 1000 ? null : decibelData}</span>
            </div>
            <TimeDisplayWrapper style={{width:width,height:height,fontSize:width * 0.22 + 'px',lineHeight: width * 0.2 + 'px'}}>
                <TimeDisplay style={{fontSize:width * 0.15 + 'px'}} >
                    <input 
                        style={{fontSize:width * 0.15 + 'px'}} 
                        className={isStart ? 'caret' : null} 
                        type="number" 
                        name="hour" 
                        value={isFocused.hour ? texts.hour : String(hours).padStart(2,'0')} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={onChange} />:
                    <input 
                        style={{fontSize:width * 0.15 + 'px'}} 
                        className={isStart ? 'caret' : null} 
                        type="number" 
                        name="minute" 
                        value={isFocused.minute ? texts.minute : String(minutes).padStart(2,'0')} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={onChange} />:
                    <input 
                        style={{fontSize:width * 0.15 + 'px'}} 
                        className={isStart ? 'caret' : null} 
                        type="number" 
                        name="second" 
                        value={isFocused.second ? texts.second : String(seconds).padStart(2,'0')} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        onChange={onChange} />
                </TimeDisplay>

            <div className='btnWrapper' style={{left: width * 0.08 + 'px', bottom: width * 0.05 + 'px'}}>
                <MinuteBtn width={width} onClick={()=>setMinute(60)}>1</MinuteBtn>
                <MinuteBtn width={width} onClick={()=>setMinute(180)}>3</MinuteBtn>
                <MinuteBtn width={width} onClick={()=>setMinute(300)}>5</MinuteBtn>
                <MinuteBtn width={width} onClick={()=>setMinute(600)}>10</MinuteBtn>
             </div>
                <div className='startBtnWrapper' style={{right: width * 0.02 + 'px', bottom: width * 0.035 + 'px'}}>
                    {isStart ? <StartBtn onClick={onPause} width={width}>pause</StartBtn>  : <StartBtn onClick={onStart} width={width}>start</StartBtn> }
                    <StartBtn onClick={onReset} width={width}>reset</StartBtn>
                </div>
            </TimeDisplayWrapper>

        </TimerTemplateContainer>
    )
}



export default TimerTemplate;