import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../../assets/common/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import logoutIcon from "../../assets/common/logout_icon.png";
import Main from "../../pages/Main";
import SurveyBoard from "../../pages/SurveyBoard";
import Built from "../../pages/Built";
import Participated from "../../pages/Participated";
import ShortBoard from "../../pages/ShortBoard";
import profile from "../../assets/common/profile.png";

function MainMenu() {
  const [userName, setUserName] = useState("");
  const [userPoint, setUserPoint] = useState("");
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/members/info/${localStorage.getItem(
        "memberId"
      )}`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response.data);
    setUserName(response.data.result.nickname);
    setUserPoint(response.data.result.point);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  /*함수 재사용 하려면 어떻게 해야되지?*/
  const logoutBtnClicked = async () => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/logout/${localStorage.getItem(
        "memberId"
      )}`,
      {},
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response);

    if (response.data.isSuccess) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("memberId");

      navigate("/");
    } else {
      alert(response.data.message);
    }
  };

  const menu = [
    "메인",
    "설문 게시판",
    "짧폼 게시판",
    "제작한 설문",
    "응답한 설문",
    "리워드 보관함",
  ];

  const [selected, setSelected] = useState(0);

  return (
    <Container>
      {/**메뉴바 영역 */}
      <MenuContainer>
        <Logo src={logo} />
        <ProfilePic src={profile} />
        <UserName>{userName}</UserName>
        <Link to="/editprofile">
          <ModifyProfileBtn>프로필 수정</ModifyProfileBtn>
        </Link>
        <UserPoint>{userPoint}점</UserPoint>
        {menu.map((a, i) => {
          return selected === i ? (
            <SelectedMenuBtn>{a}</SelectedMenuBtn>
          ) : (
            <MenuBtn
              onClick={() => {
                setSelected(i);
              }}
            >
              {a}
            </MenuBtn>
          );
        })}
        <LogoutContainer onClick={logoutBtnClicked}>
          <LogoutIcon src={logoutIcon} />
          <LogoutText>로그아웃</LogoutText>
        </LogoutContainer>
      </MenuContainer>
      {/**페이지 라우팅 */}
      <div>
        {selected === 0 ? ( //메인
          <Main userName={userName} />
        ) : selected === 1 ? ( //설문 게시판
          <SurveyBoard />
        ) : selected === 2 ? ( //짧폼 게시판
          <ShortBoard />
        ) : selected === 3 ? ( //제작한 설문
          <Built />
        ) : selected === 4 ? ( //응답한 설문
          <Participated />
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const MenuContainer = styled.div`
  padding-top: 50px;
  width: 202px;
  height: 100vh;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: rgba(163, 188, 255, 0.2);
  border-radius: 0px 50px 50px 0px;
`;

const Logo = styled.img`
  width: 144px;
`;

const ProfilePic = styled.img`
  margin-top: 27px;
  width: 43px;
  height: 43px;
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #444444;
`;

const ModifyProfileBtn = styled.div`
  margin-top: 11px;
  width: 85px;
  height: 26px;
  background: #f3f7ff;
  box-shadow: -5px -5px 10px #ffffff, 10px 10px 20px rgba(174, 174, 192, 0.4);
  border-radius: 98px;
  font-weight: 700;
  font-size: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
  color: #444444;
`;

const MenuBtn = styled.div`
  width: 141px;
  height: 46.76px;
  line-height: 46.76px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #444444;
  margin-top: 20px;
  cursor: pointer;
`;

const SelectedMenuBtn = styled.div`
  width: 141px;
  height: 46.76px;
  line-height: 46.76px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  margin-top: 20px;
  background: #edf2ff;
  /* emoboss-button-1 */

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.06), 4px 4px 8px rgba(0, 0, 0, 0.08),
    -2px -2px 2px rgba(255, 255, 255, 0.6),
    -4px -4px 8px rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  cursor: pointer;
  color: #7097ff;
`;

const LogoutContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 12px;
  left: 15px;
  align-items: center;
  cursor: pointer;
`;

const LogoutIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const LogoutText = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #5280fd;
  margin-left: 5px;
`;

const UserPoint = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #444444;
  // margin-top: 11px;
`;

export default MainMenu;
