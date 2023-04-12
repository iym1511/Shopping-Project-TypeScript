import '../css/Pagination.css'
import Pagination from "react-js-pagination";

const Pagenation = (props) => {
    const {reviewfind, page, setPage} = props;
     // 페이지 핸들링 함수
     const handlePageChange = (page) => {
        setPage(page)
    } 

    return (  
        <div>
            <Pagination
                    //activePage: 현재 페이지
                    activePage={page}
                    //itemsCountPerPage: 한 페이지당 보여줄 리스트 아이템의 개수
                    itemsCountPerPage={3}
                    //totalItemsCount: 총 아이템의 개수
                    totalItemsCount={reviewfind.length}
                    //pageRangeDisplayed: Paginator 내에서 보여줄 페이지의 범위
                    pageRangeDisplayed={3}
                    // 이전, 다음페이지 
                    prevPageText="‹"
                    nextPageText="›"
                    // 페이지가 바뀔때 핸들링 해줄함수 
                    onChange={handlePageChange}
                />
        </div>
    );
}
 
export default Pagenation;