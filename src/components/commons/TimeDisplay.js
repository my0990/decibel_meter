import styled from "styled-components"

const TimeDisplayBlock = styled.div`
        font-family: Major Mono Display;
        color: #FDB800;
        background: #472C4B;
        // padding: 1rem;
        // margin: 0.5rem;
        border-radius: 10px;
        // font-weight: bold;
        // border: 10px solid #EEEAD1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-item: center;
        height: 60%;
        .caret {
            caret-color: transparent;
        }
        input {
            font-weight: bold;
            text-align: center;
            width: 25%;
            // height: 240px;
            display: inline;
            background: #472C4B;
            border: none;
            color: #FDB800;
            font-family: Major Mono Display;
            border-radius: 20px;
            outline: none;

        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
  
        input[type=number] {
            -moz-appearance: textfield;
        }
`
const TimeDisplay = ({children,...rest}) => {
    return (
        <TimeDisplayBlock {...rest}>{children}</TimeDisplayBlock>
    )
}

export default TimeDisplay;
    