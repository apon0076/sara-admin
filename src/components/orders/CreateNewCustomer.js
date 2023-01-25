import React from 'react'

export default function CreateNewCustomer(props) {
    const { createCustomer } = props;
    return (
        <div
            className="row"
            style={{ display: createCustomer.customerAvailable === null ? 'none' : createCustomer.customerAvailable ? 'none' : 'block' }}
        >
            <div className="col-md-12 col-sm-12">
                <form className="form-horizontal">
                    <div className="form-body">
                        <div className="form-group">
                            <label className="control_label">
                                Create New Customer{" "}
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
                            <div className="row">
                                <div className="col-md-10 col-sm-10">
                                    <input
                                        type="text"
                                        id="cusName"
                                        className={
                                            createCustomer.errorCusName.length !== 0
                                                ? "errorClass form-control"
                                                : "form-control" && "form-control"
                                        }
                                        placeholder="Customer Name"
                                        name="cusName"
                                        value={createCustomer.cusName}
                                        onChange={createCustomer.handleChange}
                                    />
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={createCustomer.createUser}
                                    >
                                        <i className="fa fa-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
