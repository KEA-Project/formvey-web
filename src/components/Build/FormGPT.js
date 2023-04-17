import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import xBtn from "../../assets/common/x_button.png";
import sendBtn from "../../assets/formgpt/send_btn.png";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

function FormGPT() {
  const scrollRef = useRef();
  const [chatList, setChatList] = useState([
    {
      msg: "설문조사 키워드를 입력해주세요! (ex.풋살장 증설 수요도 조사)",
      from: "gpt",
    },
  ]);

  const [currentMsg, setCurrentMsg] = useState("");

  const sendGPT = async (msg) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content: "assistant는 설문조사 문항을 만들어주는 시스템이다",
          },
          {
            role: "user",
            content: `${msg}에 관한 설문조사 문항을 만들어줘. 문항은 숫자로 구분해서 보여주고 각 문항의 제목만 보여줘`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GPT_KEY}`,
        },
      }
    );

    //console.log(response.data.choices[0].message.content);
    const temp = [...chatList];
    temp.push({ msg: msg, from: "me" });
    temp.push({ msg: response.data.choices[0].message.content, from: "gpt" });
    setChatList(temp);
    console.log(chatList);
  };

  const sendMsg = async () => {
    //console.log(currentMsg);
    var temp = [...chatList];
    temp.push({ msg: currentMsg, from: "me" });
    setChatList(temp);
    sendGPT(currentMsg);
    console.log(chatList);
    setCurrentMsg("");
  };

  /*스크롤 항상 아래로 내리기*/
  useEffect(() => {
    // 현재 스크롤 위치 === scrollRef.current.scrollTop
    // 스크롤 길이 === scrollRef.current.scrollHeight
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  return (
    <Container>
      <Header>
        <Title>폼GPT</Title>
        <XBtn src={xBtn} />
      </Header>
      <Body ref={scrollRef}>
        {chatList.map((a, i) => {
          return a.from === "me" ? (
            <SentMsg>{a.msg}</SentMsg>
          ) : (
            <ReceivedMsg>{a.msg}</ReceivedMsg>
          );
        })}
      </Body>
      <Bottom>
        <Input
          onChange={(e) => {
            setCurrentMsg(e.target.value);
          }}
          value={currentMsg}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMsg();
            }
          }}
        />
        <SendBtn src={sendBtn} onClick={sendMsg} />
      </Bottom>
    </Container>
  );
}

const Container = styled.div`
  width: 377.28px;
  height: 604.8px;
  background: #f1f2f4;
  border-radius: 10px;
`;

const Header = styled.div`
  width: 100%;
  height: 48.24px;
  background: #cedcff;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 23px;
  padding-right: 15px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #333333;
`;

const XBtn = styled.img`
  width: 27.36px;
  height: 27.36px;
`;

const Body = styled.div`
  height: 490px;
  width: 100%;
  background: #f1f2f4;
  overflow-y: scroll;
`;

const Bottom = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-around;
`;

const Input = styled.input`
  width: 298px;
  height: 41px;
  border: 0px;
  box-shadow: inset 2px 2px 4px rgba(99, 99, 99, 0.25);
  border-radius: 10px;
  padding: 5px;
`;

const SendBtn = styled.img`
  width: 44.64px;
  height: 41.04px;
  cursor: pointer;
`;

const SentMsg = styled.div`
  width: 231px;
  height: auto;
  padding: 5px 5px 10px 10px;
  background: #cedcff;
  margin-top: 15px;
  border-radius: 10px;
  margin-left: 120px;
  border-bottom-right-radius: 10px;
`;

const ReceivedMsg = styled.div`
  width: 231px;
  height: auto;
  padding: 5px 5px 10px 10px;
  background: white;
  margin-top: 15px;
  border-radius: 10px;
  margin-left: 10px;
`;

export default FormGPT;
