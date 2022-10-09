import React from 'react'
import styled from "styled-components";

const TimerTemplateContainer = styled.div`
    background-color: hotpink;
`
const TimerTemplate = () => {
    return(
        <TimerTemplateContainer>
            <h1>타이머</h1>
        </TimerTemplateContainer>
    )
}

export default TimerTemplate;