import React, { useRef } from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import homeIcon from "../assets/common/home_icon.png";
import { Link } from "react-router-dom";

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
        <div>
          <Notice>설문이 배포되었습니다</Notice>
          <div className="urlContainer">
            <span style={{ fontSize: "20px" }}>URL</span>
            <URLInput readOnly value={location.state.url} ref={inputText} />
          </div>
        </div>
        <div className="copyBtnContainer">
          <CopyBtn onClick={copyText}>복사하기</CopyBtn>
        </div>
      </Container>
      <Link to="/main/built">
        <HomeLink>
          <HomeIcon src={homeIcon} />
          메인페이지
        </HomeLink>
      </Link>
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

  .copyBtnContainer {
    width: 400px;
  }
`;

const Notice = styled.div`
  font-weight: 500;
  line-height: 40px;
  font-size: 30px;
  //margin-left: 20px;
  border-left: 8px solid #a7bfff;
  padding-left: 10px;
`;

const URLInput = styled.input`
  width: 300px;
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
  background: linear-gradient(275.98deg, #6f96ff 0%, #b3c7ff 100%);
  box-shadow: inset 0px -3px 10px rgba(0, 0, 0, 0.3),
    inset 3px 2px 10px rgba(255, 255, 255, 0.45);
  border-radius: 14px;
  font-size: 14px;
  color: #ffffff;
  margin-top: 50px;
  float: right;
`;

const HomeLink = styled.div`
  width: 100px;
  position: fixed;
  bottom: 68px;
  right: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 15px;
  color: #5280fd;
  cursor: pointer;
`;

const HomeIcon = styled.img`
  width: 21px;
  height 21px;
`;

export default BuildComplete;
