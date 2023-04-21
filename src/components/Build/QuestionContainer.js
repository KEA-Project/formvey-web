import React from "react";
import styled from "@emotion/styled";

function QuestionContainer(props) {
  return <Container>{props.question.title}</Container>;
}

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  background: #fefefe;
  border: 0.8px solid #d5d5d5;
  border-radius: 5px;
  padding: 20px 10px 20px 20px;
`;

export default QuestionContainer;
