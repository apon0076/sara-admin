import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import "../../containers/content/content.css";

export default function CreateContentPost(props) {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Content Post{" "}
                <span style={{ float: "right" }}>
                  <span className="content__options_btn">
                    <Link to='/content-post?type=post-list'>
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
                              Select Content Type{" "}
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
                                optionLabel="contentTypeName"
                                options={props.contentTypeList?.data?.filter(
                                  (dt) => dt?.isActive === "Y"
                                )}
                                filter
                                showClear
                                filterBy="contentTypeName"
                                placeholder="Select Content Type"
                                name="contentTypeName"
                                defaultValue
                                value={props.selectedContentTypeName}
                                onChange={(e) =>
                                  props.setSelectedContentTypeName(
                                    e.target.value
                                  )
                                }
                                className="form-control"
                              />
                            </div>
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
                              value={props.pageNameCreate}
                              onChange={(e) =>
                                props.setPageNameCreate(e.target.value)
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
                              value={props.pageLinkCreate}
                              onChange={(e) =>
                                props.setPageLinkCreate(e.target.value)
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
                              value={props.displayOrderCreate}
                              onChange={(e) =>
                                props.setDisplayOrderCreate(e.target.value)
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
                                checked={props.showInHomePageCreate}
                                onChange={(e) =>
                                  props.setShowInHomePageCreate(e.target.checked)
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
                                checked={props.contentActiveCreate}
                                onChange={(e) =>
                                  props.setContentActiveCreate(e.target.checked)
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
                                checked={props.contentDynamicCreate}
                                onChange={(e) =>
                                  props.setContentDynamicCreate(e.target.checked)
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

                      {props.contentDynamicCreate && (
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
                                  {props.showIconFile === "" ? (
                                    <div className="file-dummy">
                                      <div className="default">
                                        Please Upload Icon Image
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="file-dummy">
                                      <div className="default">
                                        Icon Image Uploaded Successfully
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="col-md-4 col-sm-4">
                                  {props?.showIconFile ? (
                                    <img
                                      src={props?.showIconFile}
                                      className="thumb-md product-image"
                                      style={{
                                        width: "85px",
                                        height: "85px",
                                      }}
                                      alt="showIconFile"
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
                                  {props?.showImageFile ? (
                                    <img
                                      src={props?.showImageFile}
                                      className="thumb-md product-image"
                                      style={{
                                        width: "85px",
                                        height: "85px",
                                      }}
                                      alt="showFile"
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

                      { props.contentDynamicCreate && (
                          <div className="row">
                            <div className="col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="control_label">
                                  Content Description{" "}
                                </label>
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={props?.pageDescriptionCreate}
                                  onChange={props?.handlePageDescription}
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
                                onClick={props.createContentPost}
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
}
