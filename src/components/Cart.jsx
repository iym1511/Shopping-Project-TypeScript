import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../css/Cart.css';

import { useNavigate } from "react-router-dom";
import { deleteChecked, shopaddCount, shopAlldelete, shopdelete, shopminuseCount, toggleCheckbox, toggleCheckboxAll } from "../redux/main";
import { ADDIT_USER } from "../redux/singup";
import Recent from "./Recent";
import Notfound from "./Notfound";
import Footer from "../page/Footer";
import { motion} from "framer-motion";




const Cart = () => {
    const dispatch = useDispatch();
    const navigater = useNavigate();

    // 배열을 구매해
    let purchaseArray = [];

    // main.js
    const mainshop = useSelector((state) => state);
    const usercart = useSelector((state)=> state.user.item);
    
      // 로그인
    const users = useSelector((state) => state.user);

    // 현재 로그인한 유저랑 회원가입된 유저 찾아줌 / 댓글 이름별출력도 이걸로함
    const sign = useSelector((state)=> state.signup)
    const findUser = sign.userlist.find((user)=> user.id == users.id)
    

      // 로그인 유무 체크
    const [login, setLogin] = useState(false);

    const moneylist = [];
    const moneylist2 = []; // 배송비
    const [deliverymoney, setDeliberymoney]= useState(2500)

    // 주문하기
    const purchaseProduct = () => {
        mainshop.main.forEach((p)=>{ // p 상품 그 잡채다 💕
            if(p){
                let newPurchaseArray = purchaseArray.concat(p)
                purchaseArray = newPurchaseArray
            }
        })
        dispatch(deleteChecked())
        dispatch(shopAlldelete())
        dispatch(ADDIT_USER({
            ...findUser,
            purchaseArray,
        })) // 세션 하고있는 부분
        alert("주문완료!")
        navigater("/mypage")
        const cartJSON = JSON.stringify(purchaseArray)
        sessionStorage.setItem(`${findUser.id}`, cartJSON)

        console.log(purchaseArray)
        console.log(findUser)
    }

    // 체크박스
    const handleCheckboxChange = (i) => {
        dispatch(toggleCheckbox(i));
    }

    // 체크박스 선택삭제
    const handleDelete = () => {
        dispatch(deleteChecked())
    }

    // 체크박스 전체선택
    const handleToggleAll = () => {
        const AllChecked = mainshop.main.every(item => item.isChecked);
        dispatch(toggleCheckboxAll(!AllChecked));
    };

    
    // 돈 합계 
    const [sum, setSum] = useState(0)
    const [sum2, setSum2] = useState(0); // 배송비 포함
    // 정규식사용해서 화폐단위따로 또 저장해서 담아야되서 이렇게함
    const [moneysum, setMoneysum] = useState(0);
    const [moneysum2, setMoneysum2] = useState(0); // 배송비 포함


    
    // 장바구니 물건 개수 증가
    const shopplusCount = (a) => {
        dispatch(shopaddCount(a.id))
    }

    // 장바구니 물건 개수 감소
    const shopbbagiCount = (a) => {
        dispatch(shopminuseCount(a.id))
    }

    // moneylist 배열에 mainshop 안에있는 돈을 넣어줌
    useEffect(()=>{
        mainshop.main.map((a)=>{
            const obj = {  // map괄호 {} 변경
                id : a.id,
                money : a.money
            }
            moneylist.push(obj)
            moneylist2.push(obj) // 배송비 포함
            //moneylist.push(a.money, a.id)
        })
    },[shopplusCount, shopbbagiCount]) // 개수 + , - 될때 작동

    // 배열에있는거 전부 더할때
    useEffect((a)=>{
        const list = moneylist.reduce(function add(sum, currValue){
            return sum + currValue.money;
        },0);
        setSum(list)
    },[moneylist])

    // moneylist에 담길때만 moneysum에 화폐단위표시된sum을 담아줌
    useEffect(()=>{
        setMoneysum(sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    },[moneylist])

    // 배송비 포함
    useEffect((a)=>{
        const list2 = moneylist2.reduce(function add(sum2, currValue){
            return sum2 + currValue.money;
        },0);
        if(sum < 40000){
            setSum2(list2 + 2500)
            setDeliberymoney(2500)
        }else if(sum == 0){
            setDeliberymoney(0)
        }else if(sum > 40000){
            setDeliberymoney(0)
            setSum2(list2)
        }
    },[moneylist2])

    useEffect(()=>{
        setMoneysum2(sum2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    },[moneylist2])

      // 로그인 판별
    useEffect(() => {
        setLogin(users.isLoggedIn ? true : false);
    }, [users]);



    // main에 있는 배열값을 map으로 풀어서 main안에서 비교할수있게 id를 한번더 전달해줌
    
    return (  
        <motion.div initial={{opacity: 0 }}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
        {
            users.isLoggedIn ? (
        <div className="cart-box">
            <h1 className="cart-title">SHOPPING CART</h1>
            <button onClick={handleDelete} className="cart-pickdelete">선택 삭제</button>
            <button onClick={handleToggleAll} className="cart-allpick">전체 선택</button>
            <div className="cart-list">
                <div className="cart-listbox">
                    <tr className="cart-trimg">이미지</tr>
                    <tr className="cart-trmulgun">상품정보</tr>
                    <tr className="cart-trcount">수량</tr>
                    <tr className="cart-trmoney">상품금액</tr>
                    <tr className="cart-trdelivery">적립금</tr>
                    <tr className="cart-trdeliverymoney">총 금액</tr>
                    <tr className="cart-trpick">선택</tr>
                </div>

  
                
                {   // 장바구니는 배열이니까 길이로 찾아서 삼항연산자로쓰기💚
                    mainshop.main.length == 0 ?
                    // usercart.length == 0 ?
                    (
                        <p className="Cart-zero">장바구니가 비어있습니다</p>
                        
                    ):(
                        mainshop.main.map((a, i)=>(
                                <tr key={i.id} className="cart-Cartbox">            {/*Change에 a.id 넘겨줌*/}
                                    <input type="checkbox" className="cart-checkbox" onChange={()=> handleCheckboxChange(a.id)} checked={a.checked}/>
                                    <img src={a.image} className="cart-image"/>
                                    <td className="cart-name">{a.name}</td>
                                    <td className="cart-countbox">
                                        <td className="cart-count">
                                            <button onClick={()=>{shopplusCount(a)}} className="Cartbtn1">+</button>
                                            <p className="cart-countnum">{a.count}</p>
                                            <button onClick={()=>{shopbbagiCount(a)}} className="Cartbtn2">-</button>
                                        </td>
                                    </td>
                                    <td className="cart-savemoney">{a.save.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                                    <td className="cart-delivery">{a.delivery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                                    <td className="cart-money">{a.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                                    <button onClick={()=>{dispatch(shopdelete(a.id))}} className="Cartbtn3">x</button>
                                </tr>
                            ))
                        )
                }
            </div>
            {
                sum == 0 ? (
                    <div>
                        <p className="cart-moneysum">총 금액 : {moneysum} + 배송비 : 0 = 0 원</p>
                    </div>
                ) : (
                    <p className="cart-moneysum">총 금액 : {moneysum} + 배송비 : {deliverymoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = {moneysum2} 원</p>
                )
            }

            {    // 로그인 구분해주고 장바구니가 비어있을때는 상품x출력
                login ? (
                    mainshop.main.length == 0 ? (
                        <button className="cart-order-none" disabled={mainshop.main.length == 0} onClick={()=>{alert("상품이 없습니다.")}}>주문하기</button>
                    ) : (
                        <button className="cart-order" onClick={purchaseProduct}>주문하기</button>
                    )
                ) : (   
                    <></>
                )
            } 
            <Recent />  
        </div>
            ) : (
                <Notfound />
            )
        }
        </motion.div>
    );
}

export default Cart;