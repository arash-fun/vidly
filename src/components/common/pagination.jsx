//--------------------------------
/*
what we need: Interface of the component
what are components inputs receives?
what are events the events it's going to raise
render null before implementing interface

*/

import React from "react";
// import { checkPropTypes } from "prop-types";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  // const { itemCount, pageSize, currentPage, onPageChange } = props; //destructing props

  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          // <li key={page} className="page-item">
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
