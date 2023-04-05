import React from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";

function Landing() {
  return (
    <div>
      <Header />
      <Container>
        <Slogan>
          더 많은 응답 수집과
          <br />
          간단한 설문 작성을 위한
          <br />
          설문조사 플랫폼
        </Slogan>
        <Btn>시작하기</Btn>
      </Container>
    </div>
  );
}

const Container = styled.div`
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
  font-size: 45px;
  line-height: 65px;
  display: flex;
  align-items: center;
  text-align: center;
  //width: 435px;
  height: 195px;

  margin-top: 96px;
`;

const Btn = styled.div`
  width: 170px;
  height: 55px;
  line-height: 55px;
  background: #a3bcff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  margin-top: 39px;
  text-align: center;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;

  cursor: pointer;
`;

export default Landing;
