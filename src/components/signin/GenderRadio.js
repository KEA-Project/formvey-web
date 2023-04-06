import React from "react";
import styled from "@emotion/styled";

function GenderRadio() {
  return (
    <div>
      <RadioContainer>
        <div>
          <Radio type="radio" name="gender" value="M" />
          남자
        </div>
        <div>
          <Radio type="radio" name="gender" value="F" />
          여자
        </div>
      </RadioContainer>
    </div>
  );
}

const RadioContainer = styled.div`
  width: 136px;
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
`;

const Radio = styled.input`
  border: 1px solid gray;
`;

export default GenderRadio;
