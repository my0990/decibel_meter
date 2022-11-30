import React,{ useEffect, useState } from "react";
import AudioVisualiser from "./AudioVisualiser";



const AudioAnalyser = ({audio}) => {
    let [audioData,setAudioData] = useState(new Uint8Array(0));
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let source = null;
    let rafId = null;

    useEffect(()=>{
        try {
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            source = audioContext.createMediaStreamSource(audio);
            source.connect(analyser);
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
        console.log(dataArray);
        analyser.getByteTimeDomainData(dataArray);
        setAudioData(dataArray);
        rafId = requestAnimationFrame(tick);
    }
    return(
        <AudioVisualiser audioData={audioData}/>
    )
}

export default AudioAnalyser;