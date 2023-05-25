import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import DonutSection from "../components/main/DonutSection";
import BuiltSection from "../components/main/BuiltSection";
import ParticipatedSection from "../components/main/ParticipatedSection";
import ShortFormModal from "../components/main/ShortFormModal";

function Main(props) {
  return (
    <div>
      <Container>
        <UserContainer>
          <DonutSection userName={props.userName} />
          <BuiltSection />
          <ParticipatedSection />
        </UserContainer>
        <ShortContainer>
          <ShortTitle>짧폼</ShortTitle>
          <ShortFormModal />
        </ShortContainer>
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding-left: 202px;
  padding-top: 49px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;

const ShortContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShortTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #444444;
  margin-left: 20px;
`;

export default Main;
