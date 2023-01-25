import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";

const CreateBlogCategory = (props) => {

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Blog Category{" "}
                <span style={{ float: "right" }}>
                  <Link to="/BlogCategoryList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Blog Category Name{" "}
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
                            <input
                              id="blogCategoryName"
                              type="text"
                              placeholder="Enter Blog Category Name"
                              name="blogCategoryName"
                              value={props.blogCategoryName}
                              onChange={props.handleChange}
                              className={
                                props.errorBlogCategoryName.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorBlogCategoryName && (
                              <span className="error">
                                {props.errorBlogCategoryName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Meta Keywords{" "}
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
                            <input
                              type="text"
                              placeholder="Enter Meta Keywords"
                              name="metaKeywords"
                              value={props.metaKeywords}
                              onChange={props.handleChange}
                              className={
                                props.errorMetaKeywords.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorMetaKeywords && (
                              <span className="error">
                                {props.errorMetaKeywords}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Meta Description{" "}
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
                            <textarea
                              name="metaDescription"
                              placeholder="Enter Meta Description"
                              component="textarea"
                              type="text"
                              rows="5"
                              value={props.metaDescription}
                              onChange={props.handleChange}
                              className={
                                props.errorMetaDescription.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorMetaDescription && (
                              <span className="error">
                                {props.errorMetaDescription}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                          <div className="form-group file-area">
                            <label className="control_label">
                              Blog Category Image
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
                              <div className="col-sm-8">
                                <input
                                  type="file"
                                  accept="image/*"
                                  name="featureImagePath"
                                  required="required"
                                  className="form-control"
                                  onChange={props.blogCategoryLogoUrlHandler}
                                />

                                {props.featureImagePath === "" ? (
                                  <div className="file-dummy">
                                    <div className="default">
                                      Please Upload Blog Category Image
                                    </div>
                                  </div>
                                ) : (
                                  <div className="file-dummy">
                                    <div className="success">
                                      Blog Category Image Uploaded Successfully
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="col-md-4 col-sm-4">
                                {props.showFile ? (
                                  <img
                                    src={props.showFile}
                                    className="thumb-md product-image"
                                    style={{ width: "100px", height: "100px" }}
                                    alt="showFile"
                                  />
                                ) : (
                                  <img
                                    src={baseUrl.concat(props.featureImagePath)}
                                    className="thumb-md product-image"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      display: "none",
                                    }}
                                    alt="featureImage"
                                  />
                                )}
                              </div>
                            </div>
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
                                onClick={props.saveBlog}
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
  );
};

export default CreateBlogCategory;
