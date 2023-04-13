import React from "react";
import Header from "../components/common/Header";
import MainMenu from "../components/common/MainMenu";
import styled from "@emotion/styled";

function Main() {
  return (
    <div>
      <Header />
      <Container>
        <MainMenu />
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding-top: 60px;
`;

export default Main;
