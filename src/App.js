import logo from './logo.svg';
import './App.css';
import {useState, useRef} from 'react'

function App() {
  // const [stream,setStream] = useState();
  // const audio = useRef();
  async function getMedia(constraints){
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });

    this.audio.srcObject = stream;
    } catch (err) {

    }
  }
  getMedia();
  return (
    <div className="App">
      <audio ref={audio => {this.audio = audio}} controls volume="true" autoPlay/>
    </div>
  );
}

export default App;
