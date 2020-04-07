import React from "react";
import "../Pagination.css";

function Pagination({rowsPerPage, totalRows, paginate, currentPage}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    const getPageIndicator = (number) => {
        return number === currentPage ? "active" : undefined;
    };

    return (
        <div className="pagination">
            {" "}
            <p>Page:</p>
            {pageNumbers.map((number) => (
                <a
                    key={number}
                    href="javascript:;"
                    onClick={() => paginate(number)}
                    className={getPageIndicator(number)}
                >
                    {number}
                </a>
            ))}
        </div>
    );
}

export default Pagination;
