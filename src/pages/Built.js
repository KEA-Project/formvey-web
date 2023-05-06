import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import addBtn from "../assets/common/add_btn.png";
import { Link } from "react-router-dom";
import axios from "axios";
import BuiltSurvey from "../components/Built/BuiltSurvey";

function Built() {
  const menu = ["전체", "제작중", "진행중", "설문완료"];
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [builtSurvey, setBuiltSurvey] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/surveys/list/${localStorage.getItem(
        "memberId"
      )}?page=0&size=6`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setBuiltSurvey(response.data.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Link to="/build">
          <AddBtn src={addBtn} />
        </Link>

        <Title>제작한 설문</Title>

        {/**설문 리스트 메뉴*/}
        <MenuContainer>
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
        </MenuContainer>
        <hr className="menuHr" />
        {/**설문 리스트 */}
        <SurveyList>
          {builtSurvey.map((a, i) => {
            if (
              selectedMenu === 0 || //전체
              (selectedMenu === 1 && a.status === 1) || //제작중
              (selectedMenu === 2 && a.status === 2) || //진행중
              (selectedMenu === 3 && a.status === 3) //설문완료
            ) {
              return <BuiltSurvey survey={a} />;
            } else {
              return null;
            }
          })}
        </SurveyList>
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding-left: 253px;
  padding-top: 90px;
  width: 100%;
  height: 100%;

  .menuHr {
    margin-top: 5px;
    margin-left: 0px;
    border: 0.5px solid #bababa;
    width: 80vw;
  }
`;
const AddBtn = styled.img`
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 52.5px;
  height: auto;
  cursor: pointer;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 30px;
`;
const MenuContainer = styled.div`
  width: 302px;
  display: flex;
  justify-content: space-between;
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
const SurveyList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding-left: 32px;
`;

export default Built;
