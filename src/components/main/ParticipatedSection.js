import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import ParticipatedSurvey from "../Participated/ParticipatedSurvey";

function ParticipatedSection() {
  const [participatedSurvey, setParticipatedSurvey] = useState([]);
  const [reRender, setReRender] = useState(false); //재렌더링을 위한 state

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/responses/list/${localStorage.getItem(
        "memberId"
      )}?page=0&size=2`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setParticipatedSurvey(response.data.result.getResponseListRes);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reRender]);

  return (
    <Container>
      <Title>응답한 설문</Title>
      <div class="separator"></div>

      {/**설문 리스트 */}
      <SurveyList>
        {participatedSurvey.map((a, i) => {
          return (
            <ParticipatedSurvey
              survey={a}
              reRender={reRender}
              setReRender={setReRender}
            />
          );
        })}
      </SurveyList>
    </Container>
  );
}

const Container = styled.div`
  width: 720px;
  height: 210px;

  .separator {
    border-top: 1px solid #ccc;
    margin: -15px 0;
  }
  padding-left: 21px;
`;

const Title = styled.div`
  text-align: center;
  width: 130px;
  font-weight: 700;
  font-size: 22px;
  color: #444444;
  background: white;
  position: relative;
  z-index: 1000;
  margin-left: 50px;
`;

const SurveyList = styled.div`
  display: flex;
  //flex-wrap: wrap;
  justify-content: left;
  padding-left: 21px;
`;

export default ParticipatedSection;
