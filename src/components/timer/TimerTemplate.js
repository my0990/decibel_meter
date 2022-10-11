import React from 'react'
import styled from "styled-components";
import { useTimer } from 'react-timer-hook';

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
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 3);

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
    } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    return(
        <TimerTemplateContainer>
            <div style={{fontSize: '100px'}} className="timeDisplay">
                <span>{String(hours).padStart(2,'0')}</span>:<span>{String(minutes).padStart(2,'0')}</span>:<span>{String(seconds).padStart(2,'0')}</span>
            </div>
            <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button> 
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