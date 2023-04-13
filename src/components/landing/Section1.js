import React from "react";
import styled from "@emotion/styled";
import logo from "../../assets/common/logo.png";
import labtopMock from "../../assets/landing/labtop_mock.png";
import { Keyframes, keyframes } from "@emotion/react";

function Section1() {
  return (
    <Container>
      <Slogan>
        더 많은 응답 수집과
        <br />
        빠르고 간단하게 진행하는
        <br />
        설문조사 플랫폼
      </Slogan>
      <Logo src={logo} />
      <Btn>시작하기</Btn>
      <LabtopMock src={labtopMock} />
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, rgba(242, 239, 255, 0) 100%);
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 1000px;
  align-items: center;
  padding-top: 60px;
`;

const Slogan = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 46px;
  display: flex;
  align-items: center;
  text-align: center;

  margin-top: 78px;
`;

const FadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const FadeIn2 = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  51%{
    opacity: 0.1;
  }
  100%{
    opacity: 1;
  }
`;

const Btn = styled.div`
  width: 140px;
  height: 45.29px;
  line-height: 45.29px;
  background: linear-gradient(275.98deg, #6f96ff 0%, #b3c7ff 100%);
  box-shadow: 0px 10px 30px #aec4ff, inset 0px -3px 10px rgba(0, 0, 0, 0.3),
    inset 3px 2px 10px rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  margin-top: 12.95px;
  text-align: center;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;

  cursor: pointer;

  animation: ${FadeIn2} 3s;
`;

const Logo = styled.img`
  width: 397px;
  height: auto;
  animation: ${FadeIn} 2s;
`;

const LabtopMock = styled.img`
  margin-top: 22px;
  width: 720px;
  height: auto;
`;

export default Section1;
