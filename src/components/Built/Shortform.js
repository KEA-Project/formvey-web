import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import unlock from "../../assets/common/shortform/unlock.png";
import lock from "../../assets/common/shortform/lock.png";

function Shortform(props) {
  return (
    <Container>
      <TitleContainer>
        <Title>{props.shortform.shortQuestion}</Title>
        {props.shortform.shortResultStatus === 0 ? (
          <Status src={lock} />
        ) : (
          <Status src={unlock} />
        )}
      </TitleContainer>
      <Content>{props.shortform.surveyTitle}</Content>
      {props.shortform.shortType ===  0 ? (
        <Content>주관식</Content>
        ) : props.shortform.shortType === 1 ? (
            <Content>객관식(단일)</Content>
        ) : (
            <Content>객관식(다중)</Content> )}
      <BottomContainer>
        <div className="flexDiv">
          <Content>응답수</Content>
          <ResponseCnt>{props.shortform.shortResponse}</ResponseCnt>
        </div>
        {props.shortform.shortResultStatus === 0 ? (
          //<Link to="/build" state={{ surveyId: props.survey.surveyId }}>
            <ShowResponseBtn>잠금 해제</ShowResponseBtn>
         // </Link>
        ) : (
          <ShowResponseBtn>결과보기</ShowResponseBtn>
        )}
      </BottomContainer>

    </Container>
  );
}

const Container = styled.div`
  margin-top: 41px;
  width: 310px;
  height: 151px;
  border: 0.01em solid #d2d2d2;
  border-radius: 15px;
  box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.06);
  padding: 20px 20px 15px 20px;
  position: relative;
  margin-right: 2vw;

  .flexDiv {
    display: flex;
    align-items: center;
  }

  position: relative;
  overflow: visible;

`;

const MouseOverContainer = styled.div`
  position: absolute;
  display: none;
  top: 0;
  right: -40px;
  width: 40px;
  height: 50px;
  z-index: 990;
`;

const MouseOverBtn = styled.div`
  float: right;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2));
  border-radius: 5px;
`;

const DeleteBtn = styled.img`
  width: 10px;
  height: 10px;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .red {
    border: 1px solid #fe2e01;
    color: #fe2e01;
  }
  .green {
    border: 1px solid #1cd88a;
    color: #1cd88a;
  }
  .yellow {
    border: 1px solid #fac02d;
    color: #fac02d;
  }
`;

const Title = styled.div`
  font-size: 13px;
  color: #101828;
  font-weight: 500;
`;

const Status = styled.img`
  width: 20px;
  height: 20px;
`;

const Content = styled.div`
  font-size: 12px;
  color: #667085;
`;

const BottomContainer = styled.div`
  padding-top: 15px;
  border-top: 0.8px solid #e4e4e4;
  position: absolute;
  bottom: 15px;
  display: flex;
  width: 270px;
  align-items: center;
  justify-content: space-between;
`;

const ResponseCnt = styled.div`
  width: 55px;
  height: 26px;
  line-height: 26px;
  border-radius: 7px;
  background: #ebf2ff;
  border-radius: 10px;
  color: #5281ff;
  font-size: 12px;
  text-align: center;
  margin-left: 10px;
`;

const ShowResponseBtn = styled.div`
  width: 75px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 11px;
  background: #5281ff;
  color: white;
  font-weight: 700;
  font-size: 12px;
`;

export default Shortform;
