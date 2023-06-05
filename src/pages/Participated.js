import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import axios from "axios";
import ParticipatedSurvey from "../components/Participated/ParticipatedSurvey";
import Paging from "../components/common/Paging";

function Participated() {
  /*
  {
    endDate: "2023-05-04T04:31:11.615Z",
    id: 0,
    status: 1,
    surveyContent:
      "차세대 챗봇 LAB 카레팀의 새로운 설문조사 플랫폼 폼베이의 이용 만족도 설문조사",
    surveyTitle: "폼베이 이용에 대한 만족도 설문조사",
  },
  {
    endDate: "2023-05-04T04:31:11.615Z",
    id: 1,
    status: 2,
    surveyContent: "차세대 챗봇 LAB 카레팀",
    surveyTitle: "폼베이 이용에 대한 만족도 설문조사",
  },*/
  const menu = ["전체", "진행중", "설문완료"];
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [participatedSurvey, setParticipatedSurvey] = useState([]);
  const [reRender, setReRender] = useState(false); //재렌더링을 위한 state

  //페이징
  const [count] = useState(6);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [goingCount, setGoingCount] = useState(0);
  const [goingPage, setGoingPage] = useState(0);

  const [completeCount, setCompleteCount] = useState(0);
  const [completePage, setCompletePage] = useState(0);

  const page =
    selectedMenu === 0
      ? currentPage
      : selectedMenu === 1
      ? goingPage
      : completePage;

  const fetchData = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL_RESPONSE
      }/responses/list/${localStorage.getItem("memberId")}?page=${page}&size=6`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setParticipatedSurvey(response.data.result.getResponseListRes);
      console.log(
        response.data.result.totalPageCnt,
        response.data.result.releasedPageCnt,
        response.data.result.closedPageCnt
      );

      setTotalItemsCount(response.data.result.totalPageCnt);
      setGoingCount(response.data.result.closedPageCnt);
      setCompleteCount(response.data.result.releasedPageCnt);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reRender, currentPage, goingPage, completePage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoingPageChange = (page) => {
    setGoingPage(page);
  };

  const handleCompletePageChange = (page) => {
    setCompletePage(page);
  };

  return (
    <div>
      <Container>
        <Title>응답한 설문</Title>

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
          {participatedSurvey.map((a, i) => {
            if (
              selectedMenu === 0 || //전체
              (selectedMenu === 1 && a.status === 1) || //진행중
              (selectedMenu === 2 && a.status === 2) //설문완료
            ) {
              return (
                <ParticipatedSurvey
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
          {selectedMenu === 1 && goingCount !== 0 && (
            <Paging
              page={goingPage}
              count={count}
              totalItemsCount={goingCount}
              onPageChange={handleGoingPageChange}
            />
          )}
          {selectedMenu === 2 && completeCount !== 0 && (
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
const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 30px;
`;
const MenuContainer = styled.div`
  width: 220px;
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

export default Participated;
