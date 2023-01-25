import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const SizeChartTemplateSizeGuide = ({
  setName,
  name,
  variants,
  variantName,
  all_cat,
  attributes,
  handleCatChange,
  handleVariantNameChange,
  handleVariantChange,
  handleAttributeChange,
  sizeChartTemplate,
  setSizeChartTemplate,
  setIsInternational,
  setCode,
  code,
  variantOption,
  isInternational,
  category,
  attributesValue,
}) => {
  const animatedComponents = makeAnimated();
  return (
    <div>
      <h3>Size Guide:</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-15">
            <div className="mb-4 font-600">
              Size Chart Name{" "}
              <span
                aria-hidden="true"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </div>
            <InputText
              value={name}
              className="form-control form-control"
              placeholder="Size Chart Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-15">
            <div className="mb-4 font-600">
              Variant Name{" "}
              <span
                aria-hidden="true"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </div>
            <Dropdown
              optionLabel="variantName"
              options={variants}
              filter
              showClear
              filterBy="variantName"
              placeholder="Select Variant"
              className="form-control form-control"
              value={variantName}
              onChange={handleVariantNameChange}
              disabled={variants.length === 0}
            />
          </div>

          <div className="mb-15">
            <div className="mb-4 font-600">Size Chart Type:</div>
            <div
              className="flex items-center justify-between border-1 p-7 rounded-6"
              style={{ borderColor: "#ced4da" }}
            >
              <div className="flex items-center">
                <RadioButton
                  inputId="template1"
                  name="template"
                  value="Normal"
                  onChange={(e) => setSizeChartTemplate(e.value)}
                  checked={sizeChartTemplate === "Normal"}
                  disabled
                />
                <label className="mb-0 ml-10 pointer" htmlFor="template1">
                  Normal
                </label>
              </div>
              <div className="flex items-center">
                <RadioButton
                  inputId="template2"
                  name="template"
                  value="Configurable"
                  onChange={(e) => setSizeChartTemplate(e.value)}
                  checked={sizeChartTemplate === "Configurable"}
                />
                <label className="mb-0 ml-10 pointer" htmlFor="template2">
                  Configurable
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-15">
            <div className="mb-4 font-600">
              Size Chart Code{" "}
              <span
                aria-hidden="true"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </div>
            <InputText
              value={code}
              className="form-control form-control"
              placeholder="Size Chart Code"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="mb-15">
            <div className="mb-4 font-600">
              Variant Value{" "}
              <span
                aria-hidden="true"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </div>
            <Select
              placeholder={`Select ${
                variantName?.variantName ? variantName?.variantName : "..."
              }`}
              options={variantName?.productVariantOptions?.map((data) => ({
                label: data.variantOptionText,
                value: data.variantOptionId,
              }))}
              components={animatedComponents}
              isMulti
              isSearchable
              onChange={handleVariantChange}
              value={variantOption}
            />
          </div>
          <div className="mb-15">
            <div className="mb-4 font-600">Is International?</div>
            <div
              className="flex items-center justify-between border-1 p-7 rounded-6"
              style={{ borderColor: "#ced4da" }}
            >
              <div className="field-checkbox">
                <Checkbox
                  inputId="isInternational"
                  checked={isInternational}
                  onChange={(e) => setIsInternational(e.checked)}
                />
                <label className="mb-0 ml-10 pointer" htmlFor="isInternational">
                  Yes
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-15">
            <div className="mb-4 font-600">
              Category Name{" "}
              <span
                aria-hidden="true"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </div>
            <Dropdown
              optionLabel="breadcrumbCategory"
              options={all_cat}
              filter
              showClear
              filterBy="breadcrumbCategory"
              placeholder="Select Product Category"
              className="form-control form-control"
              value={category}
              onChange={handleCatChange}
            />
          </div>
          <div className="mb-15">
            <div className="mb-4 font-600">
              Size Attribute{" "}
              <span
                aria-hidden="true"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </div>
            <Select
              placeholder="Select Attributes"
              options={attributes
                ?.filter((dt) => dt.isActive === "Y")
                ?.map((data) => ({
                  label: data.attributeName,
                  value: data.attributeId,
                }))}
              components={animatedComponents}
              isMulti
              isSearchable
              onChange={handleAttributeChange}
              value={attributesValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartTemplateSizeGuide;
