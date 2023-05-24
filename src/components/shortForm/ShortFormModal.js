/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import goToSurvey from "../../assets/shortForm/goToSurvey.png";
import nextShortVector from "../../assets/shortForm/nextShortVector.png";
import shortTitleVector from "../../assets/shortForm/shortTitleVector.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import HCaptcha from "@hcaptcha/react-hcaptcha";

function ShortFormModal() {
  /*리캡챠 세팅*/
  const [captchaCount, setCaptchaCount] = useState(0);
  var captchaRef = useRef();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1분마다 상태를 초기화합니다.
      setCaptchaCount(0);
    }, 60000); // 1분은 60000 밀리초입니다.

    // 컴포넌트가 언마운트되면 타이머를 정리합니다.
    return () => clearInterval(interval);
  }, []);

  const handleVerify = (token) => {
    console.log("hCaptcha verification token:", token);
    if (token !== null) {
      setCaptchaResponse(token);
      setCaptchaCount(0);
      setNextBtnEnabled(true);
    }
  };

  //전체 설문 참여
  const navigate = useNavigate();

  const navigateParticipate = (surveyId) => {
    navigate(`/participate/${surveyId}`);
  };

  // 짧폼 랜덤 조회
  const [listShort, setListShort] = useState([]);
  // 답변 저장
  const [answers, setAnswers] = useState([]);

  const fetchData = async () => {
    const shortRandom = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL
      }/shortforms/random/${localStorage.getItem("memberId")}`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(shortRandom);
    if (shortRandom.data.isSuccess) {
      setListShort(shortRandom.data.result);
    }
  };

  const sendResponse = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/shortanswers/${
        listShort.id
      }/${localStorage.getItem("memberId")}`,
      {
        shortAnswer: answers,
      },
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    if (response.data.isSuccess) {
      shortFormUpdate();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shortFormUpdate = () => {
    fetchData();
    setSelected([]); // 다음 질문으로 넘어갈 때 선택 초기화
    setSelectedMulti([]); // 다음 질문으로 넘어갈 때 선택 초기화
    setAnswers([]); // 다음 질문으로 넘어갈 때 응답 초기화
  };

  // 단일 선택
  const [selected, setSelected] = useState(-1); // 선택된 버튼의 인덱스 값

  const handleSelect = (index, shortContent) => {
    setSelected(index);
    singleRes(shortContent);
  };

  const singleRes = (shortContent) => {
    if (answers.length > 0) setAnswers([]);
    else setAnswers([shortContent]);
    console.log(answers);
  };

  // 다중 선택
  const [selectedMulti, setSelectedMulti] = useState([]); // 선택된 버튼의 인덱스 값

  const handleMultiSelect = (index, shortContent) => {
    if (selectedMulti.includes(index)) {
      // 이미 선택된 버튼일 경우
      setSelectedMulti(selectedMulti.filter((item) => item !== index));
      setAnswers(answers.filter((item) => item !== shortContent)); // 선택된 버튼에서 제거
    } else {
      setSelectedMulti([...selectedMulti, index]);
      setAnswers([...answers, shortContent]); // 선택된 버튼 배열에 추가
    }
    console.log(answers);
  };

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const handleNextButtonClick = () => {
    setCaptchaCount(captchaCount + 1);
    console.log(captchaCount);

    if (captchaCount >= 10) {
      setShowCaptcha(true);
      setNextBtnEnabled(false);
    } else {
      setShowCaptcha(false);
      setNextBtnEnabled(true);
    }

    /*
    if (answers.length !== 0) sendResponse();
    shortFormUpdate();*/
  };

  return (
    <Container>
      <Headers>
        <ShortTitleVector src={shortTitleVector} />
        <ShortTitle>{listShort.surveyTitle}</ShortTitle>
        <GoToSurvey
          src={goToSurvey}
          key={listShort.surveyId}
          onClick={() => {
            navigateParticipate(listShort.surveyId);
          }}
        />
      </Headers>
      <Body>
        <ShortQuestion>{listShort.shortQuestion}</ShortQuestion>

        {listShort.shortType === 0 ? ( //객관식 단일선택
          <OptionDiv>
            {listShort.options.map((option) => {
              return (
                <ShortOption
                  key={option.shortIndex}
                  selected={selected === option.shortIndex}
                  onClick={() =>
                    handleSelect(option.shortIndex, option.shortContent)
                  }
                >
                  {option.shortContent}
                </ShortOption>
              );
            })}
          </OptionDiv>
        ) : listShort.shortType === 1 ? ( //객관식 다중선택
          <OptionDiv>
            {listShort.options.map((option) => {
              return (
                <ShortOption
                  key={option.shortIndex}
                  selected={selectedMulti.includes(option.shortIndex)}
                  onClick={() =>
                    handleMultiSelect(option.shortIndex, option.shortContent)
                  }
                >
                  {option.shortContent}
                </ShortOption>
              );
            })}
          </OptionDiv>
        ) : listShort.shortType === 2 ? (
          //주관식
          <>
            <AnswerInput
              placeholder="주관식 답변"
              onChange={(e) => {
                singleRes(e.target.value);
              }}
            />
          </>
        ) : null}
        <div>
          {showCaptcha ? (
            <div css={captchaStyle}>
              <HCaptcha
                ref={captchaRef}
                sitekey={process.env.REACT_APP_HCAPTCHA_SITEKEY}
                onVerify={handleVerify}
                onExpire={(e) => setCaptchaResponse("")}
                css={captchaStyle}
              />
            </div>
          ) : null}
        </div>
      </Body>
      {nextBtnEnabled ? (
        <NextShortVector
          src={nextShortVector}
          onClick={handleNextButtonClick}
        />
      ) : (
        <NextShortVector src={nextShortVector} />
      )}
    </Container>
  );
}

const captchaStyle = css`
  margin-top: 30px;
`;

const Container = styled.div`
  width: 30vw;
  height: 90%;
  margin-top: 20px;
  margin-left: 20px;

  border: 0.01em solid #d2d2d2;
  border-radius: 15px;
  box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.06);
  padding: 20px 20px 15px 20px;

  .flexDiv {
    display: flex;
    align-items: center;
  }

  position: relative;
  overflow: visible;
`;

const Headers = styled.div`
  margin-top: 10px;
  //margin-left: 20px;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ShortTitleVector = styled.img`
  width: 10px;
  height: 20px;
`;

const ShortTitle = styled.div`
  font-size: 13px;
  color: #101828;
  font-weight: 500;
  margin-left: 15px;
`;

const GoToSurvey = styled.img`
  width: 120px;
  height: auto;
  cursor: pointer;
  //margin-right: 15px;
  margin-left: auto;
`;

const Body = styled.div`
  margin-top: 10px;
  //margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  // height: auto;
`;

const ShortQuestion = styled.div`
  font-size: 28px;
  color: #101828;
  font-weight: 700;
  margin-top: 20%;
  flex-align: left;
  margin-bottom: 50px;
`;

const OptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ShortOption = styled.button`
  width: 400px;
  height: 60px;
  border-radius: 8px;
  // background-color: #f9f9f9;
  background-color: ${({ selected }) => (selected ? "#a7a7a7" : "#f9f9f9")};
  border: 1px solid #ececec;
  margin-top: 10px;
  font-size: 20px;
  color: #101828;
  font-weight: 600;
  cursor: pointer;
`;

const NextShortVector = styled.img`
  width: 65px;
  height: 15px;
  margin-bottom: 30px;
  //margin-left: 200px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AnswerInput = styled.input`
  width: 400px;
  height: 60px;
  border-radius: 8px;
  background-color: #f9f9f9;
  border: 1px solid #ececec;
  margin-top: 10px;
  font-size: 20px;
  color: #101828;
  font-weight: 600;
  cursor: pointer;
  padding-left: 10px;
`;

export default ShortFormModal;
