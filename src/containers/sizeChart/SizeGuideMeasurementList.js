/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Paginator } from "../../components/paginator/Paginator";
import LoadingCard from "../../components/shared/LoadingCard";
import { getSizeChartTemplateRecord } from "../../store/actions/sizeChartAction";

const SizeGuideMeasurementList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [itemPerPage, setItemPerPage] = useState(10);
  const [templateNameApi, setTemplateNameApi] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateCodeApi, setTemplateCodeApi] = useState("");
  const [templateCode, setTemplateCode] = useState("");
  const [isInternational, setIsInternational] = useState(null);
  const [isInternationalApi, setIsInternationalApi] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isActiveApi, setIsActiveApi] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(
      getSizeChartTemplateRecord(
        currentPage,
        itemPerPage,
        templateNameApi,
        templateCodeApi,
        isInternationalApi,
        isActiveApi
      )
    );
  }, [
    dispatch,
    currentPage,
    itemPerPage,
    templateNameApi,
    templateCodeApi,
    isInternationalApi,
    isActiveApi,
  ]);
  const { size_chart_template_list, loading } = useSelector(
    (state) => state.sizeChartReducers
  );
  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1);
    setItemPerPage(pagePerItems);
  };
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    if (size_chart_template_list?.success?.headers?.pagination) {
      var paginated_data_to_parse =
        size_chart_template_list?.success?.headers?.pagination;
      const paginated_data = JSON.parse(paginated_data_to_parse);
      setCurrentPage(paginated_data.currentPage);
      setTotalPage(paginated_data.totalPages);
      setTotalItems(paginated_data.totalItems);
      setItemPerPage(paginated_data.itemsPerPage);
    }
  }, [size_chart_template_list?.success?.headers?.pagination]);

  const handleSearchTemplate = () => {
    console.log('isInternational?.code',isInternational?.code)
    setTemplateNameApi(templateName);
    setTemplateCodeApi(templateCode);
    setIsInternationalApi(isInternational?.code);
    setIsActiveApi(isActive?.code);
    setCurrentPage(1);
  };
  const checkStatus = [
    { id: 1, name: "Yes", code: "Y" },
    { id: 2, name: "No", code: "N" },
  ];
  const handleEditModalShow = (sizeChartId) => {
    history.push(`/size-guide-template-edit/${sizeChartId}`);
  };
  return (
    <>
      <div id="wrapper">
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-success">
                  <div className="panel-heading">
                    List of Size Guide Measurement Template
                    <span style={{ float: "right" }}>
                      <Link to="/size-guide-measurement">
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
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          placeholder="Name"
                        />
                        {templateName !== "" ? (
                          <button
                            className="applicant_filter_cross__btn"
                            onClick={() => {
                              setTemplateName("");
                              setTemplateNameApi("");
                              setCurrentPage(1);
                            }}
                          >
                            <i className="pi pi-times"></i>
                          </button>
                        ) : null}
                      </div>
                      <div className="applicant_filter__form">
                        <InputText
                          className="manage_product__search"
                          value={templateCode}
                          onChange={(e) => setTemplateCode(e.target.value)}
                          placeholder="Code"
                        />
                        {templateCode !== "" ? (
                          <button
                            className="applicant_filter_cross__btn"
                            onClick={() => {
                              setTemplateCode("");
                              setTemplateCodeApi("");
                              setCurrentPage(1);
                            }}
                          >
                            <i className="pi pi-times"></i>
                          </button>
                        ) : null}
                      </div>

                      <div className="applicant_filter__form">
                        <Dropdown
                          style={{ width: "100%" }}
                          options={checkStatus}
                          optionLabel="name"
                          value={isInternational}
                          onChange={(e) => setIsInternational(e.value)}
                          placeholder="Is International?"
                        />
                        {isInternational ? (
                          <button
                            className="applicant_filter_cross__btn"
                            onClick={() => {
                              setIsInternational(null);
                              setIsInternationalApi(null);
                              setCurrentPage(1);
                            }}
                          >
                            <i className="pi pi-times"></i>
                          </button>
                        ) : null}
                      </div>

                      <div className="applicant_filter__form">
                        <Dropdown
                          style={{ width: "100%" }}
                          options={checkStatus}
                          optionLabel="name"
                          value={isActive}
                          onChange={(e) => setIsActive(e.value)}
                          placeholder="Is Active?"
                        />
                        {isActive ? (
                          <button
                            className="applicant_filter_cross__btn"
                            onClick={() => {
                              setIsActive(null);
                              setIsActiveApi(null);
                              setCurrentPage(1);
                            }}
                          >
                            <i className="pi pi-times"></i>
                          </button>
                        ) : null}
                      </div>

                      <Button
                        className="filter__btn"
                        onClick={() => handleSearchTemplate()}
                        style={{ marginLeft: "3px", fontSize: "1rem" }}
                        label="Search"
                      />
                    </div>

                    {loading ? (
                      <LoadingCard count={1} />
                    ) : (
                      <>
                        {size_chart_template_list?.success?.data.length > 0 ? (
                          <ul className="circular__list_section">
                            {size_chart_template_list?.success?.data.map(
                              (singleItem, index) => (
                                <>
                                  <li className="job_vacancy_post_container">
                                    <div
                                      className="job_vacancy__content_section flex items-center"
                                      style={{ width: "70%" }}
                                    >
                                      <div className="job_number">
                                        {index + 1}.
                                      </div>
                                      <div style={{ width: "60%" }}>
                                        <p className="job_title">
                                          {singleItem?.chartName}
                                        </p>
                                      </div>
                                      <div className="font-500 fs-14">
                                        {singleItem?.chartCode}
                                      </div>
                                    </div>
                                    <div className="job_vacancy__action_btn">
                                      {singleItem?.isIntSize === "Y" ? (
                                        <Tag
                                          className="mr-10 w-110"
                                          severity="success"
                                          value="International"
                                          rounded
                                          fontSize="12px"
                                        ></Tag>
                                      ) : (
                                        <Tag
                                          className="mr-10 w-110"
                                          severity="Primary"
                                          value="Domestic"
                                          rounded
                                          fontSize="12px"
                                        ></Tag>
                                      )}
                                      {singleItem?.isActive === "Y" ? (
                                        <Tag
                                          className="mr-10 w-110"
                                          severity="success"
                                          value="Active"
                                          rounded
                                          fontSize="12px"
                                        ></Tag>
                                      ) : (
                                        <Tag
                                          className="mr-10 w-110"
                                          severity="danger"
                                          value="In-Active"
                                          rounded
                                          fontSize="12px"
                                        ></Tag>
                                      )}
                                      <button
                                        className="job_vacancy__btn"
                                        onClick={() =>
                                          handleEditModalShow(
                                            singleItem?.sizeChartId
                                          )
                                        }
                                      >
                                        <FaEdit fontSize="1.6rem" />
                                        <span>Edit</span>
                                      </button>
                                    </div>
                                  </li>
                                </>
                              )
                            )}
                            <Paginator
                              totalPage={totalPage}
                              currentPage={currentPage}
                              itemPerPage={itemPerPage}
                              totalItems={totalItems}
                              items={size_chart_template_list?.success?.data}
                              itemsPerPageOptions={[10, 20, 50]}
                              handleItemPerPage={handleItemPerPage}
                              handleCurrentPage={handleCurrentPage}
                            />
                          </ul>
                        ) : (
                          <div className="circular_list__msg">
                            No Size Chart Template Found
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
      </div>
    </>
  );
};

export default SizeGuideMeasurementList;
