/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker } from "antd";
import moment from "moment";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

const EditCircular = ({
  singleData,
  setTitle,
  loading,
  handleJobCircularUpdate,
  setPosition,
  setNoOfVacancy,
  jobNature,
  setJobNature,
  job_nature,
  company_name,
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
  title,
  position,
  noOfVacancy,
  salary,
  location,
  requirements,
}) => {
  const [checkActive, setCheckActive] = useState(false);
  useEffect(() => {
    if (singleData?.isActive === "Y") {
      setCheckActive(true);
    }
  }, [singleData]);
  const handleIsActive = (val) => {
    if (val === true) {
      setIsActive("Y");
      setCheckActive(true);
    } else {
      setIsActive("N");
      setCheckActive(false);
    }
  };
  useEffect(() => {
    setTitle(singleData?.circulationTitle);
    setPosition(singleData?.position);
    setNoOfVacancy(singleData?.noOfVecency);
    setJobNature(singleData?.jobNature);
    setExperience(singleData?.experience);
    setCompany(singleData?.companyName);
    setSalary(singleData?.salary);
    setLocation(singleData?.location);
    setRequirements(singleData?.requirement);
    setAdditionalRequirements(singleData?.additionalReq);
    setBenefits(singleData?.benefit);
    setIsActive(singleData?.isActive);
  }, [singleData]);
  useEffect(() => {
    setDeadline(singleData?.deadLine);
  }, [singleData, deadLine === null]);
  return (
    <>
      <div className="addCircular__section">
        <div className="addCircular__fields">
          <div className="addCircular__field_section">
            <label>
              Job Title <sup>*</sup>
            </label>
            <br />
            <InputText
              defaultValue={singleData?.circulationTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
          </div>
          <div className="addCircular__field_section">
            <label>
              Position <sup>*</sup>
            </label>
            <br />
            <InputText
              defaultValue={singleData?.position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position"
            />
          </div>
          <div className="addCircular__field_section">
            <label>
              No of Vacancy <sup>*</sup>
            </label>
            <br />
            <input
              className="addCircular__inputType_number"
              type="number"
              defaultValue={singleData?.noOfVecency}
              onChange={(e) => setNoOfVacancy(e.target.value)}
              placeholder="No of Vacancy"
            />
          </div>
        </div>
        <div className="addCircular__fields">
          <div className="addCircular__field_section">
            <label>
              Job Nature <sup>*</sup>
            </label>
            <br />
            <Dropdown
              value={jobNature}
              options={job_nature}
              onChange={(e) => setJobNature(e.value)}
              optionLabel="type"
              placeholder={singleData?.jobNature}
            />
          </div>
          <div className="addCircular__field_section">
            <label>Experience</label>
            <br />
            <input
              className="addCircular__inputType_number"
              type="text"
              defaultValue={singleData?.experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Experience in Year"
            />
          </div>
          <div className="addCircular__field_section">
            <label>
              Company <sup>*</sup>
            </label>
            <br />
            <Dropdown
              value={company}
              options={company_name}
              onChange={(e) => setCompany(e.value)}
              optionLabel="name"
              placeholder={singleData?.companyName}
            />
          </div>
        </div>
        <div className="addCircular__fields">
          <div className="addCircular__field_section">
            <label>
              Salary <sup>*</sup>
            </label>
            <br />
            <input
              className="addCircular__inputType_number"
              type="text"
              defaultValue={singleData?.salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter Salary"
            />
          </div>
          <div className="addCircular__field_section">
            <label>
              Location <sup>*</sup>
            </label>
            <br />
            <InputText
              defaultValue={singleData?.location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="addCircular__field_section addCircular__fieldDeadline_section">
            <label>
              Deadline <sup>*</sup>
            </label>
            <br />
            <DatePicker
              showTime
              use12Hours={true}
              format="YYYY-MM-DD HH:mm"
              className="form-control"
              placeholder={moment(singleData?.deadLine).format(
                "Do MMMM YYYY, h:mm A"
              )}
              onChange={(date, dateString) => setDeadline(date, dateString, 1)}
            />
          </div>
        </div>
        <div className="addCircular__text_editor">
          <label>
            Requirements <sup>*</sup>
          </label>
          <br />
          <Editor
            style={{ height: "210px" }}
            value={singleData?.requirement}
            onTextChange={(e) => setRequirements(e.htmlValue)}
          />
        </div>
        <div className="addCircular__text_editorCol-2">
          <div className="addCircular__text_editor text_editor__col-2">
            <label>Additional Requirements</label>
            <br />
            <Editor
              style={{ height: "210px" }}
              value={singleData?.additionalReq}
              onTextChange={(e) => setAdditionalRequirements(e.htmlValue)}
            />
          </div>
          <div className="addCircular__text_editor text_editor__col-2">
            <label>Benefits</label>
            <br />
            <Editor
              style={{ height: "210px" }}
              value={singleData?.benefit}
              onTextChange={(e) => setBenefits(e.htmlValue)}
            />
          </div>
        </div>
        <div className="updateCircular__checkbox">
          <div className="field-checkbox">
            <Checkbox
              inputId="isActive"
              checked={checkActive}
              onChange={(e) => handleIsActive(e.checked)}
            />
            <label htmlFor="isActive">Is Active?</label>
          </div>
        </div>
        <div className="addCircular_button__section">
          <Button
            onClick={() => handleJobCircularUpdate()}
            label="Update"
            aria-label="Submit"
            iconPos="right"
            loading={loading}
            disabled={
              !title ||
              !position ||
              !noOfVacancy ||
              !jobNature ||
              !company ||
              !salary ||
              !location ||
              !deadLine ||
              !requirements
            }
          />
        </div>
      </div>
    </>
  );
};

export default EditCircular;
