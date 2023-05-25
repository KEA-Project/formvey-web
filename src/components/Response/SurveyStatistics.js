import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import SurveyStatisticDonut from "./SurveyStatisticDonut";

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
            {a.subjectiveAnswers !== null ? ( //주관식
              <>
                <ResponseCount>
                  응답 {a.subjectiveAnswers.length}개
                </ResponseCount>
                {a.subjectiveAnswers.map((answer, i) => {
                  return <SubjectiveAnswer>{answer}</SubjectiveAnswer>;
                })}
              </>
            ) : (
              <SurveyStatisticDonut question={a.multipleChoiceInfos} />
            )}
          </QuestionContainer>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  padding-top: 48px;
  padding-bottom: 50px;
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

const ResponseCount = styled.div`
  margin-top: 10px;
  font-size: 13px;
`;

const SubjectiveAnswer = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0px 10px 0px 10px;
  border-radius: 10px;
  border: 0.8px solid #d5d5d5;
  font-size: 13px;
  background: #f8f9fa;
  margin-top: 10px;
`;

export default SurveyStatistics;
