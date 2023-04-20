import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import MainMenu from "../components/common/MainMenu";
import styled from "@emotion/styled";

function Main() {
  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    console.log(localStorage.getItem("memberId"));
    //console.log(localStorage.getItem("test"));
  }, []);

  return (
    <div>
      <Container>
        <MainMenu />
      </Container>
    </div>
  );
}

const Container = styled.div`
  //padding-top: 60px;
`;

export default Main;
