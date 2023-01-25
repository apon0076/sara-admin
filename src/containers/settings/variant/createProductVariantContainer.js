import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import CreateProductVariant from "../../../components/settings/variant/CreateProductVariant";
import * as productVariantAction from "../../../store/actions/productVariantAction";
import authenticationService from "../../../store/services/authenticationService";

class createProductVariantContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productVariantId: 0,
      variantName: "",
      variantDescription: "",
      variantSetupTempleteId: 0,
      variantDisplayTempleteId: 0,
      isDelete: "N",
      isActive: "Y",
      imgChgVariant: true,
      errorVariantName: "",
      errorVariantDescription: "",
      errorVariantSetupTempleteId: "",
      errorVariantDisplayTempleteId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleParentCheck = this.handleParentCheck.bind(this);
    this.saveProductVariant = this.saveProductVariant.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    const { value } = e.target;
    const { target } = e;
    switch (target.name) {
      case "productVariantId":
        this.setState({ productVariantId: target.value });
        break;
      case "variantName":
        this.setState({
          variantName: target.value,
          errorVariantName:
            value.length < 3 ? "Atleast 3 characaters required" : "",
        });
        break;
      case "variantDescription":
        this.setState({
          variantDescription: target.value,
          errorVariantDescription:
            value.length < 5 ? "Atleast 5 characaters required" : "",
        });
        break;
      default:
    }
  };

  handleParentCheck = (e) => {
    const { target } = e;
    switch (target.name) {
      case "imgChgVariant":
        this.setState({ imgChgVariant: !this.state?.imgChgVariant });
        break;
      default:
    }
  };
  handleTabChange = (status) => {
    this.setState({ variantSetupTempleteId: status });
  };

  saveProductVariant = async (e) => {
    e.preventDefault();
    if (this.state?.variantName === "") {
      let msg = "Variant Name Is Required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (this.state?.variantSetupTempleteId == 0) {
      let msg = "Type Is Required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (this.state?.variantDescription === "") {
      let msg = "Variant Description Is Required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    const data = {
      productVariantId: this.state?.productVariantId,
      variantName: this.state?.variantName,
      variantDescription: this.state?.variantDescription,
      variantSetupTempleteId: this.state?.variantSetupTempleteId,
      variantDisplayTempleteId: this.state?.variantSetupTempleteId,
      isActive: this.state?.isActive,
      isDelete: this.state?.isDelete,
      imgChgVariant: this.state?.imgChgVariant === true ? "Y" : "N",
    };

    const result = await this.props.createProductVariantRecord(data);

    if (result && result?.payload?.success?.succeed === true) {
      toast.success("Product Variant Created Successfully");
      setTimeout(() => {
        this.props.history.push("ProductVariantList");
      }, 2500);
      this.resetForm();
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error("Something went wrong, Please try again");
      setTimeout(() => {
        this.resetForm();
      }, 2500);
    } else if (result.type === "CREATE_PRODUCT_VARIANT_SUCCESS") {
      toast.success("Product Variant Created Successfully");
      setTimeout(() => {
        this.props.history.push("ProductVariantList");
      }, 2500);
      this.resetForm();
    } else {
      toast.error("Something went wrong, Please try again");
      setTimeout(() => {
        this.resetForm();
      }, 2500);
    }
  };

  resetForm = () => {
    this.setState({
      productVariantId: 0,
      variantName: "",
      variantDescription: "",
      variantSetupTempleteId: 0,
      variantDisplayTempleteId: 0,
      isDelete: "N",
      isActive: "Y",
      imgChgVariant: "Y",
      isError: {
        variantName: "",
        variantDescription: "",
        variantSetupTempleteId: 0,
        variantDisplayTempleteId: 0,
      },
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateProductVariant
          key="CreateProductVariant"
          name="Add ProductVariant"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveProductVariant={this.saveProductVariant}
          resetForm={this.resetForm}
          variantSetupTempleteId={this.state.variantSetupTempleteId}
          handleTabChange={this.handleTabChange}
        />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.productVariantReducer?.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createProductVariantRecord: (data) =>
      dispatch(productVariantAction.createProductVariantRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createProductVariantContainer);
