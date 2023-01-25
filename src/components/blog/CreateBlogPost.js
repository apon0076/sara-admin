import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import { Dropdown } from "primereact/dropdown"
import { Editor } from "react-draft-wysiwyg"
import baseUrl from '../../utils/baseUrl'

const CreateBlogPost = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Blog Post{" "}
                <span style={{ float: "right" }}>
                  <Link to="/BlogPostList">
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
                              Select Blog Category{" "}
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
                                optionLabel="blogCategoryName"
                                options={props.blogCategoryDetails}
                                filter
                                showClear
                                filterBy="blogCategoryName"
                                placeholder="Select Category"
                                name="blogCategoryName"
                                value={props.blogCategoryName}
                                onChange={props.handleChange}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Blog Post Title{" "}
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
                              id="postTitle"
                              type="text"
                              placeholder="Enter Blog Post Title"
                              name="postTitle"
                              value={props.postTitle}
                              onChange={props.handleChange}
                              className={
                                props.errorPostTitle.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorPostTitle && (
                              <span className="error">
                                {props.errorPostTitle}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Post Description{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div
                              className={
                                props.errorPostDescription.length !== 0
                                  ? "errorClass"
                                  : ""
                              }
                            >
                              <Editor
                                editorState={props.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="form-control"
                                onEditorStateChange={
                                  props.postDescriptionChange
                                }
                                toolbar={{
                                  inline: { inDropdown: true },
                                  list: { inDropdown: true },
                                  textAlign: { inDropdown: true },
                                  link: { inDropdown: true },
                                  history: { inDropdown: true },
                                  image: {
                                    uploadCallback: props._uploadImageCallBack,
                                  },
                                  inputAccept:
                                    "application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel",
                                }}
                              />
                            </div>
                            {props.errorPostDescription && (
                              <span className="error">
                                {props.errorPostDescription}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
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
                              id="metaKeywords"
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
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              External Link{" "}
                            </label>
                            <input
                              name="externalLink"
                              placeholder="Enter External Link"
                              type="text"
                              value={props.externalLink}
                              onChange={props.handleChange}
                              className="form-control"
                            />
                            {props.errorExternalLink && (
                              <span className="error">
                                {props.errorExternalLink}
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
                              component="textarea"
                              type="text"
                              rows="5"
                              placeholder="Enter Meta Description"
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
                              Blog Post Image
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
                            <div className='row'>
                              <div className='col-md-8 col-sm-12'>
                                <input
                                  type='file'
                                  accept="image/*"
                                  name='featureImagePath'
                                  required='required'
                                  className='form-control'
                                  onChange={props.featureImageHandler}
                                />

                                {props.featureImagePath === '' ? (
                                  <div className='file-dummy'>
                                    <div className='default'>
                                    Please Upload Blog Post Feature Image
                                    </div>
                                  </div>
                                ) : (
                                  <div className='file-dummy'>
                                    <div className='success'>
                                      Blog Post Image Uploaded Successfully
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className='col-md-4 col-sm-4'>
                                {props.showFile ? (
                                  <img
                                    src={props.showFile}
                                    className='thumb-md product-image'
                                    style={{ width: '100px', height: '100px' }}
                                    alt='showFile'
                                  />
                                ) : (
                                  <img
                                    src={baseUrl.concat(props.featureImagePath)}
                                    className='thumb-md product-image'
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                      display: 'none',
                                    }}
                                    alt='featureImage'
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row"></div>
                      <div className="form-footer ">
                        <div className="form-group row">
                          <div className="text-center">
                            <div className="btn-group text-center">
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.saveBlogPost}
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

export default CreateBlogPost
