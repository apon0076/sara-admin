/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ApplicantDetails from "../../components/career/ApplicantDetails";
import { Paginator } from "../../components/paginator/Paginator";
import LoadingCard from "../../components/shared/LoadingCard";
import { getApplicantListRecord } from "../../store/actions/careerAction";
import baseUrl from "../../utils/baseUrl";

const Applicants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);
  const [totalPage, setTotalPage] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [startDateApi, setStartDateApi] = useState(null);
  const [endDateApi, setEndDateApi] = useState(null);
  const [positionApi, setPositionApi] = useState("");
  const [nameApi, setNameApi] = useState("");
  const [phoneApi, setPhoneApi] = useState("");
  const [emailApi, setEmailApi] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [jobPosition, setJobPosition] = useState(null);
  const [applicantDetailsModal, setApplicantDetailsModal] = useState(false);
  const [singleApplicantDetails, setSingleApplicantDetails] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const toIsoString = (date) => {
    var tzo = -date?.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num) {
        return (num < 10 ? "0" : "") + num;
      };
    return (
      date?.getFullYear() +
      "-" +
      pad(date?.getMonth() + 1) +
      "-" +
      pad(date?.getDate()) +
      "T" +
      pad(date?.getHours()) +
      ":" +
      pad(date?.getMinutes()) +
      ":" +
      pad(date?.getSeconds()) +
      dif +
      pad(Math?.floor(Math?.abs(tzo) / 60)) +
      ":" +
      pad(Math?.abs(tzo) % 60)
    );
  };
  useEffect(() => {
    dispatch(
      getApplicantListRecord(
        startDateApi !== null ? toIsoString(startDateApi).substring(0, 10) : "",
        endDateApi !== null ? toIsoString(endDateApi).substring(0, 10) : "",
        params.id,
        positionApi,
        nameApi,
        phoneApi,
        emailApi,
        currentPage,
        itemPerPage
      )
    );
  }, [
    currentPage,
    dispatch,
    emailApi,
    endDateApi,
    itemPerPage,
    nameApi,
    params.id,
    phoneApi,
    positionApi,
    startDateApi,
  ]);
  const applicant_data = useSelector(
    (state) => state.careerReducer.applicantList
  );
  const loading = useSelector((state) => state.careerReducer.loading);
  useEffect(() => {
    applicant_data.data &&
      applicant_data.data.map((data, index) =>
        setJobPosition(applicant_data.data[0].position)
      );
  }, [applicant_data]);
  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1);
    setItemPerPage(pagePerItems);
  };
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    if (applicant_data?.headers?.pagination) {
      var paginated_data_to_parse = applicant_data.headers.pagination;
      const paginated_data = JSON.parse(paginated_data_to_parse);
      setCurrentPage(paginated_data.currentPage);
      setTotalPage(paginated_data.totalPages);
      setTotalItems(paginated_data.totalItems);
      setItemPerPage(paginated_data.itemsPerPage);
    }
  }, [applicant_data?.headers?.pagination]);
  const handleSingleApplicant = (applyId) => {
    applicant_data.data
      .filter((filtered_data) => filtered_data.circulationApplyId === applyId)
      .map((data, index) => setSingleApplicantDetails(data));
  };
  const filterApplicants = (
    name,
    phone,
    email,
    position,
    startDate,
    endDate
  ) => {
    setCurrentPage(1);
    setNameApi(name);
    setPhoneApi(phone);
    setEmailApi(email);
    setPositionApi(position);
    setStartDateApi(startDate);
    setEndDateApi(endDate);
  };
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="panel panel-success">
          <div className="panel-heading panel_heading__section">
            <span>Applicants for the Position of {jobPosition}</span>
          </div>
          <div className="panel-wrapper collapse in" aria-expanded="true">
            <div className="panel-body">
              <div className="applicant__header">
                <Link to="/career">
                  <button className="back_to_career__btn">
                    <IoChevronBack />
                    <span className="back_to_career__btn_txt">Back to Career</span>
                  </button>
                </Link>
                <div className="applicant_filter__section">
                  <div className="applicant_filter__form">
                    <InputText
                      className="manage_product__search"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Applicant Name"
                    />
                    {name !== "" ? (
                      <button
                        className="applicant_filter_cross__btn"
                        onClick={() => {
                          setName("");
                          setNameApi("");
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                    />
                    {phone !== "" ? (
                      <button
                        className="applicant_filter_cross__btn"
                        onClick={() => {
                          setPhone("");
                          setPhoneApi("");
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    {email !== "" ? (
                      <button
                        className="applicant_filter_cross__btn"
                        onClick={() => {
                          setEmail("");
                          setEmailApi("");
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
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="Position"
                    />
                    {position !== "" ? (
                      <button
                        className="applicant_filter_cross__btn"
                        onClick={() => {
                          setPosition("");
                          setPositionApi("");
                          setCurrentPage(1);
                        }}
                      >
                        <i className="pi pi-times"></i>
                      </button>
                    ) : null}
                  </div>

                  <div className="applicant_filter__form">
                    <Calendar
                      id="icon"
                      maxDate={endDate}
                      value={startDate}
                      onChange={(e) => setStartDate(e.value)}
                      showIcon
                      placeholder="Start Date"
                      readOnlyInput
                    />
                    {startDate !== null ? (
                      <button
                        className="applicant_filter_cross__btn"
                        onClick={() => {
                          setStartDate(null);
                          setStartDateApi(null);
                          setCurrentPage(1);
                        }}
                      >
                        <i className="pi pi-times"></i>
                      </button>
                    ) : null}
                  </div>

                  <div className="applicant_filter__form">
                    <Calendar
                      id="icon disableddays"
                      minDate={startDate}
                      value={endDate}
                      onChange={(e) => setEndDate(e.value)}
                      showIcon
                      placeholder="End Date"
                      readOnlyInput
                    />
                    {endDate !== null ? (
                      <button
                        className="applicant_filter_cross__btn"
                        onClick={() => {
                          setEndDate(null);
                          setEndDateApi(null);
                          setCurrentPage(1);
                        }}
                      >
                        <i className="pi pi-times"></i>
                      </button>
                    ) : null}
                  </div>

                  <Button
                    className="filter__btn"
                    onClick={() =>
                      filterApplicants(
                        name,
                        phone,
                        email,
                        position,
                        startDate,
                        endDate
                      )
                    }
                    style={{ marginLeft: "3px", fontSize: "1rem" }}
                    label="Search"
                  />
                </div>
              </div>
              {loading ? (
                <LoadingCard count={1} />
              ) : (
                <ul className="circular__list_section">
                  {applicant_data?.data?.map((singleItem, index) => (
                    <>
                      <li className="job_vacancy_post_container">
                        <div className="job_vacancy__content_section applicant__content_section">
                          <div className="job_number">{index + 1}.</div>
                          <div>
                            <p className="job_title">
                              {singleItem?.candidateName}
                            </p>
                            <p className="job_deadline">
                              {singleItem?.mobileNo}
                            </p>
                          </div>
                        </div>

                        <div className="job_vacancy__content_section applicant__content_section">
                          <div>
                            <p className="job_title">{singleItem?.position}</p>
                            <p className="job_deadline">
                              Expected Salary:{" "}
                              {singleItem?.expectedSalary
                                ? `${singleItem?.expectedSalary} BDT`
                                : "Not Mentioned"}
                            </p>
                          </div>
                        </div>

                        <div className="job_vacancy__action_btn">
                          <a
                            href={`${baseUrl}${singleItem?.circulationApplyAttachments[0]?.filePath}`}
                            download
                            target="_blank"
                          >
                            <button className="ps-btn ps-btn--fullwidth download__btn">
                              <span>
                                <FiDownload size="1.7rem" />
                              </span>
                              <span>CV / Resume</span>
                            </button>
                          </a>
                          <button
                            className="job_vacancy__btn"
                            onClick={() => {
                              setApplicantDetailsModal(true);
                              handleSingleApplicant(
                                singleItem.circulationApplyId
                              );
                            }}
                          >
                            <FaEye fontSize="1.6rem" />
                            <span>Details</span>
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
                    items={applicant_data?.data}
                    itemsPerPageOptions={[20, 50, 100, 200, 300]}
                    handleItemPerPage={handleItemPerPage}
                    handleCurrentPage={handleCurrentPage}
                  />
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Applicant Details"
        centered
        visible={applicantDetailsModal}
        onCancel={() => {
          setApplicantDetailsModal(false);
        }}
        width={1500}
      >
        <ApplicantDetails singleApplicantDetails={singleApplicantDetails} />
      </Modal>
    </div>
  );
};

export default Applicants;
