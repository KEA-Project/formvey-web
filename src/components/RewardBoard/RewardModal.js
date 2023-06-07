import React, { useState, useEffect } from "react";
import xBtn from "../../assets/common/x_button.png";
import styled from "@emotion/styled";
import downloadIcon from "../../assets/rewardBoard/download_icon.png";
import axios from "axios";

function RewardModal(props) {
  const downloadReward = () => {
    const link = document.createElement("a");
    link.href = props.selectedImg;
    link.download = "리워드";

    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: false,
      cancelable: true,
    });

    link.dispatchEvent(clickEvent);

    props.setShowModal(false);

    /*
    axios({
      url: props.selectedImg, //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", props.selectedImg + ".jpg"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      props.setShowModal(false);
    });*/
  };

  return (
    <Container>
      <Background />

      <ContentContainer>
        <RewardImg src={props.selectedImg} />
        <CancelBtn
          src={xBtn}
          onClick={() => {
            props.setShowModal(false);
          }}
        />
        <DownloadIcon src={downloadIcon} onClick={downloadReward} />
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;

  .flexDiv {
    display: flex;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentContainer = styled.div`
  padding: 30px 65px 30px 65px;

  width: 70%;
  height: 75%;

  min-width: 600px;

  align-items: center;
  text-align: center;
  justify-content: center;

  background: white;
  border-radius: 21px;
  z-index: 1000;

  overflow: auto;

  position: relative;
`;

const CancelBtn = styled.img`
  height: 27.36px;
  cursor: pointer;
  position: fixed;
  top: 15%;
  right: 17.5%;
`;

const RewardImg = styled.img`
  width: 60%;
  height: auto;
`;

const DownloadIcon = styled.img`
  width: 30px;
  height: auto;
  position: fixed;
  bottom: 15%;
  right: 17.5%;
  cursor: pointer;
`;

export default RewardModal;
