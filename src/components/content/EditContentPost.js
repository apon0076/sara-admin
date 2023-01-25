import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import "../../containers/content/content.css";
import baseUrl from "../../utils/baseUrl";

export default function EditContentPost(props) {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Update Content Post{" "}
                <span style={{ float: "right" }}>
                  <span className="content__options_btn">
                    <Link to="/content-post?type=post-list">
                      <Icon.List />
                    </Link>
                  </span>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Content Type{" "}
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
                            { (
                              <div className="dropdown-demo">
                                <Dropdown
                                  optionLabel="contentTypeName"
                                  options={props.contentTypeList?.data?.filter(
                                    (dt) => dt?.isActive === "Y"
                                  )}
                                  filter
                                  showClear
                                  filterBy="contentTypeName"
                                  placeholder={props.selectedContentTypeName?.contentTypeName}
                                  name="contentTypeName"
                                  value={props.selectedContentTypeName}
                                  onChange={(e) =>
                                    props.setSelectedContentTypeName(
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Content Page Name{" "}
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
                            <InputText
                              id="pageName"
                              type="text"
                              placeholder="Enter Content Page Name"
                              name="pageName"
                              value={props.pageNameUpdate}
                              onChange={(e) =>
                                props.setPageNameUpdate(e.target.value)
                              }
                              className={"form-control"}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Content Page Link{" "}
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
                            <InputText
                              id="pageLink"
                              type="text"
                              placeholder="Enter Content Page Link"
                              name="pageLink"
                              value={props.pageLinkUpdate}
                              onChange={(e) =>
                                props.setPageLinkUpdate(e.target.value)
                              }
                              className={"form-control"}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Display Order{" "}
                            </label>
                            <InputText
                              id="displayOrder"
                              type="number"
                              placeholder="Enter Display Order Number"
                              name="displayOrder"
                              value={props.displayOrderUpdate}
                              onChange={(e) =>
                                props.setDisplayOrderUpdate(e.target.value)
                              }
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Show In Home Page{" "}
                            </label>
                            <div className="checkbox checkbox-success">
                              <input
                                id="showInHomePage"
                                type="checkbox"
                                name="showInHomePage"
                                checked={props.showInHomePageUpdate}
                                onChange={(e) =>
                                  props.setShowInHomePageUpdate(
                                    e.target.checked
                                  )
                                }
                              />
                              <label htmlFor="showInHomePage">
                                {" "}
                                &nbsp;Yes{" "}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">Active </label>
                            <div className="checkbox checkbox-success">
                              <input
                                id="contentActive"
                                type="checkbox"
                                name="contentActive"
                                checked={props.contentActiveUpdate}
                                onChange={(e) =>
                                  props.setContentActiveUpdate(e.target.checked)
                                }
                              />
                              <label htmlFor="contentActive"> &nbsp;Yes </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Dynamic Content
                            </label>
                            <div className="checkbox checkbox-success">
                              <input
                                id="contentDynamic"
                                type="checkbox"
                                name="contentDynamic"
                                checked={props.contentDynamicUpdate}
                                onChange={(e) =>
                                  props.setContentDynamicUpdate(
                                    e.target.checked
                                  )
                                }
                              />
                              <label htmlFor="contentDynamic">
                                {" "}
                                &nbsp;Yes{" "}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {props.contentDynamicUpdate && (
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group file-area">
                              <label className="control_label">
                                Icon image
                              </label>
                              <div className="row">
                                <div className="col-md-8 col-sm-12">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    name="featureImagePath"
                                    required="required"
                                    className="form-control"
                                    onChange={props.iconImageHandler}
                                  />

                                  {props.iconPath === "" ? (
                                    <div className="file-dummy">
                                      <div className="default">
                                        Please Upload Icon Image
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="file-dummy">
                                      <div className="success">
                                        Icon Image Uploaded Successfully
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="col-md-4 col-sm-4">
                                  {props?.showIconFile !== "" ? (
                                    <img
                                      src={props?.showIconFile}
                                      className="thumb-md product-image"
                                      style={{
                                        width: "85px",
                                        height: "85px",
                                      }}
                                      alt="showIconFile"
                                    />
                                  ) : props.iconPath !== null ? (
                                    <img
                                      src={baseUrl.concat(props.iconPath)}
                                      className="thumb-md product-image"
                                      style={{
                                        width: "85px",
                                        height: "85px",
                                      }}
                                      alt="iconPath"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-sm-12">
                            <div className="form-group file-area">
                              <label className="control_label">
                                Content Featured Image
                              </label>
                              <div className="row">
                                <div className="col-md-8 col-sm-12">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    name="featureImagePath"
                                    required="required"
                                    className="form-control"
                                    onChange={props.featureImageHandler}
                                  />

                                  {props.featureImagePath === "" ? (
                                    <div className="file-dummy">
                                      <div className="default">
                                        Please Upload Content Featured Image
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="file-dummy">
                                      <div className="success">
                                        Content Featured Image Uploaded
                                        Successfully
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="col-md-4 col-sm-4">
                                  {props?.showImageFile !== "" ? (
                                    <img
                                      src={props?.showImageFile}
                                      className="thumb-md product-image"
                                      style={{
                                        width: "85px",
                                        height: "85px",
                                      }}
                                      alt="showFile"
                                    />
                                  ) : props.featureImagePath !== null ? (
                                    <img
                                      src={baseUrl.concat(
                                        props.featureImagePath
                                      )}
                                      className="thumb-md product-image"
                                      style={{
                                        width: "85px",
                                        height: "85px",
                                      }}
                                      alt="showFileLoaded"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {props.contentDynamicUpdate && (
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                              <label className="control_label">
                                Content Description{" "}
                              </label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={props.pageDescriptionUpdate}
                                onChange={props.handlePageDescription}
                                className={"form-control"}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="form-footer ">
                        <div className="form-group row">
                          <div className="text-center">
                            <div className="btn-group text-center">
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.updateContentPost}
                              >
                                Update
                              </button>
                              <button
                                onClick={() =>
                                  props.setContentPostPageOptions(2)
                                }
                                className="btn btn-danger"
                                style={{ cursor: "pointer" }}
                              >
                                Cancel
                              </button>
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
}
