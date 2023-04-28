import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";

import FormGPT from "../components/Build/FormGPT";
import FormOption from "../components/Build/FormOption";
import { keyframes } from "@emotion/react";

import Dropdown from "../components/Build/Dropdown";
import Toggle from "../components/Build/Toggle";

import gptBtn from "../assets/build/gpt_btn.png";
import plusBtn from "../assets/common/add_btn.png";
import optionBtn from "../assets/build/option_btn.png";

function Build() {
  const [showGPT, setShowGPT] = useState(false);
  const [showOption, setShowOption] = useState(false);

  /*
    {
      title: "객관식 단일",
      select: ["보기1", "보기2", "보기3"],
      type: "단일선택",
      isShort: false,
      isEssential: false,
    },
    {
      title: "객관식 다중",
      select: ["보기1", "보기2", "보기3"],
      type: "다중선택",
      isShort: false,
      isEssential: false,
    },
    {
      title: "주관식",
      type: "주관식",
      isShort: false,
      isEssential: false,
    },*/
  const [questionList, setQuestionList] = useState([]);
  const [title, setTitle] = useState(""); //설문 제목
  const [desc, setDesc] = useState(""); //설문 설명

  const addGPTQuestion = (selectedList) => {
    var temp = [...questionList];
    for (let i = 0; i < selectedList.length; i++) {
      temp.push({
        title: selectedList[i],
        select: [""],
        type: "단일선택",
        isShort: false,
        isEssential: false,
      });
    }

    setQuestionList(temp);
  };

  //문항 추가
  const addQuestion = () => {
    var temp = [...questionList];
    temp.push({
      title: "",
      select: [""],
      type: "단일선택",
      isShort: false,
      isEssential: false,
    });

    setQuestionList(temp);
  };

  //문항 유형 변경
  const changeType = (index, type) => {
    var temp = [...questionList];
    temp[index].type = type;

    setQuestionList(temp);
  };

  //짧폼, 필수 선택
  const setShortAndEssential = (index, type, bool) => {
    if (type === "short") {
      var temp = [...questionList];
      temp[index].isShort = bool;

      setQuestionList(temp);
    } else if (type === "essential") {
      var temp2 = [...questionList];
      temp2[index].isEssential = bool;

      setQuestionList(temp2);
    }
  };

  //객관식 보기 추가
  const addOption = (i) => {
    //console.log(i);
    var temp = [...questionList];
    temp[i].select.push("");

    setQuestionList(temp);
  };

  //객관식 보기 내용 넣기
  const addOptionContent = (e, i, j) => {
    var temp = [...questionList];
    temp[i].select[j] = e.target.value;

    setQuestionList(temp);
  };

  //객관식 보기 삭제
  const deleteOption = (i, j) => {
    console.log(j);
    var temp = [...questionList];
    console.log(temp[i].select);
    temp[i].select.splice(j, 1);

    setQuestionList(temp);
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
        <FormOption showOption={showOption} />
        {/*설문조사 작성 부분*/}
        {/*설문조사 제목 + 설명*/}
        <FormContainer>
          <FormHeader>
            <FormTitle
              placeholder="제목을 입력해주세요"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <FormDesc
              placeholder="설문조사 설명을 입력해주세요"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </FormHeader>
          {/*설문조사 각 문항*/}
          {questionList.map((a, i) => {
            return (
              <QuestionContainer>
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <div style={{}}>
                    <QuestionNumber>Q{i + 1}. </QuestionNumber>
                    <QuestionTitle
                      placeholder="질문을 입력해주세요"
                      defaultValue={a.title}
                    />
                  </div>
                  {a.type === "단일선택" || a.type === "다중선택" ? ( //단일 객관식
                    <>
                      {a.select.map((a, j) => {
                        return (
                          <OptionContainer>
                            <OptionSelect />
                            <OptionContent
                              placeholder="보기를 입력해주세요"
                              defaultValue={a}
                              onChange={(e) => {
                                addOptionContent(e, i, j);
                              }}
                              value={a}
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
                  <Dropdown changeType={changeType} index={i} />
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
