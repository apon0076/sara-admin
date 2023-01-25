import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "../../components/components/ImageUpload";
import { getActiveBreadcrumbsProductCategoryRecord } from "../../store/actions/activeBreadcrumbsCategoryAction";
import {
  AddOrEditSizeChartRecord,
  ADD_OR_EDIT_SIZE_CHART_RESET,
  getSingleSizeChartTemplateRecord,
} from "../../store/actions/sizeChartAction";
import SizeChartTable from "./SizeChartTable";

const SizeChartTemplateViewOrUpdate = () => {
  const [singleTemplate, setSingleTemplate] = useState(null);
  const [name, setName] = useState(singleTemplate?.chartName);
  const [code, setCode] = useState("");
  const [modelImageTitle, setModelImageTitle] = useState("");
  const [modelImageDescription, setModelImageDescription] = useState("");
  const [modelImagePath, setModelImagePath] = useState("");
  const [guideImageTitle, setGuideImageTitle] = useState("");
  const [guideImageDescription, setGuideImageDescription] = useState("");
  const [guideImagePath, setGuideImagePath] = useState("");
  const [isActiveChecked, setIsActiveChecked] = useState(false);
  const [variantOption, setVariantOption] = useState([]);
  const [attributesValue, setAttributesValue] = useState([]);
  const [regularCmArr, setRegularCmArr] = useState([]);
  const [regularInchArr, setRegularInchArr] = useState([]);
  const [intlCmArr, setIntlCmArr] = useState([]);
  const [intlInArr, setIntlInArr] = useState([]);
  const [isRegularInch, setIsRegularInc] = useState(false);
  const [isIntlInch, setIsIntlInc] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  //API Call
  useEffect(() => {
    params && dispatch(getSingleSizeChartTemplateRecord(params.id));
  }, [dispatch, params]);
  // Get Data Through Redux
  const { size_chart_single_data, loading } = useSelector(
    (state) => state.sizeChartReducers
  );
  // Set Data to State
  useEffect(() => {
    size_chart_single_data?.success &&
      size_chart_single_data.success.data.map((data) =>
        setSingleTemplate(data)
      );
  }, [size_chart_single_data]);
  // API Call for Category Breadcrumb
  useEffect(() => {
    dispatch(getActiveBreadcrumbsProductCategoryRecord());
  }, [dispatch]);
  //Get Data of Category Breadcrumb
  const all_cat = useSelector(
    (state) =>
      state.activeBreadcrumbsCategoryReducer.activeBreadcrumbsProductCategories
  );
  // Filter Required Category Breadcrumb
  var category_breadcrumb =
    all_cat &&
    all_cat.find((data) => data.categoryId === singleTemplate?.categoryId)
      ?.breadcrumbCategory;
  //Filter Variant Options
  const variant_option_arr = singleTemplate?.sizeChartMeasurements.map(
    (data) => data.variantOptionName
  );
  //Remove Duplicate Variant Options
  const unique_variant_option_arr = [...new Set(variant_option_arr)];
  //Filter Attributes
  const attribute_arr = singleTemplate?.sizeChartMeasurements.map(
    (data) => data.sizeAttributeName
  );
  //Remove Duplicate Attributes and also Remove Country Code
  const unique_attribute_arr = [...new Set(attribute_arr)];
  const unique_attribute_arr_refactor =
    singleTemplate?.isIntSize === "N"
      ? unique_attribute_arr
      : unique_attribute_arr.splice(0, unique_attribute_arr.length - 5);
  //Make Variant Option Array of Object for Table
  useEffect(() => {
    const tempVariantArr = [];
    for (let i = 0; i < unique_variant_option_arr.length; i++) {
      tempVariantArr.push({
        label: unique_variant_option_arr[i],
        value: singleTemplate?.sizeChartMeasurements.find(
          (data) => data.variantOptionName === unique_variant_option_arr[i]
        ).variantOptionId,
      });
    }
    setVariantOption(tempVariantArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleTemplate]);
  //Make Attribute Array of Object for Table
  useEffect(() => {
    const tempAttributeArr = [];
    for (let i = 0; i < unique_attribute_arr_refactor.length; i++) {
      tempAttributeArr.push({
        label: unique_attribute_arr_refactor[i],
        value: singleTemplate?.sizeChartMeasurements.find(
          (data) => data.sizeAttributeName === unique_attribute_arr_refactor[i]
        ).sizeAttributeId,
      });
    }
    setAttributesValue(tempAttributeArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleTemplate]);
  //Set Initial Value to the states
  useEffect(() => {
    setName(singleTemplate?.chartName);
    setCode(singleTemplate?.chartCode);
    singleTemplate?.isActive === "Y"
      ? setIsActiveChecked(true)
      : setIsActiveChecked(false);
    setModelImageTitle(singleTemplate?.modelImageTitle);
    setModelImageDescription(singleTemplate?.modelImageDesc);
    setGuideImageTitle(singleTemplate?.sizeMesurementTitle);
    setGuideImageDescription(singleTemplate?.sizeMesurementDesc);
  }, [singleTemplate]);
  //Check Is Regular Inch
  useEffect(() => {
    var check_is_reg_inch = singleTemplate?.sizeChartMeasurements.find(
      (data) => data.unitId === 4 && data.sizeGuideTemplateId === 1
    );
    check_is_reg_inch !== undefined
      ? setIsRegularInc(true)
      : setIsRegularInc(false);
  }, [singleTemplate, loading, dispatch]);
  //Check Is International Inch
  useEffect(() => {
    if (singleTemplate?.isIntSize === "Y") {
      var check_is_intl_inch = singleTemplate?.sizeChartMeasurements.find(
        (data) => data.unitId === 4 && data.sizeGuideTemplateId === 2
      );
      check_is_intl_inch !== undefined
        ? setIsIntlInc(true)
        : setIsIntlInc(false);
    }
  }, [singleTemplate, loading, dispatch, isIntlInch]);

  // Edit success or fail message
  const {
    add_or_edit_size_chart,
    loading: editLoading,
    error,
  } = useSelector((state) => state.sizeChartReducers);
  useEffect(() => {
    if (
      add_or_edit_size_chart?.success?.data &&
      add_or_edit_size_chart?.success?.data?.succeed === true &&
      loading === false
    ) {
      toast.success("Size Chart Updated Successfully !", {
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
  }, [add_or_edit_size_chart, dispatch, error, history, editLoading, loading]);
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
  //Create Sample Array for Regular Size in CM
  useEffect(() => {
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
          sizeAttributeValue:
            singleTemplate?.sizeChartMeasurements &&
            singleTemplate?.sizeChartMeasurements.find(
              (data) =>
                data.sizeAttributeId === attributesValue[j].value &&
                data.variantOptionId === variantOption[i].value &&
                data.unitId === 3 &&
                data.sizeGuideTemplateId === 1
            )?.sizeAttributeValue,
          sizeGuideTemplateId: 1,
          unitId: 3,
          unitName: "CM",
          isActive: "Y",
        });
        setRegularCmArr(variation_wise_size_reg_cm);
      }
    }
  }, [variantOption, attributesValue, singleTemplate]);

  //Create Sample Array for Regular Size in Inch
  useEffect(() => {
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
          sizeAttributeValue:
            singleTemplate?.sizeChartMeasurements &&
            singleTemplate?.sizeChartMeasurements.find(
              (data) =>
                data.sizeAttributeId === attributesValue[j].value &&
                data.variantOptionId === variantOption[i].value &&
                data.unitId === 4 &&
                data.sizeGuideTemplateId === 1
            )?.sizeAttributeValue,
          sizeGuideTemplateId: 1,
          unitId: 4,
          unitName: "Inch",
          isActive: "Y",
        });
        setRegularInchArr(variation_wise_size_reg_in);
      }
    }
  }, [variantOption, attributesValue, singleTemplate]);

  //Create Sample Array for International Size in CM
  useEffect(() => {
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
          sizeAttributeValue:
            singleTemplate?.sizeChartMeasurements &&
            singleTemplate?.sizeChartMeasurements.find(
              (data) =>
                data.sizeAttributeName === countryArr[j].label &&
                data.variantOptionId === variantOption[i].value &&
                data.unitId === 3 &&
                data.sizeGuideTemplateId === 2
            )?.sizeAttributeValue,
          sizeGuideTemplateId: 2,
          unitId: 3,
          unitName: "CM",
          isActive: "Y",
        });
        setIntlCmArr(variation_wise_size_intl_cm);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantOption, singleTemplate]);

  //Create Sample Array for International Size in Inch
  useEffect(() => {
    const variation_wise_size_intl_inch = [];
    for (let i = 0; i < variantOption.length; i++) {
      for (let j = 0; j < countryArr.length; j++) {
        variation_wise_size_intl_inch.push({
          measurementId: 0,
          sizeChartId: 0,
          variantOptionId: variantOption[i].value,
          variantOptionName: variantOption[i].label,
          sizeAttributeId: countryArr[j].value,
          sizeAttributeName: countryArr[j].label,
          sizeAttributeValue:
            singleTemplate?.sizeChartMeasurements &&
            singleTemplate?.sizeChartMeasurements.find(
              (data) =>
                data.sizeAttributeName === countryArr[j].label &&
                data.variantOptionId === variantOption[i].value &&
                data.unitId === 4 &&
                data.sizeGuideTemplateId === 2
            )?.sizeAttributeValue,
          sizeGuideTemplateId: 2,
          unitId: 4,
          unitName: "Inch",
          isActive: "Y",
        });
        setIntlInArr(variation_wise_size_intl_inch);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantOption, singleTemplate]);

  //Data Update On Change Function
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
      const tempInArr = regularInchArr.map((obj) => {
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
      setRegularInchArr(tempInArr);
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

  // Final Data Update Function
  const handleSizeGuideUpdate = () => {
    // Merge required arrays
    var mergedArr = regularCmArr
      .concat(isRegularInch ? regularInchArr : [])
      .concat(isIntlInch ? intlCmArr : [])
      .concat(isIntlInch ? intlInArr : []);

    var check_validation_status = mergedArr.find(
      (item) => item.sizeAttributeValue.length === 0
    );

    //Make Final Data for Update
    const data_to_update = {
      sizeChartId: params?.id,
      chartName: name,
      chartCode: code,
      sizeTemplateId: singleTemplate?.sizeTemplateId,
      variantId: singleTemplate?.variantId,
      variantName: singleTemplate?.variantName,
      isIntSize: singleTemplate?.isIntSize,
      modelImageTitle: modelImageTitle,
      modelImagePath:
        modelImagePath.length > 0
          ? modelImagePath
          : singleTemplate?.modelImagePath,
      modelImageDesc: modelImageDescription,
      sizeMesurementTitle: guideImageTitle,
      sizeMesurementDesc: guideImageDescription,
      mesurementImagePath:
        guideImagePath.length > 0
          ? guideImagePath
          : singleTemplate?.mesurementImagePath,
      categoryId: singleTemplate?.categoryId,
      isActive: isActiveChecked ? "Y" : "N",
      ip: "",
      sizeChartMeasurements: mergedArr,
    };

    //Post to the array
    check_validation_status === undefined
     ? dispatch(AddOrEditSizeChartRecord(data_to_update))
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
                <div className="panel-heading flex items-center justify-between">
                  <span>List of Size Guide Measurement Template</span>
                  <span
                    style={{ border: "1px solid #fff" }}
                    className="rounded-100 p-5 pointer"
                  >
                    <Link to="/size-guide-measurement-list">
                      <div className="flex items-center">
                        <FaAngleLeft />
                      </div>
                    </Link>
                  </span>
                </div>
                <div className="row p-10">
                  <div className="col-md-4">
                    <div className="mb-15">
                      <div className="mb-4 font-600">Size Chart Name:</div>
                      <InputText
                        defaultValue={singleTemplate?.chartName}
                        className="form-control form-control"
                        placeholder="Size Chart Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Size Chart Code:</div>
                      <InputText
                        defaultValue={singleTemplate?.chartCode}
                        className="form-control form-control"
                        placeholder="Size Chart Name"
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Category:</div>
                      <InputText
                        defaultValue={category_breadcrumb}
                        className="form-control form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Variant Name:</div>
                      <InputText
                        defaultValue={singleTemplate?.variantName}
                        className="form-control form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Variant Value:</div>
                      <InputText
                        defaultValue={unique_variant_option_arr?.toString()}
                        className="form-control form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Attribute:</div>
                      <InputText
                        defaultValue={unique_attribute_arr_refactor?.toString()}
                        className="form-control form-control"
                        disabled
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
                            checked={singleTemplate?.sizeChartTemplate === 1}
                            disabled
                          />
                          <label
                            className="mb-0 ml-10 pointer"
                            htmlFor="template1"
                          >
                            Normal
                          </label>
                        </div>
                        <div className="flex items-center">
                          <RadioButton
                            inputId="template2"
                            name="template"
                            value="Configurable"
                            checked={singleTemplate?.sizeTemplateId === 2}
                          />
                          <label
                            className="mb-0 ml-10 pointer"
                            htmlFor="template2"
                          >
                            Configurable
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Is International:</div>
                      <div
                        className="flex items-center justify-between border-1 p-7 rounded-6"
                        style={{ borderColor: "#ced4da" }}
                      >
                        <div className="field-checkbox">
                          <Checkbox
                            inputId="isInternational"
                            checked={singleTemplate?.isIntSize === "Y"}
                          />
                          <label
                            className="mb-0 ml-10 pointer"
                            htmlFor="isInternational"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Is Active:</div>
                      <div
                        className="flex items-center justify-between border-1 p-7 rounded-6"
                        style={{ borderColor: "#ced4da" }}
                      >
                        <div className="field-checkbox">
                          <Checkbox
                            inputId="isActive"
                            checked={isActiveChecked}
                            onChange={(e) => setIsActiveChecked(e.checked)}
                          />
                          <label
                            className="mb-0 ml-10 pointer"
                            htmlFor="isActive"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-15">
                      <div className="mb-4 font-600">Model Image Title:</div>
                      <InputText
                        defaultValue={singleTemplate?.modelImageTitle}
                        className="form-control form-control"
                        onChange={(e) => setModelImageTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">
                        Model Image Description:
                      </div>
                      <InputTextarea
                        style={{ width: "100%" }}
                        defaultValue={singleTemplate?.modelImageDesc}
                        onChange={(e) =>
                          setModelImageDescription(e.target.value)
                        }
                        rows={8}
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Model Image Upload:</div>
                      <ImageUpload
                        imagePath={modelImagePath}
                        setImagePath={setModelImagePath}
                        height="350"
                        defaultImageUrl={singleTemplate?.modelImagePath}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-15">
                      <div className="mb-4 font-600">Guide Title:</div>
                      <InputText
                        defaultValue={singleTemplate?.sizeMesurementTitle}
                        className="form-control form-control"
                        onChange={(e) => setGuideImageTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Guide Description:</div>
                      <InputTextarea
                        style={{ width: "100%" }}
                        defaultValue={singleTemplate?.sizeMesurementDesc}
                        onChange={(e) =>
                          setGuideImageDescription(e.target.value)
                        }
                        rows={8}
                      />
                    </div>
                    <div className="mb-15">
                      <div className="mb-4 font-600">Guide Image Upload:</div>
                      <ImageUpload
                        imagePath={guideImagePath}
                        setImagePath={setGuideImagePath}
                        height="350"
                        defaultImageUrl={singleTemplate?.mesurementImagePath}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-10 pb-10">
                  <div className="flex items-center justify-between gap-15">
                    <div className={isRegularInch ? `w-half` : `w-full`}>
                      <div style={{ transition: "all 0.10s" }}>
                        <div className="mb-4 font-600">Regular Centimeter:</div>
                        <SizeChartTable
                          variantOption={variantOption}
                          attributesValue={attributesValue}
                          unitId={3}
                          unitName="CM"
                          sizeChartValueChange={sizeChartValueChange}
                          sizeGuideTemplateId={1}
                          values={
                            size_chart_single_data?.success?.data[0]
                              ?.sizeChartMeasurements
                          }
                          loading={loading}
                        />
                      </div>
                    </div>
                    {isRegularInch ? (
                      <div className="w-half">
                        <div style={{ transition: "all 0.10s" }}>
                          <div className="mb-4 font-600">Regular Inch:</div>
                          <SizeChartTable
                            variantOption={variantOption}
                            attributesValue={attributesValue}
                            unitId={4}
                            unitName="Inch"
                            sizeChartValueChange={sizeChartValueChange}
                            sizeGuideTemplateId={1}
                            values={
                              size_chart_single_data?.success?.data[0]
                                ?.sizeChartMeasurements
                            }
                            loading={loading}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {size_chart_single_data?.success?.data[0]?.isIntSize !== 'N' && 
                  <div className="flex items-center justify-between gap-15 mt-20">
                    <div className={isIntlInch ? `w-half` : `w-full`}>
                      <div style={{ transition: "all 0.10s" }}>
                        <div className="mb-4 font-600">
                          International Centimeter:
                        </div>
                        <SizeChartTable
                          variantOption={variantOption}
                          attributesValue={countryArr}
                          unitId={3}
                          unitName="CM"
                          sizeChartValueChange={sizeChartValueChange}
                          sizeGuideTemplateId={2}
                          values={
                            size_chart_single_data?.success?.data[0]
                              ?.sizeChartMeasurements
                          }
                          loading={loading}
                        />
                      </div>
                    </div>
                    {isIntlInch ? (
                      <div className="w-half">
                        <div style={{ transition: "all 0.10s" }}>
                          <div className="mb-4 font-600">
                            International Inch:
                          </div>
                          <SizeChartTable
                            variantOption={variantOption}
                            attributesValue={countryArr}
                            unitId={4}
                            unitName="Inch"
                            sizeChartValueChange={sizeChartValueChange}
                            sizeGuideTemplateId={2}
                            values={
                              size_chart_single_data?.success?.data[0]
                                ?.sizeChartMeasurements
                            }
                            loading={loading}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>}
                  <div className="flex items-center justify-center mt-20">
                    <Button
                      label="Update"
                      className="w-150 mt-30"
                      onClick={() => handleSizeGuideUpdate()}
                    />
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
export default SizeChartTemplateViewOrUpdate;