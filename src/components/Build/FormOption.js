import React, { useState } from "react";
import styled from "@emotion/styled";
import BuildCalendar from "./BuildCalendar";

function FormOption(props) {
  /*
  useEffect(() => {
    console.log(props.showOption);
  }, [props.showOption]);*/

  const [isPublic, setIsPublic] = useState(false); //공개 설정
  const [isAnonymous, setIsAnonymous] = useState(false); //익명 설정
  const [exitUrl, setExitUrl] = useState("");

  return (
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
            setIsPublic(!isPublic);
          }}
        >
          <ToggleCircle className={isPublic ? "toggleOn" : "toggleOff"} />
        </ToggleContainer>
      </div>
      <OptionDesc>공개 전환 시 설문이 게시판에 등록됩니다.</OptionDesc>
      {/**익명 설정 */}
      <div className="flexDiv">
        <OptionTitle>익명</OptionTitle>
        <ToggleContainer
          onClick={() => {
            setIsAnonymous(!isAnonymous);
          }}
        >
          <ToggleCircle className={isAnonymous ? "toggleOn" : "toggleOff"} />
        </ToggleContainer>
      </div>
      <OptionDesc>설문 응답을 익명으로 받습니다.</OptionDesc>
      {/**응답 기한 설정*/}
      <OptionTitle>응답 기한 설정</OptionTitle>
      <BuildCalendar />
      {/**나가기 링크 설정 */}
      <OptionTitle>나가기 링크</OptionTitle>
      <ExitUrlInut />
    </Container>
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

export default FormOption;
