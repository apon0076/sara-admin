import { DatePicker } from "antd";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import React from "react";
import "./../../containers/career/Career.css";

const AddCircular = ({
  title,
  setTitle,
  position,
  setPosition,
  noOfVacancy,
  setNoOfVacancy,
  jobNature,
  setJobNature,
  experience,
  setExperience,
  company,
  setCompany,
  salary,
  setSalary,
  location,
  setLocation,
  deadLine,
  setDeadline,
  requirements,
  setRequirements,
  additionalRequirements,
  setAdditionalRequirements,
  benefits,
  setBenefits,
  handleJobCircularSubmit,
  loading,
  job_nature,
  company_name,
}) => {
  return (
    <div className="addCircular__section">
      <div className="addCircular__fields">
        <div className="addCircular__field_section">
          <label>
            Job Title <sup>*</sup>
          </label>
          <br />
          <InputText
            value={title}
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
            value={position}
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
            value={noOfVacancy}
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
            placeholder="Select Job Nature"
          />
        </div>
        <div className="addCircular__field_section">
          <label>Experience</label>
          <br />
          <input
            className="addCircular__inputType_number"
            type="text"
            value={experience}
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
            placeholder="Select a Company"
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
            value={salary}
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
            value={location}
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
            placeholder="Select Deadline"
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
          style={{ height: "250px" }}
          value={requirements}
          onTextChange={(e) => setRequirements(e.htmlValue)}
        />
      </div>
      <div className="addCircular__text_editorCol-2">
        <div className="addCircular__text_editor text_editor__col-2">
          <label>Additional Requirements</label>
          <br />
          <Editor
            style={{ height: "250px" }}
            value={additionalRequirements}
            onTextChange={(e) => setAdditionalRequirements(e.htmlValue)}
          />
        </div>
        <div className="addCircular__text_editor text_editor__col-2">
          <label>Benefits</label>
          <br />
          <Editor
            style={{ height: "250px" }}
            value={benefits}
            onTextChange={(e) => setBenefits(e.htmlValue)}
          />
        </div>
      </div>
      <div className="addCircular_button__section">
        <Button
          onClick={() => handleJobCircularSubmit()}
          label="Submit"
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
  );
};

export default AddCircular;
