import React from "react";
import styled from "@emotion/styled";

function AlertModal(props) {
  return (
    <Container>
      <Background />
      <ContentContainer>
        <Notice>{props.message}</Notice>
        <OkBtn
          onClick={() => {
            props.handleModalConfirm();
          }}
        >
          확인하기
        </OkBtn>
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

const OkBtn = styled.div`
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
  margin-top: 40px;
`;

export default AlertModal;
