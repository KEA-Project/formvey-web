import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";

import FormGPT from "../components/Build/FormGPT";
import FormOption from "../components/Build/FormOption";

import Dropdown from "../components/Build/Dropdown";
import Toggle from "../components/Build/Toggle";

import gptBtn from "../assets/build/gpt_btn.png";
import plusBtn from "../assets/common/add_btn.png";
import optionBtn from "../assets/build/option_btn.png";

import { useLocation } from "react-router-dom";
import { fetchSurveyInfo } from "../Functions";

function Build(props) {
  const location = useLocation();
  const [showGPT, setShowGPT] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [isPublic, setIsPublic] = useState(0); //공개 설정
  const [isAnonymous, setIsAnonymous] = useState(0); //익명 설정
  const [exitUrl, setExitUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [surveyTitle, setSurveyTitle] = useState(""); //설문 제목
  const [surveyContent, setSurveyContent] = useState(""); //설문 설명
  const [responseCnt, setResponseCnt] = useState(0);

  const fetchData = async (surveyId) => {
    //설문조사 수정하기의 경우 설문의 내용을 받아와야 함
    const response = await fetchSurveyInfo(surveyId);
    console.log(response);

    setSurveyTitle(response.surveyTitle);
    setSurveyContent(response.surveyContent);
    setIsAnonymous(response.isAnonymous);
    setQuestions(response.questions);
    setExitUrl(response.exitUrl);
    setResponseCnt(response.responseCnt);
  };

  useEffect(() => {
    if (location.state) {
      //console.log(location);
      fetchData(location.state.surveyId);
    }
  }, [location]);

  /*
  {
      qudstionIdx: 0,
      questionTitle: "객관식 단일",
      choices: [
        { choiceContent: "보기1", choiceIdx: 0 },
        { choiceContent: "보기2", choiceIdx: 1 },
        { choiceContent: "보기3", choiceIdx: 2 },
      ],
      type: 0,
      isShort: false,
      isEssential: false,
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
      isShort: false,
      isEssential: false,
    },
    {
      qudstionIdx: 2,
      questionTitle: "주관식",
      choices: [],
      type: 0,
      isShort: false,
      isEssential: false,
    },
  */

  const addGPTQuestion = (selectedList) => {
    var temp = [...questions];
    for (let i = 0; i < selectedList.length; i++) {
      temp.push({
        questionIdx: temp.length,
        questionTitle: selectedList[i],
        choices: [{ choiceContent: "", choiceIdx: 0 }],
        type: 0,
        isShort: 0,
        isEssential: 0,
      });
    }

    setQuestions(temp);
  };

  //문항 추가
  const addQuestion = () => {
    var temp = [...questions];
    temp.push({
      questionIdx: temp.length,
      questionTitle: "",
      choices: [{ choiceContent: "", choiceIdx: 0 }],
      type: 0,
      isShort: 0,
      isEssential: 0,
    });

    setQuestions(temp);
  };

  //질문 제목 수정
  const changeQuestionTitle = (index, title) => {
    var temp = [...questions];
    temp[index].questionTitle = title;

    setQuestions(temp);
  };

  //문항 유형 변경
  const changeType = (index, type) => {
    var temp = [...questions];
    temp[index].type = type;

    setQuestions(temp);
  };

  //짧폼, 필수 선택
  const setShortAndEssential = (index, type, bool) => {
    if (type === "short") {
      var temp = [...questions];
      temp[index].isShort = bool;

      setQuestions(temp);
    } else if (type === "essential") {
      var temp2 = [...questions];
      temp2[index].isEssential = bool;

      setQuestions(temp2);
    }
  };

  //객관식 보기 추가
  const addOption = (i) => {
    //console.log(i);
    var temp = [...questions];
    temp[i].choices.push({
      choiceContent: "",
      choiceIdx: temp[i].choices.length,
    });

    setQuestions(temp);
  };

  //객관식 보기 내용 넣기
  const addOptionContent = (e, i, j) => {
    var temp = [...questions];
    temp[i].choices[j].choiceContent = e.target.value;

    setQuestions(temp);
  };

  //객관식 보기 삭제
  const deleteOption = (i, j) => {
    //console.log(j);
    var temp = [...questions];
    //console.log(temp[i].choices);
    temp[i].choices.splice(j, 1);

    setQuestions(temp);
  };

  return (
    <>
      <Header />
      <Container>
        {/*폼 GPT 관련 부분*/}
        {showGPT ? (
          <FormGPT setShowGPT={setShowGPT} addGPTQuestion={addGPTQuestion} />
        ) : null}
        <GPTBtnContainer>
          <GPTBtn
            src={gptBtn}
            onClick={() => {
              setShowGPT(!showGPT);
            }}
          />
          <GPTDesc>
            폼GPT에게
            <br />
            도움을 요청해보세요!
          </GPTDesc>
        </GPTBtnContainer>
        {/**옵션 설정 부분*/}
        <OptionBtn
          src={optionBtn}
          onClick={() => {
            setShowOption(!showOption);
          }}
          className={showOption ? "optionOnLeft" : "optionOnRight"}
        />
        <FormOption
          showOption={showOption}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          exitUrl={exitUrl}
          setExitUrl={setExitUrl}
          surveyTitle={surveyTitle}
          surveyContent={surveyContent}
          questions={questions}
          surveyId={location.state.surveyId}
          responseCnt={responseCnt}
        />
        {/*설문조사 작성 부분*/}
        {/*설문조사 제목 + 설명*/}
        <FormContainer>
          <FormHeader>
            <FormTitle
              placeholder="제목을 입력해주세요"
              onChange={(e) => {
                setSurveyTitle(e.target.value);
              }}
              value={surveyTitle}
            />
            <FormDesc
              placeholder="설문조사 설명을 입력해주세요"
              onChange={(e) => {
                setSurveyContent(e.target.value);
              }}
              value={surveyContent}
            />
          </FormHeader>
          {/*설문조사 각 문항*/}
          {questions.map((a, i) => {
            return (
              <QuestionContainer key={a.questionIdx}>
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <QuestionNumber>Q{i + 1}. </QuestionNumber>
                  <QuestionTitle
                    placeholder="질문을 입력해주세요"
                    defaultValue={a.questionTitle}
                    onChange={(e) => {
                      changeQuestionTitle(i, e.target.value);
                    }}
                  />
                  {a.type === 0 || a.type === 1 ? ( //단일 객관식
                    <>
                      {a.choices.map((a, j) => {
                        return (
                          <OptionContainer key={a.choiceIdx}>
                            <OptionSelect />
                            <OptionContent
                              placeholder="보기를 입력해주세요"
                              defaultValue={a.choiceContent}
                              onChange={(e) => {
                                addOptionContent(e, i, j);
                              }}
                              value={a.choiceContent}
                            />
                            <XBtn onClick={() => deleteOption(i, j)}>x</XBtn>
                          </OptionContainer>
                        );
                      })}
                      <OptionContainer>
                        <OptionSelect />
                        <AddOption onClick={() => addOption(i)}>
                          보기 옵션 추가
                        </AddOption>
                      </OptionContainer>
                    </>
                  ) : null}
                </div>
                <div>
                  <Dropdown changeType={changeType} index={i} type={a.type} />
                  <Toggle
                    option="짧폼"
                    index={i}
                    setShortAndEssential={setShortAndEssential}
                    type="short"
                  />
                  <Toggle
                    option="필수"
                    setShortAndEssential={setShortAndEssential}
                    index={i}
                    type="essential"
                  />
                </div>
              </QuestionContainer>
            );
          })}
          {/*설문조사 추가 버튼*/}
          <PlusContainer>
            <PlusBtn src={plusBtn} onClick={addQuestion} />
          </PlusContainer>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100vw;

  .optionOnLeft {
    right: 360px;
    transform: rotate(180deg);
    transition: 0.5s;
  }
  .optionOnRight {
    right: 30px;
    transition: 0.5s;
  }
`;

const GPTBtnContainer = styled.div`
  position: fixed;
  display: flex;
  left: 35px;
  bottom: 30px;
`;

const GPTBtn = styled.img`
  width: 61.2px;
  height: 60.48px;

  //box-shadow: inset 0px -3px 10px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0px 10px 40px rgba(112, 151, 255, 1));

  cursor: pointer;
`;

const GPTDesc = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  margin-left: 13px;
  margin-top: 12px;
`;

//설문작성 부분을 감싸는 컨테이너
const FormContainer = styled.div`
  padding-top: 48px;
  width: 57.8vw;
`;

const FormHeader = styled.div`
  width: 100%;
  border-left: 8px solid #e7edff;
`;

const FormTitle = styled.input`
  margin-left: 2%;
  width: 98%;
  font-weight: 700;
  font-size: 30px;
  color: #2c2c2c;
  border: 0px;
`;

const FormDesc = styled.input`
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

  display: flex;
  justify-content: space-between;
`;

const QuestionNumber = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #5281ff;
`;

const QuestionTitle = styled.input`
  font-weight: 700;
  font-size: 15px;
  border: 0;
  width: 80%;
`;

const OptionContainer = styled.div`
  margin-left: 30px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  position: relative;
`;

const OptionSelect = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  margin-left: 10px;
  border: 1px solid #676767;
`;

const OptionContent = styled.input`
  margin-left: 1%;
  line-height: 14px;
  width: 65%;
  font-weight: 400;
  font-size: 13px;
  border: 0;
`;

const AddOption = styled.div`
  margin-left: 1%;
  font-weight: 400;
  line-height: 14px;
  font-size: 13px;
  color: #7e7e7e;
  cursor: pointer;
`;

const PlusContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  background: #fefefe;
  border: 0.8px solid #d5d5d5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 5px;
`;

const XBtn = styled.span`
  font-size: 15px;
  color: red;
  cursor: pointer;
  //position: absolute;
`;

const PlusBtn = styled.img`
  width: 40px;
  height: auto;
  cursor: pointer;
`;

const OptionBtn = styled.img`
  width: 50px;
  height: auto;
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
`;

export default Build;
