import React, { useState } from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
//import LoginTextInput from "../components/login/LoginTextInput";
import kaBtn from "../assets/login/kakao_login_btn.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [PW, setPW] = useState("");

  const loginBtnClicked = async () => {
    const result = await axios.post(`http://formvey.site:9000/login`, {
      email: email,
      password: PW,
    });

    console.log(result.data);

    if (result.data.isSuccess) {
      //const response = result.data.result;

      navigate("/main");
    } else {
      alert("invalid user!");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <LoginSection>
          <LoginTitle>Login</LoginTitle>
          <TextInputContainer>
            <Input
              placeholder="이메일"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </TextInputContainer>
          <TextInputContainer>
            <Input
              placeholder="비밀번호"
              type="password"
              onChange={(e) => {
                setPW(e.target.value);
              }}
            />
          </TextInputContainer>
          <BtnsContainer>
            <LoginBtn onClick={loginBtnClicked}>로그인</LoginBtn>
            <Link to="/signup">
              <SignupBtn>회원가입</SignupBtn>
            </Link>
          </BtnsContainer>
          <Line />
          <KaBtn src={kaBtn} />
          <Notice>
            카카오계정으로 간편하고 안전하게 로그인(회원가입)할 수 있습니다.
          </Notice>
        </LoginSection>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 1000px;
  align-items: center;
  padding-top: 60px;
`;

const LoginSection = styled.div`
  margin-top: 114px;
  padding-top: 59px;
  width: 550px;
  height: 646px;
  border: 0.1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  color: black;
  margin-bottom: 28px;
`;

const TextInputContainer = styled.div`
  margin-top: 23px;
`;

const Input = styled.input`
  width: 336px;
  height: 48px;
  background: #f7f7f7;
  border: 0.3px solid #000000;
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  padding-left: 19px;
  padding-right: 19px;

  //margin-top: 23px;
`;

const BtnsContainer = styled.div`
  margin-top: 29px;
  width: 335px;
  height: 48px;
  display: flex;
  justify-content: space-between;
`;

const LoginBtn = styled.div`
  width: 156px;
  height: 48px;
  line-height: 48px;
  background: #a3bcff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;

  cursor: pointer;
`;

const SignupBtn = styled.div`
  width: 156px;
  height: 48px;
  line-height: 48px;
  background: #ffffff;
  border: 0.1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: black;
`;

const Line = styled.hr`
  margin-top: 34px;
  width: 335px;
`;

const KaBtn = styled.img`
  width: 335px;
  margin-top: 29px;
`;

const Notice = styled.div`
  margin-top: 23px;
  font-weight: 400;
  font-size: 12px;
  color: #9a9a9a;
`;

export default Login;
