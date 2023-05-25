import React, { useEffect } from "react";
import styled from "@emotion/styled";
import reward from "../assets/rewardEx.png";

function RewardBoard() {
  // const srollRef = useRef();
  // const [rewardList, setRewardList] = useState([]);

  const imageLinks = [
    {
      id: 1,
      src: "https://eraofband.s3.ap-northeast-2.amazonaws.com/148b9b3a-c2d9-47a8-93c1-fde216bd9dd2.png",
      width: 200,
      height: 200,
    },
    {
      id: 2,
      src: "https://eraofband.s3.ap-northeast-2.amazonaws.com/148b9b3a-c2d9-47a8-93c1-fde216bd9dd2.png",
      width: 200,
      height: 200,
    },
    {
      id: 3,
      src: "https://eraofband.s3.ap-northeast-2.amazonaws.com/148b9b3a-c2d9-47a8-93c1-fde216bd9dd2.png",
      width: 200,
      height: 200,
    },
    {
      id: 3,
      src: "https://eraofband.s3.ap-northeast-2.amazonaws.com/148b9b3a-c2d9-47a8-93c1-fde216bd9dd2.png",
      width: 200,
      height: 200,
    },
    // ...add more image links as needed
  ];

  return (
    <>
      <Container>
        <Title>리워드 보관함</Title>
        <RewardList>
          <Reward src={reward} />
          <Reward src={reward} />
          <Reward src={reward} />
          <Reward src={reward} />

          {/* <table>
            <tbody>
              <tr>
                {imageLinks.map((image) => (
                  <td key={image.id}>
                    <img
                      src={image.src}
                      alt={`Image ${image.id}`}
                      width={image.width}
                      height={image.height}
                      style={{ margin: "10px" }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table> */}
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

// const BottomContainer = styled.div`
//   display: flex;
//   text-align: center;
//   justify-content: center;
//   margin-top: 15px;
// `;

export default RewardBoard;
