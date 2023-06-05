import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import axios from "axios";
import search from "../assets/common/search.png";
import BoardTable from "../components/SurveyBoard/BoardTable.js";
import Paging from "../components/common/Paging";

function SurveyBoard(props) {
  const [listSurvey, setListSurvey] = useState([]);

  const [totalItemsCount, setTotalItemsCount] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [count] = useState(10);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_SURVEY}/surveys/board?page=${currentPage}&size=10`
    );
    console.log(response);
    if (response.data.isSuccess) {
      setListSurvey(response.data.result);
      setTotalItemsCount(response.data.result[0].pages);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Container>
        <Title>설문 게시판</Title>
        <Info>키워드를 입력해 참여하고자 하는 설문을 찾아보세요!</Info>
        {/* 검색창 */}
        <Search></Search>
        {/* 설문 게시판 리스트 */}

        {/* {listSurvey.map((survey) => {
                    return <BoardTable survey={survey} />;
                })} */}

        <BoardTable survey={listSurvey} />
        <BottomContainer>
          <Paging
            page={currentPage}
            count={count}
            totalItemsCount={totalItemsCount}
            onPageChange={handlePageChange}
          />
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
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 9px;
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
  margin-bottom: 50px;
`;

const BottomContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 15px;
`;

export default SurveyBoard;
