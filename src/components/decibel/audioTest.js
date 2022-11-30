import React from "react";
import { useRef,useState, useEffect, useCallback } from "react";
import AudioAnalyser from "./AudioAnalyser";


const AudioTest = () => {
    const [decibel,setDecibel] = useState(0);
    const analyserCanvas = useRef(null);
    const [audio,setAudio] = useState(null);
    const options = {
        video: false,
        audio: true,
      };
    const canvasRef = useRef(null);
    const sensivilityRef = useRef(1);
    const [sensivility,setSensivility] = useState(1);

    const getMicrophone = async () => {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      setAudio(audio)
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
    }
    let [audioData,setAudioData] = useState(new Uint8Array(0));
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let source = null;
    let rafId = null;
    let volumnArr = [];
    const draw = (dataParm) => {

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0,0,canvasRef.current.width,canvasRef.current.height)
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'blue';


      let values = 0;
      let length = 200;
      for(var i=0; i<length; i++){
        values += dataParm[i];
      }
      let volumn = Math.floor(values /length);

      volumnArr.push(volumn);
      if(volumnArr.length >10){
        volumnArr.shift();
      }
      let volumnValue = Math.floor((volumnArr.reduce((a,b) => a+b, 0))/10*sensivilityRef.current);


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
      ctx.fillText(Math.max(...dataParm) - 128,150-(textWidth/2),50);
  }

    useEffect(()=>{
        try {
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            
            source = audioContext.createMediaStreamSource(audio);
            source.connect(analyser);
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            rafId = requestAnimationFrame(tick);

            
            return () => {
                cancelAnimationFrame(rafId);
                analyser.disconnect();
                source.disconnect();
            }
        } catch (e) {
            console.log(e);
        }

    },[audio])

    const tick = () => {

        draw(dataArray);
        analyser.getByteTimeDomainData(dataArray);
        setAudioData(dataArray);
        rafId = requestAnimationFrame(tick);
    }



    return (
      <div>
        {/* <canvas ref={analyserCanvas}></canvas>
        <h2 style={{textAlign:"center"}}>
          {decibel}
        </h2> */}
        <button onClick={toggleMicrophone}>
          {audio ? 'stop' : 'get'}
        </button>
        <canvas ref={canvasRef} />
        {/* <AudioAnalyser audio={audio} /> */}
      </div>
    )
}

export default AudioTest;
 