import React from "react";
import "../Pagination.css";

function Pagination({ rowsPerPage, totalRows, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
      <div className="pagination"> <p>Page:</p>
      {pageNumbers.map((number) => (
        <a key={number} href="!#" onClick={()=> paginate(number)}>
          {number}
        </a>
      ))}
    </div>
  );
}

export default Pagination;
