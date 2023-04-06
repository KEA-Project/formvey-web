import React from "react";
import styled from "@emotion/styled";

function LoginTextInput(props) {
  return (
    <>
      <Input placeholder={props.placeholder} />
    </>
  );
}

const Input = styled.input`
  width: 336px;
  height: 48px;
  background: #f7f7f7;
  border: 0.3px solid #000000;
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  padding-left: 19px;
  padding-right: 19px;

  //margin-top: 23px;
`;

export default LoginTextInput;
