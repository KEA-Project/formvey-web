import React from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";

function BoardTable(props) {
  const navigate = useNavigate();

  const navigateParticipate = (memberId, surveyId) => {
    if (memberId == localStorage.getItem("memberId")) {
      //내가 만든 설문일 경우
      console.log("내 설문");
    } else {
      //내가 만든 설문이 아닐 경우
      //암호화 한 id값으로 설문 참여
      navigate(`/participate/${btoa(surveyId)}`);
    }
  };

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="first">설문 제목</TableHeaderCell>
            <TableHeaderCell>D-Day</TableHeaderCell>
            <TableHeaderCell>응답자 수</TableHeaderCell>
            <TableHeaderCell className="last">설문 제작자</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.survey.map((survey) => {
            if (survey.dday === 0) survey.dday = "완료";
            else {
              survey.dday = "D - " + survey.dday;
            }
            return (
              <TableRow
                key={survey.surveyId}
                onClick={() => {
                  navigateParticipate(survey.memberId, survey.surveyId);
                }}
              >
                <TableCell>{survey.surveyTitle}</TableCell>
                <TableCell>{survey.dday}</TableCell>
                <TableCell>{survey.responseCnt}</TableCell>
                <TableCell>{survey.nickname}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  max-width: 990px;
  margin-bottom: 1rem;
  color: #212529;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.2;
  text-align: center;
  margin: 0 auto;
`;

const TableHead = styled.thead`
  background: #ebf2ff;

  font-weight: 500;
  font-size: 15px;

  line-height: 20px;

  .first {
    border-top-left-radius: 10px;
    width: 60%;
  }

  .last {
    border-top-right-radius: 10px;
  }
`;

const TableBody = styled.tbody`
  background-color: #fff;
`;

const TableRow = styled.tr`
  //   &:nth-of-type(even) {
  //     background-color: #f8f9fa;
  //   }

  cursor: pointer;
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem;
  vertical-align: top;

  border-bottom: 1px solid #dee2e6;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  vertical-align: top;
  border-bottom: 1px solid #dee2e6;
`;

export default BoardTable;
