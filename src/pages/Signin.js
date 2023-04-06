import React from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
import LoginTextInput from "../components/login/LoginTextInput";
import DropDown from "../components/signin/DropDown";
import GenderRadio from "../components/signin/GenderRadio";

function Signin() {
  const requiredItem = [
    { name: "이메일", placeholder: "ex) formvey@google.com" },
    { name: "닉네임", placeholder: "ex) 송재민" },
    { name: "비밀번호", placeholder: "대 소문자 + 숫자 (8자 이상)" },
    { name: "비밀번호 확인", placeholder: "대 소문자 + 숫자 (8자 이상)" },
  ];

  return (
    <div>
      <Header />
      <Container>
        <SigninSection>
          <SigninTitle>Sign in</SigninTitle>
          {requiredItem.map((a, i) => {
            return (
              <>
                <ItemContainer>
                  <div>
                    {a.name} <RedAst>*</RedAst>
                  </div>
                  <LoginTextInput placeholder={a.placeholder} />
                </ItemContainer>
              </>
            );
          })}
          <ItemContainer>
            <div>
              연령대 <RedAst>*</RedAst>
            </div>
            <DropDown name="age" />
          </ItemContainer>

          <ItemContainer>
            <div>
              성별 <RedAst>*</RedAst>
            </div>
            <GenderRadio />
          </ItemContainer>

          <ItemContainer>
            <div>휴대폰 번호 (챗봇 제공용)</div>
            <LoginTextInput placeholder="ex) 01012345678" />
          </ItemContainer>
          <Btn>가입하기</Btn>
        </SigninSection>
      </Container>
    </div>
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

const SigninSection = styled.div`
  margin-top: 35px;
  padding-top: 19px;
  width: 550px;
  height: 846px;
  border: 0.1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SigninTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  color: black;
  margin-bottom: 43px;
`;

const ItemContainer = styled.div`
  margin-top: 13px;
  text-align: left;
  width: 336px;
`;

const RedAst = styled.span`
  color: red;
`;

const Btn = styled.div`
  width: 156px;
  height: 48px;
  line-height: 48px;
  background: #a3bcff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  margin-top: 55px;

  cursor: pointer;
`;

export default Signin;
