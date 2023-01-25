/* eslint-disable no-loop-func */
import React from "react";
import Resizer from "react-image-file-resizer";
import { toast, ToastContainer } from "react-toastify";
import baseUrl from "../../utils/baseUrl";

const PriceAndStock = (props) => {
  const { productDetails, setProductDetails } = props;

  const handleVariantInputChange = (index, event) => {
    let value = event.target.value;

    const newData = productDetails.map((obj, idx) => {
      if (index === idx) {
        if (event.target.name === "productPrice") {
          return { ...obj, productPrice: value };
        }
        if (event.target.name === "productQuantity") {
          return { ...obj, productQuantity: value };
        }
        if (event.target.name === "sellerProductSku") {
          return { ...obj, sellerProductSku: value };
        }
      }
      return obj;
    });
    setProductDetails(newData);
  };

  const handleVariantImageDelete = (mainIndex, insideIndex) => {
    const filteredItems2 = productDetails[mainIndex].productImages.filter(
      function (element, index) {
        return index != insideIndex;
      }
    );
    const newData = productDetails.map((obj, idx) => {
      if (idx === mainIndex) {
        return { ...obj, productImages: filteredItems2 };
      }
      return obj;
    });
    setProductDetails(newData);
  };

  const fileUploadAndResize = (e, index) => {
    // resize
    let files = e.target.files;
    let fileInput = false;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const name = files[i].name;

        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.addEventListener("load", (event) => {
          const _loadedImageUrl = event.target.result;
          const image = document.createElement("img");
          image.src = _loadedImageUrl;

          image.addEventListener("load", () => {
            const { width, height } = image;
            if (width / height !== 1) {
              toast.error(
                <>
                  <p style={{ fontSize: '18px', padding: '0', margin: '0' }}>
                    Size Ratio must be 1:1
                  </p>{' '}
                  <span style={{ fontSize: '14px' }}>
                    Example: 1000x1000, 720x720 , 500x500
                  </span>
                </>
              )
              return false
            } else if(
              (width > 1000 && height > 1000) ||
              (width < 500 && height < 500)
            ) {
              toast.error(
                `Image resolution must be (500x500)px to (1000x1000)px.`
              );
              return false;
            }
            else if (files[i].size / 1024 > 300) {
              toast.error(`Image size must be within 300Kb.`)
              return false
            }
            else {
              if (files[i]) {
                fileInput = true;
                if (fileInput) {
                  try {
                    Resizer.imageFileResizer(
                      files[i],
                      1000,
                      1000,
                      "JPEG",
                      65,
                      0,
                      (path) => {
                        let newImages = {};
                        productDetails.map((d, idx) => {
                          if (index === idx) {
                            newImages = {
                              imageSeoName: name,
                              imageUrl: path,
                              productId: d.productId,
                              productImageDetails: d.productImages[index]
                                ?.productImageDetails
                                ? d.productImages[index]?.productImageDetails
                                : "product details",
                              shopId: d.shopId,
                              shopProductSku: d.shopProductSku,
                              status: d.productImages[index]?.status,
                              variantId: 0, // variantId will work for future
                              // variantOptionId: 572, // variantId will work for future
                            };
                          }
                        });

                        const newData = productDetails.map((obj, idx) => {
                          if (index === idx) {
                            productDetails[index].productImages.push(
                              newImages
                            );
                          }
                          return obj;
                        });
                        setProductDetails(newData);
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
      }
    }
  };

  return (
    <div className="product_variants__section">
      <>
        {productDetails &&
          productDetails.map((prodDetails, indexx) => {
            return (
              <React.Fragment key={indexx}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {prodDetails?.productVariants.map((pv, indexx) => {
                        return (
                          <th
                            style={{
                              fontWeight: "900",
                            }}
                            key={indexx}
                          >
                            {pv.variantName}
                          </th>
                        );
                      })}
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Seller Product SKU</th>
                      <th>Shop Product SKU</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {prodDetails?.productVariants.map((pv, index) => {
                        return (
                          <td key={index}>
                            <select
                              className="form-control"
                              data-placeholder="Select"
                              tabIndex="1"
                              disabled
                            >
                              <option defaultValue>
                                {pv.variantOptionText}
                              </option>
                            </select>
                          </td>
                        );
                      })}
                      <td>
                        <input
                          type="number"
                          className={"form-control"}
                          name="productPrice"
                          onChange={(e) => handleVariantInputChange(indexx, e)}
                          value={prodDetails?.productPrice}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="number"
                          className={"form-control"}
                          name="productQuantity"
                          onChange={(e) => handleVariantInputChange(indexx, e)}
                          value={prodDetails?.productQuantity}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="text"
                          className={"form-control"}
                          name="sellerProductSku"
                          onChange={(e) => handleVariantInputChange(indexx, e)}
                          value={prodDetails?.sellerProductSku}
                        ></input>
                      </td>
                      <td>{prodDetails?.shopProductSku}</td>
                    </tr>

                    <tr>
                      <td colSpan="100%">
                        {prodDetails.productImages.map((pv, index) => {
                          return (
                            <>
                              <div>
                                <div
                                  style={{
                                    float: "left",
                                  }}
                                >
                                  <div
                                    className="parent"
                                    style={{
                                      position: "relative",
                                    }}
                                  >
                                    {pv.imageUrl.length < 500 ? (
                                      <img
                                        src={baseUrl.concat(pv.imageUrl)}
                                        alt="img"
                                        key={index}
                                        height="98px"
                                        width="98px"
                                        style={{
                                          borderRadius: "10px",
                                          marginLeft: "10px",
                                          marginRight: "10px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={pv.imageUrl}
                                        alt="img"
                                        key={index}
                                        height="98px"
                                        width="98px"
                                        style={{
                                          borderRadius: "10px",
                                          marginLeft: "10px",
                                          marginRight: "10px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    )}

                                    <div
                                      className="child"
                                      style={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "20px",
                                        fontSize: "23px",
                                        color: "#ff0000",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) =>
                                        handleVariantImageDelete(
                                          indexx,
                                          index,
                                          e
                                        )
                                      }
                                    >
                                      <i className="fas fa-trash-alt "></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                        <div
                          style={{
                            textAlign: "right",
                          }}
                        >
                          <button
                            style={{
                              marginTop: "20px",
                              marginRight: "40px",
                              border: "0px",
                              cursor: "pointer",
                              background: " #fff",
                            }}
                          >
                            <div className="input-file-container file-area">
                              <input
                                type="file"
                                accept="image/*"
                                name=""
                                id="my-file"
                                multiple
                                onChange={(e) => fileUploadAndResize(e, indexx)}
                              />
                              <div
                                className="file-dummy"
                                style={{
                                  padding: "20px",
                                  width: "250px",
                                }}
                              >
                                <div className="success">
                                  Select to Add Product Image
                                </div>
                              </div>
                            </div>
                            <>
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#db1b1b",
                                }}
                              >
                                *Image size must be within 300Kb and only 1:1
                                Ratio Allowed.
                              </span>
                              <br />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#db1b1b",
                                }}
                              >
                                *Image resolution must be (500x500)px to
                                (1000x1000)px.
                              </span>
                            </>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            );
          })}
      </>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default PriceAndStock;
