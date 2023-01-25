import React from "react";
import ReactHtmlParser from "react-html-parser";
import LoadingCard from "../shared/LoadingCard";
import "./../../containers/career/Career.css";

const CareerDetails = ({ singleData, loading }) => {
  return (
    <>
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <div className="career_detail_job_detail_container">
          <div className="career_detail_job_title">
            {singleData?.circulationTitle}
          </div>

          {singleData === undefined ? (
            <div className="career_detail_job_details_not_found">
              Sorry, No Job Circular Found !!!
            </div>
          ) : (
            <div className="career_detail_job_details">
              <p className="career_detail_job_req">Job Requirements:</p>

              <>{ReactHtmlParser(singleData?.requirement)}</>

              <p className="career_detail_job_add_req">
                Additional Requirements:
              </p>

              <>{ReactHtmlParser(singleData?.additionalReq)}</>

              <div className={`career_detail_job_options`}>
                <div className={`career_detail_job_options_header`}>
                  <p className={`career_detail_job_options_header_value`}>
                    Job Type
                  </p>
                  <p className={`career_detail_job_options_header_value`}>:</p>
                </div>
                <div className={`career_detail_job_options_value`}>
                  {singleData?.jobNature}
                </div>
              </div>

              <div className={`career_detail_job_options_other`}>
                <div className={`career_detail_job_options_header`}>
                  <p className={`career_detail_job_options_header_value`}>
                    Position
                  </p>
                  <p className={`career_detail_job_options_header_value`}>:</p>
                </div>
                <div className={`career_detail_job_options_value`}>
                  {singleData?.position}
                </div>
              </div>

              <div className={`career_detail_job_options_other`}>
                <div className={`career_detail_job_options_header`}>
                  <p className={`career_detail_job_options_header_value`}>
                    Vacancy
                  </p>
                  <p className={`career_detail_job_options_header_value`}>:</p>
                </div>
                <div className={`career_detail_job_options_value`}>
                  {singleData?.noOfVecency !== 0
                    ? singleData?.noOfVecency
                    : "Not Specified"}
                </div>
              </div>

              <div className={`career_detail_job_options_other`}>
                <div className={`career_detail_job_options_header`}>
                  <p className={`career_detail_job_options_header_value`}>
                    Location
                  </p>
                  <p className={`career_detail_job_options_header_value`}>:</p>
                </div>
                <div className={`career_detail_job_options_value`}>
                  {singleData?.location}
                </div>
              </div>

              <div className={`career_detail_job_options_other`}>
                <div className={`career_detail_job_options_header`}>
                  <p className={`career_detail_job_options_header_value`}>
                    Salary
                  </p>
                  <p className={`career_detail_job_options_header_value`}>:</p>
                </div>
                <div className={`career_detail_job_options_value`}>
                  {singleData?.salary}
                </div>
              </div>

              <div className={`career_detail_job_options_other`}>
                <div className={`career_detail_job_options_header`}>
                  <p className={`career_detail_job_options_header_value`}>
                    Experience
                  </p>
                  <p className={`career_detail_job_options_header_value`}>:</p>
                </div>
                <div className={`career_detail_job_options_value`}>
                  {singleData?.experience}
                </div>
              </div>
              <p className="career_detail_job_req career_detail_job_req-mt">
                Other Benefits:
              </p>
              <>{ReactHtmlParser(singleData?.benefit)}</>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CareerDetails;
