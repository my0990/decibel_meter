import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";


const InputTemplate = styled.div`
    display: flex;
    justify-content: center;
    input{
        cursor: pointer;
    }
    opacity: 0.2;
    &:hover{
        opacity: 1;
    }
`




const RangeInput = ({sensitivity}) => {
    const record = localStorage.getItem('range');

    const [value,setValue] = useState(3);
    const onChange = (e) => {
        setValue(e.target.value);
        localStorage.setItem('range', e.target.value);
    }

    useEffect(()=>{
        if(record){
            setValue(record);
        }
    },[value])
    return(
        <InputTemplate> 
            <input
                type="range" 
                value={value}
                ref={sensitivity}
                min="1.1"
                max="4.9"
                step="0.1"
                onChange={onChange}
            />
        </InputTemplate>
    )
}


export default RangeInput;