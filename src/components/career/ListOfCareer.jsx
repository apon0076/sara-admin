/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Paginator } from "../paginator/Paginator";
import LoadingCard from "../shared/LoadingCard";
import "./../../containers/career/Career.css";
import CareerDetails from "./CareerDetails";
import EditCircular from "./EditCircular";

const ListOfCareer = ({
  loading,
  jobCircularList,
  handleSinglePost,
  singleJobCircular,
  setTitle,
  handleJobCircularUpdate,
  setPosition,
  setNoOfVacancy,
  job_nature,
  company_name,
  setJobNature,
  jobNature,
  setExperience,
  company,
  setCompany,
  setSalary,
  setLocation,
  setDeadline,
  deadLine,
  setRequirements,
  setAdditionalRequirements,
  setBenefits,
  setIsActive,
  careerEditModal,
  setCareerEditModal,
  title,
  position,
  noOfVacancy,
  salary,
  location,
  requirements,
  currentPage,
  setCurrentPage,
  itemPerPage,
  setItemPerPage,
  totalPage,
  setTotalPage,
  totalItems,
  setTotalItems,
  setStartDate,
  setEndDate,
  setPositionFilter,
  setIsActiveFilter,
  startDate,
  endDate,
  positionFilter,
  isActiveFilter,
  handleCircularFilter,
  setStartDateApi,
  setEndDateApi,
  setPositionFilterApi,
  setIsActiveFilterApi,
}) => {
  const [singleData, setSingleData] = useState(null);
  const [careerDetailsModal, setCareerDetailsModal] = useState(false);
  const handleApplicantCount = () => toast.error("No Application Till Now !!!");
  const circularStatus = [
    { id: 1, name: "Active", code: "Y" },
    { id: 2, name: "Deactivate", code: "N" },
  ];
  useEffect(() => {
    singleJobCircular &&
      setSingleData(
        singleJobCircular?.data?.length > 0 ? singleJobCircular?.data[0] : null
      );
  }, [singleJobCircular]);
  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1);
    setItemPerPage(pagePerItems);
  };
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    if (jobCircularList?.headers?.pagination) {
      var paginated_data_to_parse = jobCircularList.headers.pagination;
      const paginated_data = JSON.parse(paginated_data_to_parse);
      setCurrentPage(paginated_data.currentPage);
      setTotalPage(paginated_data.totalPages);
      setTotalItems(paginated_data.totalItems);
      setItemPerPage(paginated_data.itemsPerPage);
    }
  }, [jobCircularList?.headers?.pagination]);
  return (
    <>
      <div className="applicant_filter__section">
        <div className="applicant_filter__form">
          <InputText
            className="manage_product__search"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            placeholder="Position"
          />
          {positionFilter !== "" ? (
            <button
              className="applicant_filter_cross__btn"
              onClick={() => {
                setPositionFilter("");
                setPositionFilterApi("");
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

        <div className="applicant_filter__form">
          <Dropdown
            className="manage_product__search_dropdown"
            options={circularStatus}
            value={isActiveFilter}
            onChange={(e) => setIsActiveFilter(e.value)}
            optionLabel="name"
            placeholder="Select a Status"
          />
          {isActiveFilter !== null ? (
            <button
              className="applicant_filter_cross__btn"
              onClick={() => {
                setIsActiveFilter(null);
                setIsActiveFilterApi(null);
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
            handleCircularFilter(
              startDate,
              endDate,
              positionFilter,
              isActiveFilter
            )
          }
          style={{ marginLeft: "3px", fontSize: "1rem" }}
          label="Search"
        />
      </div>
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <>
          {jobCircularList?.data?.length > 0 ? (
            <ul className="circular__list_section">
              {jobCircularList?.data?.map((singleItem, index) => (
                <>
                  <li className="job_vacancy_post_container">
                    <div className="job_vacancy__content_section">
                      <div className="job_number">{index + 1}.</div>
                      <div>
                        <p className="job_title">
                          {singleItem?.circulationTitle}
                        </p>
                        <p className="job_deadline">
                          Deadline:{" "}
                          {moment(singleItem?.deadLine).format(
                            "Do MMMM YYYY, h:mm A"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="job_vacancy__action_btn">
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
                      {singleItem?.totalApplicants > 0 ? (
                        <Link
                          to={`/career-applicant/${singleItem?.careerCirculationId}`}
                        >
                          <button className="job_vacancy__btn_one">
                            <FaUsers fontSize="1.6rem" />
                            <span>
                              Applicants (
                              {singleItem?.totalApplicants < 9
                                ? "0" + singleItem?.totalApplicants
                                : singleItem?.totalApplicants}
                              )
                            </span>
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="job_vacancy__btn_one"
                          onClick={() => handleApplicantCount()}
                        >
                          <FaUsers fontSize="1.6rem" />
                          <span>
                            Applicants (
                            {singleItem?.totalApplicants < 9
                              ? "0" + singleItem?.totalApplicants
                              : singleItem?.totalApplicants}
                            )
                          </span>
                        </button>
                      )}
                      <button
                        className="job_vacancy__btn"
                        onClick={() => {
                          setCareerDetailsModal(true);
                          handleSinglePost(singleItem.careerCirculationId);
                        }}
                      >
                        <FaEye fontSize="1.6rem" />
                        <span>Details</span>
                      </button>
                      <button
                        className="job_vacancy__btn"
                        onClick={() => {
                          setCareerEditModal(true);
                          handleSinglePost(singleItem.careerCirculationId);
                        }}
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
                items={jobCircularList?.data}
                itemsPerPageOptions={[20, 50, 100, 200, 300]}
                handleItemPerPage={handleItemPerPage}
                handleCurrentPage={handleCurrentPage}
              />
            </ul>
          ) : (
            <div className="circular_list__msg">No Job Post Found</div>
          )}
        </>
      )}
      <Modal
        title={singleData?.circulationTitle}
        centered
        visible={careerEditModal}
        onCancel={() => {
          setTitle("");
          setPosition("");
          setNoOfVacancy("");
          setJobNature("");
          setExperience("");
          setCompany("");
          setSalary("");
          setLocation("");
          setDeadline("");
          setRequirements("");
          setAdditionalRequirements("");
          setBenefits("");
          setIsActive("Y");
          setCareerEditModal(false);
        }}
        width={1500}
      >
        <EditCircular
          singleData={singleData}
          loading={loading}
          setTitle={setTitle}
          handleJobCircularUpdate={handleJobCircularUpdate}
          setPosition={setPosition}
          setNoOfVacancy={setNoOfVacancy}
          setJobNature={setJobNature}
          job_nature={job_nature}
          company_name={company_name}
          jobNature={jobNature}
          setExperience={setExperience}
          company={company}
          setCompany={setCompany}
          setSalary={setSalary}
          setLocation={setLocation}
          setDeadline={setDeadline}
          deadLine={deadLine}
          setRequirements={setRequirements}
          setAdditionalRequirements={setAdditionalRequirements}
          setBenefits={setBenefits}
          setIsActive={setIsActive}
          title={title}
          position={position}
          noOfVacancy={noOfVacancy}
          salary={salary}
          location={location}
          requirements={requirements}
        />
      </Modal>

      <Modal
        title="Circular Details"
        centered
        visible={careerDetailsModal}
        onCancel={() => {
          setCareerDetailsModal(false);
        }}
        width={1500}
      >
        <CareerDetails singleData={singleData} loading={loading} />
      </Modal>
    </>
  );
};

export default ListOfCareer;
