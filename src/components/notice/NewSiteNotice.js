import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NEW_SITE_URL = 'https://kkyul.kr/tools/timer';
const STORAGE_KEY = 'newSiteNoticeHideUntil';
const HIDE_DAYS = 7;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-family: 'Noto Sans KR', sans-serif;
`;

const Modal = styled.div`
    width: 90%;
    max-width: 420px;
    background: white;
    border-radius: 16px;
    padding: 32px 28px 20px;
    text-align: center;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);

    h2 {
        margin: 0 0 12px;
        font-size: 24px;
    }
    p {
        margin: 0 0 24px;
        font-size: 16px;
        line-height: 1.6;
        color: #444;
    }
    .goBtn {
        display: block;
        padding: 14px;
        border-radius: 10px;
        background: #222;
        color: white;
        font-size: 18px;
        font-weight: 700;
        text-decoration: none;
        &:hover {
            background: #000;
        }
    }
    .stayBtn {
        width: 100%;
        margin-top: 8px;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background: white;
        font-size: 16px;
        color: #444;
        cursor: pointer;
        &:hover {
            background: #f5f5f5;
        }
    }
    .hideBtn {
        margin-top: 16px;
        border: none;
        background: none;
        font-size: 13px;
        color: #888;
        cursor: pointer;
        text-decoration: underline;
    }
`;

const CornerLink = styled.a`
    position: fixed;
    left: 16px;
    bottom: 16px;
    z-index: 900;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 13px;
    text-decoration: none;
    opacity: 0.25;
    transition: opacity 0.2s ease;
    &:hover {
        opacity: 1;
    }
`;

const shouldShowPopup = () => {
    try {
        const hideUntil = Number(localStorage.getItem(STORAGE_KEY));
        return !hideUntil || Date.now() > hideUntil;
    } catch (e) {
        return true;
    }
};

const NewSiteNotice = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(shouldShowPopup());
    }, []);

    const onClose = () => setIsOpen(false);

    const onHideForDays = () => {
        try {
            const hideUntil = Date.now() + HIDE_DAYS * 24 * 60 * 60 * 1000;
            localStorage.setItem(STORAGE_KEY, String(hideUntil));
        } catch (e) {
            // 저장이 안 되는 환경이면 이번만 닫기
        }
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Overlay onClick={onClose}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <h2>🎉 새 사이트로 이사했어요!</h2>
                        <p>
                            더 편리해진 새 타이머를 만나보세요.
                            <br />
                            앞으로는 새 사이트에서 업데이트돼요.
                        </p>
                        <a className="goBtn" href={NEW_SITE_URL}>
                            새 사이트로 가기 →
                        </a>
                        <button className="stayBtn" onClick={onClose}>
                            그냥 여기서 쓸게요
                        </button>
                        <button className="hideBtn" onClick={onHideForDays}>
                            7일간 다시 보지 않기
                        </button>
                    </Modal>
                </Overlay>
            )}
            <CornerLink href={NEW_SITE_URL} title="새 사이트로 이동">
                새 사이트 →
            </CornerLink>
        </>
    );
};

export default NewSiteNotice;
