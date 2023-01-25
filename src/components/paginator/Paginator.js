import React, { useEffect, useState } from "react";
import "./Paginator.css";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export const Paginator = ({
  totalPage,
  currentPage,
  itemPerPage,
  totalItems,
  items,
  itemsPerPageOptions,
  handleItemPerPage,
  handleCurrentPage,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState();
  const [newCurrentPage, setNewCurrentPage] = useState(currentPage);
  var pages = [];
  for (var i = 0; i < totalPage; i++) {
    pages.push(i + 1);
  }
  useEffect(() => {
    const current_index = pages.indexOf(currentPage);
    setCurrentPageIndex(current_index);
  }, [pages, currentPage]);

  const handleSetPage = (current_page_no) => {
    setNewCurrentPage(current_page_no);
  };
  const handleSetNextPage = () => {
    if (currentPage < totalPage) {
      setNewCurrentPage(currentPage + 1);
    }
  };
  const handleSetPrevPage = () => {
    if (currentPage > 1) {
      setNewCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    handleCurrentPage(newCurrentPage);
  }, [newCurrentPage]);

  const handleSetItemPerPage = (item_per_page) => {
    handleItemPerPage(item_per_page);
  };

  return (
    <>
      {totalItems !== null || totalItems !== 0 || totalItems <= itemPerPage ? (
        <div className="pagination__section">
          <ul>
            <li className="first_page__btn" onClick={() => handleSetPage(1)}>
              <FiChevronsLeft className="icons" />
            </li>
            <li className="prev_page__btn" onClick={() => handleSetPrevPage()}>
              <FiChevronLeft className="icons" />
            </li>
            {pages?.length <= 6 ? (
              <>
                {pages?.map((data, index) => (
                  <>
                    <li
                      key={index}
                      onClick={() => handleSetPage(data)}
                      className={
                        currentPage === data
                          ? `page__active`
                          : totalPage > 999
                          ? `page_more_than__thousand`
                          : null
                      }
                    >
                      {data}
                    </li>
                  </>
                ))}
              </>
            ) : (
              <>
                {currentPage >= pages.length - 3 ? (
                  <>
                    <li onClick={() => handleSetPage(1)}>1</li>
                    <li>...</li>
                    {pages
                      .filter((new_pages, new_index) =>
                        currentPageIndex > 3
                          ? new_index <= currentPageIndex + 2 &&
                            new_index >= currentPageIndex - 2
                          : new_index < 5
                      )
                      .map((data, index) => (
                        <>
                          <li
                            key={index}
                            onClick={() => handleSetPage(data)}
                            className={
                              currentPage === data
                                ? `page__active`
                                : totalPage > 999
                                ? `page_more_than__thousand`
                                : null
                            }
                          >
                            {data}
                          </li>
                        </>
                      ))}
                  </>
                ) : (
                  <>
                    {pages
                      .filter((new_pages, new_index) =>
                        currentPageIndex > 3
                          ? new_index <= currentPageIndex + 2 &&
                            new_index >= currentPageIndex - 2
                          : new_index < 5
                      )
                      .map((data, index) => (
                        <>
                          <li
                            key={index}
                            onClick={() => handleSetPage(data)}
                            className={
                              currentPage === data
                                ? `page__active`
                                : totalPage > 999
                                ? `page_more_than__thousand`
                                : null
                            }
                          >
                            {data}
                          </li>
                        </>
                      ))}
                    <li>...</li>
                    <li
                      onClick={() => handleSetPage(totalPage)}
                      className={
                        currentPage === totalPage
                          ? `page__active`
                          : totalPage > 999
                          ? `page_more_than__thousand`
                          : null
                      }
                    >
                      {totalPage}
                    </li>
                  </>
                )}
              </>
            )}
            <li className="next_page__btn" onClick={() => handleSetNextPage()}>
              <FiChevronRight className="icons" />
            </li>
            <li
              className="last_page__btn"
              onClick={() => handleSetPage(totalPage)}
            >
              <FiChevronsRight className="icons" />
            </li>
          </ul>
          {totalItems !== 0 &&
          totalItems !== null &&
          totalItems !== undefined ? (
            <>
              {currentPage !== totalPage ? (
                <p>
                  Showing {itemPerPage * currentPage - itemPerPage + 1} to{" "}
                  {Number(
                    itemPerPage * currentPage - (itemPerPage - items?.length)
                  )}{" "}
                  from {totalItems} entries
                </p>
              ) : (
                <p>
                  Showing {itemPerPage * currentPage - itemPerPage + 1} to{" "}
                  {Number(
                    itemPerPage * currentPage - (itemPerPage - items?.length)
                  )}{" "}
                  from {totalItems} entries
                </p>
              )}
            </>
          ) : (
            <p>Showing 0 to 0 from 0 entries</p>
          )}
          <select
            onChange={(e) => {
              handleSetItemPerPage(e.target.value);
            }}
          >
            {itemsPerPageOptions?.map((item, index) => (
              <option key={index} value={item} selected={itemPerPage === item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </>
  );
};
