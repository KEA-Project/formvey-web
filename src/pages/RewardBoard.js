import React from "react";
import styled from "@emotion/styled";
import reward from "../assets/rewardEx.png";

function RewardBoard() {
  //페이징
  //   const [totalItemsCount, setTotalItemsCount] = useState(0);
  //   const [currentPage, setCurrentPage] = useState(0);
  //   const [count, setCount] = useState(6);

  //   const [unlockCount, setUnlockCount] = useState(0);
  //   const [lockPage, setLockPage] = useState(0);

  return (
    <>
      <Container>
        <Title>리워드 보관함</Title>
        <RewardList>
          <Reward src={reward} />
          <Reward src={reward} />
          <Reward src={reward} />
          <Reward src={reward} />
        </RewardList>
        {/* <BottomContainer>
          {selectedMenu === 0 && totalItemsCount !== 0 && (
            <Paging
              page={currentPage}
              count={count}
              totalItemsCount={totalItemsCount}
              onPageChange={handlePageChange}
            />
          )}
          {selectedMenu === 1 && unlockCount !== 0 && (
            <Paging
              page={lockPage}
              count={count}
              totalItemsCount={unlockCount}
              onPageChange={handleLockPageChange}
            />
          )}
        </BottomContainer> */}

        {/* example */}
      </Container>
    </>
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

const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 30px;
`;

const RewardList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding-left: 20px;
`;

const Reward = styled.img`
  width: 191px;
  height: 384px;
  cursor: pointer;
  margin-right: 100px;
`;

// const BottomContainer = styled.div`
//   display: flex;
//   text-align: center;
//   justify-content: center;
//   margin-top: 15px;
// `;

export default RewardBoard;
