/* eslint-disable no-lone-blocks */
import { Modal } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateOrder from "../../components/orders/CreateOrder";
import CustomOrderPayment from "../../components/orders/CustomOrderPayment";
import PageLoading from "../../components/shared/PageLoading";
import * as addressAction from "../../store/actions/addressAction";
import * as customerAction from "../../store/actions/customerAction";
import authenticationService from "../../store/services/authenticationService";

class createOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactNo: "",
      customerInfo: "",
      customerId: "",
      roleId: "",
      cusName: "",
      cusEmail: "",
      cusContactNo: "",
      isActive: "",
      cusPassword: "",
      customerAvailable: null,
      customerAdded: null,
      customerAddressAdded: null,
      productFound: null,
      addressFound: null,
      postCode: "",
      address: "",
      productSku: "",
      singleProduct: "",
      products: [],
      customerAddress: [],
      customerAddresses: [],
      voucher: [],
      orderData: [],
      addressData: null,
      shippingAddressId: "",
      errorContactNo: "",
      errorCusName: "",
      errorCusEmail: "",
      errorCusContactNo: "",
      errorPostCode: "",
      errorAddress: "",
      country: "",
      countryId: "",
      countryList: "",
      city: "",
      cityId: "",
      cityList: "",
      area: "",
      areaId: "",
      areaName: "",
      areaList: "",
      loading: "",
      isPaymentModalVisible: false,
      orderInfo: null,
    };
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
    await this.props.getAllCountryRecord();
    this.setState({
      countryList: this.props.allCountries.map(
        ({ countryName: label, countryId: value }) => ({
          label,
          value,
        })
      ),
    });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.customerAddress !== prevProps.customerAddress) {
      this.setState({
        customerAddresses: this.props.customerAddress,
      });
    }
  }

  handleChange = (e) => {
    const { target } = e;
    const { value } = e.target;

    switch (target.name) {
      case "contactNo":
        this.setState({
          contactNo: target.value,
          errorContactNo:
            value.length < 11 ? "Atleast 11 characaters required" : "",
        });
        break;

      case "cusName":
        this.setState({
          cusName: target.value,
          errorCusName:
            value.length < 3 ? "Atleast 3 characaters required" : "",
        });
        break;

      case "cusContactNo":
        this.setState({
          cusContactNo: target.value,
          errorCusContactNo:
            value.length < 11 ? "Atleast 11 characaters required" : "",
        });
        break;

      case "postCode":
        this.setState({
          postCode: target.value,
          errorPostCode:
            value.length !== 4 ? "Post code must be of 4 digits" : "",
        });
        break;

      case "address":
        this.setState({
          address: target.value,
          errorAddress:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        });
        break;

      case "productSku":
        this.setState({
          productSku: target.value,
        });
        break;

      default:
    }
  };

  handleAddressChange = async (field, e) => {
    switch (field) {
      case "countryList":
        this.setState({
          country: e,
        });
        await this.props.getAllCityRecord(e.value);
        this.setState({
          countryId: e.value,
          area: "",
        });
        this.setState({
          cityList: this.props.allCities.map(
            ({ cityName: label, cityId: value }) => ({
              label,
              value,
            })
          ),
        });
        break;

      case "cityList":
        this.setState({
          city: e,
        });
        await this.props.getAllAreaRecord(e.value);
        this.setState({
          areaList: this.props.allAreas.map(
            ({ areaName: label, areaId: value }) => ({
              label,
              value,
            })
          ),
        });
        this.setState({
          cityId: e.value,
          area: "",
        });
        break;

      case "areaList":
        this.setState({
          area: e,
        });
        this.setState({
          areaId: e.value,
          areaName: e.label,
        });
        break;

      default:
        break;
    }
  };
  resetForm = () => {
    this.setState({
      cusName: "",
      errorCusName: "",
    });
  };
  checkUser = async (e) => {
    e.preventDefault();
    if (this.state.contactNo === "") {
      let msg = "Contact number is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    const result = await this.props.customerContactAvailableRecord(
      this.state.contactNo
    );

    if (result && result.payload.success.succeed === true) {
      toast.error("No Customer Found!");
      this.setState({
        customerAvailable: false,
        customerAdded: false,
        customerInfo: [],
        customerId: "",
        roleId: "",
        cusName: "",
        cusEmail: "",
        cusContactNo: "",
        customerAddress: [],
        customerAddresses: [],
        customerAddressId: 0,
      });
    } else if (result && result.payload.success.succeed === false) {
      toast.success("Customer Exists!");
      await this.props.getCustomerDetailsRecord(this.state.contactNo);
      this.setState({
        customerInfo: this.props.customerDetails,
        customerAvailable: true,
        customerAdded: true,
      });
      {
        this.state.customerInfo.map((profile) =>
          this.setState({
            customerId: profile.customerId,
            roleId: profile.roleId,
            cusName: profile.cusName,
            cusEmail: profile.cusEmail,
            cusContactNo: profile.cusContactNo,
          })
        );
      }
      this.getAddresses();
    }
  };
  getAddresses = async () => {
    await this.props.getCustomerAddressRecord(this.state.customerId);
    this.setState({
      customerAddresses: this.props.customerAddress,
    });
  };
  getSelectedAddress = async (id) => {
    await this.props.getAddressByIdRecord(id);
    this.setState({
      customerAddress: this.props.addressById,
      addressFound: true,
    });
  };
  createUser = async (e) => {
    e.preventDefault();
    if (this.state.cusName === "") {
      let msg = "Customer name is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    // Generate Random Password for new customer generate
    const createCustomerPassword = () => {
      let cusPassword = "";
      let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 5; i++) {
        cusPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return cusPassword;
    };
    const data = {
      customerId: 0,
      roleId: 3,
      cusName: this.state.cusName,
      cusContactNo: this.state.contactNo,
      isActive: "Y",
      cusPassword: "12345678",
    };
    const result = await this.props.createNewCustomerRecord(data);
    if (result && result.payload.success.succeed === true) {
      toast.success("New Customer Added!");
      // window.location.reload()
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again");
    } else if (result.type === "CREATE_NEW_CUSTOMER_SUCCESS") {
      toast.success("New Customer Added!");
      this.setState({
        customerId: result.payload.success.data.message,
        customerAdded: true,
      });
      // window.location.reload()
    } else {
      toast.error("Something went wrong, Please try again");
    }
  };
  createAddress = async (e) => {
    e.preventDefault();
    if (this.state.areaId === "") {
      toast.error("Please select Area/Thana.");
      return;
    }
    if (this.state.address === "") {
      toast.error("Please enter full Address.");
      return;
    }
    const data = {
      customerAddressId: 0,
      customerId: this.state.customerId,
      addressTypeId: 0,
      cityId: this.state.cityId,
      areaid: typeof this.state.areaId === "string" ? 0 : this.state.areaId,
      areaName: this.state.areaName,
      recipientName: this.state.cusName,
      contactNumber: this.state.contactNo,
      postCode: this.state.postCode,
      address: this.state.address,
      status: "Y",
    };
    const result = await this.props.createCustomerAddressRecord(data);
    if (result && result?.payload?.success?.succeed === true) {
      toast.success("Customer Address Added!");
      this.setState({
        customerAddressAdded: true,
        shippingAddressId: result?.payload?.success?.message,
      });
      await this.props.getAddressByIdRecord(result?.payload?.success?.message);
      this.setState({ customerAddress: this.props.addressById });
      this.getAddresses();
      this.setState({
        country: "",
        areaId: "",
        areaName: "",
        countryId: "",
        area: "",
        cityList: "",
        city: "",
        areaList: "",
        cityId: "",
        postCode: "",
        address: "",
      });
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error("Something went wrong, Please try again");
    } else if (result.type === "CREATE_CUSTOMER_ADDRESS_SUCCESS") {
      toast.success("Customer Address Added!");
      this.setState({
        customerAddressAdded: true,
        shippingAddressId: result?.payload?.success?.message,
      });
      await this.props.getAddressByIdRecord(result?.payload?.success?.message);
      this.setState({ customerAddress: this.props.addressById });
      this.getAddresses();
      this.setState({
        country: "",
        areaId: "",
        areaName: "",
        countryId: "",
        area: "",
        cityList: "",
        city: "",
        areaList: "",
        cityId: "",
        postCode: "",
        address: "",
      });
    } else {
      toast.error("Something went wrong, Please try again");
    }
  };

  getProduct = async (e) => {
    e.preventDefault();
    if (this.state.productSku === "") {
      let msg = "Enter SKU!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    const result = await this.props.getProductWithSkuRecord(
      this.state.productSku
    );
    if (result.payload?.success?.status === 200) {
      this.setState({
        products: [...this.state.products, this.props.productDetails.data],
        singleProduct: this.props.productDetails.data,
        productFound: true,
      });
    } else {
      toast.error("No product found with this SKU!");
    }
  };

  handler = () => {
    this.setState({
      productFound: false,
    });
  };

  handleAddress = (data) => {
    this.setState({
      addressData: data,
    });
  };

  handleOrder = async (data) => {
    this.setState({
      orderData: data,
    });

    const result = await this.props.createOrderRecord(data);

    if (result && result.payload.success.succeed === true) {
      toast.success("Order Placed Successfully!");
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again");
    } else if (result.type === "CREATE_ORDER_SUCCESS") {
      toast.success("Order Placed Successfully!");
      setTimeout(() => {
        this.setState({
          isPaymentModalVisible: true,
        });
        this.setState({
          orderInfo: result.payload.success.data,
        });
      }, 2000);
    } else {
      toast.error("Something went wrong, Please try again");
    }
  };
  handleOk = () => {
    this.setState({
      isPaymentModalVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isPaymentModalVisible: false,
    });
  };
  render() {
    return (
      <>
        <div id="wrapper">
          <CreateOrder
            key="CreateOrder"
            name="Create Order"
            {...this.state}
            values={this.values}
            handleChange={this.handleChange}
            handleDivisionChange={this.handleDivisionChange}
            handleCityChange={this.handleCityChange}
            handleAreaChange={this.handleAreaChange}
            checkUser={this.checkUser}
            createUser={this.createUser}
            createAddress={this.createAddress}
            // getAddress={this.getAddress}
            getSelectedAddress={this.getSelectedAddress}
            customerInfo={this.state.customerInfo}
            allCountries={this.props.allCountries}
            allCities={this.props.allCities}
            allAreas={this.props.allAreas}
            loading={this.props.loading}
            saving={this.props.saving}
            productDetails={this.props.productDetails}
            getProduct={this.getProduct}
            handler={this.handler}
            handleOrder={this.handleOrder}
            handleAddress={this.handleAddress}
            handleAddressChange={this.handleAddressChange}
          />
          <ToastContainer autoClose={1500} />
        </div>
        {this.props.saving ? <PageLoading /> : null}
        <Modal
          title="Choose Payment Method for Custom Order"
          open={this.state.isPaymentModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1500}
        >
          <CustomOrderPayment
            orderData={this.state.orderData}
            orderInfo={this.state.orderInfo}
          />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  addressById: state.addressReducer.addressById,
  allCountries: state.addressReducer.allCountries,
  allCities: state.addressReducer.allCities,
  allAreas: state.addressReducer.allAreas,
  loading: state.addressReducer.loading,
  customerDetails: state.customerReducer.customerDetails,
  customerAddress: state.customerReducer.customerAddress.data,
  productDetails: state.customerReducer.productDetails,
  saving: state.customerReducer.saving,
});

const mapDispatchToProps = (dispatch) => {
  return {
    customerContactAvailableRecord: (contactNo) =>
      dispatch(customerAction.customerContactAvailableRecord(contactNo)),
    getCustomerDetailsRecord: (contactNo) =>
      dispatch(customerAction.getCustomerDetailsRecord(contactNo)),
    getCustomerAddressRecord: (id) =>
      dispatch(customerAction.getCustomerAddressRecord(id)),
    createNewCustomerRecord: (data) =>
      dispatch(customerAction.createNewCustomerRecord(data)),
    createCustomerAddressRecord: (data) =>
      dispatch(customerAction.createCustomerAddressRecord(data)),
    getAddressByIdRecord: (id) =>
      dispatch(addressAction.getAddressByIdRecord(id)),
    getAllCountryRecord: () => dispatch(addressAction.getAllCountryRecord()),
    getAllCityRecord: (countryId) =>
      dispatch(addressAction.getAllCityRecord(countryId)),
    getAllAreaRecord: (cityId) =>
      dispatch(addressAction.getAllAreaRecord(cityId)),
    getProductWithSkuRecord: (productSku) =>
      dispatch(customerAction.getProductWithSkuRecord(productSku)),
    createOrderRecord: (data) =>
      dispatch(customerAction.createOrderRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createOrderContainer);
