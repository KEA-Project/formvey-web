import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

function RewardBoard() {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/rewards/${localStorage.getItem(
        "memberId"
      )}`,
      {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    if (response.data.isSuccess) {
      setList(response.data.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chunkSize = 5; // 한 줄에 출력할 이미지 개수

  // 이미지 배열을 청크로 나누기
  const chunkArray = (array, size) => {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i += size) {
      chunked_arr.push(array.slice(i, i + size));
    }
    return chunked_arr;
  };

  // 이미지 배열을 청크로 나눈 결과
  const chunkedImages = chunkArray(list, chunkSize);

  return (
    <>
      <Container>
        <Title>리워드 보관함</Title>
        <RewardList>
          <table>
            <tbody>
              {chunkedImages.map((chunk, rowIndex) => (
                <tr key={rowIndex}>
                  {chunk.map((image) => (
                    <td key={image.userRewardId}>
                      <img
                        src={image.rewardUrl}
                        alt={`Image ${image.userRewardId}`}
                        width={200}
                        height={300}
                        style={{ margin: "10px" }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </RewardList>
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

export default RewardBoard;
