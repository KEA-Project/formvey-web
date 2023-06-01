import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import xBtn from "../../assets/common/x_button.png";
import rewardDrop from "../../assets/response/reward_drop.png";
import { uploadImageToStorage } from "../../Functions";
import axios from "axios";

function SendRewardModal(props) {
  const [unuploadedImageFile, setunUploadedImageFile] = useState([]);
  let uploadedImageFile = "";

  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log(unuploadedImageFile);
  }, [unuploadedImageFile]);

  //리워드 이미지 드래그 앤 드랍 처리
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    handleFiles(files);
  };

  const handleFiles = (files) => {
    //파일 리스트
    const fileArray = Array.from(files);
    setunUploadedImageFile(fileArray[0]);
  };

  //파일 찾기 버튼 처리
  const handleBrowseBtnClick = () => {
    fileInputRef.current.click();
  };

  const handleBrowseFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setunUploadedImageFile(selectedFile);
  };

  //리워드 삭제
  const deleteReward = () => {
    setunUploadedImageFile([]);
  };

  //리워드 등록하기
  const registerReward = async () => {
    //이미지 파일 업로드
    await fileUpload();

    //지정발송
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/rewards/select`,
      {
        rewards: [{ memberId: props.memberId, rewardUrl: uploadedImageFile }],
      },
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response);
    if (response.data.isSuccess) {
      props.setShowModal(false);
      props.setShowConfirmModal(true);
    }
  };

  //스토리지에 이미지 파일 업로드 후 url 리턴
  const fileUpload = async () => {
    uploadedImageFile = [];
    try {
      const formData = new FormData();
      formData.append("file", unuploadedImageFile);

      const response = await uploadImageToStorage(formData);

      if (response.data.isSuccess) {
        console.log(response);
        uploadedImageFile = response.data.result;
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container>
      <Background />
      <ContentContainer>
        <Header>
          <NickName>{props.nickname}님에게 리워드 전송</NickName>
          <CancelBtn
            src={xBtn}
            onClick={() => {
              props.setShowModal(false);
            }}
          />
        </Header>

        <RewardRegisterContainer>
          <ImageDrop
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <img src={rewardDrop} className="img" />
            <div className="browseBtn" onClick={handleBrowseBtnClick}>
              파일 찾기
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleBrowseFileChange}
            />
          </ImageDrop>
          {unuploadedImageFile.length !== 0 ? ( //첨부한 이미지가 있는지 확인
            <ImageName>
              {unuploadedImageFile.name}
              <span
                className="xBtn"
                onClick={() => {
                  deleteReward();
                }}
              >
                x
              </span>
            </ImageName>
          ) : null}
        </RewardRegisterContainer>
        <RegisterBtn onClick={registerReward}>등록하기</RegisterBtn>
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
  height: 470px;

  min-width: 600px;

  align-items: center;
  text-align: center;
  justify-content: center;

  background: white;
  border-radius: 21px;
  z-index: 1000;

  overflow: scroll;
`;

const Header = styled.div`
  display: flex;
  height: 48.24px;
  justify-content: space-between;
`;

const NickName = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 29px;
  border-left: 6px solid #5281ff;
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
`;

const CancelBtn = styled.img`
  height: 27.36px;
  cursor: pointer;
`;

const RewardRegisterContainer = styled.div`
  display: flex;
  margin-top: 70px;
`;

const ImageDrop = styled.div`
  width: 155px;
  height: auto;
  position: relative;

  .img {
    width: 100%;
    height: 100%;
  }

  .browseBtn {
    width: 87px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-weight: 600;
    font-size: 11px;
    border-radius: 50px;
    background: rgba(82, 129, 255, 0.7);
    position: absolute;
    bottom: 30px;
    left: 33px;
    cursor: pointer;
  }
`;

const ImageName = styled.div`
  margin-left: 20px;
  font-weight: 600;
  line-height: 30px;

  .xBtn {
    color: red;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const RegisterBtn = styled.div`
  width: 114px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  cursor: pointer;
  background: #5281ff;
  border-radius: 14px;
  font-size: 14px;
  color: #ffffff;
  margin-top: 60px;
  float: right;
`;

export default SendRewardModal;
