/* eslint-disable no-loop-func */
/* eslint-disable no-lone-blocks */
import { Button } from "primereact/button";
import React, { Component } from "react";
import { BiError } from "react-icons/bi";
import Resizer from "react-image-file-resizer";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import CreateProductAdminTest from "../../components/product/CreateProductAdminTest";
import * as activeBreadcrumbsCategoryAction from "../../store/actions/activeBreadcrumbsCategoryAction";
import * as brandAction from "../../store/actions/brandAction";
import * as productAction from "../../store/actions/productAction";
import * as productVariantAction from "../../store/actions/productVariantAction";
import * as realtimeDataAction from "../../store/actions/realtimeDataAction";
import * as sellerAction from "../../store/actions/sellerAction";
import * as sellerProfileAction from "../../store/actions/sellerProfileAction";
import * as shopAction from "../../store/actions/shopAction";
import * as unitAction from "../../store/actions/unitAction";
import authenticationService from "../../store/services/authenticationService";

class CreateProductAdminContainerTest extends Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      categoryId: null,
      brandName: "",
      shopName: "",
      colorName: "",
      unitName: "",
      productName: "",
      productTitle: "",
      sku: "",
      productVideoUrl: "",
      productStatus: "Y",
      warrantyTypeId: 0,
      warrantyPeriodId: 0,
      warrantyPolicy: "",
      packageWeight: "",
      packageLength: "",
      packageWidth: "",
      packageHeight: "",
      boxInsideElement: "",
      brandId: null,
      shopId: null,
      baseCurrency: "BDT",
      maxPrice: "",
      metaKeywords: "",
      thumbnailImage: "",
      thumbnailImage2: "",
      showFile: "",
      showFile2: "",
      remarks: "",
      sellerCommission: "",
      commissionPercentage: 0,
      commissionAmount: 0,
      productDescription: "",
      productSpecification: "",
      parentCategoryId: "",
      emptyField: "",
      prodVariantOptions: [],
      itemsInProdVariantOptions: [],
      imagesInProdVariantOptions: [],
      totalPrice: "",
      totalQuantity: "",
      sellerSKU: "",
      shopSKU: "",
      inventoryTypeId: "",
      files: [], // to store the Multile pictures in base64 format.
      multiProductImages: [],
      realData: [],
      prodVariantOption0: { variantOptionId0: "", variantOptionText0: "" },
      prodVariantOption1: { variantOptionId1: "", variantOptionText1: "" },
      prodVariantOption2: { variantOptionId2: "", variantOptionText2: "" },
      prodVariantOption3: { variantOptionId3: "", variantOptionText3: "" },
      productVariantMap: [],
      productVariantMap0: [],
      productVariantMap1: [],
      productVariantMap2: [],
      productVariantMap3: [],
      productVariantMapId: 0,
      productVariantMapArray0: [],
      productVariantMapArray1: [],
      productVariantMapArray2: [],
      productVariantMapArray3: [],
      combineVariantImages: [],
      allProductVariants: [],
      allProductImages: [],
      resizedImages: [],
      productVariantAdded: null,
      errorProductName: "",
      errorProductTitle: "",
      errorCategoryVarient: "",
      errorSku: "",
      errorProductVideoUrl: "",
      errorBoxInsideElement: "",
      errorWarrantyPolicy: "",
      errorPackageWeight: "",
      errorPackageLength: "",
      errorPackageWidth: "",
      errorPackageHeight: "",
      errorTotalPrice: "",
      errorTotalQuantity: "",
      errorSellerSKU: "",
      errorShopSKU: "",
      errorInventoryTypeId: "",
      errorBrandName: "",
      errorUnitName: "",
      errorShopName: "",
      errorMetaKeywords: "",
      errorMaxPrice: "",
      errorProductDescription: "",
      errorProductSpecification: "",
      errorRemarks: "",
      isReturnable: false,
      returnDuration: "",
      returnPolicy: "",
      attributes: [],
      isUploadable: true,
      selectedSizeChart: {},
      modalVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.productDescriptionChange = this.productDescriptionChange.bind(this);
    this.productSpecificationChange =
      this.productSpecificationChange.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadAndResize = this.fileUploadAndResize.bind(this);
    this.renderPhotos = this.renderPhotos.bind(this);
    this.clearData = this.clearData.bind(this);
    this.handleVariantInput = this.handleVariantInput.bind(this);
    this.handleVariantAdd = this.handleVariantAdd.bind(this);
    this.handleRealtimeData = this.handleRealtimeData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.fileSelectedHandlerThumbnailImage =
      this.fileSelectedHandlerThumbnailImage.bind(this);
    this.fileSelectedHandlerThumbnailImage2 =
      this.fileSelectedHandlerThumbnailImage2.bind(this);
    this.combineProductVariant = this.combineProductVariant.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.getVariantsHandler = this.getVariantsHandler.bind(this);
    this.getVariantImagesHandler = this.getVariantImagesHandler.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId();
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      });
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      });
      this.props.history.push("/Login");
    }
    //End Temporary Authentication
    await this.props.getActiveBreadcrumbsProductCategoryRecord();
    await this.props.getUnitRecord();
    await this.props.getBrandRecord();
    await this.props.getShopRecord();
  };
  onSizeChartOptionsChange = (e) => {
    this.setState({
      selectedSizeChart: e.value,
    });
  };
  handleAttributeChange = (val) => {
    this.setState({
      attributes: val,
    });
  };
  handleChange = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    const { target } = e;

    switch (target.name) {
      case "parentCategoryId":
        this.setState({
          parentCategoryId: target.value,
          categoryId: target.value.categoryId,
        });

        await this.props.getProductVariant(target.value.categoryId);

        this.setState({
          errorCategoryVarient:
            this.props.productVariant.length === 0
              ? "No Variant Found for this Category."
              : "",
        });

        this.setState({
          itemsInProdVariantOptions: [],
          imagesInProdVariantOptions: [],
          prodVariantOption0: {
            variantOptionId0: "",
            variantOptionText0: "",
          },
          prodVariantOption1: {
            variantOptionId1: "",
            variantOptionText1: "",
          },
          prodVariantOption2: {
            variantOptionId2: "",
            variantOptionText2: "",
          },
          prodVariantOption3: {
            variantOptionId3: "",
            variantOptionText3: "",
          },
        });
        break;

      case "brandName":
        this.setState({
          brandName: target.value,
          brandId: target.value.brandId,
          errorBrandName:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        });
        break;

      case "unitName":
        this.setState({
          unitName: target.value,
          unitId: target.value.unitId,
          errorUnitName:
            value.length < 100 ? "Atleast 4 characaters required" : "",
        });
        break;

      case "shopName":
        this.setState({
          shopName: target.value,
          shopId: target.value.shopId,
          errorShopName:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        });
        await this.props.getApprovedReturnPolicyByShopIdRecord(
          target.value.shopId
        );
        this.setState({
          returnDuration:
            this.props?.approvedReturnPolicyById[0]?.duration || 0,
        });

        break;

      case "colorName":
        this.setState({
          colorName: target.value,
        });
        break;

      case "productName":
        this.setState({
          productName: target.value,
          errorProductName:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        });
        break;

      case "sku":
        this.setState({
          sku: target.value,
          errorSku: value.length < 3 ? "Atleast 3 characaters required" : "",
        });
        break;

      case "metaKeywords":
        this.setState({
          metaKeywords: target.value,
          errorMetaKeywords:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        });
        break;

      case "productVideoUrl":
        this.setState({
          productVideoUrl: target.value,
        });
        break;

      case "packageWeight":
        this.setState({
          packageWeight: target.value < 0 ? 0 : target.value,
          errorPackageWeight: value.length < 1 ? "Required Field" : "",
        });
        break;

      case "packageLength":
        this.setState({
          packageLength: target.value < 0 ? 0 : target.value,
          errorPackageLength: value.length < 1 ? "Required Field" : "",
        });
        break;

      case "packageWidth":
        this.setState({
          packageWidth: target.value < 0 ? 0 : target.value,
          errorPackageWidth: value.length < 1 ? "Required Field" : "",
        });
        break;

      case "packageHeight":
        this.setState({
          packageHeight: target.value < 0 ? 0 : target.value,
          errorPackageHeight: value.length < 1 ? "Required Field" : "",
        });
        break;

      case "boxInsideElement":
        this.setState({
          boxInsideElement: target.value,
          errorBoxInsideElement: value.length < 4 ? "Required Field" : "",
        });
        break;

      case "warrantyTypeId":
        this.setState({
          warrantyTypeId: target.value * 1,
        });
        break;

      case "warrantyPeriodId":
        this.setState({
          warrantyPeriodId: target.value * 1,
        });
        break;

      case "warrantyPolicy":
        this.setState({
          warrantyPolicy: target.value,
        });
        break;
      case "productStatus":
        this.setState({
          productStatus: target.value,
        });
        break;

      case "maxPrice":
        this.setState({
          maxPrice: target.value < 0 ? 0 : target.value,
          errorMaxPrice: value.length < 1 ? "Required Field" : "",
        });
        break;

      case "returnDuration":
        this.setState({
          returnDuration: target.value < 0 ? 0 : target.value,
        });
        break;

      case "returnPolicy":
        this.setState({
          returnPolicy: target.value,
        });
        break;

      default:
    }
    if (value.categoryId === 1076) {
      this.setState({
        productVariantMapArray0: [
          {
            variantOptionId0: 1614,
            variantOptionText0: "Gift Card Color",
          },
        ],
        productVariantAdded: true,
      });

      this.setState({
        productVariantMapArray1: [
          {
            variantOptionId1: 1615,
            variantOptionText1: "Gift Card Size",
          },
        ],
        productVariantAdded: true,
      });
    }
  };

  commissionPercent = () => {
    this.state.sellerCommission &&
      this.state.sellerCommission.map((data) =>
        this.setState({
          commissionPercentage: data.localCommissionPercentage,
        })
      );
  };

  handleRealtimeData = async (e) => {
    await this.props.getRealtimeDataByBarcode(this.state.sellerSKU);
    let stock = this.props.realtimeData.reduce(
      (accumulator, current) => accumulator + current.CurrentStock,
      0
    );
    this.setState({
      totalQuantity: stock,
    });
  };

  productDescriptionChange = (event, editor) => {
    const data = editor.getData();

    this.setState({
      productDescription: data,
    });
  };

  productSpecificationChange = (event, editor) => {
    const data = editor.getData();

    this.setState({
      productSpecification: data,
    });
  };

  handleReturnPolicyChange = (event, editor) => {
    const data = editor.getData();
    this.setState({
      returnPolicy: data,
    });
  };

  handleIsReturnable = (e, editor) => {
    this.setState({
      isReturnable: e.target.checked,
    });
  };

  handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    this.setState({
      multiProductImages: this.state.multiProductImages.filter(
        (item) => item.name !== name
      ),
    });
  };

  getVariantsHandler = (data) => {
    this.setState({
      allProductVariants: data,
    });
  };

  getVariantImagesHandler = (data) => {
    this.combineVariantImageHandler(data);
  };

  combineVariantImageHandler = (data) => {
    this.setState({ combineVariantImages: [...data] });
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  };

  fileUploadAndResize = (e) => {
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
              return false;
            } else if (
              (width > 1000 && height > 1000) ||
              (width < 500 && height < 500)
            ) {
              toast.error(
                `Image resolution must be (500x500)px to (1000x1000)px.`
              );
              return false;
            } else if (files[i].size / 1024 > 300) {
              toast.error(`Image size must be within 300Kb.`);
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
                        this.setState((prevState) => ({
                          files: [...prevState.files, files[i]],
                          multiProductImages: [
                            ...prevState.multiProductImages,
                            { name, path },
                          ],
                        }));
                      },
                      "base64",
                      1000,
                      1000
                    );
                    this.setState(() => ({
                      files: [],
                      multiProductImages: [],
                    }));
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

  fileSelectedHandlerThumbnailImage = (event) => {
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
                    this.setState({
                      thumbnailImage: uri,
                      showFile: URL.createObjectURL(imageFile),
                    });
                    toast.success("Image Selected.");
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

  fileSelectedHandlerThumbnailImage2 = (event) => {
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
                    this.setState({
                      thumbnailImage2: uri,
                      showFile2: URL.createObjectURL(imageFile),
                    });
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

  fileSelectedHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = (e) => {
      this.setState({
        file: file,
        primaryImage: reader.result,
      });
      this.primaryImage = e.target.result;
      this.setState({
        primaryImage: e.target.result,
      });
    };

    reader.readAsDataURL(file);
  };

  renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img className="product_upload_image" src={photo} alt="" key={photo} />
      );
    });
  };

  handleMultiSelectChange = (action, value) => {
    switch (value.name) {
      case "field0":
        this.setState({
          productVariantMap0: action,
        });
        break;

      case "field1":
        this.setState({
          productVariantMap1: action,
        });
        break;

      case "field2":
        this.setState({
          productVariantMap2: action,
        });
        break;

      case "field3":
        this.setState({
          productVariantMap3: action,
        });
        break;

      default:
    }
  };

  combineProductVariant = (e) => {
    const productVariant0 = this.state.productVariantMap0.map(
      ({ value, label }) => ({
        variantOptionId0: value,
        variantOptionText0: label,
      })
    );
    const productVariant1 = this.state.productVariantMap1.map(
      ({ value, label }) => ({
        variantOptionId1: value,
        variantOptionText1: label,
      })
    );
    const productVariant2 = this.state.productVariantMap2.map(
      ({ value, label }) => ({
        variantOptionId2: value,
        variantOptionText2: label,
      })
    );
    const productVariant3 = this.state.productVariantMap3.map(
      ({ value, label }) => ({
        variantOptionId3: value,
        variantOptionText3: label,
      })
    );

    e.preventDefault();

    if (this.state.shopId === "" || null) {
      let msg = "Select Shop Name!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.shopName === "") {
      let msg = "Select Shop Name!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    this.state.productVariantMap0.length > 0 &&
      this.setState({
        productVariantMapArray0: productVariant0,
        productVariantAdded: true,
      });

    this.state.productVariantMap1.length > 0 &&
      this.setState({
        productVariantMapArray1: productVariant1,
        productVariantAdded: true,
      });

    this.state.productVariantMap2.length > 0 &&
      this.setState({
        productVariantMapArray2: productVariant2,
        productVariantAdded: true,
      });

    this.state.productVariantMap3.length > 0 &&
      this.setState({
        productVariantMapArray3: productVariant3,
        productVariantAdded: true,
      });

    this.setState({
      productVariantMap: [
        ...productVariant0,
        ...productVariant1,
        ...productVariant2,
        ...productVariant3,
      ],
    });
  };

  handleVariantInput = (e) => {
    e.preventDefault();

    const { value } = e.target;
    switch (e.target.name) {
      case "field0":
        let selectedIndex = e.target.options.selectedIndex;
        let customAtrribute =
          e.target.options[selectedIndex].getAttribute("id");
        this.setState({
          prodVariantOption0: {
            ...this.state.prodVariantOption0,
            variantOptionText0: e.target.value,
            variantOptionId0: Number(customAtrribute),
          },
        });
        break;

      case "field1":
        let selectedIndex1 = e.target.options.selectedIndex;
        let customAtrribute1 =
          e.target.options[selectedIndex1].getAttribute("id");
        this.setState({
          prodVariantOption1: {
            ...this.state.prodVariantOption1,
            variantOptionText1: e.target.value,
            variantOptionId1: Number(customAtrribute1),
          },
        });
        break;

      case "field2":
        let selectedIndex2 = e.target.options.selectedIndex;
        let customAtrribute2 =
          e.target.options[selectedIndex2].getAttribute("id");

        this.setState({
          prodVariantOption2: {
            ...this.state.prodVariantOption0,
            variantOptionText2: e.target.value,
            variantOptionId2: Number(customAtrribute2),
          },
        });
        break;

      case "field3":
        let selectedIndex3 = e.target.options.selectedIndex;
        let customAtrribute3 =
          e.target.options[selectedIndex3].getAttribute("id");
        this.setState({
          prodVariantOption4: {
            ...this.state.prodVariantOption3,
            variantOptionText3: e.target.value,
            variantOptionId3: Number(customAtrribute3),
          },
        });
        break;

      case "totalPrice":
        this.setState({
          totalPrice: e.target.value,
          errorTotalPrice: value.length < 1 ? "required" : "",
        });
        break;

      case "totalQuantity":
        this.setState({
          totalQuantity: e.target.value,
          errorTotalQuantity: value.length < 1 ? "required" : "",
        });
        break;

      case "sellerSKU":
        this.setState({
          sellerSKU: e.target.value,
          errorSellerSKU: value.length < 1 ? "required" : "",
        });
        break;

      case "shopSKU":
        this.setState({
          shopSKU: e.target.value,
          errorShopSKU: value.length < 1 ? "required" : "",
        });
        break;

      case "inventoryTypeId":
        this.setState({
          inventoryTypeId: e.target.value,
          errorInventoryTypeId: value.length < 1 ? "required" : "",
        });
        break;

      default:
    }
  };

  shopSkuGenerator = () => {
    let date = Date.now();
    let id = this.state.shopId;
    let random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    let value = `${date}${id}${random}`;
    return value;
  };

  handleVariantAdd = (e) => {
    e.preventDefault();

    const variant0 = this.state.prodVariantOption0;
    const variant1 = this.state.prodVariantOption1;
    const variant2 = this.state.prodVariantOption2;
    const variant3 = this.state.prodVariantOption3;
    let { variantOptionId0, variantOptionText0 } = variant0;
    let { variantOptionId1, variantOptionText1 } = variant1;
    let { variantOptionId2, variantOptionText2 } = variant2;
    let { variantOptionId3, variantOptionText3 } = variant3;
    let { totalQuantity, sellerSKU, shopSKU, inventoryTypeId, totalPrice } =
      this.state;

    if (this.state.shopId === "" || null) {
      let msg = "Select Seller!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.shopName === "") {
      let msg = "Select Seller!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (totalPrice === "") {
      let msg = "Price is required!!!";
      toast.warning(msg);
      return;
    }

    if (totalQuantity === "") {
      let msg = "Quantity is required!!!";
      toast.warning(msg);
      return;
    }

    if (sellerSKU === "") {
      let msg = "sellerSKU is required!!!";
      toast.warning(msg);
      return;
    }

    if (inventoryTypeId === "") {
      let msg = "select inventoty type!!!";
      toast.warning(msg);
      return;
    }

    if (this.state.multiProductImages.length === 0) {
      let msg = "Image field is required!!!";
      toast.warning(msg);
      return;
    }

    let SHOPSKU = this.shopSkuGenerator();

    if (this.state.itemsInProdVariantOptions.length !== 0) {
      let xx = this.state.itemsInProdVariantOptions;
      let chk0 = this.state.prodVariantOption0;
      let chk1 = this.state.prodVariantOption1;
      let chk2 = this.state.prodVariantOption2;

      let fg = 11;
      for (let i = 0; i < xx.length; i++) {
        if (
          xx[i].variantOptionText0 === chk0.variantOptionText0 &&
          xx[i].variantOptionText1 === chk1.variantOptionText1 &&
          xx[i].variantOptionText2 === chk2.variantOptionText2
        ) {
          fg = 22;
          break;
        } else {
          fg = 33;
        }
      }

      if (fg === 22) {
        let msg = "Already added this variant!!!";
        toast.error(msg);
        return;
      } else if (fg === 33) {
        const itemsInProdVariantOptions = {
          variantOptionId0,
          variantOptionText0,
          variantOptionId1,
          variantOptionText1,
          variantOptionId2,
          variantOptionText2,
          variantOptionId3,
          variantOptionText3,
          totalPrice,
          totalQuantity,
          sellerSKU,
          shopSKU: SHOPSKU,
          inventoryTypeId,
        };

        const img1Name =
          this.state.multiProductImages[0] &&
          this.state.multiProductImages[0].name;
        const img1path =
          this.state.multiProductImages[0] &&
          this.state.multiProductImages[0].path;
        const img2Name =
          this.state.multiProductImages[1] &&
          this.state.multiProductImages[1].name;
        const img2path =
          this.state.multiProductImages[1] &&
          this.state.multiProductImages[1].path;
        const img3Name =
          this.state.multiProductImages[2] &&
          this.state.multiProductImages[2].name;
        const img3path =
          this.state.multiProductImages[2] &&
          this.state.multiProductImages[2].path;
        const img4Name =
          this.state.multiProductImages[3] &&
          this.state.multiProductImages[3].name;
        const img4path =
          this.state.multiProductImages[3] &&
          this.state.multiProductImages[3].path;
        const img5Name =
          this.state.multiProductImages[4] &&
          this.state.multiProductImages[4].name;
        const img5path =
          this.state.multiProductImages[4] &&
          this.state.multiProductImages[4].path;

        this.setState({
          itemsInProdVariantOptions: [
            ...this.state.itemsInProdVariantOptions,
            itemsInProdVariantOptions,
          ],

          imagesInProdVariantOptions: [
            ...this.state.imagesInProdVariantOptions,
            {
              img1Name,
              img1path,
              img2Name,
              img2path,
              img3Name,
              img3path,
              img4Name,
              img4path,
              img5Name,
              img5path,
              variantOptionText0,
              variantOptionText1,
              variantOptionText2,
              variantOptionText3,
              variantOptionId0,
              variantOptionId1,
              variantOptionId2,
              variantOptionId3,
              inventoryTypeId,
              shopSKU: SHOPSKU,
            },
          ],
          prodVariantOptions: [],
          totalPrice: "",
          totalQuantity: "",
          sellerSKU: "",
          shopSKU: "",
        });
      }
    } else {
      const itemsInProdVariantOptions = {
        variantOptionId0,
        variantOptionText0,
        variantOptionId1,
        variantOptionText1,
        variantOptionId2,
        variantOptionText2,
        variantOptionId3,
        variantOptionText3,
        totalPrice,
        totalQuantity,
        sellerSKU,
        shopSKU: SHOPSKU,
        inventoryTypeId,
      };

      const img1Name =
        this.state.multiProductImages[0] &&
        this.state.multiProductImages[0].name;
      const img1path =
        this.state.multiProductImages[0] &&
        this.state.multiProductImages[0].path;
      const img2Name =
        this.state.multiProductImages[1] &&
        this.state.multiProductImages[1].name;
      const img2path =
        this.state.multiProductImages[1] &&
        this.state.multiProductImages[1].path;
      const img3Name =
        this.state.multiProductImages[2] &&
        this.state.multiProductImages[2].name;
      const img3path =
        this.state.multiProductImages[2] &&
        this.state.multiProductImages[2].path;
      const img4Name =
        this.state.multiProductImages[3] &&
        this.state.multiProductImages[3].name;
      const img4path =
        this.state.multiProductImages[3] &&
        this.state.multiProductImages[3].path;
      const img5Name =
        this.state.multiProductImages[4] &&
        this.state.multiProductImages[4].name;
      const img5path =
        this.state.multiProductImages[4] &&
        this.state.multiProductImages[4].path;

      this.setState({
        itemsInProdVariantOptions: [
          ...this.state.itemsInProdVariantOptions,
          itemsInProdVariantOptions,
        ],

        imagesInProdVariantOptions: [
          ...this.state.imagesInProdVariantOptions,
          {
            img1Name,
            img1path,
            img2Name,
            img2path,
            img3Name,
            img3path,
            img4Name,
            img4path,
            img5Name,
            img5path,
            variantOptionText0,
            variantOptionText1,
            variantOptionText2,
            variantOptionText3,
            variantOptionId0,
            variantOptionId1,
            variantOptionId2,
            variantOptionId3,
            inventoryTypeId,
            shopSKU: SHOPSKU,
          },
        ],
        prodVariantOptions: [],
        totalPrice: "",
        totalQuantity: "",
        sellerSKU: "",
        shopSKU: "",
      });
    }
  };

  deleteItem = (i) => {
    const filteredItems = [
      ...this.state.itemsInProdVariantOptions.slice(0, i),
      ...this.state.itemsInProdVariantOptions.slice(i + 1),
    ];
    const filteredItems2 = [
      ...this.state.imagesInProdVariantOptions.slice(0, i),
      ...this.state.imagesInProdVariantOptions.slice(i + 1),
    ];
    this.setState({
      itemsInProdVariantOptions: filteredItems,
      imagesInProdVariantOptions: filteredItems2,
    });
  };

  clearData = (e) => {
    this.setState({
      productId: 0,
      colorName: "",
      productStatus: "Y",
      warrantyTypeId: 0,
      warrantyPeriodId: 0,
      boxInsideElement: "",
      brandId: null,
      shopId: null,
      unitId: null,
      parentCategoryId: "",
      emptyField: "",
      prodVariantOptions: [],
      itemsInProdVariantOptions: [],
      imagesInProdVariantOptions: [],
      files: [], // to store the Multile pictures in base64 format.
      multiProductImages: [],
      prodVariantOption0: {
        variantOptionId0: "",
        variantOptionText0: "",
      },
      prodVariantOption1: {
        variantOptionId1: "",
        variantOptionText1: "",
      },
      prodVariantOption2: {
        variantOptionId2: "",
        variantOptionText2: "",
      },
      prodVariantOption3: {
        variantOptionId3: "",
        variantOptionText3: "",
      },
      //
      errorProductName: "",
      errorProductTitle: "",
      errorProductVideoUrl: "",
      errorBoxInsideElement: "",
      errorWarrantyPolicy: "",
      errorPackageWeight: "",
      errorPackageLength: "",
      errorPackageWidth: "",
      errorPackageHeight: "",
      errorTotalPrice: "",
      errorTotalQuantity: "",
      errorSellerSKU: "",
      errorShopSKU: "",
      errorInventoryTypeId: "",
      errorBrandName: "",
      errorProductDescription: "",
      errorProductSpecification: "",
    });
  };

  createProduct = async (e) => {
    e.preventDefault();

    if (this.state.shopId === "" || null) {
      let msg = "Select Seller!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.shopName === "") {
      let msg = "Select Shop name!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.productName === "") {
      let msg = "Product Name is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (this.state.sku === "") {
      let msg = "Product SKU/Style is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.categoryId === null) {
      let msg = "Category name is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.brandId === null) {
      let msg = "Brand name is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.unitName === "") {
      let msg = "Quantity Unit is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.maxPrice === "") {
      let msg = "Maximum Price is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.boxInsideElement === "") {
      let msg = "Box Inside Element is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.metaKeywords === "") {
      let msg = "Meta Keywords is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.thumbnailImage === "") {
      let msg = "Thumbnail Image is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.productDescription === "") {
      let msg = "Product Description is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.productSpecification === "") {
      let msg = "Product Specification is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.packageWeight === "") {
      let msg = "Package Weight is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.packageLength === "") {
      let msg = "Package Length is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.packageWidth === "") {
      let msg = "Package Width is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state.packageHeight === "") {
      let msg = "Package Height  is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    await this.props.getCommissionPercentageRecord(this.state.shopId);

    this.setState({
      sellerCommission: this.props.commissionPercentage,
    });

    this.commissionPercent();

    var a = false;

    //PRIMARY ARRAY:
    const initialData = {
      productId: this.state.productId,
      shopId: this.state.shopId,
      baseCurrency: this.state.baseCurrency,
      categoryId: Number(this.state.categoryId),
      productName: this.state.productName,
      productTitle: this.state.productName.slice(0, 50),
      sku: this.state.sku,
      productVideoUrl: this.state.productVideoUrl,
      brandId: Number(this.state.brandId),
      unitId: Number(this.state.unitId),
      productDescription: this.state.productDescription,
      productSpecification: this.state.productSpecification,
      boxInsideElement: this.state.boxInsideElement,
      warrantyTypeId: this.state.warrantyTypeId,
      warrantyPeriodId: this.state.warrantyPeriodId,
      warrantyPolicy: this.state.warrantyPolicy,
      packageWeight: this.state.packageWeight,
      packageLength: this.state.packageLength,
      packageWidth: this.state.packageWidth,
      packageHeight: this.state.packageHeight,
      productStatus: this.state.productStatus,
      maxPrice: this.state.maxPrice,
      thumbnailImage: this.state.thumbnailImage,
      thumbnailImage2: this.state.thumbnailImage2,
      metaKeywords: this.state.metaKeywords,
      remarks: this.state.remarks,
      isReturnable: this.state.isReturnable === true ? "Y" : "N",
      returnDuration:
        this.state.isReturnable === true ? this.state.returnDuration : 0,
      returnPolicy:
        this.state.isReturnable === true ? this.state.returnPolicy : "",
    };

    const details = [];
    const variants = [];

    this.state.allProductVariants.forEach((item) => {
      details.push({
        productDetailsId: 0,
        productId: 0,
        shopId: Number(this.state.shopId),
        productPrice: Number(item.productPrice),
        productQuantity: Number(item.productQuantity),
        sellerProductSku: item.sellerProductSku,
        inventoryTypeId: Number(item.inventoryTypeId),
        shopProductSku: item.shopProductSku,
        productDetailsNote: "PROD DETAILS",
        productDetailsStatus: "Y",
        isAvailable: "Y",
        commissionPercentage: this.state.commissionPercentage,
        commissionAmount:
          (item.productPrice * 1 * this.state.commissionPercentage) / 100,
        discountPercentage: item.discountPercentage
          ? Number(item.discountPercentage)
          : 0,
        discountAmount: item.discountAmount ? Number(item.discountAmount) : 0,
        discountStartDate: item.discountStartDate,
        discountEndDate: item.discountEndDate,
      });

      const variantOptionId0 = item.hasOwnProperty("variantOptionId0");
      const variantOptionId1 = item.hasOwnProperty("variantOptionId1");
      const variantOptionId2 = item.hasOwnProperty("variantOptionId2");
      const variantOptionId3 = item.hasOwnProperty("variantOptionId3");

      if (
        variantOptionId0 &&
        !variantOptionId1 &&
        !variantOptionId2 &&
        !variantOptionId3
      ) {
        variants.push({
          variationWiseProductId: 0,
          variantOptionId0: Number(item.variantOptionId0),
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      }

      if (
        variantOptionId0 &&
        variantOptionId1 &&
        !variantOptionId2 &&
        !variantOptionId3
      ) {
        variants.push({
          variationWiseProductId: 0,
          variantOptionId0: Number(item.variantOptionId0),
          variantOptionId1: Number(item.variantOptionId1),
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      }

      if (
        variantOptionId0 &&
        variantOptionId1 &&
        variantOptionId2 &&
        !variantOptionId3
      ) {
        variants.push({
          variationWiseProductId: 0,
          variantOptionId0: item.variantOptionId0 * 0,
          variantOptionId1: item.variantOptionId1 * 1,
          variantOptionId2: item.variantOptionId1 * 2,
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      }

      if (
        variantOptionId0 &&
        variantOptionId1 &&
        variantOptionId2 &&
        variantOptionId3
      ) {
        variants.push({
          variationWiseProductId: 0,
          variantOptionId0: item.variantOptionId0 * 0,
          variantOptionId1: item.variantOptionId1 * 1,
          variantOptionId2: item.variantOptionId1 * 2,
          variantOptionId3: item.variantOptionId1 * 3,
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      }
    });

    const variantOptionId0 = variants
      .map((o) => o.variantOptionId0 && true)
      .includes(true);
    const variantOptionId1 = variants
      .map((o) => o.variantOptionId1 && true)
      .includes(true);
    const variantOptionId2 = variants
      .map((o) => o.variantOptionId2 && true)
      .includes(true);
    const variantOptionId3 = variants
      .map((o) => o.variantOptionId3 && true)
      .includes(true);

    const multiVariants = [];
    const variantCombined = [];

    if (
      variantOptionId0 &&
      !variantOptionId1 &&
      !variantOptionId2 &&
      !variantOptionId3
    ) {
      variants.forEach((item) => {
        multiVariants.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptions: [{ variantOptionId: item.variantOptionId0 }],
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
      const flatten = (array) =>
        array.reduce(
          (results, item) => [
            ...results,
            ...item.variantOptions.map((data) => ({
              variationWiseProductId: item.variationWiseProductId,
              id: data,
              sellerProductSku: item.sellerProductSku,
              shopProductSku: item.shopProductSku,
              productId: Number(this.state.productId),
              shopId: Number(this.state.shopId),
              status: "Y",
            })),
          ],
          []
        );

      flatten(multiVariants).map((item) => {
        variantCombined.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptionId: item.id.variantOptionId,
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
    }

    if (
      variantOptionId0 &&
      variantOptionId1 &&
      !variantOptionId2 &&
      !variantOptionId3
    ) {
      variants.forEach((item) => {
        multiVariants.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptions: [
            { variantOptionId: item.variantOptionId0 },
            { variantOptionId: item.variantOptionId1 },
          ],
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
      const flatten = (array) =>
        array.reduce(
          (results, item) => [
            ...results,
            ...item.variantOptions.map((data) => ({
              variationWiseProductId: item.variationWiseProductId,
              id: data,
              sellerProductSku: item.sellerProductSku,
              shopProductSku: item.shopProductSku,
              productId: Number(this.state.productId),
              shopId: Number(this.state.shopId),
              status: "Y",
            })),
          ],
          []
        );

      flatten(multiVariants).map((item) => {
        variantCombined.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptionId: item.id.variantOptionId,
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
    }

    if (
      variantOptionId0 &&
      variantOptionId1 &&
      variantOptionId2 &&
      !variantOptionId3
    ) {
      variants.forEach((item) => {
        multiVariants.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptions: [
            { variantOptionId: item.variantOptionId0 },
            { variantOptionId: item.variantOptionId1 },
            { variantOptionId: item.variantOptionId2 },
          ],
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
      const flatten = (array) =>
        array.reduce(
          (results, item) => [
            ...results,
            ...item.variantOptions.map((data) => ({
              id: data,
              variationWiseProductId: item.variationWiseProductId,
              sellerProductSku: item.sellerProductSku,
              shopProductSku: item.shopProductSku,
              productId: Number(this.state.productId),
              shopId: Number(this.state.shopId),
              status: "Y",
            })),
          ],
          []
        );

      flatten(multiVariants).map((item) => {
        variantCombined.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptionId: item.id.variantOptionId,
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
    }

    if (
      variantOptionId0 &&
      variantOptionId1 &&
      variantOptionId2 &&
      variantOptionId3
    ) {
      variants.forEach((item) => {
        multiVariants.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptions: [
            { variantOptionId: item.variantOptionId0 },
            { variantOptionId: item.variantOptionId1 },
            { variantOptionId: item.variantOptionId2 },
            { variantOptionId: item.variantOptionId3 },
          ],
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
      const flatten = (array) =>
        array.reduce(
          (results, item) => [
            ...results,
            ...item.variantOptions.map((data) => ({
              id: data,
              variationWiseProductId: item.variationWiseProductId,
              sellerProductSku: item.sellerProductSku,
              shopProductSku: item.shopProductSku,
              productId: Number(this.state.productId),
              shopId: Number(this.state.shopId),
              status: "Y",
            })),
          ],
          []
        );

      flatten(multiVariants).map((item) => {
        variantCombined.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptionId: item.id.variantOptionId,
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(this.state.productId),
          shopId: Number(this.state.shopId),
          status: "Y",
        });
      });
    }

    const variantWithImage = this.state.allProductVariants.map((variant) => {
      return {
        ...variant,
        image: this.state.combineVariantImages.find(
          (img) => img.variantOptionText === variant.variantOptionText0
        ),
      };
    });

    const flatten = (array) =>
      array.reduce(
        (results, item) => [
          ...results,
          ...item.image.images.map((data) => ({
            variantId: item.variantId,
            variantOptionId: item.variantOptionId0,
            variantOptionText: item.variantOptionText0,
            shopProductSku: item.shopProductSku,
            image: data,
          })),
        ],
        []
      );
    // variantImages create
    let variantImages = [];
    flatten(variantWithImage).map((item) => {
      variantImages.push({
        variantId: item.variantId,
        variantOptionId: item.variantOptionId,
        variantOptionText: item.variantOptionText,
        shopProductSku: item.shopProductSku,
        imageSeoName: item.image.name,
        imageUrl: item.image.path,
        productImageDetails: "productImageDetails",
        status: "Y",
      });
    });
    const productDetails = [...details];
    const variationWiseProducts = [...variantCombined];
    for (var i = 0; i < productDetails.length; i++) {
      for (var j = 0; j < this.state.attributes.length; j++) {
        const variant = {
          variantOptionId: this.state.attributes[j].value,
          sellerProductSku: productDetails[i]?.sellerProductSku,
          shopProductSku: productDetails[i]?.shopProductSku,
          productId: this.state.productId,
          shopId: this.state.shopId,
          status: "Y",
        };
        variationWiseProducts.push(variant);
      }
    }
    const productImages = [...variantImages];

    let checkData = {
      productId: initialData.productId,
      shopId: initialData.shopId,
      baseCurrency: initialData.baseCurrency,
      productName: initialData.productName,
      productTitle: initialData.productName.slice(0, 50),
      sku: initialData.sku,
      categoryId: initialData.categoryId,
      productVideoUrl: initialData.productVideoUrl,
      productDescription: initialData.productDescription,
      productSpecification: initialData.productSpecification,
      boxInsideElement: initialData.boxInsideElement,
      brandId: initialData.brandId,
      unitId: initialData.unitId,
      warrantyTypeId: initialData.warrantyTypeId,
      warrantyPeriodId: initialData.warrantyPeriodId,
      warrantyPolicy:
        initialData.warrantyPolicy === ""
          ? "No Warranty Policy"
          : initialData.warrantyPolicy,
      packageWeight: initialData.packageWeight,
      packageLength: initialData.packageLength,
      packageWidth: initialData.packageWidth,
      packageHeight: initialData.packageHeight,
      productStatus: initialData.productStatus,
      maxPrice: initialData.maxPrice,
      metaKeywords: initialData.metaKeywords,
      thumbnailImage: initialData.thumbnailImage,
      thumbnailImage2: initialData.thumbnailImage2,
      remarks: initialData.remarks,
      isReturnable: initialData.isReturnable,
      returnDuration: initialData.returnDuration,
      returnPolicy: initialData.returnPolicy
        ? initialData.returnPolicy
        : initialData.isReturnable === "Y"
        ? this.props.approvedReturnPolicyById[0].returnPolicy
        : "",
      sizeChartId: this.state.selectedSizeChart?.sizeChartId,
      productDetails: productDetails,
      variationWiseProducts: variationWiseProducts,
      productImages: productImages,
    };
    const isDuplicateSku = new Set(productDetails.map((v) => v.shopProductSku));

    if (isDuplicateSku.size < productDetails.length) {
      this.showModal();
    } else {
    const result = await this.props.createProduct(checkData);
    if (result && result?.payload?.success?.data?.succeed === true) {
      if (result.type === "CREATE_PRODUCT_SUCCESS") {
        toast.success("Product Created Successfully");
        this.setState({
          isUploadable: false,
        });
        setTimeout(() => {
          this.setState({
            isUploadable: true,
          });
          this.props.history.push("/manage-products?status=approved");
        }, 2500);
      } else {
        toast.error("Something went wrong, Please try again");
        setTimeout(() => {
          this.props.history.push("CreateProductTest");
        }, 2500);
      }
    } else if (result && result?.payload?.success?.data?.succeed === false) {
      if (
        result?.payload?.success?.data?.message ===
        "system found duplication shop product sku"
      ) {
        this.showModal();
      } else {
        toast.error("Product Already Exists!");
        setTimeout(() => {}, 2500);
      }
    }
  };
  };
  render() {
    return (
      <div id="wrapper relative">
        <CreateProductAdminTest
          key="CreateProductAdminTest"
          name="Add New Product"
          {...this.state}
          handleChange={this.handleChange}
          productVariantMap={this.productVariantMap}
          productDescriptionChange={this.productDescriptionChange}
          productSpecificationChange={this.productSpecificationChange}
          fileSelectedHandler={this.fileSelectedHandler}
          fileSelectedHandlerThumbnailImage={
            this.fileSelectedHandlerThumbnailImage
          }
          fileSelectedHandlerThumbnailImage2={
            this.fileSelectedHandlerThumbnailImage2
          }
          fileUploadAndResize={this.fileUploadAndResize}
          handleMultiSelectChange={this.handleMultiSelectChange}
          renderPhotos={this.renderPhotos}
          handleVariantInput={this.handleVariantInput}
          brands={this.props.brands.filter((item) => item.isActive === "Y")}
          realtimeData={this.props.realtimeData}
          activeBreadcrumbsProductCategories={this.props.activeBreadcrumbsProductCategories.filter(
            (item) => item.isProduct === "Y"
          )}
          productVariant={this.props.productVariant}
          shops={this.props.shops.filter(
            (item) => item.isVerified === "Y" && item.isActive === "Y"
          )}
          handleVariantAdd={this.handleVariantAdd}
          handleRealtimeData={this.handleRealtimeData}
          units={
            this.props.units &&
            this.props.units.units.filter((item) => item.activeYn === "Y")
          }
          deleteItem={this.deleteItem}
          combineProductVariant={this.combineProductVariant}
          variantImageHandler={this.variantImageHandler}
          handleRemoveItem={this.handleRemoveItem}
          getVariantsHandler={this.getVariantsHandler}
          getVariantImagesHandler={this.getVariantImagesHandler}
          createProduct={this.createProduct}
          approvedReturnPolicyById={this.props.approvedReturnPolicyById}
          handleReturnPolicyChange={this.handleReturnPolicyChange}
          handleIsReturnable={this.handleIsReturnable}
          saving={this.props.saving}
          handleAttributeChange={this.handleAttributeChange}
          isUploadable={this.state.isUploadable}
          selectedSizeChart={this.state.selectedSizeChart}
          onSizeChartOptionsChange={this.onSizeChartOptionsChange}
        />
        <ToastContainer autoClose={2500} />
        {this.state.modalVisible ? (
          <>
            <div
              style={{
                zIndex: "1001",
                width: "30%",
                background: "#fff",
                top: " 40%",
                left: "35%",
                position: "fixed",
                border: "1px solid #ddd",
                boxShadow: "0 0 5px #c7c7c7",
                borderRadius: "5px",
                padding: "10px",
                transition: "all ease-in-out 0.2s",
              }}
            >
              <div className="relative flex items-center justify-center direction-column">
                <BiError size="6rem" color="red" />
                <h2>Something is Wrong, Please Reload.</h2>
                <div className="flex items-center justify-center gap-10 mt-10 w-full">
                  <Button
                    onClick={this.handleCancel}
                    className="flex items-center justify-center p-button-warning"
                    style={{ width: "30%", fontSize: "15px" }}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => window.location.reload(false)}
                    className="flex items-center justify-center"
                    style={{ width: "30%", fontSize: "15px" }}
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
            <div
              style={{
                zIndex: "1000",
                position: "fixed",
                top: "0",
                left: "0",
                height: "100%",
                width: "100%",
                background: "#000",
                opacity: "0.5",
              }}
            ></div>
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  brands: state.brandReducer.brands,
  colors: state.colorReducer.colors,
  activeBreadcrumbsProductCategories:
    state.activeBreadcrumbsCategoryReducer.activeBreadcrumbsProductCategories,
  productVariant: state.productVariantReducer.variantsWithCategoryId,
  units: state.unitReducer,
  sellerProfile: state.sellerProfileReducer,
  commissionPercentage: state.sellerProfileReducer.sellerCommissionPercentage,
  shops: state.shopReducer.shops,
  realtimeData: state.realtimeDataReducer.realtimeData.success,
  approvedReturnPolicyById: state.sellerReducer.approvedReturnPolicyById,
  saving: state.productReducer.saving,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBrandRecord: () => dispatch(brandAction.getBrandRecord()),
    getActiveBreadcrumbsProductCategoryRecord: () =>
      dispatch(
        activeBreadcrumbsCategoryAction.getActiveBreadcrumbsProductCategoryRecord()
      ),
    getProductVariant: (id) =>
      dispatch(productVariantAction.getProductVariantByCategoryIdRecord(id)),
    createProduct: (data) => dispatch(productAction.createProductRecord(data)),
    getShopRecord: (data) => dispatch(shopAction.getShopRecord({ data })),
    getUnitRecord: () => dispatch(unitAction.getUnitRecord()),
    getRealtimeDataByBarcode: (barcode) =>
      dispatch(realtimeDataAction.getRealtimeDataByBarcode(barcode)),
    getCommissionPercentageRecord: (shopId) =>
      dispatch(sellerProfileAction.getCommissionPercentageRecord(shopId)),
    getApprovedReturnPolicyByShopIdRecord: (shopId) =>
      dispatch(sellerAction.getApprovedReturnPolicyByShopIdRecord(shopId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProductAdminContainerTest);
