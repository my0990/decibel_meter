import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import RangeInput from './RangeInput';
import angry from '../../imgs/angry.png';
import suspicious from '../../imgs/suspicious.png';
import sleep from '../../imgs/basic.png';
import happy from '../../imgs/happy.png';


const DecibelTemplateContainer = styled.div`
    overflow: hidden;
    // display: flex;
    background-color: white;
    justify-content: center;
    // flex-direction: column;

    .alertRecord {
        cursor: pointer;
        font-family: Noto Sans KR;
        text-align: center;
        margin-bottom: 0;
    }
    .decibel_menu_container {
        position: absolute;
        right: 10px;
        top: 10px;
        float: right;
        display: flex;
        justify-content: end;
        .decibel_menu_wrapper {
            margin: 0 20px 0 0;

        }
    }
    .decibel_start_btn {
        width: 100%;
        height: 300px;
        text-align: center;
        display: flex;

        position: relative;
        justify-content: center;
        align-items: center;
    }
    img {
        display: block;
        margin:  10px auto;
    }

`
const SpaceDiv = styled.div`
    width: 300px;
    height: 150px;
    display: block;
`
const TestDiv = styled.div`
    background-color:  ${props => props.color > 40 ? "red" : props.color > 30 ? "orange" :  props.color > 20? "yellow" : "green"};
    transition: all 1.5s ease;
    WebkitTransition: all 1.5s ease;
    MozTransition: all 1.5s ease;
    width: 300px; 
    height: 300px;

`
const settings = {
    bars: 3000,
    spacing: 6,
    width: 10,
    height: 200
  };

const AudioVisualiser = ({audioData}) => {
    const volumeRefs = useRef(new Array(0));
    const [alert,setAlert] = useState(0);
    const sensitivity = useRef(0);
    const prevTime = useRef(true);
    const [audioDataTest,setAudioDataTest] = useState();
    const canvasRef = useRef(null);
    const [audio,setAudio] = useState(null);
    // 오디오 미디어 스트림 가져오고 스테이트에 저장
    const getMicrophone = async () => {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        setAudio(audio);
        console.log('test');
    }
    // 오디오 미디어 스트림 중지
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
    }
    const [src,setSrc] = useState(happy);
    const testRef = useRef(1);
    const [color,setColor] = useState(false);

    useEffect(()=>{
        if(audio){
            try {
                const audioCtx = new AudioContext();
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 2048;
                const audioSrc = audioCtx.createMediaStreamSource(audio);
                audioSrc.connect(analyser);
                const data = new Uint8Array(analyser.frequencyBinCount);
                setAudioDataTest(data);

                const ctx = canvasRef.current.getContext('2d');

                canvasRef.current.width = 500;
                canvasRef.current.height = 300;
                
                console.log(data.reduce(function add(sum, currValue) {
                    return sum + currValue;
                  }, 0))
                const cw = canvasRef.current.width / 2;
                const ch = canvasRef.current.height / 2;

                // 그릴 텍스트의 넓이 구하기
                

                
                


                const draw = dataParm => {
                    let e = 0
                    for (let index = 0; index < 512; index++) {
                        e += dataParm[index];
                    }
                    const decibel = Math.floor((e/512)*sensitivity.current.value*0.3);
                    if(decibel<=50){
                        testRef.current = 1
                    } else if(decibel <= 100){
                        testRef.current = 2
                    } else {
                        testRef.current = 3
                    }
                    
                    if(prevTime.current && decibel > 100){
                        setAlert(prev => prev+1);
                        prevTime.current = false;
                        setTimeout(()=>{
                            prevTime.current = true;
                        }, 5000);
                    }
                    if(testRef.current==1){
                        setSrc(happy);
                    } else if(testRef.current==2){
                        setSrc(suspicious);
                    } else {
                        setSrc(angry);
                    }
                    
                    // test
                    volumeRefs.current.unshift(decibel);
                    if(volumeRefs.current.length > 500){
                        volumeRefs.current.pop()
                    }
                    

  
                    // 300
                    const height = canvasRef.current.height/2;
                    // 150
                    const width = canvasRef.current.width;

                    const textWidth = ctx.measureText(decibel).width;
                    let x = 0
                    const sliceWidth = (width)/500;
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#000000';
                    ctx.clearRect(0, 0, width, height*2);
                    ctx.beginPath();
                    ctx.moveTo(0,volumeRefs.current[-1]);
                    for (const item of volumeRefs.current) {
                        const y = item;
                        ctx.lineTo(x, (-y+200));
                        x += sliceWidth;
                      }
                      ctx.lineTo(x,volumeRefs.current[-1]);
                      ctx.stroke();

                    // ctx.fillStyle = 'white';
                    // ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    // ctx.fillStyle = 'black';
                    // ctx.font = 'bold 100px Arial';
                    // ctx.fillText(
                    //     decibel,
                    //     cw - (textWidth / 2),
                    //     ch + 30
                    //     );
          
                    // ctx.fill();

                };
                const intervalId = setInterval(()=>{
                    analyser.getByteFrequencyData(data);
                    let tmp = data.reduce(function add(sum, currValue) {
                        return sum + currValue;
                      }, 0)/1000;
                    setColor(tmp);
                    draw(data);
                  },10);
                  return () => {
                    console.log('cleared');
                    clearInterval(intervalId);
                  }
            } catch(e) {
                throw(500, e);
            }
        }
        return () => stopMicrophone;
    },[audio])


    return(
        <DecibelTemplateContainer>
            <div className='decibel_start_btn'>
                {audio 
                    ? <canvas ref={canvasRef} onClick={toggleMicrophone}/> 
                    :<button onClick={toggleMicrophone}>
                        소음측정 시작
                    </button>
                }
                <div className='decibel_menu_container'>
                    <div className="decibel_menu_wrapper">
                        <p 
                            title="클릭하여 삭제"
                            className="alertRecord"
                            onClick={()=> setAlert(0)}
                        >
                                시끄러웠던 횟수: {alert}
                        </p>
                        <div>
                            {audio 
                                ? <img src={src} width='100px' height='100px' /> 
                                : <img src={sleep} width='100px' height='100px' />
                            }
                        </div>
                        <RangeInput sensitivity={sensitivity}/>
                        
                    </div>
                </div>
            </div>
            <TestDiv color={color}>{color}</TestDiv>

        </DecibelTemplateContainer>
    )
}

export default AudioVisualiser;




