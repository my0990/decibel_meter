import styled from'styled-components';

const ClockBtn = styled.button`
    appearance: none;
    background-color: #000000;
    border: 2px solid #1A1A1A;

    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-weight: 600;
    line-height: normal;
    margin: 0;
    outline: none;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    will-change: transform;

   
    margin: 15px;
    
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

export default ClockBtn;