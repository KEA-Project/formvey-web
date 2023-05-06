import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function ParticipatedSurvey(props) {
  return (
    <Container>
      <TitleContainer>
        <Title>{props.survey.surveyTitle}</Title>
        {props.survey.status === 1 ? (
          <Status>진행중</Status>
        ) : (
          <Status>마감</Status>
        )}
      </TitleContainer>
      <Content>{props.survey.surveyContent}</Content>
      <BottomContainer>
        {props.survey.status === 1 ? (
          <EditBtn>수정하기</EditBtn>
        ) : (
          <EditBtn>응답보기</EditBtn>
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
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 13px;
  color: #101828;
  font-weight: 500;
`;

const Status = styled.div`
  width: 42px;
  height: 21px;
  text-align: center;
  border-radius: 14px;
  border: 1px solid #5281ff;
  font-weight: 700;
  font-size: 11px;
  color: #5281ff;
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
  width: 270px;
  align-items: center;
`;

const EditBtn = styled.div`
  width: 75px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 11px;
  background: #5281ff;
  color: white;
  font-weight: 700;
  font-size: 12px;
  float: right;
`;

export default ParticipatedSurvey;
