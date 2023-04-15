import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import logo from "../../assets/common/logo.png";
import axios from "axios";

function MainMenu() {
  const [userName, setUserName] = useState("");

  const getUserInfo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/members/info/${localStorage.getItem(
        "memberId"
      )}`
    );

    console.log(response.data);
    setUserName(response.data.result.nickname);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const menu = [
    "메인",
    "설문 게시판",
    "짧폼 게시판",
    "제작한 설문",
    "응답한 설문",
    "리워드 보관함",
  ];

  const [selected, setSelected] = useState(0);

  return (
    <Container>
      <Logo src={logo} />
      <UserName>{userName}</UserName>
      <ModifyProfileBtn>프로필 수정</ModifyProfileBtn>
      {menu.map((a, i) => {
        return selected === i ? (
          <SelectedMenuBtn>{a}</SelectedMenuBtn>
        ) : (
          <MenuBtn
            onClick={() => {
              setSelected(i);
            }}
          >
            {a}
          </MenuBtn>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  padding-top: 70px;
  width: 202px;
  height: 100vh;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: rgba(163, 188, 255, 0.2);
  border-radius: 0px 50px 50px 0px;
`;

const Logo = styled.img`
  width: 144px;
`;

const UserName = styled.div`
  margin-top: 27px;
  font-weight: 700;
  font-size: 18px;
`;

const ModifyProfileBtn = styled.div`
  margin-top: 11px;
  width: 85px;
  height: 26px;
  border: 2px solid #a3bcff;
  border-radius: 10px;
  font-weight: 700;
  font-size: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
`;

const MenuBtn = styled.div`
  width: 141px;
  height: 46.76px;
  line-height: 46.76px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #444444;
  margin-top: 20px;
`;

const SelectedMenuBtn = styled.div`
  width: 141px;
  height: 46.76px;
  line-height: 46.76px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #7097ff;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 10px;
`;

export default MainMenu;
