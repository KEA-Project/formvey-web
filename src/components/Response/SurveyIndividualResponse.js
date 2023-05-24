import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Paging from "../common/Paging";
import IndividualResponseTable from "./IndividualResponseTable";

function SurveyIndividualResponse(props) {
  const [responseList, setResponseList] = useState([
    {
      nickname: "",
      responseDate: "",
      responseId: 0,
    },
  ]);

  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [count] = useState(10);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/responses/Individual/${props.surveyId}?page=${currentPage}&size=10`
    );
    console.log(response);
    if (response.data.isSuccess) {
      setResponseList(response.data.result);
      setTotalItemsCount(1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      {/**설문 응답 리스트 */}
      <IndividualResponseTable response={responseList} />
      <BottomContainer>
        <Paging
          page={currentPage}
          count={count}
          totalItemsCount={totalItemsCount}
          onPageChange={handlePageChange}
        />
      </BottomContainer>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 48px;
  width: 80%;
  height: 100%;
`;
const BottomContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 15px;
`;

export default SurveyIndividualResponse;
