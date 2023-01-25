/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { FiDownload } from "react-icons/fi";
import baseUrl from "../../utils/baseUrl";

const ApplicantDetails = ({ singleApplicantDetails }) => {
  return (
    <>
      <div className="applicants_details__section">
        <div className="applicants__details">
          <span className="applicants__details_title">Name</span>
          <span className="applicants__details_separator">:</span>
          <span className="applicants__details_data">
            {singleApplicantDetails.candidateName}
          </span>
        </div>
        <div className="applicants__details">
          <span className="applicants__details_title">Email</span>
          <span className="applicants__details_separator">:</span>
          <a
            href={`mailto:${singleApplicantDetails.email}`}
            className="applicants__details_data"
          >
            {singleApplicantDetails.email}
          </a>
        </div>
      </div>

      <div className="applicants_details__section">
        <div className="applicants__details">
          <span className="applicants__details_title">Mobile</span>
          <span className="applicants__details_separator">:</span>
          <a
            href={`tel:${singleApplicantDetails.mobileNo}`}
            className="applicants__details_data"
          >
            {singleApplicantDetails.mobileNo}
          </a>
        </div>
        <div className="applicants__details">
          <span className="applicants__details_title">Expected Salary</span>
          <span className="applicants__details_separator">:</span>
          <span className="applicants__details_data">
            {singleApplicantDetails.expectedSalary}
          </span>
        </div>
      </div>

      <div className="applicants_details__section">
        <div className="applicants__details">
          <span className="applicants__details_title">Portfolio</span>
          <span className="applicants__details_separator">:</span>
          <a
            href={singleApplicantDetails.portfolioUrl}
            target="_blank"
            className="applicants__details_data"
          >
            {singleApplicantDetails.portfolioUrl}
          </a>
        </div>
        <div className="applicants__details">
          <span className="applicants__details_title">Position</span>
          <span className="applicants__details_separator">:</span>
          <span className="applicants__details_data">
            {singleApplicantDetails.position}
          </span>
        </div>
      </div>
      <div className="attachments__section">
        {singleApplicantDetails.circulationApplyAttachments.map(
          (data, index) => (
            <a
              href={`${baseUrl}${data.filePath}`}
              download
              target="_blank"
              className="attachments_item__section"
              key={index}
            >
              <span>{data.fileName}</span>
              <span className="attachments_item__icon">
                <FiDownload size="2.3rem" />
              </span>
            </a>
          )
        )}
      </div>
    </>
  );
};

export default ApplicantDetails;
