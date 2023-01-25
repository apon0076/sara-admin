/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaList, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import AddCircular from "../../components/career/AddCircular";
import ListOfCareer from "../../components/career/ListOfCareer";
import {
  listOfJobCircularRecord,
  postJobCircularRecord,
  POST_JOB_CIRCULAR_RESET,
  singleJobCircularRecord,
} from "../../store/actions/careerAction";
import "./Career.css";
const Career = () => {
  const [careerPageOptions, setCareerPageOptions] = useState(1);
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [noOfVacancy, setNoOfVacancy] = useState("");
  const [jobNature, setJobNature] = useState("");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [deadLine, setDeadline] = useState("");
  const [requirements, setRequirements] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [status, setStatus] = useState(true);
  const [circularId, setCircularId] = useState(null);
  const [isActive, setIsActive] = useState("Y");
  const [careerEditModal, setCareerEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(20);
  const [totalPage, setTotalPage] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [startDateApi, setStartDateApi] = useState(null);
  const [endDateApi, setEndDateApi] = useState(null);
  const [positionFilterApi, setPositionFilterApi] = useState("");
  const [isActiveFilterApi, setIsActiveFilterApi] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [positionFilter, setPositionFilter] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState(null);
  const dispatch = useDispatch();
  const job_nature = [
    { id: 1, type: "Full-Time" },
    { id: 2, type: "Part-Time" },
    { id: 3, type: "Contractual" },
  ];
  const company_name = [
    { id: 1, name: "SaRa Lifestyle Ltd." },
    { id: 2, name: "Snowtex" },
  ];
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
  var current_date = new Date();
  const currentDate =
    current_date !== null ? toIsoString(current_date).substring(0, 10) : null;
  const currentTime =
    current_date !== null ? toIsoString(current_date).substring(10, 19) : null;
  var current_date_time = currentDate + currentTime;
  const deadlineDate =
    deadLine !== "" || deadLine?._d !== null
      ? toIsoString(deadLine?._d).substring(0, 10)
      : null;
  const deadlineTime =
    deadLine !== "" || deadLine?._d !== null
      ? toIsoString(deadLine?._d).substring(10, 19)
      : null;
  var deadLine_date_time = deadlineDate + deadlineTime;
  const handleJobCircularSubmit = () => {
    var data_to_post = {
      position: position,
      circulationTitle: title,
      noOfVecency: Number(noOfVacancy),
      experience: experience,
      jobNature: jobNature.type,
      salary: salary,
      publishDateTime: current_date_time,
      deadLine: deadLine_date_time,
      requirement: requirements,
      additionalReq: additionalRequirements,
      benefit: benefits,
      companyName: company.name,
      location: location,
      isActive: isActive,
    };
    dispatch(postJobCircularRecord(data_to_post));
  };
  const handleJobCircularUpdate = () => {
    var data_to_update = {
      careerCirculationId: circularId,
      position: position,
      circulationTitle: title,
      noOfVecency: Number(noOfVacancy),
      experience: experience,
      jobNature: jobNature.type ? jobNature.type : jobNature,
      salary: salary,
      publishDateTime: current_date_time,
      deadLine: deadLine?._d ? deadLine_date_time : deadLine,
      requirement: requirements,
      additionalReq: additionalRequirements,
      benefit: benefits,
      companyName: company.name ? company.name : company,
      location: location,
      isActive: isActive,
    };
    dispatch(postJobCircularRecord(data_to_update));
  };
  const {
    postJobCircular,
    loading,
    error,
    jobCircularList,
    singleJobCircular,
  } = useSelector((state) => state.careerReducer);
  useEffect(() => {
    if (postJobCircular?.data?.message === "Update Success") {
      toast.success("Circular Updated");
      dispatch({ type: POST_JOB_CIRCULAR_RESET });
      setTimeout(() => {
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
        setCareerPageOptions(1);
        setStatus(!status);
        setIsActive("Y");
        setCareerEditModal(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);
    } else if (postJobCircular?.data?.message === "Save Success") {
      toast.success("New Circular Posted");
      dispatch({ type: POST_JOB_CIRCULAR_RESET });
      setTimeout(() => {
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
        setCareerPageOptions(1);
        setStatus(!status);
        setIsActive("Y");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);
    } else if (error !== null && careerPageOptions === 2) {
      toast.error("Something Went Wrong Please Try Again");
      dispatch({ type: POST_JOB_CIRCULAR_RESET });
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [postJobCircular, error]);
  useEffect(() => {
    dispatch(
      listOfJobCircularRecord(
        startDateApi !== null ? toIsoString(startDateApi).substring(0, 10) : "",
        endDateApi !== null ? toIsoString(endDateApi).substring(0, 10) : "",
        positionFilterApi,
        isActiveFilterApi !== null && isActiveFilterApi !== undefined
          ? isActiveFilterApi
          : "",
        currentPage,
        itemPerPage
      )
    );
  }, [
    dispatch,
    status,
    startDateApi,
    endDateApi,
    positionFilterApi,
    isActiveFilterApi,
    currentPage,
    itemPerPage,
  ]);
  const handleCircularFilter = (
    startDate,
    endDate,
    positionFilter,
    isActiveFilter
  ) => {
    setStartDateApi(startDate);
    setEndDateApi(endDate);
    setPositionFilterApi(positionFilter);
    setIsActiveFilterApi(isActiveFilter?.code);
  };
  const handleSinglePost = (id) => {
    setCircularId(id);
    dispatch(singleJobCircularRecord(id));
  };
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="panel panel-success">
          <div className="panel-heading panel_heading__section">
            <span>Career</span>
            <span className="career__options_btn">
              {careerPageOptions === 1 ? (
                <button onClick={() => setCareerPageOptions(2)}>
                  <FaPlusCircle fontSize="1.9rem" /> <span>Add Circular</span>
                </button>
              ) : (
                <button onClick={() => setCareerPageOptions(1)}>
                  <FaList fontSize="1.9rem" /> <span>Circular List</span>
                </button>
              )}
            </span>
          </div>
          <div className="panel-wrapper collapse in" aria-expanded="true">
            <div className="panel-body">
              {careerPageOptions === 2 ? (
                <AddCircular
                  title={title}
                  setTitle={setTitle}
                  position={position}
                  setPosition={setPosition}
                  noOfVacancy={noOfVacancy}
                  setNoOfVacancy={setNoOfVacancy}
                  jobNature={jobNature}
                  setJobNature={setJobNature}
                  experience={experience}
                  setExperience={setExperience}
                  company={company}
                  setCompany={setCompany}
                  salary={salary}
                  setSalary={setSalary}
                  location={location}
                  setLocation={setLocation}
                  deadLine={deadLine}
                  setDeadline={setDeadline}
                  requirements={requirements}
                  setRequirements={setRequirements}
                  additionalRequirements={additionalRequirements}
                  setAdditionalRequirements={setAdditionalRequirements}
                  benefits={benefits}
                  setBenefits={setBenefits}
                  handleJobCircularSubmit={handleJobCircularSubmit}
                  loading={loading}
                  job_nature={job_nature}
                  company_name={company_name}
                />
              ) : (
                <>
                  <ListOfCareer
                    loading={loading}
                    jobCircularList={jobCircularList}
                    handleSinglePost={handleSinglePost}
                    singleJobCircular={singleJobCircular}
                    setTitle={setTitle}
                    handleJobCircularUpdate={handleJobCircularUpdate}
                    setPosition={setPosition}
                    setNoOfVacancy={setNoOfVacancy}
                    job_nature={job_nature}
                    company_name={company_name}
                    jobNature={jobNature}
                    setJobNature={setJobNature}
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
                    careerEditModal={careerEditModal}
                    setCareerEditModal={setCareerEditModal}
                    title={title}
                    position={position}
                    noOfVacancy={noOfVacancy}
                    salary={salary}
                    location={location}
                    requirements={requirements}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    totalPage={totalPage}
                    setTotalPage={setTotalPage}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setPositionFilter={setPositionFilter}
                    setIsActiveFilter={setIsActiveFilter}
                    startDate={startDate}
                    endDate={endDate}
                    positionFilter={positionFilter}
                    isActiveFilter={isActiveFilter}
                    handleCircularFilter={handleCircularFilter}
                    setStartDateApi={setStartDateApi}
                    setEndDateApi={setEndDateApi}
                    setPositionFilterApi={setPositionFilterApi}
                    setIsActiveFilterApi={setIsActiveFilterApi}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Career;
