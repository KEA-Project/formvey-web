import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import styled from "@emotion/styled";
import "./Paging.css";

function Paging ({page, count, totalItemsCount, onPageChange}) {

    const handlePageChange = (page) => {
        onPageChange(page -1);
      };

  return (
    <div>
    <Pagination
      activePage={page+1}
      itemsCountPerPage={count}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
    </div>
  );
};

const MyPagination = styled(Pagination)`
    display: flex;
    justify-content: center;
    margin-top: 15px;

  .ul {
    list-style: none;
    padding: 0;
  }

  .ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  .ul.pagination li:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  .ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  .ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }

  .ul.pagination li.active a {
    color: white;
  }

  .ul.pagination li.active {
    background-color: #337ab7;
  }

  .ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;

export default Paging;