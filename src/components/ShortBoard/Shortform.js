import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import unlock from "../../assets/common/shortform/unlock.png";
import lock from "../../assets/common/shortform/lock.png";
import InfoModal from "./InfoModal";
import PointModal from "./PointModal";
import ResultModal from "./ResultModal";
import { Result } from "antd";

function Shortform(props) {
  const [showModal, setShowModal] = useState(false); //상세조회 모달 보여주기 여부
  const [showPointModal, setShowPointModal] = useState(false); //포인트 사용 묻는 모달 보여주기 여부
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    props.setReRender(!props.reRender);
  }, [showResultModal]);

  return (
    <>
      {showModal && props.shortform ? (
        props.shortform.shortResultStatus === 0 ? (
          <InfoModal
            setShowModal={setShowModal}
            setShowPointModal={setShowPointModal}
            shortformId={props.shortform.id}
          />
        ) : (
          <ResultModal
            setShowModal={setShowModal}
            shortform={props.shortform}
            shortformId={props.shortform.id}
            setShowResultModal={setShowResultModal}
          />
        )
      ) : null}

      {showPointModal && (
        <PointModal
          setShowPointModal={setShowPointModal}
          setShowModal={setShowModal}
          setShowResultModal={setShowResultModal}
          shortformId={props.shortform.id}
        />
      )}

      {showResultModal && (
        <ResultModal
          setShowModal={setShowModal}
          shortform={props.shortform}
          shortformId={props.shortform.id}
          setShowResultModal={setShowResultModal}
        />
      )}

      <Container>
        <TitleContainer>
          <Title>{props.shortform.shortQuestion}</Title>
          {props.shortform.shortResultStatus === 0 ? (
            <Status src={lock} />
          ) : (
            <Status src={unlock} />
          )}
        </TitleContainer>
        <Content>{props.shortform.surveyTitle}</Content>
        {props.shortform.shortType === 2 ? (
          <Content>주관식</Content>
        ) : props.shortform.shortType === 0 ? (
          <Content>객관식(단일)</Content>
        ) : (
          <Content>객관식(다중)</Content>
        )}
        <BottomContainer>
          <div className="flexDiv">
            <Content>응답수</Content>
            <ResponseCnt>{props.shortform.shortResponse}</ResponseCnt>
          </div>
          {props.shortform.shortResultStatus === 0 ? (
            //<Link to="/build" state={{ surveyId: props.survey.surveyId }}>
            <ShowResponseBtn
              onClick={() => {
                setShowModal(true);
              }}
            >
              잠금 해제
            </ShowResponseBtn>
          ) : (
            // </Link>
            <ShowResponseBtn
              onClick={() => {
                setShowModal(true);
              }}
            >
              결과보기
            </ShowResponseBtn>
          )}
        </BottomContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 41px;
  width: 320px;
  height: 170px;
  border: 0.01em solid #d2d2d2;
  border-radius: 15px;
  box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.06);
  padding: 20px 20px 15px 20px;
  position: relative;
  margin-right: 2vw;

  .flexDiv {
    display: flex;
    align-items: center;
  }

  position: relative;
  overflow: visible;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .red {
    border: 1px solid #fe2e01;
    color: #fe2e01;
  }
  .green {
    border: 1px solid #1cd88a;
    color: #1cd88a;
  }
  .yellow {
    border: 1px solid #fac02d;
    color: #fac02d;
  }
`;

const Title = styled.div`
  font-size: 13px;
  color: #101828;
  font-weight: 500;
`;

const Status = styled.img`
  width: 20px;
  height: 20px;
`;

const Content = styled.div`
  font-size: 11px;
  color: #667085;
`;

const BottomContainer = styled.div`
  padding-top: 15px;
  border-top: 0.8px solid #e4e4e4;
  position: absolute;
  bottom: 15px;
  display: flex;
  width: 270px;
  align-items: center;
  justify-content: space-between;
`;

const ResponseCnt = styled.div`
  width: 55px;
  height: 26px;
  line-height: 26px;
  border-radius: 7px;
  background: #ebf2ff;
  border-radius: 10px;
  color: #5281ff;
  font-size: 12px;
  text-align: center;
  margin-left: 10px;
`;

const ShowResponseBtn = styled.div`
  width: 75px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 11px;
  background: #5281ff;
  color: white;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
`;

export default Shortform;
