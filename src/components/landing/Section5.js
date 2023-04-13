import React from "react";
import styled from "@emotion/styled";
import { Keyframes, keyframes } from "@emotion/react";
import formgptEx from "../../assets/landing/formgpt_ex.png";

function Section5() {
  return (
    <Container>
      <div>
        <FormgptEx src={formgptEx} />
      </div>
      <Right>
        <MainDesc>인공지능이 만들어주는 설문 문항</MainDesc>
        <SubDesc>
          인공지능 “폼 GPT”의 설문 문항 추천으로
          <br />
          설문 제작의 부담감을 덜 수 있어요
        </SubDesc>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 832px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(242, 239, 255, 0) 100%);
  display: flex;
  justify-content: center;
`;

const Anim = keyframes`
  0%{
    margin-top: 114px;
  }
  50%{
    margin-top: 110px;
  }
  70%{
    margin-top: 100px;
  }
  100%{
    margin-top: 114px;
  }
`;

const FormgptEx = styled.img`
  margin-top: 114px;
  width: 377px;
  height: 603px;
  animation: ${Anim} 1.5s linear infinite;
`;

const Right = styled.div`
  margin-left: 13vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainDesc = styled.div`
  margin-top: 250px;
  font-weight: 700;
  font-size: 32px;
  color: #6f99ff;
`;

const SubDesc = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 94px;
`;

export default Section5;
