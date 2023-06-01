import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import rewardDrop from "../../assets/response/reward_drop.png";
import SendRewardTable from "./SendRewardTable";
import { getSurveyResponseList } from "../../Functions";
import Paging from "../common/Paging";
import axios from "axios";
import { uploadImageToStorage } from "../../Functions";
import AlertModal from "../common/AlertModal";

function SendReward(props) {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const menu = ["랜덤 발송", "지정 발송"];
  const fileInputRef = useRef(null);
  const [unuploadedImageFiles, setunUploadedImageFiles] = useState([]);
  let uploadedImageFiles = [];

  //전송완료 alert 모달
  const [showModal, setShowModal] = useState(false);
  const handleModalConfirm = () => {
    setShowModal(false);
    window.location.reload();
  };

  //리워드 이미지 드래그 앤 드랍 처리
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    handleFiles(files);
  };

  const handleFiles = (files) => {
    //파일 리스트
    const fileArray = Array.from(files);
    const newFiles = [...unuploadedImageFiles, ...fileArray];
    setunUploadedImageFiles(newFiles);
  };

  //파일 찾기 버튼 처리
  const handleBrowseBtnClick = () => {
    fileInputRef.current.click();
  };

  const handleBrowseFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setunUploadedImageFiles((prevFiles) => [...prevFiles, selectedFile]);
  };

  //리워드 삭제
  const deleteReward = (i) => {
    const temp = [...unuploadedImageFiles];
    temp.splice(i, 1);
    setunUploadedImageFiles(temp);
  };

  //지정 발송 응답자 리스트 테이블 세팅
  const [responseList, setResponseList] = useState([
    {
      nickname: "",
      responseDate: "",
      responseId: 0,
      memberId: 0,
    },
  ]);

  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [count] = useState(10);

  const fetchData = async () => {
    const response = await getSurveyResponseList(props.surveyId, currentPage);

    //console.log(response);

    if (response.data.isSuccess) {
      setResponseList(response.data.result);
      setTotalItemsCount(response.data.result[0].pages);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //리워드 등록하기
  const registerReward = async () => {
    //이미지 파일 업로드
    await fileUpload();
    console.log(uploadedImageFiles);
    //랜덤발송
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/rewards/random/${props.surveyId}`,
      { rewardUrl: uploadedImageFiles },
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setShowModal(true);
    }
  };

  //스토리지에 이미지 파일 업로드 후 url 리턴
  const fileUpload = async () => {
    uploadedImageFiles = [];
    try {
      for (const file of unuploadedImageFiles) {
        const formData = new FormData();
        formData.append("file", file);

        /*
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/images/upload`,
          formData
        );*/
        const response = await uploadImageToStorage(formData);

        if (response.data.isSuccess) {
          console.log(response);
          uploadedImageFiles.push(response.data.result);
          console.log(uploadedImageFiles);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {showModal ? (
        <AlertModal
          message="리워드 전송을 완료했습니다"
          handleModalConfirm={handleModalConfirm}
        />
      ) : null}
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

        {selectedMenu === 1 ? ( //지정 발송
          <SelectParticipantContainer>
            <Title className="title">응답자 지정</Title>
            <SendRewardTable
              response={responseList}
              setShowConfirmModal={setShowModal}
            />
            <Paging
              page={currentPage}
              count={count}
              totalItemsCount={totalItemsCount}
              onPageChange={handlePageChange}
            />
          </SelectParticipantContainer>
        ) : (
          //랜덤 발송
          <>
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
                {unuploadedImageFiles.map((a, i) => {
                  return (
                    <div>
                      {a.name}
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
            <RegisterBtn onClick={registerReward}>등록하기</RegisterBtn>
          </>
        )}
      </Container>
    </>
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
  margin-top: 70px;
  float: right;
`;

const SelectParticipantContainer = styled.div`
  margin-top: 50px;

  .title {
    margin-bottom: 15px;
  }
`;

export default SendReward;
