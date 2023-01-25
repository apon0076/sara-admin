import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import baseUrl from "../../../utils/baseUrl";

const editAds = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                Edit Ads & Banners
                <span style={{ float: "right" }}>
                  <Link to="/AdsList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="p-field p-fluid">
                        <div className="form-group">
                          <label className="control_label">
                            Content Name{" "}
                            <span
                              aria-hidden="true"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Content Name"
                            name="adsName"
                            value={props?.adsName}
                            onChange={props?.handleChange}
                            className={
                              props?.erroradsName.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          />
                          {props?.erroradsName && (
                            <span className="error">{props?.erroradsName}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-field p-fluid">
                      <div className="form-group">
                        <label className="control_label">
                          Content Details{" "}
                          <span
                            aria-hidden="true"
                            style={{ color: "red", fontWeight: "bold" }}
                          >
                            *
                          </span>
                        </label>
                        <textarea
                          name="adsDetails"
                          placeholder="Content Details"
                          rows="4"
                          value={props?.adsDetails}
                          onChange={props?.handleChange}
                          className={
                            props?.erroradsDetails.length !== 0
                              ? "errorClass form-control"
                              : "form-control" && "form-control"
                          }
                        />
                        {props?.erroradsDetails && (
                          <span className="error">
                            {props?.erroradsDetails}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* // Second Part START // */}
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control_label">
                            Content Type{" "}
                            <span
                              aria-hidden="true"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              *
                            </span>
                          </label>
                          <select
                            name="adsTypeId"
                            value={props?.adsTypeId}
                            onChange={props?.handleChange}
                            className={
                              props?.erroradsTypeId.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          >
                            <option value="">Select Type</option>
                            <option value="1">Summer</option>
                            <option value="2">Winter</option>
                            <option value="3">Offer</option>
                            <option value="4">Falgun</option>
                          </select>
                          {props?.erroradsTypeId && (
                            <span className="error">
                              {props?.erroradsTypeId}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control_label">
                            Image Dimension Type{" "}
                            <span
                              aria-hidden="true"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              *
                            </span>
                          </label>
                          <select
                            name="imageTypeId"
                            value={props?.imageTypeId}
                            onChange={props?.handleChange}
                            className={
                              props?.errorimageTypeId.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          >
                            <option value="">Select Type</option>
                            <option value="1">Slider</option>
                            <option value="2">Large Banner</option>
                            <option value="3">Medium Banner</option>
                            <option value="4">Small Banner</option>
                            <option value="5">Notice</option>
                            <option value="6">Pop Up</option>
                          </select>
                          {props.errorimageTypeId && (
                            <span className="error">
                              {props.errorimageTypeId}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control_label">
                            Position on Homepage{" "}
                            <span
                              aria-hidden="true"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              *
                            </span>
                          </label>
                          <select
                            name="adsLocationId"
                            value={props.adsLocationId}
                            onChange={props.handleChange}
                            className={
                              props.erroradsLocationId.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          >
                            <option value="">Select Location</option>
                            <option value="1">Home Page Slider</option>
                            <option value="2">Home Top Right Side</option>
                            <option value="3">Home Mid</option>
                            <option value="4">Home Bottom</option>
                          </select>
                          {props.erroradsLocationId && (
                            <span className="error">
                              {props.erroradsLocationId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* // Second Part END // */}

                    {/* //START ARRAY// */}
                    {props.adsImages.map((addImages, index) => {
                      return (
                        <React.Fragment key={index}>
                          <br />
                          <div className="row">
                            {/* 1 */}
                            <div className="col-md-2">
                              <label className="control_label">
                                Content Images SEO Name{" "}
                                <span
                                  aria-hidden="true"
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                // placeholder="Ads Name"
                                name="adsImageSeoName"
                                value={props.adsImages[index]?.adsImageSeoName}
                                onChange={(e) => props.keyPressed(index, e)}
                                className="form-control"
                              />
                            </div>

                            {/* 2 */}
                            <div className="col-md-3">
                              <label className="control_label">
                                Content Link{" "}
                                <span
                                  aria-hidden="true"
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                name="adsLink"
                                value={props?.adsImages[index]?.adsLink}
                                onChange={(e) => props.keyPressed(index, e)}
                                className="form-control"
                              />
                            </div>

                            {/* 3 */}
                            <div className="col-md-2">
                              <label className="control_label">
                                Change Content Image{" "}
                                <span
                                  aria-hidden="true"
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  *
                                </span>
                              </label>

                              <div className="form-group input-file-container file-area">
                                <input
                                  type="file"
                                  accept="image/*"
                                  name="adsImageUrl"
                                  id="my-file"
                                  required="required"
                                  onChange={(e) =>
                                    props.sliderImageUrlHandler(index, e)
                                  }
                                />
                                <div className="file-dummy">
                                  <div className="success">
                                    {/* Image Selected */}
                                  </div>
                                  <div className="default">
                                    Upload Slider Image
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-2">
                              {" "}
                              {props?.adsImages[index]?.adsImageUrl.length <
                              100 ? (
                                <img
                                  src={baseUrl.concat(
                                    props?.adsImages[index]?.adsImageUrl
                                  )}
                                  alt="img"
                                  height="80px"
                                  width="80px"
                                  style={{
                                    borderRadius: "10px",
                                    marginTop: "30px",
                                  }}
                                />
                              ) : (
                                <img
                                  src={props?.adsImages[index]?.adsImageUrl}
                                  alt="img"
                                  height="80px"
                                  width="80px"
                                  style={{
                                    borderRadius: "10px",
                                    marginTop: "30px",
                                  }}
                                />
                              )}
                            </div>
                            {/* 4 */}
                            <div className="col-md-1">
                              <div
                                className="checkbox checkbox-success"
                                style={{ paddingTop: "30px" }}
                              >
                                <input
                                  id="isActiv"
                                  type="checkbox"
                                  name="isActive"
                                  defaultChecked={
                                    props?.data.adsImages[index]?.isActive ===
                                    "Y"
                                      ? true
                                      : false
                                  }
                                  onChange={(event) =>
                                    props.handleParentCheck(event, index)
                                  }
                                />
                                <label htmlFor=""> &nbsp;Active </label>
                              </div>
                            </div>

                            {/* 5 */}
                            <div className="col-md-1">
                              <label className="control_label">
                                Display Order{" "}
                                <span
                                  aria-hidden="true"
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  *
                                </span>
                              </label>
                              <input
                                type="number"
                                name="displayOrder"
                                value={props?.adsImages[index]?.displayOrder}
                                onChange={(e) => props.displayOrderChange(index, e)}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                    <br />
                    <br />
                    {/* //END ARRAY// */}

                    <div className="form-actions">
                      <div className="row">
                        <div className="col-md-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-success"
                            style={{ cursor: "pointer" }}
                            onClick={props?.editAds}
                          >
                            <i className="fa fa-pencil"></i> Update
                          </button>
                          <Link to="/AdsList">
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

export default editAds;
