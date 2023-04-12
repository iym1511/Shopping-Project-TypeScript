import { useEffect } from "react"
import styled from 'styled-components'
import PropTypes from "prop-types";
import Portal from "./Portal";
import popimg from "../img/Pop-img.png";


const PopModal = ({ className, onClose, closable, visible }) => {
    
    // 배경 클릭시 삭제
    // const onMaskClick = (e) => {
    //     if (e.target === e.currentTarget) {
    //         onClose(e)
    //     }
    // }

    // 이전방문 날짜
    const VISITED_BEFORE_DATE = localStorage.getItem('VisitCookie')
    // 현재 날짜
    const VISITED_NOW_DATE = Math.floor(new Date().getDate())

    // console.log(VISITED_BEFORE_DATE)
    // console.log(VISITED_NOW_DATE)
    // localStorage.removeItem('VisitCookie')

    useEffect(() => {
        // 팝업 오늘 하루닫기 체크
        if (VISITED_BEFORE_DATE !== null) {
            // 날짜가 같을경우 노출
            if (VISITED_BEFORE_DATE === VISITED_NOW_DATE) {
                localStorage.removeItem('VisitCookie')
                onClose(true)
            }
            // 날짜가 다를경우 비노출
            if (VISITED_BEFORE_DATE !== VISITED_NOW_DATE) {
                onClose(false)
            }
        }
    }, [VISITED_BEFORE_DATE])

    // 하루동안 팝업 닫기
    const Dayclose = (e) => {
        if (onClose) {
            onClose(e)

            const expiry = new Date()
            // +1일 계산
            const expiryDate = expiry.getDate() + 1
            // 로컬스토리지 저장
            localStorage.setItem('VisitCookie', expiryDate)
        }
    }

    const close = (e) => {
        if (onClose) {
            onClose(e)
        }
    }
    
    return (  
        <div elementId="modal-root">
        <ModalOverlay visible={visible} />
        <ModalWrapper
            className={className}
            // onClick={maskClosable ? onMaskClick : null} 배경클릭시 삭제
            tabIndex="-1"
            visible={visible}
        >
            <ModalInner tabIndex="0" className="modal-inner">
                <ModalInner2>
                    <ImgStyle>
                        <img src={popimg} style={{ width: '100%', height: '100%'}} alt="" />
                    </ImgStyle>
                    {closable && (
                        <CloseStyle>
                            <Close className="modal-close" onClick={Dayclose}>
                                오늘 하루 닫기
                            </Close>
                            <Close className="modal-close" onClick={close}>
                                닫기
                            </Close>
                        </CloseStyle>
                    )}
                </ModalInner2>
            </ModalInner>
        </ModalWrapper>
    </div>
    );
}

export default PopModal;

PopModal.propTypes = {
    visible: PropTypes.bool,
}

const ModalInner2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ImgStyle = styled.div`
    position: relative;
    top: 17px;
`

const CloseStyle = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    width: 330px;
    padding: 15px;
    border-radius: 0 0 15px 15px;
    color: #777777;
    font-size: 13px;
`

const Close = styled.span`
    cursor: pointer;
`

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 150px;
    right: 0;
    bottom: 0;
    left: 500px;
    z-index: 1000;
    overflow: auto;
    outline: 0;
    border: 1px solid #b5b5b5ff;
    width: 350px;
    height: 515px;
    background-color: #ffffff;
`

const ModalOverlay = styled.div`

`

const ModalInner = styled.div`
    position: relative;
    width: 360px;
    max-width: 340px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    /* padding: 40px 20px; */
`