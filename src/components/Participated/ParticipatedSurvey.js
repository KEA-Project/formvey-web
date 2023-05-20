import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import deleteBtn from "../../assets/build/delete_btn.png";
import DeleteModal from "../Built/DeleteModal";

function ParticipatedSurvey(props) {
  const [showModal, setShowModal] = useState(false); //삭제하기 모달 보여주기 여부

  return (
    <>
      {showModal ? (
        <DeleteModal
          setShowModal={setShowModal}
          reRender={props.reRender}
          setReRender={props.setReRender}
          responseId={props.survey.responseId}
          mode="participated"
        />
      ) : null}
      <Container>
        <TitleContainer>
          <Title>{props.survey.surveyTitle}</Title>
          {props.survey.status === 2 ? (
            <Status
              className={
                props.survey.dday > 9
                  ? "green"
                  : props.survey.dday <= 5 && props.survey.dday > 1
                  ? "yellow"
                  : "red"
              }
            >
              D - {props.survey.dday}
            </Status>
          ) : (
            <Status>마감</Status>
          )}
        </TitleContainer>
        <Content>{props.survey.surveyContent}</Content>
        <BottomContainer>
          {props.survey.status === 2 ? (
            <EditBtn>수정하기</EditBtn>
          ) : (
            <EditBtn>응답보기</EditBtn>
          )}
        </BottomContainer>

        {/**마우스 올렸을 때 보이는 삭제 버튼 */}
        <MouseOverContainer>
          <MouseOverBtn>
            <DeleteBtn
              src={deleteBtn}
              onClick={() => {
                setShowModal(true);
              }}
            />
          </MouseOverBtn>
        </MouseOverContainer>
      </Container>
    </>
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

  &:hover {
    & > div:last-child {
      display: block;
    }
  }
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

const Status = styled.div`
  width: 42px;
  min-width: 42px;
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
  cursor: pointer;
`;

export default ParticipatedSurvey;
