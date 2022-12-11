import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";


const DecibelTemplateContainer = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const AudioVisualiser = ({audioData}) => {
    

    const canvasRef = useRef(null);
    const [audio,setAudio] = useState(null);
    // 오디오 미디어 스트림 가져오고 스테이트에 저장
    const getMicrophone = async () => {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        setAudio(audio);
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
    useEffect(()=>{
        if(audio){
            try {
                const audioCtx = new AudioContext();
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 2048;
                const audioSrc = audioCtx.createMediaStreamSource(audio);
                audioSrc.connect(analyser);
                const data = new Uint8Array(analyser.frequencyBinCount);
                

                const ctx = canvasRef.current.getContext('2d');

                canvasRef.current.width = 300;
                canvasRef.current.height = 150;
                

                const cw = canvasRef.current.width / 2;
                const ch = canvasRef.current.height / 2;

                // 그릴 텍스트의 넓이 구하기
                

                
                


                const draw = dataParm => {
                    let e = 0
                    for (let index = 0; index < 512; index++) {
                        e += dataParm[index];
                    }
                    const decibel = Math.floor(e/1024);
                    const textWidth = ctx.measureText(decibel).width;
                    

                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.fillStyle = 'black';
                    ctx.font = 'bold 100px Arial';
                    ctx.fillText(
                        decibel,
                        cw - (textWidth / 2),
                        ch + 30
                        );
          
                    ctx.fill();
                    

                };
                const intervalId = setInterval(()=>{
                    analyser.getByteFrequencyData(data);
                    draw(data);
                  },100);
                  return () => {
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
                {audio ? <canvas ref={canvasRef} /> : null}
                <button onClick={toggleMicrophone}>
                    {audio ? 'Stop microphone' : 'Get microphone input'}
                </button>
        </DecibelTemplateContainer>
    )
}

export default AudioVisualiser;




