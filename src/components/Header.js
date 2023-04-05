import React from "react";
import styled from "@emotion/styled";

function Header() {
  return (
    <Container>
      <Logo>Formvey</Logo>
      <Login>로그인</Login>
    </Container>
  );
}

const Container = styled.div`
  width: 94vw;
  height: 60px;
  background: rgba(163, 188, 255, 0.3);
  padding-left: 3vw;
  padding-right: 3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div``;

const Login = styled.div`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
`;

export default Header;
