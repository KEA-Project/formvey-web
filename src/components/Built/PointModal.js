import React, { useState, useEffect } from "react";
import xbtn from "../../assets/common/x_button.png";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import axios from "axios";

function PointModal(props) {
  //const [shortformId, setShortformId] = useState("");
  const [showPointModal, setShowPointModal] = useState(true);


//   useEffect(() => {
//     setShortformId(props.shortformId);
//   }, [props.shortformId]);


  return (
    <Container>
      <Background />

      <ContentContainer>
        <Header>
          <CancelBtn
            src={xbtn}
            onClick={() => {
              props.setShowPointModal(false);
            }}
          />
        </Header>
        <Question>결과보기를 하면 <span style={{ color: "#DB6868" }}>10 point </span>차감됩니다.<br/><br/>정말로 결과를 확인하시겠습니까?</Question>

        <BtnContainer>
          <Btn>결과보기</Btn>
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
  padding: 30px 30px 65px 65px;

  width: auto;
  height: auto;

  min-width: 600px;

  align-items: center;
  text-align: center;
  justify-content: center;

  background: white;
  border-radius: 21px;
  z-index: 1000;
`;

const Title = styled.div`
  padding-right: 35px;
  font-weight: 400;
  font-size: 17px;
`;

const Header = styled.div`
  height: 48.24px;
  text-align: right;
`;

const CancelBtn = styled.img`
  height: 27.36px;
  cursor: pointer;
`;

const Question = styled.div`
  padding-right: 35px;
  margin-bottom: 60px;
  font-weight: 700;
  font-size: 20px;
  white-space : pre-line;
`;

const Options = styled.div`
  padding-right: 35px;
  font-weight: 400;
  font-size: 17px;
  margin-bottom: 20px;
`;

const Option = styled.div`
  padding-right: 35px;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 15px;
`;

const BtnContainer = styled.div`
  display: inline-block;
  text-align: center;
  align-items: center;

  margin-right: 30px;
`;

const Btn = styled.div`
  width: 140px;
  height: 45.29px;

  line-height: 45.29px;
  background: linear-gradient(275.98deg, #6f96ff 0%, #b3c7ff 100%);
  box-shadow: 0px 10px 30px #aec4ff, inset 0px -3px 10px rgba(0, 0, 0, 0.3),
    inset 3px 2px 10px rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  margin-top: 60px;
  text-align: center;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;

  cursor: pointer;
`;

export default PointModal;  
