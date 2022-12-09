import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";



const AudioVisualiser = ({audioData}) => {
    
    const DecibelTemplateContainer = styled.div`
        overflow: hidden;
        h1 {margin: 0}
    `
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
        console.log('audio');
    }

    const canvasRef = useRef(null);

    const draw = () => {
        console.log(audioData);
        
        const canvas = canvasRef.current;
        // const height = canvas.height;
        // const width = canvas.width;
        // const context = canvas.getContext('2d');
        // let x = 0;
        // const sliceWidth = (width * 1.0 ) / data.length;

        // context.lineWidth = 2;
        // context.strokeStyle = '#000000';
        // context.clearRect(0,0, width, height);

        // context.beginPath();
        // context.moveTo(0, height/2);

        // for (const item of data){
        //     const y = (item / 255.0) * height;
        //     context.lineTo(x,y);
        //     x += sliceWidth;
        // }

        // context.lineTo(x, height/2);
        // context.stroke();
    }
    // useEffect(()=>{
    //     const intervalId = setInterval(()=>{
    //         draw();
    //     },1000)
    //     return () => clearInterval(intervalId);
    // })

    return(
        <DecibelTemplateContainer>
            <div>
                <button onClick={toggleMicrophone}>
                    {audio ? 'Stop microphone' : 'Get microphone input'}
                </button>
            </div>
        </DecibelTemplateContainer>
    )
}

export default AudioVisualiser;




