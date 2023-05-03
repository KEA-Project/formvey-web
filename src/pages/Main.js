import React, { useState, useEffect } from "react";
import MainMenu from "../components/common/MainMenu";
import styled from "@emotion/styled";
import addBtn from "../assets/common/add_btn.png";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <Container>
        <Link to="/build">
          <AddBtn src={addBtn} />
        </Link>
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding-left: 202px;
  width: 100%;
  height: 100%;
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
