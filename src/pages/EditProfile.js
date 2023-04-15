import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const getUserInfo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/members/info/${localStorage.getItem(
        "memberId"
      )}`
    );

    console.log(response.data);
    setNickname(response.data.result.nickname);

    var temp = [...requiredItem];
    temp[0].value = response.data.result.nickname;

    setRequiredItem(temp);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const navigate = useNavigate();

  const [requiredItem, setRequiredItem] = useState([
    { key: 0, name: "닉네임", placeholder: "ex) 송재민", value: "" },
    {
      key: 1,
      name: "비밀번호",
      placeholder: "대 소문자 + 숫자 (8자 이상)",
      value: "",
    },
    {
      key: 2,
      name: "비밀번호 확인",
      placeholder: "대 소문자 + 숫자 (8자 이상)",
      value: "",
    },
  ]);

  const [nickname, setNickname] = useState("");
  const [PW, setPW] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const editBtnClicked = async () => {
    if (PW === confirmPW) {
      const result = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/members/edit/${localStorage.getItem(
          "memberId"
        )}`,
        {
          nickname: nickname,
          password: PW,
        }
      );

      console.log(result.data);

      if (result.data.isSuccess) {
        navigate(-1);
      } else {
        alert(result.data.message);
      }
    } else {
      alert("Check your password!");
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <SigninSection>
          <SigninTitle>Edit Profile</SigninTitle>
          {requiredItem.map((a, i) => {
            return (
              <div key={a.key}>
                <ItemContainer>
                  <div>
                    {a.name} <RedAst>*</RedAst>
                  </div>
                  <Input
                    placeholder={a.placeholder}
                    defaultValue={a.value}
                    type={i === 1 || i === 2 ? "password" : "email"}
                    onChange={(e) => {
                      i === 0
                        ? setNickname(e.target.value)
                        : i === 1
                        ? setPW(e.target.value)
                        : setConfirmPW(e.target.value);
                    }}
                  />
                </ItemContainer>
              </div>
            );
          })}
          <Btn onClick={editBtnClicked}>수정하기</Btn>
        </SigninSection>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 720px;
  align-items: center;
  padding-top: 60px;
`;

const SigninSection = styled.div`
  margin-top: 35px;
  padding-top: 19px;
  width: 550px;
  height: 500px;
  border: 0.1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SigninTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  color: black;
  margin-bottom: 43px;
`;

const ItemContainer = styled.div`
  margin-top: 13px;
  text-align: left;
  width: 336px;
`;

const RedAst = styled.span`
  color: red;
`;

const Input = styled.input`
  width: 336px;
  height: 48px;
  background: #f7f7f7;
  border: 0.3px solid #000000;
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  padding-left: 19px;
  padding-right: 19px;

  //margin-top: 23px;
`;

const Btn = styled.div`
  width: 156px;
  height: 48px;
  line-height: 48px;
  background: #a3bcff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  margin-top: 42px;

  cursor: pointer;
`;

export default EditProfile;
