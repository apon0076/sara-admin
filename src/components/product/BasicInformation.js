import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import { toast, ToastContainer } from "react-toastify";
import baseUrl from "../../utils/baseUrl";

const BasicInformation = (props) => {
  const {
    shops,
    shopName,
    selectedShopId,
    setSelectedShopId,
    setShopId,
    productName,
    setProductName,
    sku,
    setSku,
    activeBreadcrumbsProductCategories,
    categoryName,
    selectedCategoryId,
    setSelectedCategoryId,
    setCategoryId,
    brands,
    brandName,
    selectedBrandId,
    setSelectedBrandId,
    setBrandId,
    units,
    unitName,
    selectedUnitId,
    setSelectedUnitId,
    setUnitId,
    maxPrice,
    setMaxPrice,
    boxInsideElement,
    setBoxInsideElement,
    metaKeywords,
    setMetaKeywords,
    productVideoUrl,
    setProductVideoUrl,
    thumbnailImage,
    setThumbnailImage,
    thumbnailImage2,
    setThumbnailImage2,
    accType,
  } = props;

  const [showFile, setShowFile] = useState("");
  const [showFile2, setShowFile2] = useState("");

  const fileSelectedHandlerThumbnailImage = (event) => {
    const imageFile = event.target.files[0];
    let fileInput = false;

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", (event) => {
      const _loadedImageUrl = event.target.result;
      const image = document.createElement("img");
      image.src = _loadedImageUrl;

      image.addEventListener("load", () => {
        const { width, height } = image;
        if (width / height !== 1) {
          toast.error(
            <>
              <p style={{ fontSize: "18px", padding: "0", margin: "0" }}>
                Size Ratio must be 1:1
              </p>{" "}
              <span style={{ fontSize: "14px" }}>
                Example: 1000x1000, 720x720 , 500x500
              </span>
            </>
          );
          return false;
        } else if (
          (width > 1000 && height > 1000) ||
          (width < 500 && height < 500)
        ) {
          toast.error(`Image resolution must be (500x500)px to (1000x1000)px.`);
          return false;
        } else if (imageFile.size / 1024 > 300) {
          toast.error(`Image size must be within 300Kb.`);
          return false;
        } else {
          if (imageFile) {
            fileInput = true;
            if (fileInput) {
              try {
                Resizer.imageFileResizer(
                  imageFile,
                  1000,
                  1000,
                  "JPEG",
                  65,
                  0,
                  (uri) => {
                    setThumbnailImage(uri);
                    setShowFile(URL.createObjectURL(imageFile));
                    toast.success("Product Image Selected.");
                  },
                  "base64",
                  1000,
                  1000
                );
              } catch (err) {
                toast.error("Something went wrong!");
              }
            }
          }
        }
      });
    });
  };

  const fileSelectedHandlerThumbnailImage2 = (event) => {
    const imageFile = event.target.files[0];
    let fileInput = false;

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", (event) => {
      const _loadedImageUrl = event.target.result;
      const image = document.createElement("img");
      image.src = _loadedImageUrl;

      image.addEventListener("load", () => {
        const { width, height } = image;
        if (width / height !== 1) {
          toast.error(
            <>
              <p style={{ fontSize: "18px", padding: "0", margin: "0" }}>
                Size Ratio must be 1:1
              </p>{" "}
              <span style={{ fontSize: "14px" }}>
                Example: 1000x1000, 720x720 , 500x500
              </span>
            </>
          );
          return false;
        } else if (
          (width > 1000 && height > 1000) ||
          (width < 500 && height < 500)
        ) {
          toast.error(`Image resolution must be (500x500)px to (1000x1000)px.`);
          return false;
        } else if (imageFile.size / 1024 > 300) {
          toast.error(`Image size must be within 300Kb.`);
          return false;
        } else {
          if (imageFile) {
            fileInput = true;
            if (fileInput) {
              try {
                Resizer.imageFileResizer(
                  imageFile,
                  1000,
                  1000,
                  "JPEG",
                  65,
                  0,
                  (uri) => {
                    setThumbnailImage2(uri);
                    setShowFile2(URL.createObjectURL(imageFile));
                    toast.success("Zoom Image Selected.");
                  },
                  "base64",
                  1000,
                  1000
                );
              } catch (err) {
                toast.error("Something went wrong!");
              }
            }
          }
        }
      });
    });
  };

  return (
    <>
      <div className="product_variants__section">
        {accType === "Admin" && (
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                <label className="control_label">
                  Shop Name{" "}
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
                    optionLabel="shopName"
                    options={shops}
                    placeholder={shopName}
                    className="form-control"
                    name="shopName"
                    value={selectedShopId}
                    onChange={(e) => {
                      setSelectedShopId(e.target.value);
                      setShopId(e.target.value.shopId);
                    }}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-6 col-sm-12">
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
              <input
                type="text"
                id="productName"
                className={
                  productName?.length === 0
                    ? "errorClass form-control"
                    : "form-control" && "form-control"
                }
                placeholder="Enter Product Name"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <span className="text-danger">
                {productName?.length < 4
                  ? "At least 4 characters required"
                  : ""}
              </span>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="control_label">
                Product Style / SKU{" "}
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
                id="sku"
                className={
                  sku?.length === 0
                    ? "errorClass form-control"
                    : "form-control" && "form-control"
                }
                placeholder="Enter Product Style / SKU"
                name="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              <span className="text-danger">
                {sku?.length < 3 ? "At least 3 characters required" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="control_label">
                Category{" "}
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
                  optionLabel="breadcrumbCategory"
                  options={activeBreadcrumbsProductCategories}
                  filter
                  showClear
                  filterBy="breadcrumbCategory"
                  placeholder={categoryName ? categoryName : "Select Category"}
                  className="form-control"
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value);
                    setCategoryId(e.target.value.categoryId);
                  }}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="control_label">
                Brand{" "}
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
                  optionLabel="brandName"
                  options={brands}
                  filter
                  showClear
                  filterBy="brandName"
                  placeholder={brandName ? brandName : "Select Brand"}
                  className={
                    brandName?.length === 0
                      ? "errorClass form-control"
                      : "form-control" && "form-control"
                  }
                  name="selectedBrandId"
                  value={selectedBrandId}
                  onChange={(e) => {
                    setSelectedBrandId(e.target.value);
                    setBrandId(e.target.value.brandId);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="control_label">
                Product Quantity Unit{" "}
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
                  optionLabel="unitName"
                  options={units}
                  filter
                  showClear
                  filterBy="unitName"
                  placeholder={unitName ? unitName : "Select Unit"}
                  className={
                    unitName?.length === 0
                      ? "errorClass form-control"
                      : "form-control" && "form-control"
                  }
                  name="selectedUnitId"
                  value={selectedUnitId}
                  onChange={(e) => {
                    setSelectedUnitId(e.target.value);
                    setUnitId(e.target.value.unitId);
                  }}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="control_label">
                Maximum Price{" "}
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
                type="number"
                id="maxPrice"
                className={
                  maxPrice?.length === 0
                    ? "errorClass form-control"
                    : "form-control" && "form-control"
                }
                placeholder="Enter Maximum Price"
                name="maxPrice"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value < 0 ? 0 : e.target.value)
                }
              />
              <span className="text-danger">
                {maxPrice?.length < 1 ? "Required Field" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label className="control_label">
                What's in the box?{" "}
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
                id="boxInsideElement"
                className={
                  boxInsideElement?.length === 0
                    ? "errorClass form-control"
                    : "form-control" && "form-control"
                }
                placeholder="Enter What's in the box"
                name="boxInsideElement"
                value={boxInsideElement}
                onChange={(e) => setBoxInsideElement(e.target.value)}
              />
              <span className="text-danger">
                {boxInsideElement?.length < 4 ? "Required Field" : ""}
              </span>
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
                id="metaKeywords"
                className={
                  metaKeywords?.length === 0
                    ? "errorClass form-control"
                    : "form-control" && "form-control"
                }
                placeholder="Enter Meta Keywords"
                name="metaKeywords"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
              />
              <span className="text-danger">
                {metaKeywords?.length < 4
                  ? "At least 4 characters required"
                  : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label className="control_label">Video URL </label>
              <input
                type="text"
                id="productVideoUrl"
                className="form-control"
                placeholder="Enter Video URL"
                name="productVideoUrl"
                value={productVideoUrl}
                onChange={(e) => setProductVideoUrl(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label className="control_label">
                    Product Image{" "}
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
                  <div className="input-file-container file-area">
                    <input
                      type="file"
                      accept="image/*"
                      name="thumbnailImage"
                      id="my-file"
                      onChange={fileSelectedHandlerThumbnailImage}
                    />
                    <div
                      className="file-dummy"
                      style={{
                        padding: "20px",
                        width: "230px",
                        height: "80px",
                      }}
                    >
                      <div className="success">Select Product Image</div>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#db1b1b",
                      }}
                    >
                      *Image size must be within 300Kb and only 1:1 Ratio
                      Allowed.
                    </span>{" "}
                    <br />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#db1b1b",
                      }}
                    >
                      *Image resolution must be (500x500)px to (1000x1000)px.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                {showFile ? (
                  <img
                    src={showFile}
                    className="thumb-md product-image"
                    style={{
                      marginTop: "30px",
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                ) : thumbnailImage ? (
                  <img
                    src={baseUrl.concat(thumbnailImage)}
                    className="thumb-md product-image"
                    style={{
                      marginTop: "30px",
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label className="control_label">
                    Product Zoom Image (Optional)
                  </label>
                  <div className="input-file-container file-area">
                    <input
                      type="file"
                      accept="image/*"
                      name="thumbnailImage2"
                      id="my-file"
                      onChange={fileSelectedHandlerThumbnailImage2}
                    />
                    <div
                      className="file-dummy"
                      style={{
                        padding: "20px",
                        width: "230px",
                        height: "80px",
                      }}
                    >
                      <div className="success">Select Product Zoom Image</div>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#db1b1b",
                      }}
                    >
                      *Image size must be within 300Kb and only 1:1 Ratio
                      Allowed.
                    </span>{" "}
                    <br />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#db1b1b",
                      }}
                    >
                      *Image resolution must be (500x500)px to (1000x1000)px.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                {showFile2 ? (
                  <img
                    src={showFile2}
                    className="thumb-md product-image"
                    style={{
                      marginTop: "30px",
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                ) : thumbnailImage2 ? (
                  <img
                    src={baseUrl.concat(thumbnailImage2)}
                    className="thumb-md product-image"
                    style={{
                      marginTop: "30px",
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default BasicInformation;
