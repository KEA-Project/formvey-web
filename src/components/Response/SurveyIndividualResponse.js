import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Paging from "../common/Paging";
import IndividualResponseTable from "./IndividualResponseTable";
import { getSurveyResponseList } from "../../Functions";

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
    const response = await getSurveyResponseList(props.surveyId, currentPage);

    console.log(response);

    if (response.data.isSuccess) {
      setResponseList(response.data.result);
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
