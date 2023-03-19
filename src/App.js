import React from 'react'
import Split from 'react-split';
import styled from 'styled-components';
import BoardTemplate from './components/board/BoardTemplate';
import TimerTemplate from './components/timer/TimerTemplate';
import AudioVisualiser from './components/decibel/AudioVisualiser';
import './App.css';
import useFullscreen from './components/board/useFullscreen';
const Container = styled.div`
  /* min-width: 1024px; */
  height: 100%;
`


function App(){
  const onFulls = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
}
  const {element, triggerFull, exitFull} = useFullscreen(onFulls);
  return (
    <Container ref={element}>
      <Split
        className='flex'
        sizes={[100,0]}
        minSize={0}
      >
            <Split
              direction='vertical'
              style={{height: '100vh'}}
              sizes={[70,30]}
              minSize={0}
            >
              <TimerTemplate/>
              <AudioVisualiser />
            </Split>
            <BoardTemplate triggerFull={triggerFull} exitFull={exitFull} element={element}/>
      </Split>
    </Container>
  );
}

export default App;
