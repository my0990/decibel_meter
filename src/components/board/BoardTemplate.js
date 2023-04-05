import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
const Container = styled.div`
    background-color: yellow;
    width: 500;
    height: 300;
    border: none;
    overflow: hidden;
    .ql-container {
        background-color: skyblue;
    }
`
const Wrapper = styled.div`
    margin: 30px;
    min-width: 1000px;
    border-radius: 10px;
    height: 500px;
    border: none;

`
export default () => {
    const { quill, quillRef } = useQuill();
  
    console.log(quill);    // undefined > Quill Object
    console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }
  
    return (
    <Container>
        <Wrapper>
            <div ref={quillRef} />
        </Wrapper>
      </Container>

    );
  };