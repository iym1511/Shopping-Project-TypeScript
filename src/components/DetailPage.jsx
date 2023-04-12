import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { shopcartAdd} from "../redux/main";
import '../css/DetailPage.css'
import { add, remove} from "../redux/comment";
import { purchaseBoolean} from "../redux/singup";
import Modal from "./Modal";
import { removeReview } from "../redux/review";
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import Pagenation from "./Pagenation";
import Recent from "./Recent";
import { CountMinuse, CountPlus } from "../redux/shop";
import Footer from "../page/Footer";
import { motion } from "framer-motion";

const DetailPage = () => {
    let {id} = useParams();
    const shop = useSelector((state) => state);
    const commentlist = useSelector((state) => state);
    const reviewComment = useSelector((state) => state.review);
    const users = useSelector((state) => state.user);
    const sign = useSelector((state) => state.signup);
    const main = useSelector((state)=> state.main);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 날짜
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const today = String(date.getDate()).padStart(2, "0");
    const useDate = `${year}-${month}-${today}`


    // 모달창
    const [showModal, setShowModal] = useState(false);
    
    // 로그인 유무 체크
    const [login, setLogin] = useState(false);

    // useParams :id 값이랑 배열안에있는 id값을 같은걸로 찾아줌
    const shoplist = shop.players.find(r=> r.id == id);
    
    // pid안에있는 useParams id랑 같으면 필터
    const commentfind = commentlist.comment.filter(r => r.pid == id);

    // 리뷰
    const reviewfind = reviewComment.filter(r => r.pid == id);

    // 현재 로그인한 유저랑 회원가입된 유저 찾아줌 / 댓글 이름별출력도 이걸로함
    const findUser = sign.userlist.find((user)=> user.id == users.id);



    const [comment, setComment] = useState(
        {
            id :0,
            pid: id,
            name: findUser.name, // 일치한 유저 찾아서 댓글에 넣어줌
            text : "",
            reply: "",
            date : useDate
        }
    )

    // 댓글 입력받는 함수
    const handleText = (e) => {
        setComment({...comment, text : e.target.value})
    }

    // 댓글 입력 후 초기화 
    const onReset = () => {
        setComment({...comment, text : ""})
    }


    const addtext = (e) =>{
        e.preventDefault()
        if(comment.text !== ""){
            dispatch(add(comment))
            onReset();
        }else{
            alert("댓글을 작성해주세요")
        }
        onReset();
        document.querySelector("input").value="";
    }


    
    const cartAdd = () => {
        dispatch(shopcartAdd(shoplist))
        // shop 옷 데이터에있는 id와 장바구니에있는 옷id를 비교하기위해
        // map으로 배열안에있는 객체안의id를 찾아줌
        const mainmap = main.map((a)=> a.id == shoplist.id)
        // 배열로 출력된 boolean값들을 some으로 같은것이있는지 확인
        const mainsome = mainmap.some((a)=> a == true)
        // 중복된값에따라 모달창 출력(이미있는alert는 redux에서 출력)
        if(!mainsome){
            setShowModal(true)
        }
            
    }

    const logoutMode = () => {
        alert("로그인 후 이용해주세요.")
        navigate('/login')
    }

    // 로그인 판별
    useEffect(() => {
        setLogin(users.isLoggedIn ? true : false);
    }, [users]);


    // Pagination
    const [page, setPage] = useState(1);

    let length = 14; // 표시할 글자수 기준
    let str = shoplist.name;
    if (str.length > length) {
        str = str.substr(0, length - 2) + '...';
    }

    return (  
        <motion.div initial={{opacity: 0 }}
        animate={{opacity: 1}}
        exit={{opacity: 0}} className="detail-box">
            {/* 모달창 */}
            {showModal ? <Modal setShowModal={setShowModal}/> : null}
            {/* 같은 이미지 출력 */}
            {
                users.isLoggedIn ? (
                <div className="detail-item">
                    <div className="detail-container">
                        <div className="detail-imgbox">
                            <img src={shoplist.image} className="detail-img"/>
                            <img src={shoplist.image2} className="detail-img2"/>
                            <img src={shoplist.image3} className="detail-img2"/>
                            <img src={shoplist.image4} className="detail-img2"/>
                            <img src={shoplist.image5} className="detail-img2"/>
                        </div>
                        {               
                        <div className="detail-textbox">
                            <div className="detail-fixbox">
                            <p className="detail-text">{shoplist.name}</p>
                            <p className="detail-text2">{str}</p>
                            <div className="detail-count-box">
                                <button onClick={()=>{dispatch(CountPlus(shoplist.id))}}>+</button>
                                <div className="detail-count">{shoplist.count}</div>
                                <button onClick={()=>{dispatch(CountMinuse(shoplist.id))}}>-</button>
                            </div>
                            <p className="detail-money"><span>총 삼품금액</span><span>(수량)</span> KRW {shoplist.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <button onClick={cartAdd} className="detail-cartbtn">장바구니 담기</button>
                            <div className="detail-info">
                                <span>INFO</span>
                                <p>{shoplist.info}</p>
                                <p>{shoplist.info2}</p>
                                <p>{shoplist.info3}</p>
                                <p>{shoplist.info4}</p>
                            </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                ) : (
                <div className="detail-item">
                    <div className="detail-container">
                        <div className="detail-imgbox">
                            <img src={shoplist.image} className="detail-img"/>
                            <img src={shoplist.image2} className="detail-img2"/>
                            <img src={shoplist.image3} className="detail-img2"/>
                            <img src={shoplist.image4} className="detail-img2"/>
                            <img src={shoplist.image5} className="detail-img2"/>
                        </div>
                        <div className="detail-textbox">
                            <div className="detail-fixbox">
                                <p className="detail-text">{shoplist.name}</p>
                                <p className="detail-text2">{str}</p>
                                <div className="detail-count-box">
                                    <button onClick={()=>{dispatch(CountPlus(shoplist.id))}}>+</button>
                                    <div className="detail-count">{shoplist.count}</div>
                                    <button onClick={()=>{dispatch(CountMinuse(shoplist.id))}}>-</button>
                                </div>
                                <p className="detail-money"><span>총 삼품금액</span><span>(수량)</span> KRW {shoplist.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                <button onClick={logoutMode} className="detail-cartbtn">장바구니 담기</button>
                                <div className="detail-info">
                                    <span>INFO</span>
                                    <p>{shoplist.info}</p>
                                    <p>{shoplist.info2}</p>
                                    <p>{shoplist.info3}</p>
                                    <p>{shoplist.info4}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }


            {
                reviewfind.length != 0 ? (

            <div className="detail-reviewBox">
            {
                reviewfind.slice(3   * (page - 1), 3 * (page - 1) + 3).map((a)=>{
                    let star = a.rate
                    const showStar = () => {
                        switch(star) {
                            case 1 : 
                            return(
                            <Stars>
                                <FaStar className="yellowStar"/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                            </Stars>
                            )
                            case 2 : 
                            return(
                            <Stars>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                            </Stars>
                            )
                            case 3 : 
                            return(
                            <Stars>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar/>
                                <FaStar/>
                            </Stars>
                            )
                            case 4 : 
                            return(
                            <Stars>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar/>
                            </Stars>
                            )
                            case 5 : 
                            return(
                            <Stars>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                                <FaStar className="yellowStar"/>
                            </Stars>
                            )
                        }
                    } 

                    return (
                        <div className="detail-mapbox">
                            <div className="detail-userbox">
                                <div className="detail-rate">{showStar()}</div>
                                <div className="detail-reviewName">NAME : {a.name}</div>
                                <div className="detail-reviewDate">{a.date}</div>
                            </div>
                            <div className="detail-flexbox">
                                <p className="detail-reviewText">{a.text}</p>
                                {
                                    findUser.name == a.name ? ( // purchaseTrue는 삭제시 리뷰값을 true로 되돌려서 다시 리뷰작성할수있게
                                        <button onClick={()=>{dispatch(removeReview(a.id))
                                            dispatch(purchaseBoolean({...findUser}))}
                                        } className="detail-reviewBtn">x</button>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            {/* </div> */}
                        </div>
                    )
                    
                }) 
            }
            </div>
            ) : (
                <div className="detail-noneReview"><p>작성된 리뷰가 없습니다.</p></div>
            )

        }
            <Pagenation page={page} reviewfind={reviewfind} setPage={setPage}/>

            <div className="detail-QnAcontainer">
                <h1 className="detail-QnAtitle">QnA</h1>
            {
                users.isLoggedIn ? (
                    <form onSubmit={addtext} className="detail-form">
                        <div className="detail-formDiv">
                            <input type="text" className="detail-input" onChange={handleText} placeholder="댓글을 입력하여 주십시요"/>
                            <button className="detail-btn">QnA작성</button>
                        </div>
                </form>
                ) : (
                    <div>
                        <form onSubmit={addtext}>
                            <div className="detail-formDiv">
                                <input type="text" className="detail-input" onChange={handleText} disabled placeholder="로그인 후 이용해 주십시요"/>
                                <button className="detail-btn">QnA작성</button>
                            </div>
                        </form>
                    </div>
                )
            }
            

            {   
                commentfind.length != 0 ? (
                    commentfind.map((a, i) => (
                        <div className="map-box">
                            <div className="inputbox">
                            <div className="detail-QnA-container">
                            <div className="detail-QnA-box">
                                <p className="detail-name">{a.name}</p>
                                <p className="detail-date">{a.date}</p>
                            </div>
                            <div className="detail-QnA-textbox">
                                <p className="inputtext">{a.text}</p>
                            </div>
                            </div>
                            {   // 로그인 유저 name이랑 코멘드에서 나오는 name 같으면 x할수있게
                                findUser.name == a.name ? (
                                    <button onClick={()=>{dispatch(remove(a.id))}} className="xbtn">x</button>
                                    ) : (
                                        <p></p>
                                )
                            }    
                            </div>
                        </div>   
                    ))
                ) : (
                    <div className="detail-noneQnA">작성된 QnA 없습니다.</div>
                )
            }
            </div>
            <Recent />
            <Footer/>
            {/* <div className="detail-outlet">
                <div className="detail-navbox">
                    <div className="detail-nav1" onClick={reviewNav}>Review</div>
                    <div className="detail-nav2" onClick={QAnav}>Q & A</div>
                </div>
                <div>
                    <Outlet /> Outlet은 본인 Route안에 있는것들 보여줌
                </div>
            </div> */}
        </motion.div>
    );
}
 
export default DetailPage;

const Stars = styled.div`
  padding-top: 5px;

  & svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;