/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductVariantByCategoryIdRecord } from "../../../store/actions/productVariantAction";
import ListItems from "./ListItems";

const CreateProductVariantOption = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.value?.categoryId !== undefined) {
      dispatch(getProductVariantByCategoryIdRecord(props.value?.categoryId));
    }
  }, [dispatch, props.value?.categoryId]);
  const catWiseVariant = useSelector(
    (state) => state.productVariantReducer.variantsWithCategoryId
  );
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Product Variant Option{" "}
                <span style={{ float: "right" }}>
                  <Link to="/ProductVariantOptionList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal" onSubmit={props?.addItem}>
                    <div className="form-body">
                      <table
                        className="table table-bordered m-t-30"
                        id="tableImg"
                      >
                        <thead className="text-center">
                          <tr className="row">
                            <th className="col-md-2">
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
                            </th>
                            <th className="col-md-2">
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
                            </th>
                            <th className="col-md-2">
                              Variant Option{" "}
                              <span
                                aria-hidden="true"
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                *
                              </span>
                            </th>
                            <th className="col-md-2">
                              Variant Option Value{" "}
                              <span
                                aria-hidden="true"
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                *
                              </span>
                            </th>
                            <th className="col-md-2">Remark (Optional)</th>
                            <th className="col-md-1">
                              Display Order{" "}
                              <span
                                aria-hidden="true"
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                *
                              </span>
                            </th>
                            <th className="col-md-1">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="row">
                            <td className="col-md-2">
                              <div
                                className="form-group"
                                style={{ padding: "5px" }}
                              >
                                <div className="dropdown-demo">
                                  <Dropdown
                                    optionLabel="breadcrumbCategory"
                                    options={
                                      props?.activeBreadcrumbsProductCategories
                                    }
                                    filter
                                    showClear
                                    filterBy="breadcrumbCategory"
                                    placeholder="Select Category"
                                    name="pCategoryId"
                                    value={props?.variantOption?.pCategoryId}
                                    onChange={props?.handleChange}
                                    className={
                                      props?.errorCategoryName.length !== 0
                                        ? "errorClass form-control"
                                        : "form-control" && "form-control"
                                    }
                                  />
                                  {props?.errorCategoryName && (
                                    <span className="error">
                                      {props?.errorCategoryName}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="col-md-2">
                              <div
                                className="form-group"
                                style={{ padding: "5px" }}
                              >
                                <div className="dropdown-demo">
                                  <Dropdown
                                    optionLabel="variantName"
                                    options={
                                      catWiseVariant.length < 1
                                        ? props?.variants.filter(
                                            (data, index) =>
                                              data.variantName === "Color"
                                          )
                                        : props?.variants
                                    }
                                    filter
                                    showClear
                                    filterBy="variantName"
                                    placeholder="Select Product Variant"
                                    name="pVariantId"
                                    value={props?.variantOption?.pVariantId}
                                    onChange={props?.handleChange}
                                    className={
                                      props?.errorVariantName.length !== 0
                                        ? "errorClass form-control"
                                        : "form-control" && "form-control"
                                    }
                                  />
                                  {props?.errorVariantName && (
                                    <span className="error">
                                      {props?.errorVariantName}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="col-md-2">
                              <div
                                className="form-group"
                                style={{ padding: "5px" }}
                              >
                                <Dropdown
                                  optionLabel="variantOptionName"
                                  options={props?.variantOptionValues}
                                  filter
                                  showClear
                                  filterBy="variantOptionName"
                                  placeholder="Select Variant Option"
                                  name="variantOptionName"
                                  value={
                                    props?.variantOption?.variantOptionName
                                  }
                                  onChange={props?.handleChange}
                                  className="form-control"
                                  disabled={
                                    props?.variantOptionValues.length === 0
                                      ? true
                                      : false
                                  }
                                />

                                {props?.errorVariantOptionText && (
                                  <span className="error">
                                    {props?.errorVariantOptionText}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="col-md-2">
                              <div
                                className="form-group"
                                style={{ padding: "5px" }}
                              >
                                <InputText
                                  id="optionValue"
                                  type="text"
                                  placeholder="Enter Variant Option Value"
                                  name="varientOptionValue"
                                  value={
                                    props?.variantOption?.variantOptionValue
                                  }
                                  onChange={props?.handleChange}
                                  disabled={
                                    props?.variantOption?.variantOptionName ===
                                    undefined
                                      ? true
                                      : false
                                  }
                                />
                                {props?.errorVariantOptionValue && (
                                  <span className="error">
                                    {props?.errorVariantOptionValue}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="col-md-2">
                              <div
                                className="form-group"
                                style={{ padding: "5px" }}
                              >
                                <InputText
                                  type="text"
                                  placeholder="Enter Variant Remarks"
                                  name="variantRemark"
                                  value={props?.variantOption?.variantRemark}
                                  onChange={props?.handleChange}
                                  className="form-control"
                                />
                              </div>
                            </td>
                            <td className="col-md-2">
                              <div
                                className="form-group"
                                style={{ padding: "5px" }}
                              >
                                <InputText
                                  type="number"
                                  placeholder="Enter Display Order"
                                  name="displayOrder"
                                  value={props?.variantOption?.displayOrder}
                                  onChange={props?.handleChange}
                                  className="form-control"
                                />
                              </div>
                            </td>
                            <td className="col-md-2 text-center">
                              <button
                                id="addVariant"
                                type="submit"
                                className="btn btn-primary"
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="form-footer fixed-footer">
                      <div className="form-group row">
                        <div className="text-center">
                          <div className="btn-group text-center m-t-20">
                            <button
                              className="btn btn-success"
                              onClick={props?.saveProductVariantOption}
                              style={{ cursor: "pointer" }}
                            >
                              Create
                            </button>
                            <Link to="/Home">
                              <button
                                className="btn btn-danger"
                                style={{ cursor: "pointer" }}
                              >
                                Cancel
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <p>{props?.items?.text}</p>
                  <ListItems
                    items={props?.items}
                    itemsInArray={props?.itemsInArray}
                    activeBreadcrumbsProductCategories={
                      props?.activeBreadcrumbsProductCategories
                    }
                    variants={props?.variants}
                    updateItem={props?.updateItem}
                    deleteItem={props?.deleteItem}
                    isCommonCheck={props?.isCommonCheck}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductVariantOption;
