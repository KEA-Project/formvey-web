import React from "react";
import styled from "@emotion/styled";
import chartEx from "../../assets/landing/chart_ex.png";
import giftMock from "../../assets/landing/gift_mock.png";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

function Section4() {
  const { ref: sectionRef, inView: sectionAnim } = useInView();

  return (
    <Container ref={sectionRef}>
      <Left>
        <MainDesc>확실한 리워드 시스템</MainDesc>
        <SubDesc>
          설문 참여 후 리워드로 기프티콘을 추첨 받거나,
          <br />
          짧폼 참여 포인트로 다른 짧폼의 응답 결과를 확인할 수 있어요
        </SubDesc>
        {sectionAnim ? (
          <ChartEx src={chartEx} />
        ) : (
          <ChartExNoAnim src={chartEx} />
        )}
      </Left>
      {sectionAnim ? (
        <GiftMock src={giftMock} />
      ) : (
        <GiftMockNoAnim src={giftMock} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 832px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  z-index: 0;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainDesc = styled.div`
  font-weight: 700;
  font-size: 32px;
  color: #6f99ff;
`;

const SubDesc = styled.div`
  margin-top: 20px;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
`;

const ChartAnim = keyframes`
  0%{
    opacity: 0;
    margin-left: -500px;
  }
  100%{
    opacity: 1;
  }
`;
const ChartExNoAnim = styled.img`
  margin-top: 95px;
  width: 550px;
  height: auto;
`;
const ChartEx = styled.img`
  margin-top: 95px;
  width: 550px;
  height: auto;
  animation: ${ChartAnim} 3s;
`;

const GiftAnim = keyframes`
  0%{
    opacity: 0;
    margin-bottom: 300px;
  }
  50%{
    opacity: 0;
    margin-bottom: 300px;
  }
  51%{
    opacity: 0.1;
  }
  100%{
    opacity: 1;
  }
`;

const GiftMock = styled.img`
  margin-left: 50px;
  width: 400px;
  height: auto;
  animation: ${GiftAnim} 5s;
`;

const GiftMockNoAnim = styled.img`
  margin-left: 50px;
  width: 400px;
  height: auto;
`;

export default Section4;
