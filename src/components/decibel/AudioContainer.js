import AudioTest from "./audioTest";
import styled from "styled-components";
import {useState} from "react";
import React from "react";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
        padding-bottom: 15px;
    }
`

const AudioContainer = () => {
    return(
        <Container>
            <h1>소음측정기</h1>
            <AudioTest />
        </Container>
    )
}

export default AudioContainer;