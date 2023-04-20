import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import styled from "@emotion/styled";

function Dropdown(props) {
  const [showDrop, setShowDrop] = useState(false);
  const [type, setType] = useState("단일선택");

  const selectType = (selected) => {
    setType(selected);
    setShowDrop(false);

    props.changeType(props.index, selected);
  };
  return (
    <Container style={showDrop ? { border: "1px solid #7097FF" } : null}>
      <Drop type="checkbox" />
      <DropDownLabel
        for="dropdown"
        onClick={() => {
          setShowDrop(!showDrop);
        }}
      >
        <div>{type}</div>
        {showDrop ? (
          <FaAngleUp className="caretIcon" />
        ) : (
          <FaAngleDown className="caretIcon" />
        )}
      </DropDownLabel>

      {showDrop ? (
        <Content>
          <ul>
            <li
              onClick={() => {
                selectType("단일선택");
              }}
            >
              단일선택
            </li>
            <li
              onClick={() => {
                selectType("다중선택");
              }}
            >
              다중선택
            </li>
            <li
              onClick={() => {
                selectType("주관식");
              }}
            >
              주관식
            </li>
          </ul>
        </Content>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  width: 123px;
  height: 42px;
  background: #fefefe;
  border: 0.8px solid #d4d4d4;
  border-radius: 4px;
  position: relative;
`;

const Drop = styled.input`
  left: 0;
  visibility: hidden;
  position: absolute;
`;

const DropDownLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }

  .caretIcon {
    color: #88a8ff;
  }
`;

const Content = styled.div`
  font-size: 14px;
  display: block;
  position: absolute;
  width: 100%;
  height: 140px;
  left: 0;
  background: white;
  cursor: pointer;

  ul {
    list-style-type: none;
    padding: 8px 12px 12px 12px;
    margin: 0;
  }

  ul li {
    margin: 1rem 0;
  }

  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
  border-radius: 8px;
`;

export default Dropdown;
