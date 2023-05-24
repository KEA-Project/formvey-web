import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function DonutSection(props) {
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/surveys/chart/${localStorage.getItem(
        "memberId"
      )}
      `,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response);

    if (response.data.isSuccess) {
      var temp = {
        createSurveyCnt: 0,
        responseCnt: 0,
        shortFormResponseCnt: 0,
      };

      temp.createSurveyCnt = response.data.result.createSurveyCnt;
      temp.responseCnt = response.data.result.responseCnt;
      temp.shortFormResponseCnt = response.data.result.shortFormResponseCnt;

      setDonut1Data(temp);

      var temp2 = {
        closedSurveyCnt: 0,
        releasedSurveyCnt: 0,
        unReleasedSurveyCnt: 0,
      };

      temp2.closedSurveyCnt = response.data.result.closedSurveyCnt;
      temp2.releasedSurveyCnt = response.data.result.releasedSurveyCnt;
      temp2.unReleasedSurveyCnt = response.data.result.unReleasedSurveyCnt;

      setDonut2Data(temp2);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //데이터가 없을 때 회색 도넛 차트
  const emptyDonut = {
    series: [1],
    labels: [],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["데이터가 없습니다"],
      colors: ["#f0f0f0"],
    },
  };

  const [donut1Data, setDonut1Data] = useState({
    createSurveyCnt: 0,
    responseCnt: 0,
    shortFormResponseCnt: 0,
  });

  const donut1Config = {
    series: [
      donut1Data.createSurveyCnt,
      donut1Data.responseCnt,
      donut1Data.shortFormResponseCnt,
    ],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["제작 설문", "응답", "숏폼 응답"],
      colors: ["#3e8df3", "#67e09c", "#f3b344"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const [donut2Data, setDonut2Data] = useState({
    closedSurveyCnt: 0,
    releasedSurveyCnt: 0,
    unReleasedSurveyCnt: 0,
  });

  const donut2Config = {
    series: [
      donut2Data.closedSurveyCnt,
      donut2Data.releasedSurveyCnt,
      donut2Data.unReleasedSurveyCnt,
    ],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["마감", "배포중", "제작중"],
      colors: ["#3e8df3", "#67e09c", "#f3b344"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Container>
      <Title>
        <span className="userName">{props.userName}</span>
        님의 현황
      </Title>
      <ChartContainer>
        {donut1Data.createSurveyCnt === 0 &&
        donut1Data.responseCnt === 0 &&
        donut1Data.shortFormResponseCnt === 0 ? (
          <ReactApexChart
            series={emptyDonut.series}
            options={emptyDonut.options}
            type="pie"
            width={300}
          />
        ) : (
          <ReactApexChart
            series={donut1Config.series}
            options={donut1Config.options}
            type="pie"
            width={300}
          />
        )}

        {donut2Data.closedSurveyCnt === 0 &&
        donut2Data.releasedSurveyCnt === 0 &&
        donut2Data.unReleasedSurveyCnt === 0 ? (
          <ReactApexChart
            series={emptyDonut.series}
            options={emptyDonut.options}
            type="pie"
            width={300}
          />
        ) : (
          <ReactApexChart
            series={donut2Config.series}
            options={donut2Config.options}
            type="pie"
            width={300}
          />
        )}
      </ChartContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 720px;
  height: 300px;
  padding-left: 10px;
  .userName {
    color: #5281ff;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #444444;
  padding-left: 88px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 90%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const NoData = styled.div`
  position: absolute;
`;

export default DonutSection;
