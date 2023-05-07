/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Form, DatePicker } from "antd";
import { TimePicker } from "antd";

import moment from "moment";

function BuildCalendar(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setDate(props.initialEndDate.substring(0, 10));
    setTime(props.initialEndDate.substring(10));
  }, [props.initialEndDate]);

  useEffect(() => {
    //console.log(`${date}${time}`);
    props.setEndDate(`${date}${time}`);
  }, [date, time, props]);

  return (
    <Container>
      <DatePicker
        onChange={(e) => {
          //console.log(e);
          const year = `${e.$y}`;
          const month = e.$M + 1 < 10 ? `0${e.$M + 1}` : `${e.$M + 1}`;
          const day = e.$D < 10 ? `0${e.$D}` : `${e.$D}`;

          setDate(`${year}-${month}-${day}`);
          //props.setEndDate(`${date}${time}`);
        }}
        size="medium"
        //value={moment(date)}
      />
      <TimePicker
        size="medium"
        css={css`
          margin-left: 10px;
        `}
        onChange={(e) => {
          setTime(`T` + `${e.$d}`.substring(16, 24) + `.000Z`);
        }}
      />
    </Container>
  );
}

export default BuildCalendar;

const Container = styled.div`
  margin-top: 10px;
  margin-left: 15px;
  display: flex;
`;
