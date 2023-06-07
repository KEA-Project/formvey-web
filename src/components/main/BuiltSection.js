import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import BuiltSurvey from "../Built/BuiltSurvey";

function BuiltSection() {
  const [builtSurvey, setBuiltSurvey] = useState([]);
  const [reRender, setReRender] = useState(false); //재렌더링을 위한 state

  const fetchData = async () => {
    const response = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL_SURVEY
      }/surveys/list/${localStorage.getItem("memberId")}?page=0&size=2`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setBuiltSurvey(response.data.result.getSurveyListRes);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reRender]);

  return (
    <Container>
      <Title>제작한 설문</Title>
      <div class="separator"></div>

      {/**설문 리스트 */}

      {builtSurvey.length === 0 ? (
        <EmptyList>제작한 설문이 없습니다</EmptyList>
      ) : (
        <SurveyList>
          {builtSurvey.map((a, i) => {
            return (
              <BuiltSurvey
                survey={a}
                reRender={reRender}
                setReRender={setReRender}
              />
            );
          })}
        </SurveyList>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 720px;
  height: 220px;

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
  margin-top: 10px;
  display: flex;
  //flex-wrap: wrap;
  justify-content: left;
  padding-left: 21px;
`;

const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default BuiltSection;
