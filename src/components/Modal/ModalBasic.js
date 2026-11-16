import styled from "styled-components";
import { useRef, useEffect } from "react";
import {colorThemeList} from "./colorThemeList";
const ModalBasicBlock = styled.div`
    /* 모달창 크기 */
    width: 500px;

    /* 최상단 위치 */
    z-index: 999;
    font-family: Major Mono Display;
    opacity: ${props => props.modalOpen ? 1 : 0};
    visibility: ${props => props.modalOpen ? 'visible' : 'hidden'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.5s;
    /* 모달창 디자인 */
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    .header {
        font-size: 30px;
        padding: 0 15px;
        div {
            display: flex;
            align-items: center;
        }
        display: flex;
        justify-content: space-between;
        button {
            border: none;
            background: none;
            font-size: 20px;
            font-family: Major Mono Display;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
                scale: 1.3;
            }
        }                                    
    }

    .marginTop {
        margin-top: 30px;
    }
    .noiseSensitivityWrapper {
        .noiseSensitivityDisplay {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            .display {
                width: 100px;
                height: 100px;
                background: #d9d9d9;
                border-radius: 10px;
                color: #E97777;
                display: flex;
                justify-content:center;
                align-items: center;
                font-size: 40px;
            }
            .slider {
                width: 300px;
                cursor: pointer;
            }
        }
    }
    .colorThemeWrapper {
        display: flex;
        justify-content: space-between;
        select {
            margin-right: 30px;
        }
    }
    .toggleWrapper {
        display: flex;
        margin-top: 30px;
        justify-content: space-between;
        margin-right: 30px;
    }
    .toggleSwitch {
        width: 50px;
        height: 25px;
        display: block;
        position: relative;
        border-radius: 30px;
        background-color: #fff;
        box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
        cursor: pointer;
      }
      
      .toggleSwitch .toggleButton {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        border-radius: 50%;
        background: black;
      }
      
      #toggle:checked ~ .toggleSwitch {
        background: black;
      }
      
      #toggle:checked ~ .toggleSwitch .toggleButton {
        left: calc(100% - 22px);
        background: #fff;
      }


      #toggle:checked ~ .toggleSwitch {
        background: black;
      }
      
      #toggle:checked ~ .toggleSwitch .toggleButton {
        left: calc(100% - 22px);
        background: #fff;
      }
      
      .toggleSwitch, .toggleButton {
        transition: all 0.2s ease-in;
      }
      .audioSwitch {
        width: 50px;
        height: 25px;
        display: block;
        position: relative;
        border-radius: 30px;
        background-color: #fff;
        box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
        cursor: pointer;
      }
      
      .audioSwitch .audioButton {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        border-radius: 50%;
        background: black;
      }
      
      #audio:checked ~ .audioSwitch {
        background: black;
      }
      
      #audio:checked ~ .audioSwitch .audioButton {
        left: calc(100% - 22px);
        background: #fff;
      }


      #audio:checked ~ .audioSwitch {
        background: black;
      }
      
      #audio:checked ~ .audioSwitch .audioButton {
        left: calc(100% - 22px);
        background: #fff;
      }
      
      .audioSwitch, .audioButton {
        transition: all 0.2s ease-in;
      }

       .circleSwitch .circleButton {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        border-radius: 50%;
        background: black;
      }
      
      #circle:checked ~ .circleSwitch {
        background: black;
      }
      
      #circle:checked ~ .circleSwitch .circleButton {
        left: calc(100% - 22px);
        background: #fff;
      }


      #circle:checked ~ .circleSwitch {
        background: black;
      }
      
      #circle:checked ~ .circleSwitch .circleButton {
        left: calc(100% - 22px);
        background: #fff;
      }
      
      .circleSwitch, .circleButton {
        transition: all 0.2s ease-in;
      }

        .circleSwitch {
        width: 50px;
        height: 25px;
        display: block;
        position: relative;
        border-radius: 30px;
        background-color: #fff;
        box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
        cursor: pointer;
      }
`

const ModalBasic = ({modalOpen,setModalOpen, decibelData, setSensitivity, sensitivity, sensitivityRef, setTheme, setIsNumberVisible, isNumberVisible, setIsAudioOn, setIsCircle}) => {
    const modalRef = useRef(null);
    const numberRef = useRef();
    const audioRef = useRef();
    const circleRef = useRef();
    useEffect(()=>{
        let tmpAudio = JSON.parse(localStorage.getItem('hideAudio'))
        let tmpNumber = JSON.parse(localStorage.getItem('hideNumber'))
        let tmpIsCircle = JSON.parse(localStorage.getItem('isCircle'))
        if(tmpAudio === false){
            audioRef.current.checked = true;
        }
        if(tmpNumber === false) {
            numberRef.current.checked = true;
        }
        if(tmpIsCircle === true) {
            circleRef.current.checked = true;
        }
    },[])
    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (e) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setModalOpen(false);
            }
        };
        
        // 이벤트 핸들러 등록
        document.addEventListener('mousedown', handler);
        // document.addEventListener('touchstart', handler); // 모바일 대응
        
        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener('mousedown', handler);
            // document.removeEventListener('touchstart', handler); // 모바일 대응
        };
    });

    const onChange = (e) => {
        setSensitivity(e.target.value);
        localStorage.setItem('sensitivity', e.target.value)
    }

    const themeChange = (e) => {
        if(e.target.value === "iron man"){
            setTheme(colorThemeList.ironman);
            localStorage.setItem('colorTheme','iron man');
        } else if(e.target.value === "black and white"){
            setTheme(colorThemeList.blackandwhite);
            localStorage.setItem('colorTheme','black and white');
        } else {
            setTheme(colorThemeList.vintage);
            localStorage.setItem('colorTheme','vintage')
        }

        
    }
    const hideNumber = () => {
        let tmp = JSON.parse(localStorage.getItem('hideNumber'))
        console.log('tmp: ', tmp)
        if(tmp === false){
            localStorage.setItem('hideNumber',true)
        } else {
            localStorage.setItem('hideNumber',false)
        }

        setIsNumberVisible(prev => !prev)
    }
    const hideAudio = () => {
        let tmp = JSON.parse(localStorage.getItem('hideAudio'))
        console.log('tmp: ', typeof(tmp))
        if(tmp === false){
            localStorage.setItem('hideAudio',true)
        } else {
            localStorage.setItem('hideAudio',false)
        }

        setIsAudioOn(prev => !prev)
    }
    const toggleCircle = () => {
        let tmp = JSON.parse(localStorage.getItem('isCircle'))
        console.log('tmp: ', typeof(tmp))
        if(tmp === false){
            localStorage.setItem('isCircle',true)
        } else {
            localStorage.setItem('isCircle',false)
        }

        setIsCircle(prev => !prev)
    }
    return(
        <ModalBasicBlock modalOpen={modalOpen} ref={modalRef}>
            <div className="header">
                <div>
                    설정
                </div>
                <button className="closeBtn" onClick={()=>setModalOpen(false)}>x</button>
            </div>
            <div className="noiseSensitivityWrapper marginTop">
                <div>소음민감도</div>
                <div className="noiseSensitivityDisplay">
                    <div className="display">{Math.floor(decibelData)}</div>
                    <input className="slider" type="range" value={sensitivity} onChange={onChange} min={1} max={100} step={0.1} ref={sensitivityRef}></input>
                </div>
                <div style={{fontSize:'0.8rem', color: 'gray'}}> 소음 수치가 커질수록 배경색이 변합니다.(초록-노랑-주황-빨강)</div> 
                <div style={{fontSize:'0.8rem', color: 'gray'}}> 소음수치가 100이 넘어가면 떠든 횟수가 1씩 늘어납니다.</div>
            </div>
            <div className="colorThemeWrapper marginTop">
                <div>색상 테마</div>
                <select name="time" onChange={themeChange}>
                    <option value="vintage" >빈티지</option>
                    <option value="iron man">아이언 맨</option>
                    <option value="black and white">블랙 앤 화이트</option>
                </select>
            </div>
            <div className="toggleWrapper">
                <div>떠든횟수 안보이기</div>
                <input type="checkbox" id="toggle" hidden ref={numberRef}/> 
                <label for="toggle" class="toggleSwitch" onClick={hideNumber}>
                <span class="toggleButton"></span>
                </label>
            </div>
            <div className="toggleWrapper">
                <div>삐소리 안나게하기</div>
                <input type="checkbox" id="audio" hidden ref={audioRef}/> 
                <label for="audio" class="audioSwitch" onClick={hideAudio}>
                <span class="audioButton"></span>
                </label>
            </div>
            <div className="toggleWrapper">
                <div>원형 타이머</div>
                <input type="checkbox" id="circle" hidden ref={circleRef}/> 
                <label for="circle" class="circleSwitch" onClick={toggleCircle}>
                <span class="circleButton"></span>
                </label>
            </div>
        </ModalBasicBlock>
    )
}

export default ModalBasic;

