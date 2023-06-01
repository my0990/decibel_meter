import { Children } from 'react';
import styled from'styled-components';

const StartBtnStyle = styled.button`
    appearance: none;
    background-color: ${(props) => props.theme.startBtn};
    font-family: Major Mono Display;
    box-sizing: border-box;
    color: ${(props) => props.theme.startBtnColor};
    cursor: pointer;
    display: inline-block;
    border: none;
    border-radius: 10px;
    line-height: normal;
    outline: none;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    will-change: transform;
    font-weight: 600;
    margin-right: ${(props) => props.width*0.035}px;
    font-size: ${(props) => props.width * 0.04}px;
    width: ${(props) => props.width * 0.195}px;
    height: ${(props) => props.width * 0.08}px;
    
    &:disabled {
    pointer-events: none;
    }

    &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: none;
    transform: translateY(0);
    }
`
const StartBtn = ({children,...rest}) => {
    return(
        <StartBtnStyle {...rest}>{children}</StartBtnStyle>
    )
}

export default StartBtn;