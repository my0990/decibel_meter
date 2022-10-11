
import { useRef,useState, useEffect, useCallback } from "react";

const AudioTest = () => {
    const [word,setWord] = useState('조용하다');
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
                let count = 1;
                analyserCanvas.height = window.innerHeight;
                analyserCanvas.width = window.innerWidth;
                const draw = dataParm => {
                  dataParm = [...dataParm];
                  
                  if(count==1){
                    console.log(dataParm);
                    count++;
                  }
                  ctx.fillStyle = 'white';
                  ctx.fillRect(0,0,analyserCanvas.current.width,analyserCanvas.current.height)
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = 'blue';
                  const space = analyserCanvas.current.width / dataParm.length;
                  // console.log((Math.max(...dataParm)));
                  // useCallback(() => setNoise(Math.max(...dataParm)),[]);
                  // setNoise(Math.max(...dataParm));
                  if(Math.max(...dataParm) > 200){
                    setWord('시끄럽다');
                  }
                  dataParm.forEach((value, i) => {
                    
                    ctx.beginPath();
                    ctx.moveTo(space * i, analyserCanvas.current.height);
                    ctx.lineTo(space * i, analyserCanvas.current.height - value*0.5);
                    ctx.stroke();
                  }
                  );
                };

                const loopingFunction = () => {
                  requestAnimationFrame(loopingFunction);
                  analyser.getByteFrequencyData(data);
                  draw(data);
                };

                requestAnimationFrame(loopingFunction);
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
          {word}
        </h2>
      </div>
    )
}

export default AudioTest;
 