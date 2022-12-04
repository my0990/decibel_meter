import React from 'react'
import styled from "styled-components";



const BoardTemplateContainer = styled.div`
    background-color: gray;
    .board{
        margin: 10px;
        padding: 10px;
        height: 85%;
        font-size: 40px;
        color: white;
        background-color: #497959;
        border-radius: 10px;
        border: #B78240 solid 10px;
    }
    h1 {
        text-align: center;
    }
`



const BoardTemplate = () => {
    return(
        <BoardTemplateContainer >
            <div className="board" contentEditable>
                Pure Chalk Board
            </div>
        </BoardTemplateContainer>
    )
}

export default BoardTemplate;