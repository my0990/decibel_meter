import React from "react";
import styled from "styled-components";
import AudioContainer from "./AudioContainer";

const DecibelTemplateContainer = styled.div`
    overflow: hidden;
    h1 {margin: 0}
`

const DecibelTemplate = () => {
    return(
        <DecibelTemplateContainer>
            <h1>데시벨</h1>
            <AudioContainer />
        </DecibelTemplateContainer>
    )
}

export default DecibelTemplate;