useEffect(()=>{
    async function enableStream() {
        try{
            const stream =  await navigator.mediaDevices.getUserMedia(options);
            const audioCtx = new AudioContext();
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;
            const audioSrc = audioCtx.createMediaStreamSource(audio);
            audioSrc.connect(analyser);
            const data = new Uint8Array(analyser.frequencyBinCount);

            
            const ctx = analyserCanvas.current.getContext('2d');
            
            analyserCanvas.height = window.innerHeight;
            analyserCanvas.width = window.innerWidth;
            const draw = dataParm => {
              ctx.fillStyle = 'white';
              ctx.fillRect(0,0,analyserCanvas.current.width,analyserCanvas.current.height)
              ctx.lineWidth = 2;
              ctx.strokeStyle = 'blue';
              const space = analyserCanvas.current.width / dataParm.length;
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
            },20);
            return () => {
              clearInterval(intervalId);
            }
          } catch(err){
            throw(500,err);
          }
    }
    if (!audio) {
        enableStream();
    } else {
        return function cleanup() {
          audio.getTracks().forEach(track => {
                track.stop();
            });
        }
    }
},[audio])
