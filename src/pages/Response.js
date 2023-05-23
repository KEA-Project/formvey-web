import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import Header from "../components/common/Header";
import SurveyQuestionCheck from "../components/Response/SurveyQuestionCheck";

function Response() {
  let { surveyId } = useParams(); //url 파라미터에 survey id 값
  surveyId = atob(surveyId); //survey id 복호화

  const menu = ["설문 문항", "응답 통계", "개별 보기", "리워드 전송"];
  const [selectedMenu, setSelectedMenu] = useState(0);

  return (
    <div>
      <Header />
      <Container>
        {/**메뉴 선택 */}
        <MenuBar>
          {menu.map((a, i) => {
            return selectedMenu === i ? (
              <Selected>{a}</Selected>
            ) : (
              <Unselected
                onClick={() => {
                  setSelectedMenu(i);
                }}
              >
                {a}
              </Unselected>
            );
          })}
        </MenuBar>

        {/**메뉴에 따라서 컴포넌트 출력 */}
        {selectedMenu === 0 ? (
          <SurveyQuestionCheck surveyId={surveyId} />
        ) : null}
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
`;

const MenuBar = styled.div`
  display: flex;
  padding-left: 17%;
  padding-right: 17%;
  padding-bottom: 15px;
  justify-content: space-between;
  width: 71vw;
  border-bottom: 0.5px solid #bababa;
`;

const Selected = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #7097ff;
`;
const Unselected = styled.div`
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;

export default Response;
