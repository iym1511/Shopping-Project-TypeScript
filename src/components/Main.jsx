import '../css/Main.css'
import PopView from './PopView';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitterSquare,
    faInstagram,
    faYoutube,
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import { motion} from "framer-motion";

const Main = () => {
    return (  
        <motion.div initial={{opacity: 0 }}
        animate={{opacity: 1}}
        exit={{opacity: 0}} className='main-box'>
            <div className='main-imgbox'>
                <div class="hello-parent">
                    <svg class="hello-word" width="365" height="365" viewBox="0 0 365 365">
                        <g id="H-letter">
                            <line class="H-left-stroke" x1="17" y1="0" x2="17" y2="124" stroke="#000" fill="none" stroke-width="34" />
                            <line class="H-mid-stroke" x1="33" y1="62" x2="68" y2="62" stroke="#000" fill="none" stroke-width="34" />
                            <line class="H-right-stroke" x1="84" y1="0" x2="84" y2="124" stroke="#000" fill="none" stroke-width="34" />
                        </g>
                        
                        <g id="E-letter">
                            <line class="E-left-stroke" x1="138" y1="0" x2="138" y2="124" stroke="#000" fill="none" stroke-width="34" />
                            <line class="E-top-stroke" x1="154" y1="17" x2="201" y2="17" stroke="#000" fill="none" stroke-width="34" />
                            <line class="E-mid-stroke" x1="154" y1="62" x2="196" y2="62" stroke="#000" fill="none" stroke-width="34" />
                            <line class="E-bottom-stroke" x1="154" y1="107" x2="201" y2="107" stroke="#000" fill="none" stroke-width="34" />
                        </g>
                        
                        <g id="L-one-letter">
                            <line class="L-one-long-stroke" x1="17" y1="153" x2="17" y2="277" stroke="#000" fill="none" stroke-width="34" />
                            <line class="L-one-short-stroke" x1="33" y1="260" x2="77" y2="260" stroke="#000" fill="none" stroke-width="34" />
                        </g>
                        
                        <g id="L-two-letter">
                            <line class="L-two-long-stroke" x1="104" y1="153" x2="104" y2="277" stroke="#000" fill="none" stroke-width="34" />
                            <line class="L-two-short-stroke" x1="120" y1="260" x2="164" y2="260" stroke="#000" fill="none" stroke-width="34" />
                        </g>
                        
                        <g id="O-letter">
                            <circle class="O-stroke" cx="231" cy="215" r="48" stroke="#000" fill="none" stroke-width="31" />
                        </g>
                        
                        <g id="red-dot">
                            <circle class="red-dot" cx="325" cy="260" r="20" fill="#FF5851" stroke="none" />
                            <line x1="325" y1="260" x2="325" y2="260" stroke="#FF5851" class="red-dot" />
                        </g>
                    </svg>
                </div>
                <img src={require("../img/main-img2.jpg")} className="main-img2" />
                <div className='main-textbox'>
                    <p className='main-text'>Tommorow</p>
                    <p className='main-text2'>Just try on the photo once. It's something I've never even imagined with my mouth open. Give yourself that freedom</p>
                </div>
                <img src={require("../img/main-img1.jpg")} className="main-img1" />
                
                {/* Tommorrow World 나타내는 css */}
                <div className="main-container">
                    <h1>
                        <div className="animation">
                            <span className="main-first">Tommorrow</span> 
                            <span className="main-two">
                            <span className="main-second">World</span>
                            </span>
                        </div>
                    </h1>
                </div>
                <div className='main-link'> 
                    <a href='https://www.instagram.com/' target="_blank" className='main-insta'><FontAwesomeIcon icon={faInstagram}/></a>
                    <a href='https://twitter.com/i/trends' target="_blank" className='main-twitter'><FontAwesomeIcon icon={faTwitterSquare}/></a>
                    <a href='https://www.youtube.com/' target="_blank" className='main-youtube'><FontAwesomeIcon icon={faYoutube}/></a>
                    <a href='https://github.com/iym1511' target="_blank" className='main-github'><FontAwesomeIcon icon={faGithub} /></a>
                </div>
                <PopView/>                
            </div>                      
        </motion.div>
    );
}

export default Main;