import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchSurveyInfo } from "../../Functions";
import styled from "@emotion/styled";

function SurveyQuestionCheck(props) {
  //받아올 설문 정보 데이터
  const [surveyInfo, setSurveyInfo] = useState({
    endDate: "",
    exitUrl: "",
    isAnonymous: 0,
    memberId: 0,
    questions: [],
    responseCnt: 0,
    startDate: "",
    status: 0,
    surveyContent: "",
    surveyTitle: "",
    url: "",
  });

  const fetchData = async () => {
    const response = await fetchSurveyInfo(props.surveyId);
    //console.log(response);
    setSurveyInfo(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <FormContainer>
        <FormHeader>
          <FormTitle>{surveyInfo.surveyTitle}</FormTitle>
          <FormDesc>{surveyInfo.surveyContent}</FormDesc>
        </FormHeader>
        {/**설문조사 각 문항 */}
        {surveyInfo.questions.map((a, i) => {
          return (
            <QuestionContainer key={a.questionIdx}>
              <div className="flexDiv">
                <QuestionNumber>Q{i + 1}.</QuestionNumber>
                <QuestionTitle>{a.questionTitle}</QuestionTitle>
                {a.isEssential === 1 ? (
                  <QuestionNumber>*</QuestionNumber>
                ) : null}
              </div>
              {a.type === 0 ? ( //객관식 단일선택
                <OptionContainer>
                  {a.choices.map((b, j) => {
                    return (
                      <ChoiceContainer key={b.choiceIdx}>
                        <input
                          type="radio"
                          id={b.choiceIdx}
                          name="choice"
                          value={b.choiceContent}
                          disabled
                        />
                        <ChoiceLabel htmlfor="choice">
                          {b.choiceContent}
                        </ChoiceLabel>
                      </ChoiceContainer>
                    );
                  })}
                </OptionContainer>
              ) : a.type === 1 ? ( //객관식 다중선택
                <OptionContainer>
                  {a.choices.map((b, j) => {
                    return (
                      <ChoiceContainer key={b.choiceIdx}>
                        <input
                          type="checkbox"
                          id={b.choiceIdx}
                          name="choice"
                          value={b.choiceContent}
                          disabled
                        />
                        <ChoiceLabel htmlfor="choice">
                          {b.choiceContent}
                        </ChoiceLabel>
                      </ChoiceContainer>
                    );
                  })}
                </OptionContainer>
              ) : (
                //주관식
                <>
                  <AnswerInput placeholder="주관식 답변" disabled />
                </>
              )}
            </QuestionContainer>
          );
        })}
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 50px;

  .flexDiv {
    display: flex;
  }
`;

const FormContainer = styled.div`
  padding-top: 48px;
  width: 57.8vw;
`;

const FormHeader = styled.div`
  width: 100%;
  border-left: 8px solid #e7edff;
`;

const FormTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2%;
  width: 98%;
  font-weight: 700;
  font-size: 30px;
  color: #2c2c2c;
  border: 0px;
`;

const FormDesc = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2%;
  width: 98%;
  font-weight: 500;
  font-size: 15px;
  margin-top: 5px;
  border: 0px;
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

const OptionContainer = styled.div`
  margin-left: 30px;
`;

const ChoiceContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ChoiceLabel = styled.label`
  font-size: 13px;
  margin-left: 5px;
`;

const AnswerInput = styled.input`
  width: 50%;
  border: 0px;
  border-bottom: 1px solid #d4d4d4;
  margin: 30px 0px 20px 25px;
`;

export default SurveyQuestionCheck;
