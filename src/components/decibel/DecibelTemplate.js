import React from "react";
import styled from "styled-components";

const DecibelTemplateContainer = styled.div`

    h1 {margin: 0}
`

const DecibelTemplate = () => {
    return(
        <DecibelTemplateContainer>
            <h1>데시벨</h1>
        </DecibelTemplateContainer>
    )
}

export default DecibelTemplate;