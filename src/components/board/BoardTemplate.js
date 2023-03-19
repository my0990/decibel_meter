import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import expandIcon from "../../imgs/expand.png";
import exitIcon from "../../imgs/fullscreen.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';

const BoardTemplateContainer = styled.div`
    background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    .btnWrapper {
        
        position: absolute;
        right: 30px;
        bottom: 50px;

        button {
            opacity: 0.5;
            width: 30px;
            height: 30px;
            margin: 5px;
            cursor: pointer;
            &:hover{
                opacity: 1;
            }
        }
    }
    .board{
        margin: 10px;
        padding: 10px;
        height: 90%;
        font-size: 40px;
        color: white;
        background-color: #497959;
        border-radius: 10px;
        border: #B78240 solid 10px;
    }
    h1 {
        text-align: center;
    }

    .expand {
        overflow: hidden;
        width: 60px;
        height: 60px;
        position: absolute;
        top: 20px;
        right: 20px;
        opacity: 10%;
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
            opacity: 100%;
        }
        
    }
`



const BoardTemplate = ({triggerFull, exitFull, element}) => {
    const [isFullScreen,setIsFullScreen] = useState(false);
    const [fontSize,setFontSize] = useState(40);
    const onExpand = () => {
        if(!isFullScreen){
            triggerFull();
            setIsFullScreen(true);
        } else {
            exitFull();
            setIsFullScreen(false);
        }
    }

    return(
        <BoardTemplateContainer>
            <img 
                src={isFullScreen ? exitIcon : expandIcon} 
                className="expand" 
                onClick={onExpand}
                alt="전체화면"
            ></img>
            <div className="board" contentEditable style={{fontSize: fontSize + 'px'}} /> 
            <div className='btnWrapper'>
                <button>
                    <FontAwesomeIcon icon={faPlus} onClick={()=>{setFontSize(prev => prev + 10)}}/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faMinus } onClick={()=>{setFontSize(prev => prev - 10)}}/>
                </button>
            </div>

        </BoardTemplateContainer>
    )
}

export default BoardTemplate;