import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "@emotion/styled";

function SurveyStatisticDonut(props) {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      width: 300,
      type: "pie",
    },
    legend: {
      position: "right",
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "right",
          },
        },
      },
    ],
  });

  useEffect(() => {
    console.log(props.question);

    const temp = props.question.map((item) => item.multipleChoiceCnt);
    setSeries(temp);

    const temp2 = props.question.map((item) => item.choiceContent);
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: temp2,
    }));
  }, []);

  return (
    <Container>
      <ReactApexChart
        series={series}
        options={options}
        type="pie"
        width={400}
      />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 50px;
  padidng-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SurveyStatisticDonut;
