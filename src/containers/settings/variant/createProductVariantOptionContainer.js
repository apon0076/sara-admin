import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/tooltip";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "../../../../node_modules/react-summernote/dist/react-summernote.css";
import CreateProductVariantOption from "../../../components/settings/variant/CreateProductVariantOption";
import * as activeBreadcrumbsCategoryAction from "../../../store/actions/activeBreadcrumbsCategoryAction";
import * as productVariantAction from "../../../store/actions/productVariantAction";
import * as productVariantOptionAction from "../../../store/actions/productVariantOptionAction";
import * as productVariantOptionValueAction from "../../../store/actions/productVariantOptionValueAction";
import authenticationService from "../../../store/services/authenticationService";

class createProductVariantOptionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variantOptionId: 0,
      productCategoryId: 0,
      productVariantId: 0,
      variantRemark: "",
      variantTempleteId: 1,
      variantOptionValue: "",
      isDelete: false,
      categoryName: "",
      variantName: "",
      items: [],
      itemsInArray: [],
      variantOption: {
        categoryName: "",
        variantName: "",
        variantRemark: "",
        variantOptionText: "",
        variantOptionValue: "",
        isCommon: false,
        displayOrder: "",
      },
      pCategoryId: "",
      pVariantId: "",
      variantOptionName: "",
      errorCategoryName: "",
      errorVariantName: "",
      errorVariantOptionText: "",
      errorVariantOptionValue: "",
      errorDisplayOrder: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveProductVariantOption = this.saveProductVariantOption.bind(this);
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
    await this.props.getProductVariantRecord();
    await this.props.getProductVariantOptionValueRecord();
  };

  updateItem = (index, e) => {
    let value = e.target.value;

    this.setState(
      this.state?.items.map((d, idx) => {
        if (index === idx) {
          d[e.target.name] = value;
        }
      })
    );
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ value: e.target.value });
    const { target } = e;
    switch (target.name) {
      case "variantOptionId":
        this.setState({
          variantOption: {
            ...this.state?.variantOption,
            variantOptionId: e.target.value,
          },
        });
        break;
      case "pCategoryId":
        this.setState({
          variantOption: {
            ...this.state?.variantOption,
            pCategoryId: target.value,
            productCategoryId: target.value?.categoryId,
            categoryName: target.value?.categoryName,
          },
          errorCategoryName:
            target.value.length < 1 ? "Select one category" : "",
        });
        break;
      case "pVariantId":
        this.setState({
          variantOption: {
            ...this.state?.variantOption,
            pVariantId: target.value,
            productVariantId: target.value?.productVariantId,
            variantName: target.value?.variantName,
            variantTempleteId: e.target.value.variantSetupTempleteId,
          },
          errorVariantName: target.value.length < 1 ? "Select one variant" : "",
        });
        break;
      case "variantOptionName":
        this.setState({
          variantOption: {
            ...this.state.variantOption,
            variantOptionName: target.value,
            variantOptionValue: target.value?.variantOptionValue,
          },
          errorVariantName: target.value.length < 1 ? "Select one variant" : "",
        });
        break;
      case "variantRemark":
        this.setState({
          variantOption: {
            ...this.state?.variantOption,
            variantRemark: e.target.value,
          },
        });
        break;
      case "displayOrder":
        this.setState({
          variantOption: {
            ...this.state?.variantOption,
            displayOrder: e.target.value < 0 ? 0 : e.target.value,
          },
          errorDisplayOrder: target.value.length < 1 ? "Select one number" : "",
        });
        break;

      case "varientOptionValue":
        this.setState({
          variantOption: {
            ...this.state?.variantOption,
            variantOptionValue: e.target.value,
          },
          errorVariantOptionValue:
            target.value.length < 1 ? "Atleast 1 characater required!" : "",
        });
        break;

      default:
    }
  };

  addItem(e) {
    e.preventDefault();

    const newItem = this.state?.variantOption;

    if (this.state?.variantOption?.categoryName === "") {
      let msg = "Category Name is required!!!";
      toast.warn(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state?.variantOption?.variantName === "") {
      let msg = "Variant Name is required!!!";
      toast.warn(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    if (this.state?.variantOption?.variantOptionValue === "") {
      let msg = "Variant Option Value is required!!!";
      toast.warn(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (this.state?.variantOption?.displayOrder === "") {
      let msg = "Display Order is required!!!";
      toast.warn(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    let {
      productCategoryId,
      categoryName,
      productVariantId,
      variantName,
      variantRemark,
      displayOrder,
      variantOptionText,
      variantOptionValue,
      isCommon,
      variantOptionName,
    } = newItem;
    const items = [...this.state?.items, newItem];
    const itemsInArray = [
      ...this.state?.itemsInArray,
      {
        productCategoryId,
        categoryName,
        productVariantId,
        variantName,
        variantRemark,
        displayOrder,
        variantOptionText,
        variantOptionValue,
        isCommon,
        variantOptionName,
      },
    ];
    this.setState({
      itemsInArray: itemsInArray,
      items: items,
      variantOption: {
        productCategoryId: "",
        categoryName: "",
        productVariantId: "",
        variantName: "",
        variantRemark: "",
        displayOrder: 0,
        variantOptionText: "",
        variantOptionValue: "",
        isCommon: "",
        variantOptionName: "",
      },
    });
  }

  deleteItem(index) {
    const filteredItems = [
      ...this.state?.items.slice(0, index),
      ...this.state?.items.slice(index + 1),
    ];
    this.setState({
      items: filteredItems,
    });
  }

  saveProductVariantOption = async (e) => {
    e.preventDefault();
    const data = {
      variantOptionId: this.state?.variantOptionId,
      productCategoryId: this.state?.productCategoryId,
      productVariantId: this.state?.productVariantId,
      variantOptionText: this.state?.variantOptionName,
      variantRemark: this.state?.variantRemark,
      displayOrder: this.state?.displayOrder,
      variantTempleteId: this.state?.variantTempleteId,
      variantOptionValue: this.state?.variantOptionValue,
      isDelete: this.state?.isDelete,
      isCommon: this.state?.isCommon === "N",
      categoryName: this.state?.categoryName,
      variantName: this.state?.variantName,
    };

    if (data.variantOptionId === null || "") {
      data.variantOptionId = 0;
    }
    if (data.variantOptionValue === null || "") {
      data.variantOptionValue = "A";
    }

    var finalData = [];
    this.state.items.forEach((val) => {
      const data = {
        variantOptionId: this.state?.variantOptionId * 1,
        productCategoryId: val?.productCategoryId,
        productVariantId: val?.productVariantId,
        variantTempleteId: val?.variantTempleteId,
        variantOptionText: val?.variantOptionName?.variantOptionName,
        variantOptionValue: val?.variantOptionValue,
        variantRemark: val?.variantRemark,
        display_order: val?.displayOrder,
        isDelete: this.state?.isDelete === true ? "Y" : "N",
        isCommon: val?.isCommon === true ? "Y" : "N",
        categoryName: val?.categoryName,
        variantName: val?.variantName,
      };
      finalData = [...finalData, data];
    });

    const result = await this.props.createProductVariantOptionRecord(finalData);
    if (result.type === "CREATE_PRODUCT_VARIANT_OPTION_SUCCESS") {
      toast.success("Product Variant Option Created Successfully");
      setTimeout(() => {
        this.props.history.push("ProductVariantOptionList");
      }, 2500);
      this.clearData();
    } else {
      toast.error("Product Variant Option Couldn't be Created");
      setTimeout(() => {
        this.props.history.push("ProductVariantOptionList");
      }, 2500);
    }
  };

  clearData = (e) => {
    this.setState({
      variantOptionId: "",
      productCategoryId: "",
      productVariantId: "",
      variantRemark: "",
      variantTempleteId: "",
      variantOptionValue: "",
      items: [],
      itemsInArray: [],
    });
  };

  render() {
    return (
      <div id="wrapper">
        <ToastContainer autoClose={1500} />
        <CreateProductVariantOption
          key="CreateProductVariantOption"
          name="Add Product Variant Option"
          {...this.state}
          handleChange={this.handleChange}
          isCommonCheck={this.isCommonCheck}
          values={this.values}
          activeBreadcrumbsProductCategories={this.props?.activeBreadcrumbsProductCategories.filter(
            (item) => item?.isProduct === "Y"
          )}
          variants={this.props?.variants.filter(
            (item) => item?.isActive === "Y"
          )}
          variantOptionValues={this.props?.variantOptionValues.filter(
            (item) =>
              item?.variantName === this.state?.variantOption?.variantName
          )}
          addItem={this.addItem}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem}
          saveProductVariantOption={this.saveProductVariantOption}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.productVariantOptionReducer?.data,
  variants: state.productVariantReducer?.variants,
  activeBreadcrumbsProductCategories:
    state.activeBreadcrumbsCategoryReducer?.activeBreadcrumbsProductCategories,
  data: state.activeBreadcrumbsCategoryReducer?.data,
  variantOptionValues:
    state.productVariantOptionValueReducer?.variantOptionValues,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveBreadcrumbsProductCategoryRecord: () =>
      dispatch(
        activeBreadcrumbsCategoryAction.getActiveBreadcrumbsProductCategoryRecord()
      ),
    getProductVariantRecord: () =>
      dispatch(productVariantAction.getProductVariantRecord()),
    createProductVariantOptionRecord: (data) =>
      dispatch(
        productVariantOptionAction.createProductVariantOptionRecord(data)
      ),
    getProductVariantOptionValueRecord: () =>
      dispatch(
        productVariantOptionValueAction.getProductVariantOptionValueRecord()
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createProductVariantOptionContainer);