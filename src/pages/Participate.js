import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
import axios from "axios";

function Participate() {
  const { surveyId } = useParams(); //url 파라미터에 survey id 값

  /**{
        qudstionIdx: 0,
        questionTitle: "객관식 단일",
        choices: [
          { choiceContent: "보기1", choiceIdx: 0 },
          { choiceContent: "보기2", choiceIdx: 1 },
          { choiceContent: "보기3", choiceIdx: 2 },
        ],
        type: 0,
        isShort: 0,
        isEssential: 1,
      },
      {
        qudstionIdx: 1,
        questionTitle: "객관식 다중",
        choices: [
          { choiceContent: "보기1", choiceIdx: 0 },
          { choiceContent: "보기2", choiceIdx: 1 },
          { choiceContent: "보기3", choiceIdx: 2 },
        ],
        type: 1,
        isShort: 0,
        isEssential: 0,
      },
      {
        qudstionIdx: 2,
        questionTitle: "주관식",
        choices: [],
        type: 2,
        isShort: 0,
        isEssential: 0,
      }, */

  //받아올 설문 정보 데이터
  const [surveyInfo, setSurveyInfo] = useState({
    endDate: "2023-05-03T13:14:54.561Z",
    exitUrl: "",
    isAnonymous: 0,
    memberId: 0,
    questions: [],
    responseCnt: 0,
    startDate: "",
    status: 0,
    surveyContent: "당신은 폼베이 이용에 얼마나 만족하고 계신가요?",
    surveyTitle: "폼베이 이용 만족도 조사",
    url: "",
  });

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/surveys/info/${surveyId}`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    if (response.data.isSuccess) {
      setSurveyInfo(response.data.result);
    }
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <FormContainer>
          <FormHeader>
            <FormTitle>{surveyInfo.surveyTitle}</FormTitle>
            <FormDesc>{surveyInfo.surveyContent}</FormDesc>
          </FormHeader>
          {/**설문조사 각 문항 */}
          {surveyInfo.questions.map((a, i) => {
            return (
              <QuestionContainer key={a.qudstionIdx}>
                <div className="flexDiv">
                  <QuestionNumber>Q{i + 1}.</QuestionNumber>
                  <QuestionTitle>{a.questionTitle}</QuestionTitle>
                  {a.isEssential === 1 ? (
                    <QuestionNumber>*</QuestionNumber>
                  ) : null}
                </div>
                {a.type === 0 ? ( //객관식 단일선택
                  <OptionContainer>
                    {a.choices.map((a, j) => {
                      return (
                        <ChoiceContainer key={a.choiceIdx}>
                          <input
                            type="radio"
                            id={a.choiceIdx}
                            name="choice"
                            value={a.choiceContent}
                          />
                          <ChoiceLabel for="choice">
                            {a.choiceContent}
                          </ChoiceLabel>
                        </ChoiceContainer>
                      );
                    })}
                  </OptionContainer>
                ) : a.type === 1 ? ( //객관식 다중선택
                  <OptionContainer>
                    {a.choices.map((a, j) => {
                      return (
                        <ChoiceContainer key={a.choiceIdx}>
                          <input
                            type="checkbox"
                            id={a.choiceIdx}
                            name="choice"
                            value={a.choiceContent}
                          />
                          <ChoiceLabel for="choice">
                            {a.choiceContent}
                          </ChoiceLabel>
                        </ChoiceContainer>
                      );
                    })}
                  </OptionContainer>
                ) : (
                  //주관식
                  <>
                    <AnswerInput placeholder="주관식 답변" />
                  </>
                )}
              </QuestionContainer>
            );
          })}

          {surveyInfo.endDate > new Date().toISOString() ? (
            <SubmitBtn>제출하기</SubmitBtn>
          ) : null}
        </FormContainer>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100vw;

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

const SubmitBtn = styled.div`
  width: 114px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  cursor: pointer;
  background: #5281ff;
  border-radius: 14px;
  font-size: 14px;
  color: #ffffff;
  margin-top: 60px;
  float: right;
`;

export default Participate;
