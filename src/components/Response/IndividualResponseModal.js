import React, { useState, useEffect } from "react";
import xBtn from "../../assets/common/x_button.png";
import styled from "@emotion/styled";
import { fetchResponseInfo } from "../../Functions";

function IndividualResponseModal(props) {
  //받아올 설문 정보
  const [responseInfo, setResponseInfo] = useState({
    answers: [
      {
        answerContent: "",
        questionId: 0,
      },
    ],
    questions: [
      {
        choices: [
          {
            choiceContent: "",
            choiceId: 0,
            choiceIndex: 0,
          },
        ],
        isEssential: 0,
        isShort: 0,
        questionId: 0,
        questionIdx: 0,
        questionTitle: "",
        type: 0,
      },
    ],
  });

  const fetchData = async () => {
    const response = await fetchResponseInfo(props.responseId);
    if (response.answers.length !== 0) {
      setResponseInfo((prevInfo) => ({
        ...prevInfo,
        answers: response.answers,
        questions: response.questions,
      }));
    }
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Background />
      <ContentContainer>
        <Header>
          <NickName>{props.nickname}님의 응답</NickName>
          <CancelBtn
            src={xBtn}
            onClick={() => {
              props.setShowModal(false);
            }}
          />
        </Header>
        {responseInfo.questions.map((a, i) => {
          //다중선택 문항 선택값 배열
          const answerContent = responseInfo.answers.find(
            (answer) => answer.questionId === a.questionId
          )?.answerContent;
          const selectedChoices = answerContent
            ? answerContent.slice(1, -1).split(", ")
            : [];
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
                        {responseInfo.answers[
                          responseInfo.answers.findIndex(
                            (answer) => answer.questionId === a.questionId
                          )
                        ].answerContent.substring(
                          1,
                          answerContent.length - 1
                        ) === b.choiceContent ? (
                          <input
                            type="radio"
                            id={b.choiceIdx}
                            name={uniqueName}
                            value={b.choiceContent}
                            disabled
                            checked
                          />
                        ) : (
                          <input
                            type="radio"
                            id={b.choiceIdx}
                            name={uniqueName}
                            value={b.choiceContent}
                            disabled
                          />
                        )}

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
                    const isChecked = selectedChoices.includes(b.choiceContent);
                    const uniqueName = `choice_${a.questionIdx}_${b.choiceIdx}`;
                    return (
                      <ChoiceContainer key={b.choiceIdx}>
                        <input
                          type="checkbox"
                          id={b.choiceIdx}
                          name={uniqueName}
                          value={b.choiceContent}
                          disabled
                          checked={isChecked}
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
                    disabled
                    value={
                      responseInfo.answers.find(
                        (answer) => answer.questionId === a.questionId
                      )?.answerContent || ""
                    }
                  />
                </>
              )}
            </QuestionContainer>
          );
        })}
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

  .flexDiv {
    display: flex;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentContainer = styled.div`
  padding: 30px 65px 30px 65px;

  width: 70%;
  height: 75%;

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
  display: flex;
  height: 48.24px;
  justify-content: space-between;
`;

const NickName = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 29px;
  border-left: 6px solid #5281ff;
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
`;

const CancelBtn = styled.img`
  height: 27.36px;
  cursor: pointer;
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

export default IndividualResponseModal;
