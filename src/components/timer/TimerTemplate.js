import React from 'react'
import styled from "styled-components";
import { useTimer } from 'react-timer-hook';
import { useState, useMemo,useRef, useEffect, useCallback } from 'react';
import audioSrc from '../../audios/beef.mp3';
import alert from '../../audios/alert.mp3';
import chicken from '../../audios/chicken.mp3';
import useResizeObserver from '../../api/useResizeObserver';
import StartBtn from '../commons/StartBtn';
import MinuteBtn from '../commons/MinuteBtn';
import timerApi from '../../api/timerApi';
import TimeDisplayWrapper from '../commons/TimeDisplayWrapper';
import TimeDisplay from '../commons/TimeDisplay';
import decibelMeterIcon from '../../imgs/measure.png';
import settingIcon from '../../imgs/setting.png';
import ModalBasic from '../Modal/ModalBasic';
import { colorThemeList } from '../Modal/colorThemeList';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


// const renderTime = ({ remainingTime }) => {
//     if (remainingTime === 0) {
//       return <div className="timer">Too lale...</div>;
//     }
  
//     return (
//       <div className="timer">
//         <div className="value" style={{fontSize:}}>{remainingTime}</div>
//       </div>
//     );
//   };
const TimerTemplateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    background-color:  ${props => !props.isDecibelStarted ? props.theme.containerBackground : props.decibelData > 100 ? "red" :  props.decibelData > 80? "#cc3300" : props.decibelData > 60 ? '#ff9966' : props.decibelData > 40 ? '#ffcc00' : '#99cc33'};
    transition: all 1.5s ease;
    WebkitTransition: all 1.5s ease;
    MozTransition: all 1.5s ease;
    position: relative;
    .refresh {
        cursor: pointer;
        margin-left: 16px;
        display: flex;
        align-items: center;
        opacity: 20%;
        margin-top: 4px;
        &:hover {
            opacity: 100%;
        }
    }

    .decibelNum{
        font-family: Major Mono Display;
        background-color: ${(props) => props.theme.fontColor};
        font-size: ${props => props.width * 0.05 + 'px'};
        margin-left: ${props => props.width * 0.02 + 'px'};
        vertical-align: top;

    }
    .noiseNumberWrapper{
        font-family: Major Mono Display;
        font-size: ${props => props.width * 0.025 + 'px'};
        margin-left: ${props => props.width * 0.025 + 'px'};
        
        align-items: center;
        display: flex;
        .shake {
            animation: shake 0.3s infinite;
        }
        @keyframes shake {
            0%  { transform: translate(2px, 1px)   rotate(0deg);  }
            10% { transform: translate(-1px, -2px) rotate(-2deg); }
            20% { transform: translate(-3px, 0px)  rotate(3deg);  }
            30% { transform: translate(0px, 2px)   rotate(0deg);  }
            40% { transform: translate(1px, -1px)  rotate(1deg);  }
            50% { transform: translate(-1px, 2px)  rotate(-1deg); }
            60% { transform: translate(-3px, 1px)  rotate(0deg);  }
            70% { transform: translate(2px, 1px)   rotate(-2deg); }
            80% { transform: translate(-1px, -1px) rotate(4deg);  }
            90% { transform: translate(2px, 2px)   rotate(0deg);  }
            100%{ transform: translate(1px, -2px)  rotate(-1deg); }
          }
        span {
            cursor: pointer;
            &: hover {
                scale: 1.1;
            }
        }
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
        opacity: ${props => props.isDecibelStarted ? '1' : '0.3'};

        &:hover {
            scale: 1.1;
            opacity: 100;
        }
        &:active{
            scale: 0.9;
        }

    }
`
const SettingIcon = styled.img`
    // width: 72px;
    // height: 72px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
        scale: 1.1;
        transform: rotate(45deg);
        transition: all 0.1s ease;
        WebkitTransition: all 0.1s ease;
        MozTransition: all 0.1s ease;

    }
`
const ModalLayer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    opacity: ${props => props.modalOpen ? 0.5 : 0};
    visibility: ${props => props.modalOpen ? 'visible' : 'hidden'};
    transition: all 0.5s;
    background: black;

`

const bell = new Audio(audioSrc);
const alertSound = new Audio(alert);
const chickenBell = new Audio(chicken);
function TimerTemplate() {
    const [audio,setAudio] = useState();
    const [decibelData,setDecibelData] = useState(0);
    const [isDecibelStarted,setIsDecibelStarted] = useState(false);
    const [noisCheckedTime,setNoiseCheckedTime] = useState(0);
    const [tmpDecibelData,setTmpDecibelData] = useState(0);
    const [modalOpen,setModalOpen] = useState(false);
    const [sensitivity,setSensitivity] = useState(1);
    const sensitivityRef = useRef();
    const [isNumberVisible,setIsNumberVisible] = useState(true);
    const [isAudioOn,setIsAudioOn] = useState(true);
    const [isCircle,setIsCircle] = useState(false);
    const [theme,setTheme] = useState({
        "startBtn": "#BA90C6",
        "minuteBtn": "#C0DBEA",
        "containerBackground": "#6FD1B5",
        "timerBackground": "#472C4B",
        "fontColor": "#FDB800",
        "displayBackground": "#EEEAD1",
        "startBtnColor" : "#ffffff",
        "minuteBtnColor" : "#000000",
    });

    const getMicrophone = async () => {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        setAudio(audio);
    }
    const stopMicrophone = () => {
        audio.getTracks().forEach(track => track.stop());
        setAudio(null);

    }

    const toggleMicrophone = () => {
        if(audio){
            stopMicrophone();
        } else {
            getMicrophone();
        }
        setIsDecibelStarted(prev => !prev);
        setDecibelData(0);
    }

    const [shake,setShake] = useState(false);

    const onNoiseReset = (e) => {
        if(e && e.ctrlKey){
            if(!noiseNumber){
                return null
            }
            setNoiseNumber(prev => prev - 1);
        } else {
            if(isAudioOn){
                alertSound.play();
            }
            setNoiseNumber(prev => prev + 1);
            setShake(true);
            setTimeout(()=> setShake(false),700)
        }
    }
    useEffect(() => {
        let tmpAudio = JSON.parse(localStorage.getItem('hideAudio'))
        let tmpNumber = JSON.parse(localStorage.getItem('hideNumber'))
        let tmpIsCircle = JSON.parse(localStorage.getItem('isCircle'))
        if(tmpAudio === false){
            setIsAudioOn(false)
        }
        if(tmpNumber === false){
            setIsNumberVisible(false)
        }
        if(tmpIsCircle === true){
            setIsCircle(true)
        }
    },[])

    useEffect(()=>{
        if(audio){
            try {
                const audioCtx = new AudioContext();
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 2048;
                const audioSrc = audioCtx.createMediaStreamSource(audio);
                audioSrc.connect(analyser);
                const data = new Uint8Array(analyser.frequencyBinCount);


                const intervalId = setInterval(()=>{
                    analyser.getByteFrequencyData(data);
                    let tmp = data.reduce(function add(sum, currValue) {
                        
                        return sum + currValue;
                      }, 0)/10000 * sensitivityRef.current.value;
                    //   console.log(tmp);
                      setTmpDecibelData(tmp);
                      setDecibelData(prev => prev > tmp || prev > 110 ? prev - (prev-tmp)/100 : prev + (tmp-prev)/100);
                  },20);
                  return () => {
                    clearInterval(intervalId);
                  }
            } catch(e) {
                throw(500, e);
            }
        }
        return () => stopMicrophone;
    },[audio])


    useEffect(()=>{
        const checkNoise = ({decibelData}) => {
            let tmpTime = new Date();

            if(decibelData > 100 && tmpTime.getTime()/1000 - noisCheckedTime > 5){
                onNoiseReset();
                setNoiseCheckedTime(tmpTime.getTime()/1000);
            }
        };
        checkNoise({decibelData});
        
    },[decibelData,setDecibelData])

    useEffect(()=>{
        let tmp = localStorage.getItem('sensitivity');
        let tmp2 = localStorage.getItem('colorTheme');
        if(tmp){
            setSensitivity(tmp);
        }
        if(tmp2){
            if(tmp2 === "iron man"){
                setTheme(colorThemeList.ironman);
            } else if(tmp2 === "black and white"){
                setTheme(colorThemeList.blackandwhite);
            } else {
                setTheme(colorThemeList.vintage);
            }
        }
    })
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
    const [noiseNumber,setNoiseNumber] = useState(0);

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
    const [circleKey,setCircleKey] = useState(0);
    const [circleMinute,setCircleMinute] = useState(0);
    const onCircleMinuteClick = (num) => {
        setCircleMinute(prev => prev + num)
    }
    const [isCircleStarted,setIsCircleStarted] = useState(false);
    const onCircleStart = () => {
        if(circleMinute !== 0){
            setIsCircleStarted(true)
        }
    }
    const onCirclePause = () => {
        setIsCircleStarted(false)
    }

    const onCircleReset = () => {
        setIsCircleStarted(false)
        setCircleMinute(0)
        setCircleKey(prev => prev + 1)
    }
    const onCircleComplete = () => {
        chickenBell.play();
        onCircleReset();
    }
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
        // console.log(`width: ${width}px; height: ${height}px`);
        // console.log(`top: ${top}px; left: ${left}px`);
    }

    return(
        <TimerTemplateContainer ref={componentRef} decibelData={decibelData} width={width} modalOpen={modalOpen} isDecibelStarted={isDecibelStarted} theme={theme}>
            <ModalLayer modalOpen={modalOpen}/>
            <ModalBasic setIsCircle={setIsCircle} modalOpen={modalOpen} setTheme={setTheme} setModalOpen={setModalOpen} decibelData={tmpDecibelData} setSensitivity={setSensitivity} sensitivity={sensitivity} sensitivityRef={sensitivityRef} isNumberVisible={isNumberVisible} setIsNumberVisible={setIsNumberVisible} setIsAudioOn={setIsAudioOn}/>
            <div style={{width:width*0.95, display:'flex',justifyContent:'space-between', marginBottom: width * 0.01}}>
                <div style={{display:'flex'}}>
                    <img className="decibelBtn" src={decibelMeterIcon} alt='decibel meter' style={{width:width * 0.05,height:width * 0.05}} onClick={toggleMicrophone}></img>
                    {isNumberVisible ? <div className='noiseNumberWrapper'><span className={shake ? 'shake' : null} onClick={e => onNoiseReset(e)} title="클릭하여 횟수 추가&#10;컨트롤 + 클릭하여 횟수 감소">떠든횟수: {noiseNumber}</span>
                    <div className="refresh" onClick={()=> setNoiseNumber(0)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width * 0.025} height={width * 0.025} viewBox="0 0 50 50">
                    <path d="M 25 2 A 1.0001 1.0001 0 1 0 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 18.307314 7.130711 12.364806 12 8.5195312 L 12 15 A 1.0001 1.0001 0 1 0 14 15 L 14 6.5507812 L 14 5 L 4 5 A 1.0001 1.0001 0 1 0 4 7 L 10.699219 7 C 5.4020866 11.214814 2 17.712204 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z"></path>
                    </svg></div>
                    </div> : null}
                </div>
                <SettingIcon src={settingIcon} style={{width:width * 0.05,height:width * 0.05}} onClick={()=>setModalOpen(true)}></SettingIcon>
            </div>
            {isCircle
            ?<div>
                <div style={{display:"flex", justifyContent:'center'}}>
            <CountdownCircleTimer
            key = {circleKey}
            isPlaying={isCircleStarted}
            duration={circleMinute}
            colors={['#04B404', '#FFFF00', '#FF8000', '#FF0000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={onCircleComplete}
            size={width/3}
            strokeWidth={width/35}
            strokeLinecap="butt"
          //   trailColor="yellow"
          >
                {(remainingTime) => {
                    return(
                        <div className="timer">
                            <div className="value" style={{fontSize: width/160 + 'rem'}}>{remainingTime.remainingTime}</div>
                        </div>
                    )
                }}
          </CountdownCircleTimer>
          </div>
          <div style={{display:'flex',justifyContent:'between', alignItems: 'center', marginTop: width*0.02 + 'px'}}>
            <div style={{marginRight: width*0.02 + 'px'}}>
                <MinuteBtn width={width * 0.5} theme={theme} onClick={()=>onCircleMinuteClick(60)}>1</MinuteBtn>
                <MinuteBtn width={width * 0.5} theme={theme} onClick={()=>onCircleMinuteClick(180)}>3</MinuteBtn>
                <MinuteBtn width={width * 0.5} theme={theme} onClick={()=>onCircleMinuteClick(300)}>5</MinuteBtn>
                <MinuteBtn width={width * 0.5} theme={theme} onClick={()=>onCircleMinuteClick(600)}>10</MinuteBtn>
            </div>
            <div  style={{}}>
                {isCircleStarted ? <StartBtn onClick={onCirclePause} width={width * 0.5} theme={theme}>pause</StartBtn>  : <StartBtn onClick={onCircleStart} width={width * 0.5} theme={theme} style={{marginRight:width * 0.01 + 'px'}}>start</StartBtn> }
                <StartBtn onClick={onCircleReset} width={width * 0.5} theme={theme} style={{marginRight: '0'}}>reset</StartBtn>
            </div>
          </div>
          </div>
          : <TimeDisplayWrapper style={{width:width,height:height,fontSize:width * 0.22 + 'px',lineHeight: width * 0.2 + 'px'}} theme={theme}>
          <TimeDisplay style={{fontSize:width * 0.15 + 'px'}} theme={theme}>
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

      <div className='btnWrapper' style={{left: width * 0.06 + 'px', bottom: width * 0.045+ 'px'}}>
          <MinuteBtn width={width} theme={theme} onClick={()=>setMinute(60)}>1</MinuteBtn>
          <MinuteBtn width={width} theme={theme} onClick={()=>setMinute(180)}>3</MinuteBtn>
          <MinuteBtn width={width} theme={theme} onClick={()=>setMinute(300)}>5</MinuteBtn>
          <MinuteBtn width={width} theme={theme} onClick={()=>setMinute(600)}>10</MinuteBtn>
       </div>
          <div className='startBtnWrapper' style={{right: width * 0.015 + 'px', bottom: width * 0.035 + 'px'}}>
              {isStart ? <StartBtn onClick={onPause} width={width} theme={theme}>pause</StartBtn>  : <StartBtn onClick={onStart} width={width} theme={theme}>start</StartBtn> }
              <StartBtn onClick={onReset} width={width} theme={theme}>reset</StartBtn>
          </div>
      </TimeDisplayWrapper>}

           

        </TimerTemplateContainer>
    )
}



export default TimerTemplate;