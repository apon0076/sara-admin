import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import ImageUpload from "../../components/components/ImageUpload";

const SizeChartMeasurementGuide = ({
  setGuideImageTitle,
  guideImageTitle,
  setGuideImageDescription,
  guideImageDescription,
  guideImagePath,
  setGuideImagePath,
}) => {
  return (
    <div>
      <h3>Measurement Guide:</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-15">
            <div className="mb-4 font-600">Guide Title:</div>
            <InputText
              value={guideImageTitle}
              className="form-control form-control"
              placeholder="Enter Guide Title"
              onChange={(e) => setGuideImageTitle(e.target.value)}
            />
          </div>
          <div className="mb-15">
            <div className="mb-4 font-600">Guide Description:</div>
            <InputTextarea
              placeholder="Enter Guide Description"
              value={guideImageDescription}
              onChange={(e) => setGuideImageDescription(e.target.value)}
              rows={5}
              cols={90}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-15">
            <div className="mb-4 font-600">Guide Upload:</div>
            <ImageUpload
              imagePath={guideImagePath}
              setImagePath={setGuideImagePath}
              height="206"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartMeasurementGuide;
