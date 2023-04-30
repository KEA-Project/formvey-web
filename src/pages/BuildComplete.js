import React, { useRef } from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

function BuildComplete(props) {
  const location = useLocation();
  const inputText = useRef();

  const copyText = () => {
    const current = inputText.current;
    current.select();
    document.execCommand("copy");

    alert("url을 복사했습니다!");
  };

  return (
    <>
      <Header />
      <Container>
        <Notice>설문이 배포되었습니다</Notice>
        <div className="urlContainer">
          <span style={{ fontSize: "20px" }}>URL</span>
          <URLInput readOnly value={location.state.url} ref={inputText} />
        </div>
        <CopyBtn onClick={copyText}>복사하기</CopyBtn>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .urlContainer {
    margin-top: 50px;
  }
`;

const Notice = styled.div`
  font-weight: 500;
  font-size: 30px;
  margin-left: 20px;
`;

const URLInput = styled.input`
  width: 400px;
  height: 35px;
  background: #f7f7f7;
  border: 0.3px solid #000000;
  border-radius: 5px;
  margin-left: 10px;
  padding-left: 10px;
  font-size: 13px;
`;

const CopyBtn = styled.div`
  width: 114px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  cursor: pointer;
  background: #5281ff;
  border-radius: 14px;
  font-size: 14px;
  color: #ffffff;
  margin-top: 50px;
`;

export default BuildComplete;
