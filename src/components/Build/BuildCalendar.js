import React, { Component } from "react";
import styled from "@emotion/styled";

import { DatePicker } from "antd";
import { TimePicker } from "antd";
import { Calendar } from "antd";

function BuildCalendar() {
  return (
    <Container>
      <DatePicker size="medium" />
      <TimePicker size="medium" style={{ marginLeft: "10px" }} />
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
