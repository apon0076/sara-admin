import React, { Component } from "react";
import CreateVendor from "../../../components/settings/vendor/CreateVendor";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as vendorAction from "../../../store/actions/vendorAction";
// import { createVendorRecord } from "../../../store/actions/vendorAction";
// import vendorReducer from "../../../store/reducers/vendorReducer";

///////////////////////////////END/////////////////////////////////////////

///////////////Bellow part is used for to load BussinessType Dropdown////////////////////
import * as bussinessTypeAction from "../../../store/actions/bussinessTypeAction";
// import { getBussinessTypeRecord } from "../../../store/actions/bussinessTypeAction";
// import bussinessTypeReducer from "../../../store/reducers/bussinessTypeReducer";
////////////////////////END/////////////////////////////////////////////////////////

class createVendorContainer extends Component {
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
    this.saveVendor = this.saveVendor.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = async () => {
    //////debugger;
    await this.props.getBussinessTypeRecord();
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveVendor(e);
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

  saveVendor = async (e) => {
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

    await this.props.createVendorRecord(data);

    this.clearData(e);
  };

  editVendor = (id, name, activeYn) => {
    //////debugger;

    if (activeYn === "Y") {
      this.setState({ activeYn: this.state.checked });
    } else {
      this.setState({ activeYn: this.state.unchecked });
    }

    this.setState({ categoryId: id, categoryName: name });
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
        <CreateVendor
          key="CreateVendor"
          name="Add Vendor"
          {...this.state}
          bussinessTypes={this.props.bussinessTypes}
          handleChange={this.handleChange}
          values={this.values}
          saveVendor={this.saveVendor}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bussinessTypes: state.bussinessTypeReducer.bussinessTypes,
  data: state.vendorReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBussinessTypeRecord: () =>
      dispatch(bussinessTypeAction.getBussinessTypeRecord()),

    createVendorRecord: (data) =>
      dispatch(vendorAction.createVendorRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createVendorContainer);
