import React from "react";
import styled from "@emotion/styled";

function DropDown(props) {
  return (
    <div>
      <Select name={props.name}>
        <option disabled selected value>
          {" "}
          -- 연령대 선택 --{" "}
        </option>
        <option value="10s">10~19</option>
        <option value="20s">20~29</option>
        <option value="30s">30~39</option>
        <option value="40s">40~49</option>
        <option value="50s">50~59</option>
        <option value="over60">60 이상</option>
      </Select>
    </div>
  );
}

const Select = styled.select`
  width: 336px;
  height: 48px;
  background: #f7f7f7;
  border: 0.3px solid #000000;
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  padding-left: 19px;
  padding-right: 19px;
`;

export default DropDown;
