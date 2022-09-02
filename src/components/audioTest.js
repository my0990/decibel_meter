
import { useRef,useState, useEffect } from "react";

const AudioTest = () => {
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
                console.log('data:', data)
                
                const ctx = analyserCanvas.current.getContext('2d');
          
                const draw = dataParm => {
                  dataParm = [...dataParm];
                  ctx.fillStyle = 'white';
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = '#d5d4d5';
                  const space = analyserCanvas.current.width / dataParm.length;
                  dataParm.forEach((value, i) => {
                    ctx.beginPath();
                    ctx.moveTo(space * i, analyserCanvas.current.height);
                    ctx.lineTo(space * i, analyserCanvas.current.height - value);
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
        <canvas ref={analyserCanvas} className=""></canvas>

    )
}

export default AudioTest;
 