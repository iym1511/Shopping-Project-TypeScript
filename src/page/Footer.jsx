import '../css/Footer.css'

const Footer = () => {
    return (  
        <div className='footer-container'>
            
                <img src={require("../img/logo-white.png")} className="footer-logo"/>
           

            <div className='footer-box2'>
                <div className='footer-p'>TW ®</div>
                <p>대표자 : 홍길동</p>
                <p>사업자등록번호 : 102-32-12452</p>
                <p>개인정보책임관리자 : 두루미 (iym1511@naver.com)</p>
                <p>교환,반품주소 : [12345] 부산 동래구</p>
                <p className='footer-copy'>copyright © Tomorrow world all rights reserved</p>
            </div>
        </div>
    );
}
 
export default Footer;