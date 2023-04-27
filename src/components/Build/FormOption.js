import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

function FormOption(props) {
  useEffect(() => {
    console.log(props.showOption);
  }, [props.showOption]);

  return (
    <Container
      style={
        props.showOption
          ? { right: "0px", transition: "0.5s" }
          : { right: "-280px", transition: "0.5s" }
      }
    ></Container>
  );
}

const Container = styled.div`
  position: fixed;
  width: 280px;
  height: 100vw;
  background: #f9faff;
  z-index: 999;
  //right: 0;
`;

export default FormOption;
