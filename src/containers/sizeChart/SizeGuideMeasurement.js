import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SizeChartModelMeasurement from "../../components/sizeChart/SizeChartModelMeasurement";
import SizeChartTemplateSizeGuide from "../../components/sizeChart/SizeChartTemplateSizeGuide";
import Timeline from "../../components/timeline/Timeline";
import { Loader } from "../../containers";
import { getActiveBreadcrumbsProductCategoryRecord } from "../../store/actions/activeBreadcrumbsCategoryAction";
import { getProductVariantByCategoryIdRecord } from "../../store/actions/productVariantAction";
import {
  AddOrEditSizeChartRecord,
  ADD_OR_EDIT_SIZE_CHART_RESET,
  getAllSizeChartAttributeRecord,
} from "../../store/actions/sizeChartAction";
import SizeChartMeasurementGuide from "./SizeChartMeasurementGuide";
import SizeChartTable from "./SizeChartTable";

const SizeGuideMeasurement = () => {
  const [status, setStatus] = useState(1);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState(null);
  const [variantName, setVariantName] = useState(null);
  const [variantOption, setVariantOption] = useState(null);
  const [attributesValue, setAttributesValue] = useState(null);
  const [sizeChartTemplate, setSizeChartTemplate] = useState("Configurable");
  const [isInternational, setIsInternational] = useState(false);
  const [modelImageTitle, setModelImageTitle] = useState("");
  const [modelImageDescription, setModelImageDescription] = useState("");
  const [modelImagePath, setModelImagePath] = useState("");
  const [guideImageTitle, setGuideImageTitle] = useState("");
  const [guideImageDescription, setGuideImageDescription] = useState("");
  const [guideImagePath, setGuideImagePath] = useState("");
  const [isInch, setIsInch] = useState(false);
  const [isIntlInch, setIsIntlInch] = useState(false);
  const [regularCmArr, setRegularCmArr] = useState([]);
  const [regularInArr, setRegularInArr] = useState([]);
  const [intlCmArr, setIntlCmArr] = useState([]);
  const [intlInArr, setIntlInArr] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getActiveBreadcrumbsProductCategoryRecord());
  }, [dispatch]);
  useEffect(() => {
    category &&
      dispatch(getProductVariantByCategoryIdRecord(category.categoryId));
  }, [dispatch, category]);
  useEffect(() => {
    dispatch(getAllSizeChartAttributeRecord());
  }, [dispatch]);
  const all_cat = useSelector(
    (state) =>
      state.activeBreadcrumbsCategoryReducer.activeBreadcrumbsProductCategories
  );
  const variants = useSelector(
    (state) => state.productVariantReducer.variantsWithCategoryId
  );
  const attributes = useSelector(
    (state) =>
      state.sizeChartReducers.get_all_size_chart_attribute?.success?.data
  );
  const { add_or_edit_size_chart, loading, error } = useSelector(
    (state) => state.sizeChartReducers
  );
  useEffect(() => {
    if (
      add_or_edit_size_chart?.success?.data &&
      add_or_edit_size_chart?.success?.data?.succeed === true &&
      loading === false
    ) {
      toast.success("Size Chart Created Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        dispatch({ type: ADD_OR_EDIT_SIZE_CHART_RESET });
        history.push("/size-guide-measurement-list");
      }, 1500);
    } else if (
      add_or_edit_size_chart?.success?.data &&
      add_or_edit_size_chart?.success?.data?.succeed === false &&
      loading === false
    ) {
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ type: ADD_OR_EDIT_SIZE_CHART_RESET });
    } else if (loading === false && error) {
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ ADD_OR_EDIT_SIZE_CHART_RESET });
    }
  }, [add_or_edit_size_chart, dispatch, error, history, loading]);
  const handleCatChange = (e) => {
    setCategory(e.value);
  };
  const handleVariantNameChange = (e) => {
    setVariantName(e.value);
  };
  const handleVariantChange = (e) => {
    setVariantOption(e);
  };
  const handleAttributeChange = (e) => {
    setAttributesValue(e);
  };
  // Make array of country for international size
  const countryArr = [
    {
      label: "IN",
      value: 0,
    },
    {
      label: "CN",
      value: 0,
    },
    {
      label: "EU",
      value: 0,
    },
    {
      label: "UK",
      value: 0,
    },
    {
      label: "US",
      value: 0,
    },
  ];
  const handleArrTemplate = () => {
    //Make array for regular template in Centimeter
    const variation_wise_size_reg_cm = [];
    for (let i = 0; i < variantOption.length; i++) {
      for (let j = 0; j < attributesValue.length; j++) {
        variation_wise_size_reg_cm.push({
          measurementId: 0,
          sizeChartId: 0,
          variantOptionId: variantOption[i].value,
          variantOptionName: variantOption[i].label,
          sizeAttributeId: attributesValue[j].value,
          sizeAttributeName: attributesValue[j].label,
          sizeAttributeValue: "",
          sizeGuideTemplateId: 0,
          unitId: 0,
          unitName: "",
          isActive: "Y",
        });
        setRegularCmArr(variation_wise_size_reg_cm);
      }
    }
    //Make array for International template in Cm
    if (isInternational) {
      const variation_wise_size_intl_cm = [];
      for (let i = 0; i < variantOption.length; i++) {
        for (let j = 0; j < countryArr.length; j++) {
          variation_wise_size_intl_cm.push({
            measurementId: 0,
            sizeChartId: 0,
            variantOptionId: variantOption[i].value,
            variantOptionName: variantOption[i].label,
            sizeAttributeId: countryArr[j].value,
            sizeAttributeName: countryArr[j].label,
            sizeAttributeValue: "",
            sizeGuideTemplateId: 0,
            unitId: 0,
            unitName: "",
            isActive: "Y",
          });
          setIntlCmArr(variation_wise_size_intl_cm);
        }
      }
    }
  };
  //Make array for regular template in Inch
  const handleIsInch = (e) => {
    setIsInch(e.checked);
    const variation_wise_size_reg_in = [];
    for (let i = 0; i < variantOption.length; i++) {
      for (let j = 0; j < attributesValue.length; j++) {
        variation_wise_size_reg_in.push({
          measurementId: 0,
          sizeChartId: 0,
          variantOptionId: variantOption[i].value,
          variantOptionName: variantOption[i].label,
          sizeAttributeId: attributesValue[j].value,
          sizeAttributeName: attributesValue[j].label,
          sizeAttributeValue: "",
          sizeGuideTemplateId: 0,
          unitId: 0,
          unitName: "",
          isActive: "Y",
        });
        setRegularInArr(variation_wise_size_reg_in);
      }
    }
  };

  //Make array for International template in Inch
  const handleIsIntlInch = (e) => {
    setIsIntlInch(e.checked);
    const variation_wise_size_intl_in = [];
    for (let i = 0; i < variantOption.length; i++) {
      for (let j = 0; j < countryArr.length; j++) {
        variation_wise_size_intl_in.push({
          measurementId: 0,
          sizeChartId: 0,
          variantOptionId: variantOption[i].value,
          variantOptionName: variantOption[i].label,
          sizeAttributeId: countryArr[j].value,
          sizeAttributeName: countryArr[j].label,
          sizeAttributeValue: "",
          sizeGuideTemplateId: 0,
          unitId: 0,
          unitName: "",
          isActive: "Y",
        });
        setIntlInArr(variation_wise_size_intl_in);
      }
    }
  };

  //Update arrays with given value of size chart
  const sizeChartValueChange = (
    value,
    unit,
    variant_name,
    variant_id,
    attribute_name,
    attribute_id,
    unitName,
    sizeGuideTemplateId
  ) => {
    //Update Regular and CM Array
    if (sizeGuideTemplateId === 1 && unit === 3) {
      const tempCmArr = regularCmArr.map((obj) => {
        if (
          obj.variantOptionId === variant_id &&
          obj.sizeAttributeId === attribute_id
        ) {
          return {
            ...obj,
            sizeAttributeValue: value,
            unitId: unit,
            unitName: unitName,
            sizeGuideTemplateId: sizeGuideTemplateId,
          };
        }
        return obj;
      });
      setRegularCmArr(tempCmArr);
    }
    //Update Regular and Inch Array
    else if (sizeGuideTemplateId === 1 && unit === 4) {
      const tempInArr = regularInArr.map((obj) => {
        if (
          obj.variantOptionId === variant_id &&
          obj.sizeAttributeId === attribute_id
        ) {
          return {
            ...obj,
            sizeAttributeValue: value,
            unitId: unit,
            unitName: unitName,
            sizeGuideTemplateId: sizeGuideTemplateId,
          };
        }
        return obj;
      });
      setRegularInArr(tempInArr);
    }
    //Update International and CM Array
    else if (sizeGuideTemplateId === 2 && unit === 3) {
      const tempIntlCmArr = intlCmArr.map((obj) => {
        if (
          obj.variantOptionId === variant_id &&
          obj.sizeAttributeName === attribute_name
        ) {
          return {
            ...obj,
            sizeAttributeValue: value,
            unitId: unit,
            unitName: unitName,
            sizeGuideTemplateId: sizeGuideTemplateId,
          };
        }
        return obj;
      });
      setIntlCmArr(tempIntlCmArr);
    }
    //Update International and Inch Array
    else if (sizeGuideTemplateId === 2 && unit === 4) {
      const tempIntlInArr = intlInArr.map((obj) => {
        if (
          obj.variantOptionId === variant_id &&
          obj.sizeAttributeName === attribute_name
        ) {
          return {
            ...obj,
            sizeAttributeValue: value,
            unitId: unit,
            unitName: unitName,
            sizeGuideTemplateId: sizeGuideTemplateId,
          };
        }
        return obj;
      });
      setIntlInArr(tempIntlInArr);
    }
  };

  const handleSizeGuideSubmit = () => {
    //Merge required arrays
    var mergedArr = regularCmArr
      .concat(isInch ? regularInArr : [])
      .concat(isInternational ? intlCmArr : [])
      .concat(isIntlInch ? intlInArr : []);

    var check_validation_status = mergedArr.find(
      (item) => item.sizeAttributeValue.length === 0
    );

    //Make Final Data for Post
    const data_to_post = {
      sizeChartId: 0,
      chartName: name,
      chartCode: code,
      sizeTemplateId: sizeChartTemplate === "Normal" ? 1 : 2,
      variantId: variantName?.productVariantId,
      variantName: variantName?.variantName,
      isIntSize: isInternational ? "Y" : "N",
      modelImageTitle: modelImageTitle,
      modelImagePath: modelImagePath,
      modelImageDesc: modelImageDescription,
      sizeMesurementTitle: guideImageTitle,
      sizeMesurementDesc: guideImageDescription,
      mesurementImagePath: guideImagePath,
      categoryId: category?.categoryId,
      isActive: "Y",
      ip: "",
      sizeChartMeasurements: mergedArr,
    };
    //Post to the array
    check_validation_status === undefined
      ? dispatch(AddOrEditSizeChartRecord(data_to_post))
      : toast.error("Fill all required values !", {
          position: toast.POSITION.TOP_RIGHT,
        });
  };

  return (
    <div id="wrapper">
      <ToastContainer autoClose={1500} />
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-success">
                <div className="panel-heading">
                  Size Guide Measurement Template
                  <span style={{ float: "right" }}>
                    <Link to="/size-guide-measurement-list">
                      <Icon.List className="text-light" />
                    </Link>
                  </span>
                </div>
                <div className="row p-10">
                  <div className="col-md-12">
                    <Timeline status={status} />
                  </div>
                  <div className="col-md-12 px-30 pb-30">
                    {status === 1 ? (
                      <SizeChartTemplateSizeGuide
                        setName={setName}
                        name={name}
                        variants={variants}
                        setVariantName={setVariantName}
                        variantName={variantName}
                        all_cat={all_cat}
                        attributes={attributes}
                        handleCatChange={handleCatChange}
                        handleVariantNameChange={handleVariantNameChange}
                        handleVariantChange={handleVariantChange}
                        handleAttributeChange={handleAttributeChange}
                        sizeChartTemplate={sizeChartTemplate}
                        setSizeChartTemplate={setSizeChartTemplate}
                        setIsInternational={setIsInternational}
                        setCode={setCode}
                        code={code}
                        variantOption={variantOption}
                        isInternational={isInternational}
                        category={category}
                        attributesValue={attributesValue}
                      />
                    ) : status === 2 ? (
                      <SizeChartModelMeasurement
                        setModelImageTitle={setModelImageTitle}
                        modelImageTitle={modelImageTitle}
                        setModelImageDescription={setModelImageDescription}
                        modelImageDescription={modelImageDescription}
                        modelImagePath={modelImagePath}
                        setModelImagePath={setModelImagePath}
                      />
                    ) : status === 3 ? (
                      <SizeChartMeasurementGuide
                        setGuideImageTitle={setGuideImageTitle}
                        guideImageTitle={guideImageTitle}
                        setGuideImageDescription={setGuideImageDescription}
                        guideImageDescription={guideImageDescription}
                        guideImagePath={guideImagePath}
                        setGuideImagePath={setGuideImagePath}
                      />
                    ) : (
                      <>
                        <h3>Size Chart Breakdown:</h3>
                        <div className="row">
                          <div
                            className={isInch ? "col-md-6" : "col-md-12"}
                            style={{ transition: "all 0.10s" }}
                          >
                            <div className="flex items-center justify-between">
                              <h6>Centimeter:</h6>
                              <div className="field-checkbox flex">
                                <Checkbox
                                  inputId="isInch"
                                  checked={isInch}
                                  onChange={(e) => handleIsInch(e)}
                                />
                                <label className="ml-5" htmlFor="isInch">
                                  Inch
                                </label>
                              </div>
                            </div>
                            <SizeChartTable
                              variantOption={variantOption}
                              attributesValue={attributesValue}
                              unitId={3}
                              unitName="CM"
                              sizeChartValueChange={sizeChartValueChange}
                              sizeGuideTemplateId={1}
                            />
                          </div>
                          {isInch ? (
                            <div className={isInch ? "col-md-6" : null}>
                              <div>
                                <h6>Inch:</h6>
                              </div>
                              <SizeChartTable
                                variantOption={variantOption}
                                attributesValue={attributesValue}
                                unitId={4}
                                unitName="Inch"
                                sizeChartValueChange={sizeChartValueChange}
                                sizeGuideTemplateId={1}
                              />
                            </div>
                          ) : null}
                        </div>

                        {isInternational ? (
                          <div className="row mt-30">
                            <div className="col-md-12 mb-5">
                              <h5>International Size:</h5>
                            </div>
                            <div
                              className={isIntlInch ? "col-md-6" : "col-md-12"}
                              style={{ transition: "all 0.10s" }}
                            >
                              <div className="flex items-center justify-between">
                                <h6>Centimeter:</h6>
                                <div className="field-checkbox flex">
                                  <Checkbox
                                    inputId="isIntlInch"
                                    checked={isIntlInch}
                                    onChange={(e) => handleIsIntlInch(e)}
                                  />
                                  <label className="ml-5" htmlFor="isIntlInch">
                                    Inch
                                  </label>
                                </div>
                              </div>
                              <SizeChartTable
                                variantOption={variantOption}
                                attributesValue={countryArr}
                                unitId={3}
                                unitName="CM"
                                sizeChartValueChange={sizeChartValueChange}
                                sizeGuideTemplateId={2}
                              />
                            </div>
                            {isIntlInch ? (
                              <div className={isIntlInch ? "col-md-6" : null}>
                                <h6>Inch:</h6>
                                <SizeChartTable
                                  variantOption={variantOption}
                                  attributesValue={countryArr}
                                  unitId={4}
                                  unitName="Inch"
                                  sizeChartValueChange={sizeChartValueChange}
                                  sizeGuideTemplateId={2}
                                />
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                  <div className="col-md-12 flex items-center justify-center gap-15">
                    {status === 1 ? (
                      <Link to="/Home">
                        <Button
                          label="Cancel"
                          className=" p-button-danger w-129"
                        />
                      </Link>
                    ) : null}
                    {status >= 2 ? (
                      <Button
                        onClick={() => setStatus(status - 1)}
                        label="Previous"
                        className=" p-button-warning w-129"
                      />
                    ) : null}

                    {status > 0 && status < 3 ? (
                      <Button
                        label="Next"
                        className="w-129"
                        style={{background:'#1f5da0'}}
                        onClick={() => {
                          setStatus(status + 1);
                          if (status === 1) {
                            handleArrTemplate();
                          }
                        }}
                        disabled={
                          !category ||
                          !name ||
                          !code ||
                          !variantName ||
                          !variantOption ||
                          !attributesValue
                        }
                      />
                    ) : null}
                    {status === 3 ? (
                      <Button
                        label="Generate Chart"
                        className="p-button-info w-129"
                        onClick={() => setStatus(status + 1)}
                      />
                    ) : null}
                    {status === 4 ? (
                      loading ? (
                        <div style={{ textAlign: "center" }}>
                          <Loader />
                        </div>
                      ) : (
                        <Button
                          label="Submit"
                          className="p-button-success w-129"
                          onClick={() => handleSizeGuideSubmit()}
                        />
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideMeasurement;
