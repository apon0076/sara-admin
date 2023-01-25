import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as Icon from "react-feather";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import ListItems from "./ListItems";

const CreateAdsSchema = yup.object().shape({
  adsName: yup.string().required(),
  adsDetails: yup.string().required(),
  adsTypeId: yup.string().required(),
  imageTypeId: yup.string().required(),
  adsLocationId: yup.string().required(),
  adsImageSeoName: yup.string().required(),
  adsLink: yup.string().required(),
});

const CreateAds = (props) => {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateAdsSchema),
  });

  const onSubmit = (data, e) => {
    e.target.reset();
  };

  if (props.adsImageUrl) {
    const imageUrl = props.adsImageUrl;
    const result = imageUrl && imageUrl.split("/");
    var adsImageUrlName = result && result.slice(-1).pop();
  }

  let fieldName;
  if (props.adsImageUrlFileName === "") {
    fieldName = adsImageUrlName;
  } else {
    fieldName = "";
  }

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Ads & Banners{" "}
                <span style={{ float: "right" }}>
                  <Link to="/AdsList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                            className="form-control"
                            ref={register}
                          />
                          {errors?.adsName && (
                            <span className="error">
                              {errors?.adsName?.message}
                            </span>
                          )}
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
                            className="form-control"
                            ref={register}
                          />
                          {errors?.adsDetails && (
                            <span className="error">
                              {errors?.adsDetails?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-fluid p-formgrid p-grid">
                        <div className="p-fluid p-col-12 p-md-4">
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
                              className="form-control"
                              ref={register}
                            >
                              <option value="">Select Type</option>
                              <option value="1">Summer</option>
                              <option value="2">Winter</option>
                              <option value="3">Offer</option>
                              <option value="4">Falgun</option>
                            </select>
                            {errors?.adsTypeId && (
                              <span className="error">
                                {errors?.adsTypeId?.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-fluid p-col-12 p-md-4">
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
                              className="form-control"
                              ref={register}
                            >
                              <option value="">Select Type</option>
                              <option value="1">Slider</option>
                              <option value="2">Large Banner</option>
                              <option value="3">Medium Banner</option>
                              <option value="4">Small Banner</option>
                              <option value="5">Notice</option>
                              <option value="6">Pop Up</option>
                              <option value="7">Desktop Banner</option>
                              <option value="8">Mobile Banner</option>
                            </select>
                            {errors?.imageTypeId && (
                              <span className="error">
                                {errors?.imageTypeId?.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
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
                              value={props?.adsLocationId}
                              onChange={props?.handleChange}
                              className="form-control"
                              ref={register}
                            >
                              <option value="">Select Location</option>
                              <option value="1">Home Page Slider</option>
                              <option value="2">Home Top Right Side</option>
                              <option value="3">Home Mid</option>
                              <option value="4">Home Bottom</option>
                            </select>
                            {errors?.adsLocationId && (
                              <span className="error">
                                {errors?.adsLocationId?.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {props?.imageTypeId && props?.imageTypeId === 1 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={props?.sliderImageUrlHandler}
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Slider Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {props?.imageTypeId && props?.imageTypeId === 2 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={
                                          props?.largeBannerImageUrlHandler
                                        }
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Large Banner Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                  <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {props?.imageTypeId && props?.imageTypeId === 3 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={
                                          props?.mediumBannerImageUrlHandler
                                        }
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Medium Banner Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                  <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {props?.imageTypeId && props?.imageTypeId === 4 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={
                                          props?.smallBannerImageUrlHandler
                                        }
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Small Banner Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                  <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {props?.imageTypeId && props?.imageTypeId === 5 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={props?.noticeImageUrlHandler}
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Notice Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                  <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {props?.imageTypeId && props?.imageTypeId === 6 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={props?.noticeImageUrlHandler}
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Pop Up Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                  <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {props?.imageTypeId && props?.imageTypeId === 7 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={
                                          props?.desktopBannerImageUrlHandler
                                        }
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Desktop Banner Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='p-fluid p-col-12 p-md-6 p-lg-2'>
                                  <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {props?.imageTypeId && props?.imageTypeId === 8 ? (
                        <div className="p-field p-fluid">
                          <div className="form-group">
                            <label className="control_label">
                              Content Images{" "}
                              <span
                                aria-hidden="true"
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                *
                              </span>
                            </label>
                            <div>
                              <form id="to-do-form" onSubmit={props?.addItem}>
                                <div className="field p-fluid p-formgrid p-grid">
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                                    <div className="form-group">
                                      <input
                                        id="adsImageSeoName"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Image SEO Name"
                                        name="adsImageSeoName"
                                        value={props?.adsItems?.adsImageSeoName}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsImageSeoName && (
                                        <span className="error">
                                          {errors?.adsImageSeoName?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group">
                                      <input
                                        id="adsLink"
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Content Link"
                                        name="adsLink"
                                        value={props?.adsItems?.adsLink}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.adsLink && (
                                        <span className="error">
                                          {errors?.adsLink?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                                    <div className="form-group input-file-container file-area">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        name="adsImageUrl"
                                        id="my-file"
                                        required="required"
                                        onChange={
                                          props?.mobileBannerImageUrlHandler
                                        }
                                      />
                                      <div className="file-dummy">
                                        <div className="success">
                                          {props?.adsImageUrlFileName}
                                        </div>
                                        <div className="default">
                                          Upload Mobile Banner Image
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                                    <div className="form-group">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          id="checkbox33"
                                          type="checkbox"
                                          name="isChecked"
                                          checked={props?.adsItems?.isActive}
                                          onChange={props?.handleInput}
                                        />
                                        <label htmlFor="checkbox33">
                                          {" "}
                                          &nbsp;Active{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='p-fluid p-col-12 p-md-6 p-lg-2'>
                                  <div className="form-group">
                                      <input
                                        id="displayOrder"
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Display Order"
                                        name="displayOrder"
                                        value={props?.adsItems?.displayOrder}
                                        onChange={props?.handleInput}
                                        ref={register}
                                      />
                                      {errors?.displayOrder && (
                                        <span className="error">
                                          {errors?.displayOrder?.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="p-fluid p-col-12 p-md-6 p-lg-1"
                                    style={{ textAlign: "right" }}
                                  >
                                    <div className="form-group">
                                      <button
                                        id="addAdsImages"
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <p>{props?.advertisingImages?.adsImageSeoName}</p>
                      <ListItems
                        advertisingImages={props?.advertisingImages}
                        deleteItem={props?.deleteItem}
                      />
                    </div>
                    <div className="form-footer">
                      <div className="form-group row">
                        <div className="text-center">
                          <div className="btn-group text-center">
                            <button
                              className="btn btn-success"
                              onClick={props?.saveAds}
                              disabled={!formState?.isValid}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAds;
