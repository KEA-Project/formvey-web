import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import MainMenu from "../components/common/MainMenu";
import styled from "@emotion/styled";
import addBtn from "../assets/common/add_btn.png";
import { Link } from "react-router-dom";

function Main() {
  /*
  useEffect(() => {
    //console.log(localStorage.getItem("jwt"));
    //console.log(localStorage.getItem("memberId"));
    //console.log(localStorage.getItem("test"));
  }, []);*/

  return (
    <div>
      <Container>
        <MainMenu />
      </Container>

      {/*질문 제작 페이지로*/}
      <Link to="/build">
        <AddBtn src={addBtn} />
      </Link>
    </div>
  );
}

const Container = styled.div`
  //padding-top: 60px;
`;
const AddBtn = styled.img`
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 52.5px;
  height: auto;
  cursor: pointer;
`;

export default Main;
