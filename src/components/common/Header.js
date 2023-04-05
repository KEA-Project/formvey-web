import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Container>
      <Logo>Formvey</Logo>
      <Link to="/login">
        <Login>로그인</Login>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background: rgba(163, 188, 255, 0.3);
  padding-left: 3vw;
  padding-right: 3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;

  backdrop-filter: blur(10px);
`;

const Logo = styled.div``;

const Login = styled.div`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  color: black;
`;

export default Header;
