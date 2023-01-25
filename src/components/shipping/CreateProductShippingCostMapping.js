import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import { Dropdown } from "primereact/dropdown"

const CreateProductShippingCostMapping = (props) => {
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                {" "}
                                Create Product Shipping Cost Mapping{" "}
                                <span style={{ float: "right" }}>
                                    <Link to="/ShippingOptionsList">
                                        <Icon.List className="text-light" />
                                    </Link>
                                </span>
                            </div>
                            <div className="panel-wrapper collapse in" aria-expanded="true">
                                <div className="panel-body">
                                    <form className="form-horizontal">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control_label">
                                                            Product Name{" "}
                                                            <span
                                                                aria-hidden="true"
                                                                style={{
                                                                    color: "red",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="dropdown-demo">
                                                            <Dropdown
                                                                optionLabel="productName"
                                                                options={props.allVerifiedProducts}
                                                                filter
                                                                showClear
                                                                filterBy="productName"
                                                                placeholder="Select Product*"
                                                                name="productName"
                                                                value={props.productName}
                                                                onChange={props.handleChange}
                                                                className={
                                                                    props.errorProductId.length !== 0
                                                                        ? "errorClass form-control"
                                                                        : "form-control" && "form-control"
                                                                }
                                                            />
                                                            {props.errorProductId && (
                                                                <span className="error">
                                                                    {props.errorProductId}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {props.errorName && (
                                                            <span className="error">
                                                                {props.errorName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control_label">
                                                            Shipping Type{" "}
                                                            <span
                                                                aria-hidden="true"
                                                                style={{
                                                                    color: "red",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="dropdown-demo">
                                                            <Dropdown
                                                                optionLabel="typeName"
                                                                options={props.shippingType}
                                                                filter
                                                                showClear
                                                                filterBy="typeName"
                                                                placeholder="Select Shipping Type*"
                                                                name="typeName"
                                                                value={props.typeName}
                                                                onChange={props.handleChange}
                                                                className={
                                                                    props.errorShippingTypeId.length !== 0
                                                                        ? "errorClass form-control"
                                                                        : "form-control" && "form-control"
                                                                }
                                                            />
                                                            {props.errorShippingTypeId && (
                                                                <span className="error">
                                                                    {props.errorShippingTypeId}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {props.errorName && (
                                                            <span className="error">
                                                                {props.errorName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control_label">
                                                            Shipping Option{" "}
                                                            <span
                                                                aria-hidden="true"
                                                                style={{
                                                                    color: "red",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="dropdown-demo">
                                                            <Dropdown
                                                                optionLabel="optionName"
                                                                options={props.shippingOptions}
                                                                filter
                                                                showClear
                                                                filterBy="optionName"
                                                                placeholder="Select Shipping Option*"
                                                                name="optionName"
                                                                value={props.optionName}
                                                                onChange={props.handleChange}
                                                                className={
                                                                    props.errorShippingOptionsId.length !== 0
                                                                        ? "errorClass form-control"
                                                                        : "form-control" && "form-control"
                                                                }
                                                            />
                                                            {props.errorShippingOptionsId && (
                                                                <span className="error">
                                                                    {props.errorShippingOptionsId}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {props.errorName && (
                                                            <span className="error">
                                                                {props.errorName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control_label">
                                                            Courier{" "}
                                                            <span
                                                                aria-hidden="true"
                                                                style={{
                                                                    color: "red",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="dropdown-demo">
                                                            <Dropdown
                                                                optionLabel="courierName"
                                                                options={props.courierProfile}
                                                                filter
                                                                showClear
                                                                filterBy="courierName"
                                                                placeholder="Select Courier*"
                                                                name="courierName"
                                                                value={props.courierName}
                                                                onChange={props.handleChange}
                                                                className={
                                                                    props.errorCourierId.length !== 0
                                                                        ? "errorClass form-control"
                                                                        : "form-control" && "form-control"
                                                                }
                                                            />
                                                            {props.errorCourierId && (
                                                                <span className="error">
                                                                    {props.errorCourierId}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {props.errorName && (
                                                            <span className="error">
                                                                {props.errorName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control_label">Active </label>
                                                        <div className="checkbox checkbox-success">
                                                            <input
                                                                id="isActive"
                                                                type="checkbox"
                                                                name="isActive"
                                                                checked={props.isActive}
                                                                onChange={props.handleParentCheck}
                                                            />
                                                            <label htmlFor="isActive"> &nbsp;Yes </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-footer ">
                                                <div className="form-group row">
                                                    <div className="text-center">
                                                        <div className="btn-group text-center">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success"
                                                                onClick={props.saveProductShippingCostMapping}
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProductShippingCostMapping