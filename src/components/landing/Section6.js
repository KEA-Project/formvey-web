import React from "react";
import styled from "@emotion/styled";
import labtopMock from "../../assets/landing/cutted_labtop_mock.png";

function Section6() {
  return (
    <Container>
      <MainDesc>폼베이, 지금 바로 무료로 이용해보세요</MainDesc>
      <Btn>시작하기</Btn>
      <LabtopMock src={labtopMock} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 832px;
  background: #fafafa;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainDesc = styled.div`
  margin-top: 155px;
  font-weight: 500;
  font-size: 32px;
`;

const Btn = styled.div`
  width: 140px;
  height: 45.29px;
  line-height: 45.29px;
  background: linear-gradient(275.98deg, #6f96ff 0%, #b3c7ff 100%);
  box-shadow: 0px 10px 30px #aec4ff, inset 0px -3px 10px rgba(0, 0, 0, 0.3),
    inset 3px 2px 10px rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  margin-top: 40px;
  text-align: center;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;

  cursor: pointer;
`;

const LabtopMock = styled.img`
  width: 1280px;
  height: 526.24px;
  margin-top: 20px;
`;

export default Section6;
