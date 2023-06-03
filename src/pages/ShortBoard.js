// import React, { useState, useEffect } from "react";
// import styled from "@emotion/styled";
// import addBtn from "../assets/common/add_btn.png";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import search from "../assets/common/search.png";
// import Shortform from "../components/Built/Shortform";
// import Paging from "../components/common/Paging";
// import { faUnlink } from "@fortawesome/free-solid-svg-icons";

// function ShortBoard(props) {
//   const menu = ["전체", "잠금 해제된 목록"];
//   const [selectedMenu, setSelectedMenu] = useState(0);
//   const [listShort, setListShort] = useState([]);
//   const [listResult, setListResult] = useState([]);

//   // 페이징
//   const [totalItemsCount, setTotalItemsCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [count, setCount] = useState(6);

//   const [unlockCount, setUnlockCount] = useState(0);
//   const [lockPage, setLockPage] = useState(0);

//   // 검색
//   const [keyword, setKeyword] = useState("");
//   const [searchedShort, setSearchedShort] = useState([]);

//   const fetchData = async () => {
//     const response = await axios.get(
//       `${
//         process.env.REACT_APP_BASE_URL
//       }/shortforms/board/${localStorage.getItem(
//         "memberId"
//       )}?page=${currentPage}&size=6`,
//       {
//         headers: {
//           "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
//         },
//       }
//     );
//     console.log(response);
//     if (response.data.isSuccess) {
//       setListShort(response.data.result);
//       setTotalItemsCount(response.data.result[0].pages);
//     }

//     const responseResult = await axios.get(
//       `${
//         process.env.REACT_APP_BASE_URL
//       }/shortresults/board/${localStorage.getItem(
//         "memberId"
//       )}?page=${lockPage}&size=6`,
//       {
//         headers: {
//           "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
//         },
//       }
//     );
//     console.log(responseResult);
//     if (responseResult.data.isSuccess) {
//       setListResult(responseResult.data.result);
//       setUnlockCount(responseResult.data.result[0].pages);
//     }

//     const searchResponse = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/searchs/shortforms?keyword=${keyword}&page=${currentPage}&size=6`
//     );
//     console.log(searchResponse);
//     if (searchResponse.data.isSuccess) {
//       setSearchedShort(searchResponse.data.result);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, lockPage, keyword]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleLockPageChange = (page) => {
//     setLockPage(page);
//   };

//   return (
//     <div>
//       <Container>
//         <Title>짧폼 게시판</Title>
//         <Info>보유 포인트를 사용하여 짧폼의 결과를 확인할 수 있어요!</Info>
//         {/* 검색창 */}
//         <Search onChange={(e) => setKeyword(e.target.value)} />

//         {/**짧폼 게시판 메뉴*/}
//         <MenuContainer>
//           {menu.map((a, i) => {
//             return selectedMenu === i ? (
//               <Selected>{a}</Selected>
//             ) : (
//               <Unselected
//                 onClick={() => {
//                   setSelectedMenu(i);
//                 }}
//               >
//                 {a}
//               </Unselected>
//             );
//           })}
//         </MenuContainer>
//         <hr className="menuHr" />
//         {/**설문 리스트 */}
//         <SurveyList>
//           {selectedMenu === 0
//             ? listShort.map((a) => {
//                 return <Shortform shortform={a} />;
//               })
//             : listResult.map((a) => {
//                 return <Shortform shortform={a} />;
//               })}
//         </SurveyList>
//         {/* {keyword ? (
//           <SurveyList shortform={searchedShort} />
//         ) : (
//           <SurveyList>
//             {selectedMenu === 0
//               ? listShort.map((a) => {
//                   return <Shortform shortform={a} />;
//                 })
//               : listResult.map((a) => {
//                   return <Shortform shortform={a} />;
//                 })}
//           </SurveyList>
//         )} */}
//         <BottomContainer>
//           {selectedMenu === 0 && totalItemsCount !== 0 && (
//             <Paging
//               page={currentPage}
//               count={count}
//               totalItemsCount={totalItemsCount}
//               onPageChange={handlePageChange}
//             />
//           )}
//           {selectedMenu === 1 && unlockCount !== 0 && (
//             <Paging
//               page={lockPage}
//               count={count}
//               totalItemsCount={unlockCount}
//               onPageChange={handleLockPageChange}
//             />
//           )}
//         </BottomContainer>
//       </Container>
//     </div>
//   );
// }

// const Container = styled.div`
//   padding-left: 253px;
//   padding-top: 90px;
//   width: 100%;
//   height: 100%;

//   .menuHr {
//     margin-top: 5px;
//     margin-left: 0px;
//     border: 0.5px solid #bababa;
//     width: 80vw;
//   }
// `;
// const Title = styled.div`
//   font-weight: 700;
//   font-size: 26px;
//   margin-bottom: 30px;
// `;

// const Info = styled.div`
//   font-weight: 400;
//   font-size: 12px;
//   color: #444444;
//   margin-bottom: 13px;
// `;

// const Search = styled.input`
//   width: 80vw;
//   height: 32px;

//   max-width: 1150px;
//   background: #f7f7f7;
//   background-image: url(${search});
//   background-repeat: no-repeat;
//   background-position: 10px center;
//   background-size: 16px 16px;

//   border: 0.3px solid #000000;
//   border-radius: 5px;

//   padding-left: 35px;
//   margin-bottom: 40px;
// `;

// const MenuContainer = styled.div`
//   width: 190px;
//   display: flex;
//   justify-content: space-between;
// `;
// const Selected = styled.div`
//   font-size: 17px;
//   font-weight: 700;
//   color: #7097ff;
// `;
// const Unselected = styled.div`
//   font-size: 17px;
//   font-weight: 700;
//   cursor: pointer;
// `;
// const SurveyList = styled.div`
//   margin-top: 16px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: left;
//   padding-left: 32px;
// `;

// const BottomContainer = styled.div`
//   display: flex;
//   text-align: center;
//   justify-content: center;
//   margin-top: 15px;
// `;

// export default ShortBoard;

////////////////////////////////////////
// 원본

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import addBtn from "../assets/common/add_btn.png";
import { Link } from "react-router-dom";
import axios from "axios";
import search from "../assets/common/search.png";
import Shortform from "../components/Built/Shortform";
import Paging from "../components/common/Paging";
import { faUnlink } from "@fortawesome/free-solid-svg-icons";

function ShortBoard(props) {
  const menu = ["전체", "잠금 해제된 목록"];
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [listShort, setListShort] = useState([]);
  const [listResult, setListResult] = useState([]);

  // 페이징
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(6);

  const [unlockCount, setUnlockCount] = useState(0);
  const [lockPage, setLockPage] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL
      }/shortforms/board/${localStorage.getItem(
        "memberId"
      )}?page=${currentPage}&size=6`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setListShort(response.data.result);
      setTotalItemsCount(response.data.result[0].pages);
    }

    const responseResult = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL
      }/shortresults/board/${localStorage.getItem(
        "memberId"
      )}?page=${lockPage}&size=6`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(responseResult);
    if (responseResult.data.isSuccess) {
      setListResult(responseResult.data.result);
      setUnlockCount(responseResult.data.result[0].pages);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, lockPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLockPageChange = (page) => {
    setLockPage(page);
  };

  return (
    <div>
      <Container>
        <Title>짧폼 게시판</Title>
        <Info>보유 포인트를 사용하여 짧폼의 결과를 확인할 수 있어요!</Info>
        {/* 검색창 */}
        <Search />

        {/**짧폼 게시판 메뉴*/}
        <MenuContainer>
          {menu.map((a, i) => {
            return selectedMenu === i ? (
              <Selected>{a}</Selected>
            ) : (
              <Unselected
                onClick={() => {
                  setSelectedMenu(i);
                }}
              >
                {a}
              </Unselected>
            );
          })}
        </MenuContainer>
        <hr className="menuHr" />
        {/**설문 리스트 */}
        <SurveyList>
          {selectedMenu === 0
            ? listShort.map((a) => {
                return <Shortform shortform={a} />;
              })
            : listResult.map((a) => {
                return <Shortform shortform={a} />;
              })}
        </SurveyList>
        <BottomContainer>
          {selectedMenu === 0 && totalItemsCount !== 0 && (
            <Paging
              page={currentPage}
              count={count}
              totalItemsCount={totalItemsCount}
              onPageChange={handlePageChange}
            />
          )}
          {selectedMenu === 1 && unlockCount !== 0 && (
            <Paging
              page={lockPage}
              count={count}
              totalItemsCount={unlockCount}
              onPageChange={handleLockPageChange}
            />
          )}
        </BottomContainer>
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding-left: 253px;
  padding-top: 90px;
  width: 100%;
  height: 100%;

  .menuHr {
    margin-top: 5px;
    margin-left: 0px;
    border: 0.5px solid #bababa;
    width: 80vw;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 30px;
`;

const Info = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #444444;
  margin-bottom: 13px;
`;

const Search = styled.input`
  width: 80vw;
  height: 32px;

  max-width: 1150px;
  background: #f7f7f7;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 16px 16px;

  border: 0.3px solid #000000;
  border-radius: 5px;

  padding-left: 35px;
  margin-bottom: 40px;
`;

const MenuContainer = styled.div`
  width: 190px;
  display: flex;
  justify-content: space-between;
`;
const Selected = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #7097ff;
`;
const Unselected = styled.div`
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;
const SurveyList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding-left: 32px;
`;

const BottomContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 15px;
`;

export default ShortBoard;
