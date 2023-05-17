import styled from "styled-components";
import { useRef,useEffect } from "react";
const ModalBasicTemplate = styled.div`

    width: 700px;
    height: 600px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: gray;
    z-index: 999;

    border: 1px solid black;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    visibility: ${props => props.modalOpen ? 'visible' : 'hidden'};
    opacity: ${props => props.modalOpen ? '1' : '0'};
`

const ModalBasic = ({setModalOpen, modalOpen}) => {
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
    return(
        <ModalBasicTemplate ref={modalRef} modalOpen={modalOpen}>
            Modal
        </ModalBasicTemplate>
    )
}

export default ModalBasic;