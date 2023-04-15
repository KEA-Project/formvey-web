import React from "react";
import styled from "@emotion/styled";
import annoyed from "../../assets/landing/annoyed_man.png";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

function Section2() {
  const { ref: sectionRef, inView: sectionAnim } = useInView();

  return (
    <Container ref={sectionRef}>
      {sectionAnim ? (
        <Desc>
          설문조사 문항이 너무 많아
          <br /> 중도에 포기한 경험이 있으신가요?
        </Desc>
      ) : (
        <DescNoAnim>
          설문조사 문항이 너무 많아
          <br /> 중도에 포기한 경험이 있으신가요?
        </DescNoAnim>
      )}

      <Image src={annoyed} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 832px;
  background: #fafafa;
  justify-content: center;
`;

const DescAnim = keyframes`
  0%{
    opacity: 0;
    margin-bottom: 200px;
  }
  100%{
    opacity: 1;
    margin-bottom: 0px;
  }
`;

const Desc = styled.div`
  width: 450px;
  font-weight: 500;
  font-size: 32px;
  line-height: 46px;
  display: flex;
  align-items: center;
  text-align: center;
  animation: ${DescAnim} 3s;
  margin-left: 12vw;
`;

const DescNoAnim = styled.div`
  width: 450px;
  font-weight: 500;
  font-size: 32px;
  line-height: 46px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: 12vw;
`;

const Image = styled.img`
  width: 684px;
  height: 741px;
  margin-left: 4vw;
  margin-top: 3vw;
`;

export default Section2;
