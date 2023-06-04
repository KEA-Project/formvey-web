import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import rewardDrop from "../../assets/response/reward_drop.png";

function SendReward() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const menu = ["랜덤 발송", "지정 발송"];
  const fileInputRef = useRef(null);
  const [uploadedImageFiles, setUploadedImageFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  //리워드 이미지 드래그 앤 드랍 처리
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    //setUploadedImageFiles(files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const imageNames = imageFiles.map((file) => file.name);
    setUploadedImages((prevImages) => [...prevImages, ...imageNames]);
  };

  useEffect(() => {
    console.log(uploadedImages);
  }, [uploadedImages]);

  //파일 찾기 버튼 처리
  const handleBrowseBtnClick = () => {
    fileInputRef.current.click();
  };

  const handleBrowseFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setUploadedImages((prevImages) => [...prevImages, selectedFile.name]);
  };

  //리워드 삭제
  const deleteReward = (i) => {
    const temp = [...uploadedImages];
    temp.splice(i, 1);
    setUploadedImages(temp);

    /*
    const temp2 = [...uploadedImageFiles];
    temp2.splice(i, 1);
    setUploadedImageFiles(temp2);*/
  };

  return (
    <Container>
      <Title>발송 방식 선택</Title>
      <MenuContainer>
        {menu.map((a, i) => {
          return (
            <div className="option">
              {selectedMenu === i ? (
                <input type="radio" id={i} name="menu" value={a} checked />
              ) : (
                <input
                  type="radio"
                  id={i}
                  name="menu"
                  value={a}
                  onChange={() => {
                    setSelectedMenu(i);
                  }}
                />
              )}
              <div className="optionName">{a}</div>
            </div>
          );
        })}
      </MenuContainer>

      <Title>리워드 등록</Title>
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
        <ImageList>
          {uploadedImages.map((a, i) => {
            return (
              <div>
                {a}
                <span
                  className="xBtn"
                  onClick={() => {
                    deleteReward(i);
                  }}
                >
                  x
                </span>
              </div>
            );
          })}
        </ImageList>
      </RewardRegisterContainer>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 50px;
  text-align: left;
  width: 65%;
`;

const Title = styled.div`
  font-size: 18px;
  color: #444444;
  font-weight: 500;

  border-left: 6px solid #a7bfff;
  padding-left: 10px;
`;

const MenuContainer = styled.div`
  margin-top: 15px;
  display: flex;
  width: 220px;
  justify-content: space-between;

  margin-bottom: 50px;

  .option {
    display: flex;
  }

  .optionName {
    font-size: 16px;
    font-weight: 500;
    margin-left: 10px;
  }
`;

const RewardRegisterContainer = styled.div`
  display: flex;
  margin-top: 15px;
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

const ImageList = styled.div`
  margin-left: 20px;
  font-weight: 600;
  line-height: 30px;

  .xBtn {
    color: red;
    margin-left: 20px;
    cursor: pointer;
  }
`;

export default SendReward;
