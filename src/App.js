import React from 'react'
import Split from 'react-split';
import styled from 'styled-components';
import BoardTemplate from './components/board/BoardTemplate';
import TimerTemplate from './components/timer/TimerTemplate';
import DecibelTemplate from './components/decibel/DecibelTemplate';
import './App.css';

const Container = styled.div`
  /* min-width: 1024px; */
  min-height: 768px;
  height: 100%;
`


function App(){

  return (
    <Container>
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
              <TimerTemplate />
              <DecibelTemplate />
            </Split>
            <BoardTemplate />
      </Split>
    </Container>
  );
}

export default App;
