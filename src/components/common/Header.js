import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import logo from "../../assets/common/logo.png";

function Header() {
  return (
    <Container>
      <Logo src={logo} />
      <Link to="/login">
        <Login>로그인</Login>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  z-index: 999;
  width: 100vw;
  height: 60px;
  background: white;
  padding-left: 3vw;
  padding-right: 3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  backdrop-filter: blur(10px);
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  cursor: pointer;
`;

const Login = styled.div`
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  color: black;
`;

export default Header;
