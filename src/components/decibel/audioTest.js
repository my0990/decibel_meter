import React from "react";
import { useRef,useState, useEffect } from "react";

const AudioTest = () => {
    const [decibel,setDecibel] = useState(0);
    const analyserCanvas = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const options = {
        video: false,
        audio: true,
      };
    let volumnArr = [];
    const [sensivility,setSensivility] = useState(1);
    const sensivilityRef = useRef(1);
    const onChange = (e) => {
      sensivilityRef.current = e.target.value;
      setSensivility(e.target.value);
    }
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
                
                
                analyserCanvas.current.width = 300;
                analyserCanvas.current.height = 100;
                const draw = dataParm => {
                  ctx.fillStyle = 'white';
                  ctx.fillRect(0,0,analyserCanvas.current.width,analyserCanvas.current.height)
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = 'blue';
                  const space = analyserCanvas.current.width / dataParm.length;

                  let values = 0;
                  let length = 200;
                  for(var i=0; i<length; i++){
                    values += dataParm[i];
                  }
                  let volumn = Math.floor(values /length);

                  // console.log((Math.max(...dataParm)));
                  // useCallback(() => setNoise(Math.max(...dataParm)),[]);
                  // setNoise(Math.max(...dataParm));
                  // let volumn = Math.floor((Math.max(...dataParm)/255)*100);


                  volumnArr.push(volumn);
                  if(volumnArr.length >10){
                    volumnArr.shift();
                  }
                  let volumnValue = Math.floor((volumnArr.reduce((a,b) => a+b, 0))/10*sensivilityRef.current);
                  console.log(sensivilityRef.current)


                  // console.log(volumn);
                  // dataParm.forEach((value, i) => {
                  //   ctx.beginPath();
                  //   ctx.moveTo(space * i, analyserCanvas.current.height);
                  //   ctx.lineTo(space * i, analyserCanvas.current.height - value*0.5);
                  //   ctx.stroke();
                  // }
                  // );
                  if(volumnValue <= 50){
                    ctx.fillStyle= 'green';
                  } else if(volumnValue<=70){
                    ctx.fillStyle= '#e2703a';
                  } else {
                    ctx.fillStyle= 'red';
                  }
                  // ctx.fillStyle= 'black';
                  ctx.font = "italic bold 60px Arial, sans-serif";
                  const textWidth = ctx.measureText(volumnValue).width;
                  ctx.fillText(volumnValue,150-(textWidth/2),50);
                  
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
                },100);
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
    },[])

    return (
      <div>
        <canvas ref={analyserCanvas}></canvas>
        <h2 style={{textAlign:"center"}}>
        <input type="range" id="sensivility" name="sensivility" value={sensivility} min="0" max="3" step="0.1" onChange={onChange}></input>
        
        </h2>
      </div>
    )
}

export default AudioTest;
 