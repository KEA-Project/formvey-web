/** @jsxImportSource @emotion/react */
import React, { Component } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { DatePicker } from "antd";
import { TimePicker } from "antd";

function BuildCalendar(props) {
  return (
    <Container>
      <DatePicker
        onChange={(e) => {
          //console.log(e);
          const year = `${e.$y}`.substring(2);
          const month = e.$M + 1 < 10 ? `0${e.$M + 1}` : `${e.$M + 1}`;
          const day = e.$D < 10 ? `0${e.$D}` : `${e.$D}`;

          //console.log(`${year}-${month}-${day}`);
          props.setEndDate(`${year}/${month}/${day}`);
        }}
        size="medium"
      />
      <TimePicker
        size="medium"
        css={css`
          margin-left: 10px;
        `}
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
