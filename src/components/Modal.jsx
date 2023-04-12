import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import '../css/Modal.css'

const Modal = ({setShowModal}) => {

    const modalChange = () =>{
        setShowModal(false)
    }

    // 모달 외부 클릭시 끄기 처리
    // Modal 창을 useRef로 취득
    const modalRef = useRef(null);
    
    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };
        
        // 이벤트 핸들러 등록
        document.addEventListener('mousedown', handler);
        
        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener('mousedown', handler);
        };
    });

    return (  
        <motion.div initial={{opacity: 0 ,transform : 'translateY(50px)', transition:'transform 0.33s ease'}}
        animate={{opacity: 1 ,transform : 'translateY(0px)', transition:'transform 0.33s ease'}}
        exit={{opacity: 0 ,transform : 'translateY(50px)', transition:'transform 0.33s ease'}} className="modal-box" ref={modalRef}>
            <div className="modal-container">
                <p>선택하신 상품이 
                    <br /> 장바구니에 추가되었습니다.
                </p>
                <div className="modal-buttons">  {/* 창 사라지게 하기*/}
                    <button className="modal-button1" onClick={modalChange}>쇼핑 계속하기</button>
                    <Link to="/cart">
                        <button className="modal-button2">장바구니로 이동</button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default Modal;