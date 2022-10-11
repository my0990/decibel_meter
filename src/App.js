import './App.css';
import {useState, useRef} from 'react';
import {useUserMedia} from './lib/useUserMedia';



const AUDIO_OPTIONS = {
  audio: true,
  video: false,
};


function App() {
  const audioRef = useRef();
  const mediaStream = useUserMedia(AUDIO_OPTIONS);

  if (mediaStream && audioRef.current && !audioRef.current.srcObject) {
    audioRef.current.srcObgject = mediaStream;
  }

  function handleCanPlay() {
    audioRef.current.play();
  }
  return (
    <div className="App">
      {/* <audio ref={audio => {this.audio = audio}} controls volume="true" autoPlay/> */}
      <div>
        <div>ddd</div>
        <audio ref={audioRef} onCanPlay={handleCanPlay}/>
      </div>

    </div>
  );
}

export default App;
