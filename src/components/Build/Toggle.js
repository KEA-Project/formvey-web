import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

function Toggle(props) {
  useEffect(() => {
    if (props.initialValue === 1) setSelected(true);
  }, []);

  const [selected, setSelected] = useState(false);
  return (
    <>
      {selected ? (
        <SelectedContainer
          onClick={() => {
            setSelected(false);
            props.setShortAndEssential(props.index, props.type, 0);
          }}
        >
          {props.option}
        </SelectedContainer>
      ) : (
        <Container
          onClick={() => {
            setSelected(true);
            props.setShortAndEssential(props.index, props.type, 1);
          }}
        >
          {props.option}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 123px;
  height: 42px;
  line-height: 42px;
  background: #fefefe;
  border: 0.8px solid #d4d4d4;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
`;

const SelectedContainer = styled.div`
  width: 123px;
  height: 42px;
  line-height: 42px;
  background: #84a5ff;
  border: 0.8px solid #d4d4d4;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: #fefefe;
  cursor: pointer;
  margin-top: 10px;
`;

export default Toggle;
