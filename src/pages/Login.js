import React from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
import LoginTextInput from "../components/login/LoginTextInput";
import kaBtn from "../assets/login/kakao_login_btn.png";

function Login() {
  return (
    <>
      <Header />
      <Container>
        <LoginSection>
          <LoginTitle>Login</LoginTitle>
          <LoginTextInput placeholder="이메일" />
          <LoginTextInput placeholder="비밀번호" />
          <BtnsContainer>
            <LoginBtn>로그인</LoginBtn>
            <SigninBtn>회원가입</SigninBtn>
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
  //padding-top: 60px;
`;

const LoginSection = styled.div`
  margin-top: 114px;
  padding-top: 59px;
  width: 550px;
  height: 646px;
  opacity: 1;
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
`;

const SigninBtn = styled.div`
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
