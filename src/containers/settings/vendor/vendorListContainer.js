import React, { Component } from "react";
import VendorList from "../../../components/settings/vendor/VendorList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as vendorAction from "../../../store/actions/vendorAction";
// import {
//   getVendorRecord,
//   getVendorByIdRecord,
//   deleteVendorRecord,
// } from "../../../store/actions/vendorAction";
// import vendorReducer from "../../../store/reducers/vendorReducer";

////////////////END/////////////////

class vendorListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "searchId":
        //////debugger;
        this.setState({ searchId: target.value });
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getVendorRecord();
        } else {
          await this.props.getVendorByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getVendorRecord();
  };

  deleteVendor = async (id) => {
    //////debugger;
    await this.props.deleteVendorRecord(id);
    await this.props.getVendorRecord();
  };

  render() {
    return (
      <VendorList
        key="VendorList"
        {...this.state}
        vendors={this.props.vendors}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteVendor={this.deleteVendor}
      />
    );
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  vendors: state.vendorReducer.vendors,
  loading: state.vendorReducer.loading,
  error: state.vendorReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteVendor: state.deleteVendor,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getVendorRecord: () => dispatch(vendorAction.getVendorRecord()),
    getVendorByIdRecord: (index) =>
      dispatch(vendorAction.getVendorByIdRecord(index)),
    deleteVendorRecord: (index) =>
      dispatch(vendorAction.deleteVendorRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(vendorListContainer);
