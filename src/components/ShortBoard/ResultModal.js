import React, { useEffect, useState } from "react";
import xbtn from "../../assets/common/x_button.png";
import styled from "@emotion/styled";
import axios from "axios";
import SurveyStatisticDonut from "../Response/SurveyStatisticDonut";

function ResultModal(props) {
  //받아올 통계 데이터
  const [statisticsResult, setStatisticsResult] = useState({
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
  });

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_RESPONSE}/shortanswers/statistics/${props.shortformId}`
    );

    if (response.data.isSuccess) {
      setStatisticsResult(response.data.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Background />

      <ContentContainer>
        <Header>
          <CancelBtn
            src={xbtn}
            onClick={() => {
              props.setShowModal(false);
              props.setShowResultModal(false);
            }}
          />
        </Header>
        <Title>
          {"<"}
          {props.shortform.surveyTitle}
          {">"}
        </Title>
        <Question>{props.shortform.shortQuestion}</Question>

        {statisticsResult.subjectiveAnswers !== null ? ( //주관식
          <>
            <ResponseCount>
              응답 {statisticsResult.subjectiveAnswers.length}개
            </ResponseCount>
            {statisticsResult.subjectiveAnswers.map((answer, i) => {
              return <SubjectiveAnswer>{answer}</SubjectiveAnswer>;
            })}
          </>
        ) : (
          <SurveyStatisticDonut
            question={statisticsResult.multipleChoiceInfos}
          />
        )}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentContainer = styled.div`
  padding: 30px 30px 65px 65px;

  width: auto;
  height: auto;

  min-width: 600px;

  align-items: center;
  text-align: center;
  justify-content: center;

  background: white;
  border-radius: 21px;
  z-index: 1000;

  overflow: auto;
`;

const Header = styled.div`
  height: 48.24px;
  text-align: right;
`;

const CancelBtn = styled.img`
  height: 27.36px;
  cursor: pointer;
`;

const Title = styled.div`
  padding-right: 35px;
  font-weight: 400;
  font-size: 17px;
`;

const Question = styled.div`
  padding-right: 35px;
  margin-bottom: 60px;
  font-weight: 700;
  font-size: 20px;
  white-space: pre-line;
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

export default ResultModal;
