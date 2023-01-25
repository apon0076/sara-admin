import React from "react";
//import Home from "../../home/Home";
//import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

const EditSeller = (props) => {
  return (
    <div id="wrapper">
      {/* <Home /> */}
      <div className="content-wrapper">
        <div className="container-fluid">
          {/* <Breadcrumb /> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">{props.name}</div>
                  <hr />
                  <form>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Id</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          placeholder="ID"
                          name="sellerId"
                          value={props.sellerId}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="NAME"
                          name="sellerName"
                          value={props.sellerName}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="input-3"
                        className="col-sm-2 col-form-label"
                      >
                        Bussiness Type
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-control"
                          name="bussinessTypeId"
                          onChange={props.handleChange}
                        >
                          {/*  <option>Select Bussiness Type</option> */}
                          {props.bussinessTypes.map((bussinessType) => (
                            <option key={bussinessType.bussinessTypeId}>
                              {bussinessType.bussinessTypeName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Bin NO</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="BIN NO"
                          name="binNo"
                          value={props.binNo}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">City</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CITY"
                          name="city"
                          value={props.city}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">State</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="STATE"
                          name="state"
                          value={props.state}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Zip Code
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ZIP CODE"
                          name="zipCode"
                          value={props.zipCode}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">URL</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="URL"
                          name="url"
                          value={props.url}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Contact No
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CONTACT NO"
                          name="contactNo"
                          value={props.contactNo}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="EMAIL"
                          name="email"
                          value={props.email}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label for="input-9" className="col-sm-2 col-form-label">
                        Address
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          rows="4"
                          id="input-9"
                          placeholder="ADDRESS"
                          name="address"
                          value={props.address}
                          onChange={props.handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-sm-10">
                        <div className="icheck-material-primary">
                          <input
                            id="user-checkbox"
                            type="checkbox"
                            name="activeYn"
                            value={props.activeYn}
                            defaultChecked={true}
                            onChange={props.handleChange}
                          />
                          <label for="user-checkbox">Active</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                          <div className="btn-group">
                            <button
                              className="btn btn-success"
                              onClick={props.updateSeller}
                              style={{ cursor: "pointer" }}
                            >
                              Update
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={props.clearData}
                              style={{ cursor: "pointer" }}
                            >
                              Clear
                            </button>
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
  );
};
export default EditSeller;
