import React, { Component } from "react";
import EditVendor from "../../../components/settings/vendor/EditVendor";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as vendorAction from "../../../store/actions/vendorAction";
// import {
//   getVendorByIdRecord,
//   updateVendorRecord,
// } from "../../../store/actions/vendorAction";
// import vendorReducer from "../../../store/reducers/vendorReducer";

///////////////////////////////END/////////////////////////////////////////

///////////////Bellow part is used for to load BussinessType Dropdown////////////////////
import * as bussinessTypeAction from "../../../store/actions/bussinessTypeAction";
// import { getBussinessTypeByIdRecord } from "../../../store/actions/bussinessTypeAction";
// import bussinessTypeReducer from "../../../store/reducers/bussinessTypeReducer";
////////////////////////END/////////////////////////////////////////////////////////

class editVendorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorId: "",
      vendorName: "",
      bussinessTypeId: "",
      binNo: "",
      city: "",
      state: "",
      zipCode: "",
      url: "",
      contactNo: "",
      email: "",
      address: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateVendor = this.updateVendor.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = async () => {
    //////debugger;
    await this.props.getVendorByIdRecord(this.props.match.params.id);

    this.props.vendors.forEach((element) => {
      this.setState({
        vendorId: element.vendorId,
        vendorName: element.vendorName,
        bussinessTypeId: element.bussinessTypeId,
        binNo: element.binNo,
        city: element.city,
        state: element.state,
        zipCode: element.zipCode,
        url: element.url,
        contactNo: element.contactNo,
        email: element.email,
        address: element.address,
        activeYn: element.activeYn,
      });
    });

    await this.props.getBussinessTypeByIdRecord(this.state.bussinessTypeId);

    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.updateVendor(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "vendorId":
        this.setState({ vendorId: target.value });
        break;

      case "vendorName":
        this.setState({ vendorName: target.value });
        break;

      case "bussinessTypeId":
        this.setState({ bussinessTypeId: target.value });
        break;

      case "binNo":
        this.setState({ binNo: target.value });
        break;
      case "city":
        this.setState({ city: target.value });
        break;

      case "state":
        this.setState({ state: target.value });
        break;

      case "zipCode":
        this.setState({ zipCode: target.value });
        break;
      case "url":
        this.setState({ url: target.value });
        break;

      case "contactNo":
        this.setState({ contactNo: target.value });
        break;

      case "email":
        this.setState({ email: target.value });
        break;

      case "address":
        this.setState({ address: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  updateVendor = async (e) => {
    e.preventDefault();
    //////debugger;
    /*     let isActive = "";
                let isChecked = this.activeYn.current.checked;
                if (isChecked === true) {
                  isActive = "Y";
                } else {
                  isActive = "N";
                } */
    //var result = this.validate(this.state.categoryName);

    const data = {
      vendorId: this.state.vendorId,
      vendorName: this.state.vendorName,
      bussinessTypeId: this.state.bussinessTypeId,
      binNo: this.state.binNo,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      url: this.state.url,
      contactNo: this.state.contactNo,
      email: this.state.email,
      address: this.state.address,
      activeYn: "Y",
    };

    if (data.vendorId === "") {
      data.vendorId = 0;
    }

    await this.props.updateVendorRecord(data);

    this.clearData(e);
    this.props.history.push("/VendorList");
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      vendorId: "",
      vendorName: "",
      bussinessTypeId: "",
      binNo: "",
      city: "",
      state: "",
      zipCode: "",
      url: "",
      contactNo: "",
      email: "",
      address: "",
      activeYn: "",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <EditVendor
          key="EditVendor"
          name="Update Vendor"
          {...this.state}
          vendors={this.props.vendors}
          bussinessTypes={this.props.bussinessTypes}
          handleChange={this.handleChange}
          values={this.values}
          updateVendor={this.updateVendor}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  vendors: state.vendorReducer.vendors,
  bussinessTypes: state.bussinessTypeReducer.bussinessTypes,
  data: state.vendorReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBussinessTypeByIdRecord: (index) =>
      dispatch(bussinessTypeAction.getBussinessTypeByIdRecord(index)),
    getVendorByIdRecord: (index) =>
      dispatch(vendorAction.getVendorByIdRecord(index)),
    updateVendorRecord: (data) =>
      dispatch(vendorAction.updateVendorRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editVendorContainer);
