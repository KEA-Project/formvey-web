/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import xBtn from "../../assets/common/x_button.png";
import { css } from "@emotion/react";
import axios from "axios";

function DeployModal(props) {
  const clickDeploy = async () => {
    console.log(props.payload);
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/surveys/create/${localStorage.getItem(
        "memberId"
      )}`,
      props.payload
    );

    console.log(result);
  };

  const option = [
    { key: 0, title: "공개", value: props.isPublic === 1 ? "공개" : "비공개" },
    {
      key: 1,
      title: "익명",
      value: props.payload.isAnonymous === 1 ? "익명" : "기명",
    },
    { key: 2, title: "나가기 링크", value: props.payload.exitUrl },
    { key: 3, title: "응답 기한", value: props.payload.endDate },
  ];
  return (
    <Container>
      <Background />
      <ContentContainer>
        <XBtn
          src={xBtn}
          onClick={() => {
            props.setShowModal(false);
          }}
        />
        <Notice>설문 배포 후에는 수정이 불가능 합니다!</Notice>
        {option.map((a, i) => {
          return (
            <div key={a.key} css={flexDiv}>
              <OptionIndicator />
              <OptionTitle>{a.title}</OptionTitle>
              <OptionContent>{a.value}</OptionContent>
            </div>
          );
        })}
        <DeployBtn onClick={clickDeploy}>배포하기</DeployBtn>
      </ContentContainer>
    </Container>
  );
}

const flexDiv = css`
  display: flex;
  margin-bottom: 20px;
  margin-left: 120px;
`;

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
  width: 610px;
  height: 387px;
  background: white;
  //filter: blur(1px);
  border-radius: 44px;
  z-index: 1000;
  padding-top: 40px;
  position: relative;
`;

const Notice = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  width: 100%;
  text-align: center;
  margin-bottom: 45px;
`;

const XBtn = styled.img`
  position: absolute;
  top: 25px;
  right: 40px;
  width: 27px;
  height: 27px;
  cursor: pointer;
`;

const OptionIndicator = styled.div`
  background: #a7bfff;
  width: 7px;
  height: 25px;
`;

const OptionTitle = styled.div`
  margin-left: 5px;
  font-size: 15px;
  font-weight: 700;
  color: #444444;
`;

const OptionContent = styled.div`
  margin-left: 10px;
  font-size: 15px;
  color: #444444;
`;

const DeployBtn = styled.div`
  width: 112px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: linear-gradient(275.98deg, #6f96ff 0%, #b3c7ff 100%);
  box-shadow: inset 0px -3px 10px rgba(0, 0, 0, 0.3),
    inset 3px 2px 10px rgba(255, 255, 255, 0.45);
  border-radius: 14.4px;

  position: absolute;
  bottom: 25px;
  right: 40px;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
`;

export default DeployModal;
