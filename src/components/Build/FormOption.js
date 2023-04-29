import React, { useState } from "react";
import styled from "@emotion/styled";
import BuildCalendar from "./BuildCalendar";
import DeployModal from "./DeployModal";

function FormOption(props) {
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false); //배포 모달창 보이기

  //오늘 날짜 받아오기 (설문 시작일)
  const getToday = () => {
    var date = new Date();
    var year = `${date.getFullYear()}`.substring(2);
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "/" + month + "/" + day;
  };

  //설문 url 생성을 위한 uuid 생성 함수
  const uuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  //임시저장 버튼 눌렀을 때 이벤트
  const clickTempSave = () => {
    //console.log(getToday());

    const payload = {
      endDate: endDate,
      exitUrl: props.exitUrl,
      isAnonymous: props.isAnonymous,
      questions: props.questions,
      responseCnt: 0,
      rewardOption: 0,
      startDate: getToday(),
      surveyContent: props.surveyContent,
      surveyTitle: props.surveyTitle,
      url: "",
    };

    console.log(payload);
  };

  //배포 버튼 눌렀을 때 이벤트
  const clickDeploy = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal ? (
        <DeployModal
          setShowModal={setShowModal}
          payload={{
            endDate: endDate,
            exitUrl: props.exitUrl,
            isAnonymous: props.isAnonymous,
            questions: props.questions,
            responseCnt: 0,
            rewardOption: 0,
            startDate: getToday(),
            surveyContent: props.surveyContent,
            surveyTitle: props.surveyTitle,
            url: `http://www.formvey.site/participate/${uuid()}`,
          }}
          isPublic={props.isPublic}
        />
      ) : null}
      <Container
        style={
          props.showOption
            ? { right: "0px", transition: "0.5s" }
            : { right: "-350px", transition: "0.5s" }
        }
      >
        <SettingTitle>설정</SettingTitle>

        {/**공개 설정 */}
        <div className="flexDiv">
          <OptionTitle>공개</OptionTitle>
          <ToggleContainer
            onClick={() => {
              props.setIsPublic(props.isPublic === 1 ? 0 : 1);
            }}
          >
            <ToggleCircle
              className={props.isPublic === 1 ? "toggleOn" : "toggleOff"}
            />
          </ToggleContainer>
        </div>
        <OptionDesc>공개 전환 시 설문이 게시판에 등록됩니다.</OptionDesc>
        {/**익명 설정 */}
        <div className="flexDiv">
          <OptionTitle>익명</OptionTitle>
          <ToggleContainer
            onClick={() => {
              props.setIsAnonymous(props.isAnonymous === 1 ? 0 : 1);
            }}
          >
            <ToggleCircle
              className={props.isAnonymous === 1 ? "toggleOn" : "toggleOff"}
            />
          </ToggleContainer>
        </div>
        <OptionDesc>설문 응답을 익명으로 받습니다.</OptionDesc>
        {/**응답 기한 설정*/}
        <OptionTitle>응답 기한 설정</OptionTitle>
        <BuildCalendar setEndDate={setEndDate} />
        {/**나가기 링크 설정 */}
        <OptionTitle>나가기 링크</OptionTitle>
        <ExitUrlInut
          onChange={(e) => {
            props.setExitUrl(e.target.value);
          }}
        />
        {/**임시 저장/배포 버튼 */}
        <div className="deployBtnContainer">
          <DeployBtn onClick={clickTempSave}>임시 저장</DeployBtn>
          <DeployBtn onClick={clickDeploy}>배포하기</DeployBtn>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: fixed;
  width: 350px;
  height: 100vw;
  background: #f9faff;
  z-index: 999;
  //right: 0;

  .flexDiv {
    display: flex;
    align-items: center;
  }

  .deployBtnContainer {
    display: flex;
    margin-left: 15px;
    position: fixed;
    bottom: 5%;
    width: 279px;
    justify-content: space-between;
  }

  padding: 23px 23px 40px 23px;
`;

const SettingTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #444444;
`;

const OptionTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-left: 15px;
  margin-top: 27px;
`;

const OptionDesc = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #444444;
  margin-left: 15px;
  marign-top: 13px;
`;

const ToggleContainer = styled.div`
  margin-top: 27px;
  width: 35px;
  height: 17.36px;
  background: #e3edf7;
  box-shadow: inset -3px -3px 7px rgba(255, 255, 255, 0.7),
    inset 2px 2px 5px rgba(136, 165, 191, 0.38);
  border-radius: 18px;
  border: 1px #f9faff solid;
  display: flex;
  align-items: center;
  margin-left: 18px;

  .toggleOff {
    background: #d3e1f0;
    box-shadow: -5px -4px 9px 2px rgba(255, 255, 255, 0.7),
      1px 1px 5px rgba(104, 132, 157, 0.4);
    margin-left: 3px;
    transition: 0.3s;
  }
  .toggleOn {
    background: #6f96ff;
    box-shadow: 1px 1px 5px rgba(104, 132, 157, 0.4);
    margin-left: 17px;
    transition: 0.3s;
  }
`;

const ToggleCircle = styled.div`
  width: 12.16px;
  height: 12.16px;
  border-radius: 5.5px;
`;

const ExitUrlInut = styled.input`
  background: #f4f6ff;
  width: 278px;
  height: 35px;
  margin-left: 15px;
  margin-top: 10px;
  padding: 5px;

  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.06),
    inset 2px 2px 4px rgba(0, 0, 0, 0.08),
    inset -1px -1px 1px rgba(255, 255, 255, 0.6),
    inset -2px -2px 4px rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  border: 0;
  color: #444444;
  font-size: 13px;
`;

const DeployBtn = styled.div`
  width: 125px;
  height: 40px;
  line-height: 40px;
  background: #f4f6ff;
  /* emoboss-button-1 */

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.06), 4px 4px 8px rgba(0, 0, 0, 0.08),
    -2px -2px 2px rgba(255, 255, 255, 0.6),
    -4px -4px 8px rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  font-size: 15px;
  color: #444444;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
`;

export default FormOption;
