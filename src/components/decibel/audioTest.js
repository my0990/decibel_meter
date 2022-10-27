import React from "react";
import { useRef,useState, useEffect, useCallback } from "react";

const AudioTest = () => {
    const [decibel,setDecibel] = useState(0);
    const analyserCanvas = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const options = {
        video: false,
        audio: true,
      };
    
    useEffect(()=>{
        async function enableStream() {
            try{
                const stream =  await navigator.mediaDevices.getUserMedia(options);
                const audioCtx = new AudioContext();
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 2048;
                const audioSrc = audioCtx.createMediaStreamSource(stream);
                audioSrc.connect(analyser);
                const data = new Uint8Array(analyser.frequencyBinCount);

                
                const ctx = analyserCanvas.current.getContext('2d');
                
                analyserCanvas.height = window.innerHeight;
                analyserCanvas.width = window.innerWidth;
                const draw = dataParm => {
                  // console.log(dataParm);
                  // dataParm = [...dataParm];
                  // console.log(dataParm);
                  
                  ctx.fillStyle = 'white';
                  ctx.fillRect(0,0,analyserCanvas.current.width,analyserCanvas.current.height)
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = 'blue';
                  const space = analyserCanvas.current.width / dataParm.length;
                  // console.log((Math.max(...dataParm)));
                  // useCallback(() => setNoise(Math.max(...dataParm)),[]);
                  // setNoise(Math.max(...dataParm));
                  let volumn = Math.max(...dataParm);
                  
                  
                  // console.log(volumn);
                  dataParm.forEach((value, i) => {
                    ctx.beginPath();
                    ctx.moveTo(space * i, analyserCanvas.current.height);
                    ctx.lineTo(space * i, analyserCanvas.current.height - value*0.5);
                    ctx.stroke();
                  }
                  );
                  // if(volumn> 100){
                  //   audioArr++;
                  // } else if(audioArr>0){
                  //   audioArr--;
                  // }
                  // console.log(audioArr);
                  // ctx.beginPath();
                  // ctx.moveTo(10, analyserCanvas.current.height);
                  // ctx.lineTo(10, analyserCanvas.current.height - volumn);
                  // ctx.stroke();
                };

                // const loopingFunction = () => {
                //   requestAnimationFrame(loopingFunction);
                //   analyser.getByteFrequencyData(data);
                //   draw(data);
                // };

                // requestAnimationFrame(loopingFunction);
                const intervalId = setInterval(()=>{
                  analyser.getByteFrequencyData(data);
                  draw(data);
                },200);
                return () => {
                  clearInterval(intervalId);
                }
              } catch(err){
                throw(500,err);
              }
        }
        if (!mediaStream) {
            enableStream();
        } else {
            return function cleanup() {
                mediaStream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }
    })

    return (
      <div>
        <canvas ref={analyserCanvas}></canvas>
        <h2 style={{textAlign:"center"}}>
          {decibel}
        </h2>
      </div>
    )
}

export default AudioTest;
 