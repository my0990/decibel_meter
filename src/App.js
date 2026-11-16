import React from 'react'
import Split from 'react-split';
import styled from 'styled-components';
import BoardTemplate from './components/board/BoardTemplate';
import TimerTemplate from './components/timer/TimerTemplate';

import './App.css';
import NewSiteNotice from './components/notice/NewSiteNotice';
const Container = styled.div`
  /* min-width: 1024px; */
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
              // sizes={[100,0]}
              minSize={0}
            >
              <TimerTemplate/>
              {/* <AudioVisualiser /> */}
            </Split>
            <BoardTemplate/>
      </Split>
      <NewSiteNotice />
    </Container>
  );
}

export default App;
