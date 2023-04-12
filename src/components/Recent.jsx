import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Recent.css';

const Recent = () => {

    const navigate = useNavigate()
    const [fold, setFold] = useState(false)

    // 세션에저장한 최근눌렀던 상품 가져옴
    const ssesstionRecent = sessionStorage.getItem("recent")  
    const RecentJSON = JSON.parse(ssesstionRecent)


    useEffect(()=>{
        sessionStorage.getItem("fold")
    },[fold])

    // 세션에 저장한 fold의 boolean값

    const recentFold = () => {
        // useEffect 화면랜더용 / session값은 랜더를해줘야 값변경이되서 useEffect필수 💙
        setFold(!fold)
        if(sessionStorage.getItem("fold") == null || sessionStorage.getItem("fold") == "false"){
            sessionStorage.setItem("fold", true);
        }else{
            sessionStorage.setItem("fold", false);
        }
    }

    return (  
        <div>
            {
                ssesstionRecent != undefined ? (
                    <div className={`recent-mapbox ${sessionStorage.getItem("fold") == "false" ?  'recent-fold-mapbox' : 'recent-mapbox'}`}>
                    <div className="recent-recentTitle">최근 본 상품</div>
                    {
                        sessionStorage.getItem("fold") == "false" ? (
                            <div className='recent-fold' onClick={recentFold}>펼치기</div>
                        ) : (
                            <div className='recent-fold' onClick={recentFold}>접기</div>
                        )
                    }
                        
                            {  
                                ssesstionRecent != undefined  ? (
                                    RecentJSON.map((a,i)=>(
                                        <div className="recent-recent" key={i}>
                                            <img src={a.image} className="recent-recentImg" onClick={()=>{navigate(`/detailpage/${a.id}`)}}/>
                                            <div className="recent-recentName">{a.name}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div></div>
                                )
                            }
                </div>
                ) : (
                    <div></div>
                )
            }
        </div>
    );
}

export default Recent;
