import styled from "styled-components";
import { useRef, useEffect } from "react";

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
    .noiseSensitivityWrapper {
        margin-top: 50px;
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
            }
        }
    }

`

const ModalBasic = ({modalOpen,setModalOpen, decibelData, setSensitivity, sensitivity, sensitivityRef}) => {
    const modalRef = useRef(null);
    
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
    return(
        <ModalBasicBlock modalOpen={modalOpen} ref={modalRef}>
            <div className="header">
                <div>
                    settings
                </div>
                <button className="closeBtn" onClick={()=>setModalOpen(false)}>x</button>
            </div>
            <div className="noiseSensitivityWrapper">
                <div>sensitivity</div>
                <div className="noiseSensitivityDisplay">
                    <div className="display">{Math.floor(decibelData)}</div>
                    <input className="slider" type="range" value={sensitivity} onChange={onChange} min={1} max={100} step={0.1} ref={sensitivityRef}></input>
                </div>
            </div>

        </ModalBasicBlock>
    )
}

export default ModalBasic;

