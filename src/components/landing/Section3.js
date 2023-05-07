import React from "react";
import styled from "@emotion/styled";
import shortEx from "../../assets/landing/short_ex.png";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

function Section3() {
  const { ref: sectionRef, inView: sectionAnim } = useInView();

  return (
    <Container ref={sectionRef}>
      {sectionAnim ? (
        <>
          <ShortEx src={shortEx} />
        </>
      ) : (
        <ShortExNoAnim src={shortEx} />
      )}
      <div className="descContainer">
        <MainDesc>
          이젠 <MainSpan>“짧폼”</MainSpan>으로 빠르고 간단하게 참여하자!
        </MainDesc>
        <SubDesc>
          짧폼 시스템으로 설문 제작자는 더 많은 응답을 받을 수 있고, <br />
          설문 참여자는 설문 참여의 피로도를 줄일 수 있어요
        </SubDesc>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 832px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(242, 239, 255, 0) 100%);
  //flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 998;

  .descContainer {
    margin-left: 2vw;
  }
`;

const MainDesc = styled.div`
  //margin-top: 155px;
  font-weight: 700;
  font-size: 32px;
`;

const MainSpan = styled.span`
  font-weight: 700;
  font-size: 32px;
  color: #6f99ff;
`;

const ShortExAnim = keyframes`
0%{
  opacity: 0;
  //margin-top: 100px;
}
100%{
  opacity: 1;
  //margin-top: 87px;
}
`;

const ShortEx = styled.img`
  //margin-top: 87px;
  width: 380px;
  height: auto;
  animation: ${ShortExAnim} 2s;
  margin-right: 2vw;
`;

const ShortExNoAnim = styled.img`
  //margin-top: 87px;
  width: 380px;
  height: auto;
  margin-right: 2vw;
`;

const SubDescAnim = keyframes`
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

const SubDesc = styled.div`
  margin-top: 87px;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  align-items: center;
  text-align: center;
  animation: ${SubDescAnim} 3s;
`;

export default Section3;
