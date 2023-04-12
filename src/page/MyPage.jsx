
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../css/MyPage.css'
import useInput from "../hooks/useInput";
import { ADDIT_USER, purchaseBoolean, pushPid} from "../redux/singup";
import { loginChange, loginUser, updateAddress } from "../redux/user";
import DaumPostcode from 'react-daum-postcode';
import Review from "../components/Review";
import { useNavigate } from "react-router-dom";
import Notfound from "../components/Notfound";
import Footer from "./Footer";
import { motion} from "framer-motion";



const MyPage = ()=> {

    // 세션으로 주소 불러오기
    const sesstionAddress = sessionStorage.getItem("address");
    const sesstionZonecode = sessionStorage.getItem("zonecode");

    const reviews = useSelector((state)=> state.review);
    const sign = useSelector((state)=> state.signup);
    const users = useSelector((state)=> state.user);
    const shop = useSelector((state)=> state.players);

    // 현재 로그인한 유저랑 회원가입된 유저 찾아줌 / 댓글 이름별출력도 이걸로함
    const findUser = sign.userlist.find((user)=> user.id == users.id)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    
    // 사용자 배송지 정보
    const [address, setAddress] = useState(findUser.apiaddress);
    const [zonecode, setZonecode] = useState(findUser.apizonecode)
    const [detailAddress, setDetailAddress] = useState(findUser.detailAddress);
    const [delcomment, setDelcomment] = useState(users.delComment);
    

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const onChangeZonecode = (e) => {
        setZonecode(e.target.value)
    }


    const [trans, setTrans] = useState(null);
    const [checkPass, setCheckPass] = useState("");

    // 모달 외부 클릭시 끄기 처리---------------
    // Modal 창을 useRef로 취득
    const modalRef = useRef(null);
    
    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenPostcode(false);
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
    // ---------------------------

    // 주소 api
    const [openPostcode, setOpenPostcode] = useState(false);
    const [apiaddress, setApiaddress] = useState("");
    const [apizonecode, setApizoneCode] = useState("");

    const handle = {
        // 버튼클릭 이벤트
        clickButton: (e) => {
            e.preventDefault() // api할때 이런오류 다반사 프리벤트 쓰자
            setOpenPostcode((current)=> !current);
        },
        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setApiaddress(data.address);
            setApizoneCode(data.zonecode);
            sessionStorage.setItem("address", data.address)
            sessionStorage.setItem("zonecode", data.zonecode)
            setOpenPostcode(false);
            console.log(sesstionAddress)
            console.log(sesstionZonecode)
        },
    }

    const deliveryAddress = (e) => {
        e.preventDefault()
        dispatch(ADDIT_USER({
            ...findUser,
            apiaddress,
            apizonecode,
            detailAddress,
            delcomment
        })
        );
        dispatch(updateAddress({
            ...users,
            apiaddress,
            apizonecode,
            detailAddress,
            delcomment
        })
        );
        console.log(users)
        console.log(findUser)
        console.log(sign)
        alert("배송지 저장 완료")
    }
 

    

    const onChange = (e) => {
        const additUser = {
          ...users,
          [e.target.name]: e.target.value,
        };
        setTrans(additUser);
      };

      // map 에서 id를 넘겨주어 그 페이지로 이동
      const reviewClick = (a) => {
        navigate(`/review/${a}`)
        // 툴킷안에서 유저 맞는거 확인후 그 유저꺼 가져옴 원래 회원정보에서 pid만 추가
        dispatch(pushPid({...findUser, pid : a}))
      }

    

    return (  
        <motion.div initial={{opacity: 0 }}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
        {
            users.isLoggedIn || null ? (
        <div className="mypage-box">
            <h1 className="mypage-title">MY PAGE</h1>
            <div className="mypage-sujung-box">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    if(checkPass === trans.password){
                        dispatch(ADDIT_USER(trans));
                        dispatch(loginUser(trans));
                        alert("변경되었습니다");
                        console.log(trans.password);
                    }else{
                        alert("현재 입력된 비밀번호와\n비밀번호 확인란이\n맞지 않습니다")
                    }
                }} 
                className="mypage-form">
                    <label>Name</label>
                    <input type="text" value={users.name} disabled></input>
                    <label>ID</label>
                    <input className="mypage-id" type="text" name="id" defaultValue={users.id} onChange={onChange} disabled />
                    <label>E-mail</label>
                    <input type="text" name="email" defaultValue={users.email} onChange={onChange} />
                    <label>Password</label>
                    <input type="password" name="password" defaultValue={findUser ? findUser.password : ""} onChange={onChange} />
                    <label className="user-info_label">Password check</label>
                    <input type="password" name="password-check" value={checkPass} onChange={(e) => setCheckPass(e.target.value)} />
                <button type="submit" className="mypage-sujungbtn">회원정보 수정</button>
                </form>
            
                {/* 주소 api */}
                <div className="mypage-addressbox">
                    <form onSubmit={deliveryAddress} className="mypage-addressForm">
                        <label>Address</label>
                        <div className="mypage-addressContainer">
                            <input type="text" placeholder="우편번호"  value={apizonecode ? sesstionZonecode : zonecode} onChange={onChangeZonecode} className="mypage-addressNum" disabled/> 
                            <button onClick={handle.clickButton} className="mypage-apibtn">주소 검색</button>
                        </div>
                        <input type="text" placeholder="기본주소" value={apiaddress ? sesstionAddress : address} onChange={onChangeAddress} disabled className="mypage-address"/>
                        <input type="text" placeholder="나머지 주소" value={detailAddress || ""} onChange={(e)=>{setDetailAddress(e.target.value)}} className="mypage-address"/>
                        <button type="submit" className="mypage-deliverySave">배송지 저장</button>
                    </form>
                </div>
            </div>

            <h1 className="mypage-shoptitle"></h1>
            <table className="mypage-table">
                <tr className="mypage-title-tr">
                    <th className="mypage-title-th">이미지</th>
                    <th className="mypage-title-th">상품 정보</th>
                    <th className="mypage-title-th">수량</th>
                    <th className="mypage-title-th">구매 날짜</th>
                    <th className="mypage-title-th">배송 상태</th>
                    <th className="mypage-title-th">가격</th>
                    <th className="mypage-title-th">리뷰</th>
                </tr>
            {   
                findUser.purchaseArray == null ? (
                    <div>
                        <th className="mypage-noneOrder"></th>
                    </div>
                ) : (
                    
                    findUser.purchaseArray.map((a, i)=>(
                        <tr className="mypage-tr-map">
                            <th>
                                <img src={a.image} className="mypage-th-img" />
                            </th>
                            <th>
                                <p>{a.name}</p>
                            </th>
                            <th>
                                <p>수량 : {a.count}</p>
                            </th>
                            <th>
                                <p>{a.date}</p>
                            </th>
                            <th>
                                <p>배송 완료</p>
                            </th>
                            <th>
                                <p>{a.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            </th>
                                
                            {   
                                // map안에선 setState가 안먹으니 이대로 생으로 삼항연산자사용하자 ★
                                findUser.purchaseArray.find((e)=> e.id == a.id).reviewCheck ? (
                                    <th>
                                        <button onClick={()=>{reviewClick(a.id)}} className="mypage-review-btn">Review</button>
                                    </th>
                                ) : (
                                    <th>리뷰 작성 완료</th>
                                )
                            }
                        </tr>
                    ))
                )
            
            }
            </table>


                <div className={`mypage-apiModal ${openPostcode ? 'mypage-apiModalbod' : ''}`} ref={modalRef}>
                    {
                        openPostcode && 
                            <DaumPostcode className="mypage-api"
                                onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                            />
                    }
                </div>
            
                <Footer />  
        </div>
        ) :(
            <Notfound />
        )
        }
        </motion.div>
    );
}

export default MyPage;