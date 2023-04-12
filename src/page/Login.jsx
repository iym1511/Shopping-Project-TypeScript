import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Notfound from '../components/Notfound';
import '../css/Login.css'
import { add } from '../redux/singup';
import { loginUser } from '../redux/user';

const Login = () => {

  const sign = useSelector((state) => state.signup);
  const user = useSelector((state)=> state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect로 한자한자입력할때마다 확인해서 
  // 이메일,패스워드 두개의 조건이 충족하면
  // 버튼을 활성화 시켜주는데 사용

  const [notAllow, setNotAllow] = useState(true);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };


  const clicksignup = () => {
    navigate("/signup");
  }

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(sign)
        const findUser = sign.userlist.find((user) => user.id === id && user.password === password);
      
        // const logfindUser = user.find((log)=> log.id === user .id)

        if (!findUser) {
          alert("로그인 실패");
          console.log(findUser.name)
        } else {
          dispatch(
            loginUser({
              name: findUser.name,
              id: findUser.id,
              email: findUser.email,
              address: findUser.address,
              zonecode : findUser.zonecode,
              phoneNumber : findUser.phonNumber,
              detailAddress: findUser.detailAddress,
              delComment : findUser.delComment,
              comment : findUser.comment,
              isLoggedIn: true,
              item :findUser.item, // 장바구니 Signup 에서도 들어가는거 확인 했음
              pid: findUser.pid 
            }),
          );
          console.log(findUser)
          navigate("/");
        }
      };

      useEffect(()=>{
        // 둘다 모두 true면 버튼활성화를 풀어줌
        if(id && password){
            setNotAllow(false);
            return;
        }else{
            setNotAllow(true);
        }
  
    },[id, password])
      

    return (  
      <>
      {
        user.isLoggedIn ? (
          <Notfound />
          ) : (
            <div className='login-box'>
                <div className='login-all-form'>
                  <div className='login-form-box'>

                    <div className='login-form2-box'>
                      <div className='login-form2-title'>TOMMORROW</div>&<div>WORLD</div>
                      <p class="login-form2-subtitle"> pick your perfect <span>Fashion</span></p>
                      <img src={require('../img/login-img.png')} className='login-form2-img'></img>
                      <p class="login-form2-subtitle2">don't have an account?</p>
                      <button className='login-create-btn' onClick={clicksignup}>SIGN IN</button>
                    </div>

                    <div className='login-form2-box2'>
                      
                    </div>

                  </div>

                  <div className='login-form-box2'>
                    <form onSubmit={onSubmitForm} className="login-form">
                      <h1 className='login-subtitle'>LOGIN</h1>
                        <div>ID</div>
                        <input className='login-input-id' type="text" placeholder='username' onChange={onChangeId}/>     
                        <div>PW</div>
                        <input className='login-input-pw' type="password" placeholder='password' onChange={onChangePassword}/>                
                        <button className={`${notAllow ? 'login-btn' : 'login-btn-false'}`} type='submit' disabled={notAllow}>LOGIN</button>
                    </form>
                </div>
              </div>
          </div>
        )
      }
      </>
  );
}
 
export default Login;