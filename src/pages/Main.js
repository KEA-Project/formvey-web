import React, { useState, useEffect } from "react";
import MainMenu from "../components/common/MainMenu";
import styled from "@emotion/styled";
import addBtn from "../assets/common/add_btn.png";
import { Link } from "react-router-dom";
import DonutSection from "../components/main/DonutSection";
import BuiltSection from "../components/main/BuiltSection";
import ParticipatedSection from "../components/main/ParticipatedSection";

function Main(props) {
  return (
    <div>
      <Container>
        <Link to="/build">
          <AddBtn src={addBtn} />
        </Link>
        <DonutSection userName={props.userName} />
        <BuiltSection />
        <ParticipatedSection />
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding-left: 202px;
  padding-top: 49px;
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
