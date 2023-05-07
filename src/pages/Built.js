import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import addBtn from "../assets/common/add_btn.png";
import { Link } from "react-router-dom";
import axios from "axios";
import BuiltSurvey from "../components/Built/BuiltSurvey";
import Paging from "../components/common/Paging";

function Built() {
  const menu = ["전체", "제작중", "진행중", "설문완료"];
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [builtSurvey, setBuiltSurvey] = useState([]);
  const [reRender, setReRender] = useState(false); //재렌더링을 위한 state

  //페이징
  const [count] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [buildCount, setBuildCount] = useState(0);
  const [buildPage, setBuildPage] = useState(0);

  const [goingCount, setGoingCount] = useState(0);
  const [goingPage, setGoingPage] = useState(0);

  const [completeCount, setCompleteCount] = useState(0);
  const [completePage, setCompletePage] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/surveys/list/${localStorage.getItem(
        "memberId"
      )}?page=0&size=6`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setBuiltSurvey(response.data.result.getSurveyListRes);
      setTotalItemsCount(response.data.result.totalPageCnt);

      setBuildCount(response.data.result.unReleasedCnt);
      setGoingCount(response.datar.result.releasedCnt);
      setCompleteCount(response.data.result.closedCnt);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBuildPageChange = (page) => {
    setBuildPage(page);
  };

  const handleGoingPageChange = (page) => {
    setGoingPage(page);
  };

  const handleCompletePageChange = (page) => {
    setCompletePage(page);
  };

  useEffect(() => {
    fetchData();
  }, [reRender, currentPage, buildPage, goingPage, completePage]);

  return (
    <div>
      <Container>
        <Link to="/build">
          <AddBtn src={addBtn} />
        </Link>

        <Title>제작한 설문</Title>

        {/**설문 리스트 메뉴*/}
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
          {builtSurvey.map((a, i) => {
            if (
              selectedMenu === 0 || //전체
              (selectedMenu === 1 && a.status === 1) || //제작중
              (selectedMenu === 2 && a.status === 2) || //진행중
              (selectedMenu === 3 && a.status === 3) //설문완료
            ) {
              return (
                <BuiltSurvey
                  survey={a}
                  reRender={reRender}
                  setReRender={setReRender}
                />
              );
            } else {
              return null;
            }
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
          {selectedMenu === 1 && buildCount !== 0 && (
            <Paging
              page={buildPage}
              count={count}
              totalItemsCount={buildCount}
              onPageChange={handleBuildPageChange}
            />
          )}
          {selectedMenu === 2 && goingCount !== 0 && (
            <Paging
              page={goingPage}
              count={count}
              totalItemsCount={goingCount}
              onPageChange={handleGoingPageChange}
            />
          )}
          {selectedMenu === 3 && completeCount !== 0 && (
            <Paging
              page={completePage}
              count={count}
              totalItemsCount={completeCount}
              onPageChange={handleCompletePageChange}
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
const AddBtn = styled.img`
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 52.5px;
  height: auto;
  cursor: pointer;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 30px;
`;
const MenuContainer = styled.div`
  width: 302px;
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


export default Built;
