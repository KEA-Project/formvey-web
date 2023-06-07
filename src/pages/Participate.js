import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
import axios from "axios";
import { fetchSurveyInfo } from "../Functions";
import { getToday } from "../Functions";

function Participate() {
  const navigate = useNavigate();
  let { surveyId } = useParams(); //url 파라미터에 survey id 값
  surveyId = atob(surveyId); //survey id 복호화
  const [essentialId, setEssentialId] = useState([]);

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
    surveyContent: "당신은 폼베이 이용에 얼마나 만족하고 계신가요?",
    surveyTitle: "폼베이 이용 만족도 조사",
    url: "",
  });

  const checkEssential = () => {
    //필수 응답 인덱스 값들 넣어주기
    var temp = [...essentialId];
    for (let i = 0; i < surveyInfo.questions.length; i++) {
      if (surveyInfo.questions[i].isEssential === 1) {
        temp.push(surveyInfo.questions[i].questionId);
      }
    }
    setEssentialId(temp);
  };

  const fetchData = async () => {
    const response = await fetchSurveyInfo(surveyId);
    console.log(response);
    setSurveyInfo(response);
  };

  useEffect(() => {
    fetchData();
  }, [surveyId]);

  useEffect(() => {
    if (surveyInfo) {
      checkEssential();
    }
  }, [surveyInfo]);

  const [answers, setAnswers] = useState([]); //내 응답

  //단일선택, 주관식 응답하기
  const respondSingle = (questionId, content) => {
    //console.log(questionId + " " + content);

    //해당 questionId의 답변이 있는지, 있다면 인덱스 확인
    let checkIndex = answers.findIndex((obj) => obj.questionId === questionId);

    if (checkIndex === -1) {
      answers.push({ content: [content], questionId: questionId });
    } else {
      if (content === "") {
        //답변을 지울 경우
        answers.splice(checkIndex, 1);
      } else {
        answers.splice(checkIndex, 1);
        answers.push({ content: [content], questionId: questionId });
      }
    }

    console.log(answers);
  };

  // 다중선택 응답하기
  const respondMulti = (questionId, content, checked) => {
    //해당 questionId의 답변이 있는지, 있다면 인덱스 확인
    let checkIndex = answers.findIndex((obj) => obj.questionId === questionId);

    //console.log(`${questionId} ${content} ${checked}`);
    if (checked && checkIndex === -1) {
      answers.push({ content: [content], questionId: questionId });
    } else if (checked && checkIndex !== -1) {
      var temp = [...answers];
      temp[checkIndex].content.push(content);
      setAnswers(temp);
    } else if (!checked) {
      var temp2 = [...answers];

      if (temp2[checkIndex].content.length === 1) {
        answers.splice(checkIndex, 1);
      } else {
        var idx = temp2[checkIndex].content.indexOf(content);
        temp2[checkIndex].content.splice(idx, 1);
        setAnswers(temp2);
      }
    }

    console.log(answers);
  };

  //응답 제출하기
  const submitRespond = async () => {
    //필수 질문에 응답했는지 확인
    const isEssentialIncluded = essentialId.every((idx) =>
      answers.some((answer) => answer.questionId === idx)
    );

    console.log(answers);

    if (!isEssentialIncluded) {
      alert("필수 질문에 응답해주세요!");
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_RESPONSE}/responses/${surveyId}`,
        {
          answers: answers,
          memberId: localStorage.getItem("memberId"),
          responseDate: getToday(),
        },
        {
          headers: {
            "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
          },
        }
      );

      if (response.data.isSuccess) {
        navigate("/main/participated");
        if (surveyInfo.exitUrl !== "") {
          window.open(`${surveyInfo.exitUrl}`, "_blank");
        }
      }
    }
  };

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
                      const uniqueName = `choice_${a.questionIdx}_${b.choiceIdx}`;
                      return (
                        <ChoiceContainer key={b.choiceIdx}>
                          <input
                            type="radio"
                            id={b.choiceIdx}
                            name={uniqueName}
                            value={b.choiceContent}
                            onChange={() => {
                              respondSingle(a.questionId, b.choiceContent);
                            }}
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
                      const uniqueName = `choice_${a.questionIdx}_${b.choiceIdx}`;
                      return (
                        <ChoiceContainer key={b.choiceIdx}>
                          <input
                            type="checkbox"
                            id={b.choiceIdx}
                            name={uniqueName}
                            value={b.choiceContent}
                            onChange={({ target: { checked } }) => {
                              respondMulti(
                                a.questionId,
                                b.choiceContent,
                                checked
                              );
                            }}
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
                    <AnswerInput
                      placeholder="주관식 답변"
                      onChange={(e) => {
                        respondSingle(a.questionId, e.target.value);
                      }}
                    />
                  </>
                )}
              </QuestionContainer>
            );
          })}

          {surveyInfo.endDate > new Date().toISOString() ? (
            <SubmitBtn onClick={submitRespond}>제출하기</SubmitBtn>
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
