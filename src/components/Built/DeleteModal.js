import React from "react";
import styled from "@emotion/styled";
import axios from "axios";

function DeleteModal(props) {
  //설문 삭제하기
  const deleteSurvey = async () => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/surveys/delete/${props.surveyId}`,
      {
        memberId: localStorage.getItem("memberId"),
      },
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    if (response.data.isSuccess) {
      props.setShowModal(false);
      props.setReRender(!props.reRender);
    }
  };

  return (
    <Container>
      <Background />
      <ContentContainer>
        <Notice>설문을 삭제하시겠습니까?</Notice>
        <BtnContainer>
          <DeleteBtn onClick={deleteSurvey}>삭제하기</DeleteBtn>
          <CancelBtn
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            취소하기
          </CancelBtn>
        </BtnContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentContainer = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 203px;
  background: white;
  border-radius: 21px;
  z-index: 1000;
`;

const Notice = styled.div`
  font-weight: 700;
  font-size: 22px;
`;

const BtnContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  width: 250px;
`;

const DeleteBtn = styled.div`
  width: 103px;
  height: 43px;
  line-height: 43px;
  background: #6f96ff;
  border-radius: 14px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
`;

const CancelBtn = styled.div`
  width: 103px;
  height: 43px;
  line-height: 43px;
  background: #f2f2f2;
  border-radius: 14px;
  font-size: 14px;
  color: #444444;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
`;

export default DeleteModal;
