/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Paginator } from "../paginator/Paginator";
import LoadingCard from "../shared/LoadingCard";

const ViewSizeChartAttributeList = ({
  get_size_chart_attribute,
  loading,
  setCurrentPage,
  setTotalPage,
  setTotalItems,
  setItemPerPage,
  totalPage,
  currentPage,
  itemPerPage,
  totalItems,
  attributeName,
  setAttributeName,
  handleSearchAttribute,
  handleCrossSearchAttribute,
  handleEditModalShow,
}) => {
  const [attributeList, setAttributeList] = useState([]);
  useEffect(() => {
    get_size_chart_attribute?.success?.data?.length > 0 &&
      setAttributeList(get_size_chart_attribute.success.data);
  }, [get_size_chart_attribute]);

  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1);
    setItemPerPage(pagePerItems);
  };
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    if (get_size_chart_attribute?.success?.headers?.pagination) {
      var paginated_data_to_parse =
        get_size_chart_attribute?.success?.headers?.pagination;
      const paginated_data = JSON.parse(paginated_data_to_parse);
      setCurrentPage(paginated_data.currentPage);
      setTotalPage(paginated_data.totalPages);
      setTotalItems(paginated_data.totalItems);
      setItemPerPage(paginated_data.itemsPerPage);
    }
  }, [get_size_chart_attribute?.success?.headers?.pagination]);
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                Size Chart Attributes List
                <span style={{ float: "right" }}>
                  <Link to="/size-chart-attribute">
                    <Icon.X className="text-light" />
                  </Link>
                </span>
              </div>
              <div style={{ padding: "10px" }}>
                <div
                  className="applicant_filter__section"
                  style={{ marginBottom: "10px" }}
                >
                  <div className="applicant_filter__form">
                    <InputText
                      className="manage_product__search"
                      value={attributeName}
                      onChange={(e) => setAttributeName(e.target.value)}
                      placeholder="Attribute"
                    />
                    {attributeName !== "" ? (
                      <button
                        className="applicant_filter_cross__btn"
                        onClick={() => {
                          setAttributeName("");
                          handleCrossSearchAttribute();
                        }}
                      >
                        <i className="pi pi-times"></i>
                      </button>
                    ) : null}
                  </div>

                  <Button
                    className="filter__btn"
                    onClick={() => handleSearchAttribute()}
                    style={{ marginLeft: "3px", fontSize: "1rem" }}
                    label="Search"
                  />
                </div>

                {loading ? (
                  <LoadingCard count={1} />
                ) : (
                  <>
                    {attributeList.length > 0 ? (
                      <ul className="circular__list_section">
                        {attributeList.map((singleItem, index) => (
                          <>
                            <li className="job_vacancy_post_container">
                              <div className="job_vacancy__content_section">
                                <div className="job_number">{index + 1}.</div>
                                <div>
                                  <p className="job_title">
                                    {singleItem?.attributeName}
                                  </p>
                                </div>
                              </div>
                              <div className="job_vacancy__action_btn">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginRight: "20px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                  }}
                                >
                                  <span>Display Order:</span>
                                  <span
                                    style={{
                                      width: "42px",
                                      marginLeft: "10px",
                                      border: "1px solid #756c6c",
                                      borderRadius: "15px",
                                      padding: "0 7px",
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                    }}
                                  >
                                    {singleItem.displayOrder}
                                  </span>
                                </div>
                                {singleItem?.isActive === "Y" ? (
                                  <Tag
                                    className="mr-2"
                                    severity="success"
                                    value="Active"
                                    rounded
                                    fontSize="1rem"
                                  ></Tag>
                                ) : (
                                  <Tag
                                    className="mr-2"
                                    severity="danger"
                                    value="In-Active"
                                    rounded
                                    fontSize="1rem"
                                  ></Tag>
                                )}
                                <button
                                  className="job_vacancy__btn"
                                  onClick={() =>
                                    handleEditModalShow(singleItem?.attributeId)
                                  }
                                >
                                  <FaEdit fontSize="1.6rem" />
                                  <span>Edit</span>
                                </button>
                              </div>
                            </li>
                          </>
                        ))}
                        <Paginator
                          totalPage={totalPage}
                          currentPage={currentPage}
                          itemPerPage={itemPerPage}
                          totalItems={totalItems}
                          items={attributeList}
                          itemsPerPageOptions={[10, 20, 50]}
                          handleItemPerPage={handleItemPerPage}
                          handleCurrentPage={handleCurrentPage}
                        />
                      </ul>
                    ) : (
                      <div className="circular_list__msg">
                        No Attribute Found
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSizeChartAttributeList;
