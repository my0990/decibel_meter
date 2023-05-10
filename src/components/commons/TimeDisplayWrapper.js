import styled from "styled-components";


const TimerDisplayWrapperBlock = styled.div`
    background: #EEEAD1;
    border-radius: 10px;
    padding: 2%;
    // position: absolute;
    position: relative;
    box-sizing: border-box;
`


const TimeDisplayWrapper = ({children, ...rest}) => {
    return(
        <TimerDisplayWrapperBlock {...rest}>
            {children}
        </TimerDisplayWrapperBlock>
    )
}

export default TimeDisplayWrapper;