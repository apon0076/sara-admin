import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import ImageUpload from "../components/ImageUpload";

const SizeChartModelMeasurement = ({
  setModelImageTitle,
  modelImageTitle,
  setModelImageDescription,
  modelImageDescription,
  modelImagePath,
  setModelImagePath,
}) => {
  return (
    <div>
      <h3>Model Measurement:</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-15">
            <div className="mb-4 font-600">Model Image Title:</div>
            <InputText
              value={modelImageTitle}
              className="form-control form-control"
              placeholder="Enter Model Image Title"
              onChange={(e) => setModelImageTitle(e.target.value)}
            />
          </div>
          <div className="mb-15">
            <div className="mb-4 font-600">Model Image Description:</div>
            <InputTextarea
              placeholder="Enter Model Image Description"
              value={modelImageDescription}
              onChange={(e) => setModelImageDescription(e.target.value)}
              rows={5}
              cols={90}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-15">
            <div className="mb-4 font-600">Model Image Upload:</div>
            <ImageUpload
              imagePath={modelImagePath}
              setImagePath={setModelImagePath}
              height="206"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModelMeasurement;
