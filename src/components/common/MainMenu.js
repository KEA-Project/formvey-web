import React, { useState } from "react";
import styled from "@emotion/styled";

function MainMenu() {
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
  width: 248px;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: rgba(163, 188, 255, 0.1);
`;

const MenuBtn = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #444444;
  margin-top: 40px;
`;

const SelectedMenuBtn = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #7097ff;
  margin-top: 40px;
`;

export default MainMenu;
