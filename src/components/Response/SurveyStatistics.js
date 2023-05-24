import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import ReactApexChart from "react-apexcharts";

function SurveyStatistics(props) {
  //받아올 통계 데이터
  const [statisticsResult, setStatisticsResult] = useState([
    {
      multipleChoiceInfos: [
        {
          choiceContent: "",
          choiceIndex: 0,
          multipleChoiceCnt: 0,
        },
      ],
      questionId: 0,
      questionIdx: 0,
      questionTitle: "",
      subjectiveAnswers: [""],
    },
  ]);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/responses/statistics/${props.surveyId}`
    );

    console.log(response.data);
    setStatisticsResult(response.data.result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {statisticsResult.map((a, i) => {
        return (
          <QuestionContainer key={a.questionIdx}>
            <div className="flexDiv">
              <QuestionNumber>Q{i + 1}.</QuestionNumber>
              <QuestionTitle>{a.questionTitle}</QuestionTitle>
            </div>
          </QuestionContainer>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  padding-top: 48px;
  width: 57.8vw;
  .flexDiv {
    display: flex;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  background: #fefefe;
  border: 0.8px solid #d5d5d5;
  border-radius: 5px;
  padding: 20px 10px 20px 20px;
`;

const QuestionNumber = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #5281ff;
`;

const QuestionTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  margin-left: 5px;
  margin-right: 5px;
`;

export default SurveyStatistics;
