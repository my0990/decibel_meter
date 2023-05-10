const getAudioApi = ({audio,setAudio,setDecibelData}) => {
    const getMicrophone = async () => {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        setAudio(audio);
        console.log(audio);
    }
    const stopMicrophone = () => {
        audio.getTracks().forEach(track => track.stop());
        setAudio(null);
        console.log(audio);
    }
    
    const toggleMicrophone = () => {
        if(audio){
            stopMicrophone();
        } else {
            getMicrophone();
        }
    }
    
    const draw = () => {
        if(audio){
            try {
                const audioCtx = new AudioContext();
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 2048;
                const audioSrc = audioCtx.createMediaStreamSource(audio);
                audioSrc.connect(analyser);
                const data = new Uint8Array(analyser.frequencyBinCount);
                const intervalId = setInterval(()=>{
                    analyser.getByteFrequencyData(data);
                    let tmp = data.reduce(function add(sum, currValue) {
                        return sum + currValue;
                      }, 0)/1000;
                      setDecibelData(tmp);
                  },1000);

                  return () => {
                    console.log('cleared');
                    clearInterval(intervalId);
                  }
            } catch(e) {
                throw(500, e);
            }
        }
        return () => stopMicrophone;
    }


    return {getMicrophone, stopMicrophone, toggleMicrophone, draw}
}

export default getAudioApi
