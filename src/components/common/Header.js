import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import logo from "../../assets/common/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/common/logout_icon.png";
import * as Functions from "../../Functions.js";

function Header() {
  const navigate = useNavigate();
  /*함수 재사용 하려면 어떻게 해야되지?*/
  const logoutBtnClicked = async () => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/logout/${localStorage.getItem(
        "memberId"
      )}`,
      {},
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response);

    if (response.data.isSuccess) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("memberId");

      navigate("/");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <Container>
      <Link to={localStorage.getItem("jwt") == null ? "/" : "/main/main"}>
        <Logo src={logo} />
      </Link>
      {localStorage.getItem("jwt") === null ? (
        <Link to="/login">
          <Login>로그인</Login>
        </Link>
      ) : (
        <LogoutContainer>
          <LogoutIcon src={logoutIcon} />
          <Login onClick={logoutBtnClicked}>로그아웃</Login>
        </LogoutContainer>
      )}
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
  border-bottom: 1px solid rgba(163, 188, 255, 0.3);
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  cursor: pointer;
`;

const Login = styled.div`
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  color: #5280fd;
`;

const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

export default Header;
