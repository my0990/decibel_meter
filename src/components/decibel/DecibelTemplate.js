import React from "react";
import styled from "styled-components";
import AudioContainer from "./AudioContainer";

const DecibelTemplateContainer = styled.div`
    background-color: yellow;
    h1 {margin: 0}
`

const DecibelTemplate = () => {
    return(
        <DecibelTemplateContainer>
            <h1>데시벨</h1>
            {/* <AudioContainer /> */}
        </DecibelTemplateContainer>
    )
}

export default DecibelTemplate;