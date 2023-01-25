/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-upload-gallery/dist/style.css";
import { checkRealTimeInventoryRecord } from "../../store/actions/productAction";
import "./../../containers/product/createProductCss.css";

export default function CreateProductVariantTable({
  productVariants,
  duplicate_SKU_Entry,
  setVariantUpdated,
  setCheckDuplicateProduct,
  category_id,
}) {
  const [sku, setSku] = useState(null);
  const [variants, setVariants] = useState([]);
  const [variantImages, setVariantImages] = useState([]);
  const [multiProductImages, setMultiProductImages] = useState([]);
  const [productVariantMap0, setProductVariantMap0] = useState([]);
  const [productVariantMap1, setProductVariantMap1] = useState([]);
  const [productVariantMap2, setProductVariantMap2] = useState([]);
  const [productVariantMap3, setProductVariantMap3] = useState([]);
  const [status, setStatus] = useState(1);
  const [variantName, setVariantName] = useState([]);
  const [totalQty, setTotalQty] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [rowIndex, setRowIndex] = useState(null);
  const [inventoryOption, setInventoryOption] = useState(null);
  const [notUploaded, setNotUploaded] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(null);
  const [discountFlat, setDiscountFlat] = useState(null);
  const [discountStartDate, setDiscountStartDate] = useState(null);
  const [discountEndDate, setDiscountEndDate] = useState(null);
  const dispatch = useDispatch();
  const inventoryUpdatedBy = (data, index) => {
    setRowIndex(index);
    setInventoryOption(data);
  };
  useEffect(() => {
    if (inventoryOption == 1) {
      dispatch(
        checkRealTimeInventoryRecord(variants[rowIndex]?.sellerProductSku)
      );
    }
  }, [
    dispatch,
    variants,
    inventoryOption,
    rowIndex,
    variants[rowIndex]?.sellerProductSku,
  ]);

  useEffect(() => {
    if (rowIndex !== null) {
      let newArr = [...variants];
      if (sku !== null) {
        newArr[rowIndex].sellerProductSku = sku;
      }
      if (productPrice !== null) {
        newArr[rowIndex].productPrice = productPrice;
      }
      if (totalQty !== null) {
        newArr[rowIndex].productQuantity = totalQty;
      }
      newArr[rowIndex].discountPercentage =
        discountPercent !== "" ? discountPercent : 0;
      newArr[rowIndex].discountAmount = discountFlat !== "" ? discountFlat : 0;
      if (discountStartDate) {
        newArr[rowIndex].discountStartDate = discountStartDate;
      }
      if (discountEndDate) {
        newArr[rowIndex].discountEndDate = discountEndDate;
      }

      setVariants(newArr);
      setSku(null);
      setProductPrice(null);
      setTotalQty(null);
    }
  }, [
    rowIndex,
    productPrice,
    sku,
    totalQty,
    discountPercent,
    discountFlat,
    discountStartDate,
    discountEndDate,
  ]);

  const {
    productVariantMapArray0,
    productVariantMapArray1,
    productVariantMapArray2,
    productVariantMapArray3,
    productVariant,
  } = productVariants;

  /////////////////////////////////////////////
  const { data } = useSelector((state) => state?.productReducer);

  useEffect(() => {
    data?.data?.succeed === true && setVariants([]);
  }, [data?.data]);
  /////////////////////////////////////////////

  useEffect(() => {
    setVariantName(productVariant);
  }, [productVariant]);
  const realTimeInventory = useSelector((state) => state?.productReducer);
  const { checkRealTimeInventory, loading } = realTimeInventory;
  useEffect(() => {
    if (checkRealTimeInventory?.length !== 0) {
      setProductPrice(checkRealTimeInventory[0]?.SalePrice);
    }
  }, [checkRealTimeInventory]);
  useEffect(() => {
    let sum = 0;
    let stock_in_hand = 5;
    if (checkRealTimeInventory?.length !== 0) {
      for (var i = 0; i < checkRealTimeInventory.length; i++) {
        sum = sum + checkRealTimeInventory[i].CurrentStock;
      }
      if (sum < stock_in_hand) {
        setTotalQty(0);
      } else {
        setTotalQty(sum - stock_in_hand);
      }
    }
    setInventoryOption(0);
  }, [checkRealTimeInventory]);
  const shopProductSkuGenerator = () => {
    let date = Date.now();
    let id = productVariants.shopId;
    let random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    let value = `${date}${id}${random}`;
    return value;
  };
  //Image Variant create start
  useEffect(() => {
    productVariantMapArray0.length > 0 &&
      setProductVariantMap0(productVariantMapArray0);
    productVariantMapArray1.length > 0 &&
      setProductVariantMap1(productVariantMapArray1);
    productVariantMapArray2.length > 0 &&
      setProductVariantMap2(productVariantMapArray2);
    productVariantMapArray3.length > 0 &&
      setProductVariantMap3(productVariantMapArray3);
  }, [
    productVariants.productVariantAdded,
    productVariantMapArray0,
    productVariantMapArray1,
    productVariantMapArray2,
    productVariantMapArray3,
  ]);

  let productVariantImages = [];

  useEffect(() => {
    productVariantImages = productVariantMap0.map((obj) => ({
      variantId: variantName.productVariantId,
      variantOptionId: obj.variantOptionId0,
      variantOptionText: obj.variantOptionText0,
      shopProductSku: obj.shopProductSku,
      images: [],
    }));
  }, [productVariantMap0]);

  useEffect(() => {
    productVariantImages.length > 0 && setVariantImages(productVariantImages);
  }, [productVariantImages.length > 0, productVariantImages]);
  //Image Variant create End

  // Product Variant create Start
  let productVariant0 = [];
  let productVariant1 = [];
  let productVariant2 = [];
  let productVariant3 = [];
  let cartesianVariants = [];
  useEffect(() => {
    productVariant0 = productVariantMap0.map((obj) => ({
      ...obj,
      sellerProductSku: "",
      productPrice: "",
      productQuantity: "",
      inventoryTypeId: "",
    }));
    productVariant1 = productVariantMap1.map((obj) => ({
      ...obj,
      sellerProductSku: "",
      productPrice: "",
      productQuantity: "",
      inventoryTypeId: "",
    }));
    productVariant2 = productVariantMap2.map((obj) => ({
      ...obj,
      sellerProductSku: "",
      productPrice: "",
      productQuantity: "",
      inventoryTypeId: "",
    }));
    productVariant3 = productVariantMap3.map((obj) => ({
      ...obj,
      sellerProductSku: "",
      productPrice: "",
      productQuantity: "",
      inventoryTypeId: "",
    }));
    function cartesianProduct(...arrays) {
      return [...arrays].reduce(
        (a, b) =>
          a
            .map((x) => b.map((y) => x.concat(y)))
            .reduce((a, b) => a.concat(b), []),
        [[]]
      );
    }
    var cartesian = cartesianProduct(productVariant0);
    if (productVariant0.length > 0 && productVariant1.length > 0) {
      cartesian = cartesianProduct(productVariant0, productVariant1);
    }
    if (
      productVariant0.length > 0 &&
      productVariant1.length > 0 &&
      productVariant2.length > 0
    ) {
      cartesian = cartesianProduct(
        productVariant0,
        productVariant1,
        productVariant2
      );
    }
    if (
      productVariant0.length > 0 &&
      productVariant1.length > 0 &&
      productVariant2.length > 0 &&
      productVariant3.length > 0
    ) {
      cartesian = cartesianProduct(
        productVariant0,
        productVariant1,
        productVariant2,
        productVariant3
      );
    }
    const flatten = (obj) => {
      let res = {};
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
          res = { ...res, ...flatten(value) };
        } else {
          res[key] = value;
        }
      }
      return res;
    };

    cartesian.forEach((item) => {
      cartesianVariants.push({
        ...flatten(item),
        shopProductSku: shopProductSkuGenerator(),
      });
    });
  }, [
    productVariantMap0,
    productVariantMap1,
    productVariantMap2,
    productVariantMap3,
  ]);

  useEffect(() => {
    setVariants(cartesianVariants);
  }, [
    cartesianVariants.length > 0,
    productVariantMap0,
    productVariantMap1,
    productVariantMap2,
    productVariantMap3,
  ]);

  const onVariantRowEditComplete = (i) => {
    let _variants = [...variants];
    _variants[i] = variants[i];
    setVariants(_variants);
    productVariants.getVariantsHandler(_variants);
  };
  // Product Variant create End

  // Product variant image start
  const imageEditor = (options) => {
    return (
      <>
        <input
          type="file"
          accept="image/*"
          name=""
          id="my-file"
          multiple
          onChange={(e) => {
            fileUploadAndResize(e, options);
          }}
        />
      </>
    );
  };

  const fileUploadAndResize = (e, option) => {
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
                  <p style={{ fontSize: "18px", padding: "0", margin: "0" }}>
                    Size Ratio must be 1:1
                  </p>{" "}
                  <span style={{ fontSize: "14px" }}>
                    Example: 1000x1000, 720x720 , 500x500
                  </span>
                </>
              );
              setNotUploaded(notUploaded + 1);
              return false;
            } else if (
              (width > 1000 && height > 1000) ||
              (width < 500 && height < 500)
            ) {
              toast.error(
                `Image resolution must be (500x500)px to (1000x1000)px.`
              );
              setNotUploaded(notUploaded + 1);
              return false;
            } else if (files[i].size / 1024 > 300) {
              toast.error(`Image size must be within 300Kb.`);
              setNotUploaded(notUploaded + 1);
              return false;
            } else {
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
                        setMultiProductImages((prevState) => [
                          ...prevState,
                          { name, path, options: option?.rowData },
                        ]);
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
  const imageBodyTemplate = (rowData) => {
    return (
      <span>
        {rowData.images.length === 0 ? (
          <span>Upload Image(s)</span>
        ) : (
          <>
            <span key={rowData}>
              {rowData?.images.map((image, index) => (
                <div className="col-lg-2 col-md-4 col-6" key={index}>
                  <a>
                    <div className="file-upload-container">
                      <img
                        className="thumb-md product-image"
                        src={image.path}
                        alt={image.name}
                      />
                      <Icon.XCircle
                        className="file-upload__button_close"
                        onClick={() => onImageRemove(image, index, image.name)}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </span>
            <span>{rowData.images.length} image(s) Uploaded</span>
          </>
        )}
      </span>
    );
  };
  const onImageRemove = (img, ind, name) => {
    setVariantImages((data) =>
      data.map((variant, i) => ({
        ...variant,
        images: variant.images.filter(
          (item, index) =>
            variant?.variantOptionText !== img?.variantOptionText &&
            ind !== index &&
            name !== item?.name
        ),
      }))
    );
  };
  const onImageRowEditComplete = (e) => {
    let _variantImages = [...variantImages];
    let { newData, index } = e;

    let files = newData.images;
    let fileInput = false;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const name = files[i].name;
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
                  setMultiProductImages((prevState) => [
                    ...prevState,
                    { name, path },
                    Math.random().toString(16).slice(2),
                  ]);
                },
                "base64",
                1000,
                1000
              );
              setMultiProductImages([]);
            } catch (err) {
              toast.error("Something went wrong!");
            }
          }
        }
      }
    }
    const updateData = {
      variantId: newData.variantId,
      variantOptionId: newData.variantOptionId,
      variantOptionText: newData.variantOptionText,
      shopProductSku: newData.shopProductSku,
      images: multiProductImages,
    };
    _variantImages[index] = updateData;
    setMultiProductImages([]);
    setVariantImages(_variantImages);
    productVariants.getVariantImagesHandler(_variantImages);
  };
  // Product variant image end

  // Variant table start
  useEffect(() => {
    let checkDuplicateSkuMultipleProduct = variants;
    checkDuplicateSkuMultipleProduct = checkDuplicateSkuMultipleProduct?.map(
      (item) => {
        return {
          sku: item?.sellerProductSku,
        };
      }
    );
    setVariantUpdated(variants);
    setCheckDuplicateProduct(checkDuplicateSkuMultipleProduct);
  }, [variants]);

  const handleVariantDelete = (e, shopProductSku) => {
    e.preventDefault();
    for (var i = 0; i < variants.length; i++) {
      if (variants[i]?.shopProductSku === shopProductSku) {
        variants.splice(i, 1);
      }
    }
  };

  return (
    <div
      className="container-fluid container_rug"
      style={{
        marginTop: "10px",
        display:
          productVariants.productVariantAdded === null
            ? "none"
            : productVariants.productVariantAdded
            ? "block"
            : "none",
      }}
    >
      {/* upload images by color */}
      <div className="row">
        <div className="col-md-12 col-sm-12 image-upload-bottom-card">
          <div className="datatable-editing-demo">
            <div className="card p-fluid image-upload-top-card">
              <DataTable
                value={variantImages}
                editMode="row"
                dataKey="variantOptionId"
                onRowEditComplete={onImageRowEditComplete}
                responsiveLayout="scroll"
              >
                {category_id === 1076 ? null : (
                  <Column field="variantOptionText" header="Color" />
                )}
                <Column
                  field="images"
                  header="Images"
                  body={imageBodyTemplate}
                  editor={(options) => imageEditor(options)}
                ></Column>
                <Column
                  rowEditor
                  headerStyle={{ width: "10%", minWidth: "4rem" }}
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
              </DataTable>
            </div>
          </div>
          <span
            style={{
              fontSize: "13px",
              color: "#db1b1b",
            }}
          >
            *Image size must be within 300Kb and only 1:1 Ratio Allowed.
          </span>{" "}
          <br />
          <span
            style={{
              fontSize: "13px",
              color: "#db1b1b",
            }}
          >
            *Image resolution must be (500x500)px to (1000x1000)px.
          </span>
        </div>
      </div>

      {/* price and stock for variants */}
      <table className="product_variant__table">
        <thead>
          <tr>
            <th>#</th>
            {category_id === 1076 ? null : (
              <>
                <th>Variant</th>
                <th>Variant</th>
              </>
            )}
            <th>SKU / Barcode</th>
            <th>Inventory Updated By</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants?.map((data, index) => (
            <tr>
              <td>{index + 1}</td>
              {category_id === 1076 ? null : (
                <>
                  <td>{data.variantOptionText0}</td>
                  <td>{data.variantOptionText1}</td>
                </>
              )}
              <td>
                <input
                  onChange={(e) => {
                    setSku(e.target.value);
                    setRowIndex(index);
                  }}
                  onBlur={() => onVariantRowEditComplete(index)}
                  type="text"
                  defaultValue={data.sellerProductSku}
                />
              </td>
              <td>
                <select
                  onChange={(e) => inventoryUpdatedBy(e.target.value, index)}
                  onBlur={() => onVariantRowEditComplete(index)}
                  defaultValue="0"
                >
                  <option value="0">Self</option>
                  <option value="1">Through API</option>
                </select>
              </td>
              <td style={{ width: "20%" }}>
                {inventoryOption == 1 ? (
                  <>
                    {loading && rowIndex === index ? (
                      <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: "1.5em" }}
                      ></i>
                    ) : (
                      <input
                        onBlur={() => onVariantRowEditComplete(index)}
                        value={data?.productPrice}
                        type="number"
                        disabled={loading}
                      />
                    )}
                  </>
                ) : (
                  <input
                    onBlur={() => onVariantRowEditComplete(index)}
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                      setRowIndex(index);
                    }}
                    type="number"
                    defaultValue={data?.productPrice}
                  />
                )}
              </td>
              <td style={{ width: "20%" }}>
                {inventoryOption == 1 ? (
                  <>
                    {loading && rowIndex === index ? (
                      <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: "1.5em" }}
                      ></i>
                    ) : (
                      <input
                        onBlur={() => onVariantRowEditComplete(index)}
                        value={data?.productQuantity}
                        type="number"
                        disabled={loading}
                      />
                    )}
                  </>
                ) : (
                  <input
                    onBlur={() => onVariantRowEditComplete(index)}
                    onChange={(e) => {
                      setTotalQty(e.target.value);
                      setRowIndex(index);
                    }}
                    type="number"
                    defaultValue={data?.productQuantity}
                  />
                )}
              </td>
              <td className="action__table-section">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "flexStart",
                  }}
                >
                  <div className="action_discount__btn-section">
                    <Button
                      className="action_discount__btn"
                      onClick={(e) => e.preventDefault()}
                    >
                      Add Discount
                    </Button>
                    <section className="action_discount__popup-section">
                      <section className="discount_form__section">
                        <label>Flat Discount</label>
                        <input
                          onBlur={() => onVariantRowEditComplete(index)}
                          onChange={(e) => {
                            setDiscountFlat(e.target.value);
                            setRowIndex(index);
                          }}
                          type="number"
                          placeholder={
                            discountPercent
                              ? "Remove Percent Discount"
                              : "Enter Flat Amount"
                          }
                          disabled={discountPercent}
                        />
                      </section>
                      <section className="discount_form__section">
                        <label>Percent Discount</label>
                        <input
                          onBlur={() => onVariantRowEditComplete(index)}
                          onChange={(e) => {
                            setDiscountPercent(e.target.value);
                            setRowIndex(index);
                          }}
                          type="number"
                          placeholder={
                            discountFlat
                              ? "Remove Flat Discount"
                              : "Enter in Percent"
                          }
                          disabled={discountFlat}
                        />
                      </section>
                      <section className="discount_form__section">
                        <label>Start Date</label>
                        <input
                          onBlur={() => onVariantRowEditComplete(index)}
                          onChange={(e) => {
                            setDiscountStartDate(e.target.value);
                            setRowIndex(index);
                          }}
                          type="datetime-local"
                          defaultValue={data?.productQuantity}
                        />
                      </section>
                      <section className="discount_form__section">
                        <label>End Date</label>
                        <input
                          onBlur={() => onVariantRowEditComplete(index)}
                          onChange={(e) => {
                            setDiscountEndDate(e.target.value);
                            setRowIndex(index);
                          }}
                          type="datetime-local"
                          defaultValue={data?.productQuantity}
                        />
                      </section>
                    </section>
                  </div>
                  <button
                    className="action_delete__btn"
                    onClick={(e) => {
                      handleVariantDelete(e, data.shopProductSku);
                      setStatus(status + 1);
                    }}
                  >
                    <i
                      className="pi pi-trash"
                      style={{ fontSize: "1em", color: "red" }}
                    ></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {duplicate_SKU_Entry?.map((data, index) => (
          <div key={index} style={{ marginBottom: "1px" }}>
            {data?.charAt(0) === " " ? null : (
              <div
                style={{
                  width: "100%",
                  padding: "5px",
                  backgroundColor: "rgba(255,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "rgb(255,0,0",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                >
                  {data}
                </p>
              </div>
            )}
          </div>
        ))}
      </>
      <ToastContainer autoClose={2500} />
    </div>
  );
}
