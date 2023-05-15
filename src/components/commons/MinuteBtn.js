import styled from "styled-components";
import React from "react";

const MinuteBtnStyle = styled.button`
    border: none;
    border-radius: 5px;
    background-color: #C0DBEA;
    font-family: Major Mono Display;
    color: #363636;
    font-weight: bold;
    cursor: pointer;
    margin-right: ${(props) => props.width*0.019}px;
    font-size: ${(props) => props.width * 0.02}px;
    width: ${(props) => props.width * 0.057}px;
    height: ${(props) => props.width * 0.049}px;
    &:hover {
    box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
    transform: translate3d(0, -2px, 0);
    }

    &:focus {
    box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
    }
`

const MinuteBtn = ({children,...rest}) => {
    return(
        <MinuteBtnStyle {...rest}>
            {children}
        </MinuteBtnStyle>
    )
}

export default MinuteBtn;