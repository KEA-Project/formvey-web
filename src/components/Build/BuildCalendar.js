/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Form, DatePicker } from "antd";
import { TimePicker } from "antd";

import dayjs from "dayjs";

function BuildCalendar(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    //console.log("test");
    //console.log(props.initialEndDate);
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
        //defaultValue={dayjs(props.initialEndDate)}
      />
      <TimePicker
        size="medium"
        css={css`
          margin-left: 10px;
        `}
        onChange={(e) => {
          //console.log(`T` + `${e.$d}`.substring(16, 24) + `.000Z`);
          setTime(`T` + `${e.$d}`.substring(16, 24) + `.000Z`);
          //props.setEndDate(`${date}${time}`);
        }}
      />
    </Container>
  );
  /*
  return (
    
    <Container>
      <Calendar fullscreen={false} />
    </Container>
  );*/
}

export default BuildCalendar;

const Container = styled.div`
  margin-top: 10px;
  margin-left: 15px;
  display: flex;
`;

/*
export default class BuildCalendar extends Component {
  handleSelect(ranges) {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    return <DateRange ranges={[selectionRange]} onChange={this.handleSelect} />;
  }
}*/
