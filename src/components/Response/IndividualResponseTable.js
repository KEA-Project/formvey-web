import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function IndividualResponseTable(props) {
  const navigate = useNavigate();

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="first">No.</TableHeaderCell>
            <TableHeaderCell className="mid">응답자 닉네임</TableHeaderCell>
            <TableHeaderCell className="last">응답 날짜</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.response.map((response, i) => {
            return (
              <TableRow
                key={response.responseId}
                onClick={() => {
                  //navigateParticipate(survey.memberId, survey.surveyId);
                }}
              >
                <TableCell>{i}</TableCell>
                <TableCell>{response.nickname}</TableCell>
                <TableCell>{response.responseDate}</TableCell>
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
  text-align: left;
  margin: 0 auto;
`;

const TableHead = styled.thead`
  background: #ebf2ff;

  font-weight: 500;
  font-size: 15px;

  line-height: 20px;

  .first {
    border-top-left-radius: 10px;
  }

  .mid {
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

export default IndividualResponseTable;
