import React, { Component } from "react";
import BussinessTypeList from "../../../components/settings/bussinessType/BussinessTypeList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as bussinessTypeAction from "../../../store/actions/bussinessTypeAction";
// import {
//   getBussinessTypeRecord,
//   getBussinessTypeByIdRecord,
//   deleteBussinessTypeRecord,
// } from "../../../store/actions/bussinessTypeAction";
// import bussinessTypeReducer from "../../../store/reducers/bussinessTypeReducer";

////////////////END/////////////////

class bussinessTypeListContainer extends Component {
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
          await this.props.getBussinessTypeRecord();
        } else {
          await this.props.getBussinessTypeByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getBussinessTypeRecord();
  };

  deleteBussinessType = async (id) => {
    //////debugger;

    await this.props.deleteBussinessTypeRecord(id);
    await this.props.getBussinessTypeRecord();
  };

  render() {
    return (
      <BussinessTypeList
        key="BussinessTypeList"
        {...this.state}
        bussinessTypes={this.props.bussinessTypes}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteBussinessType={this.deleteBussinessType}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  bussinessTypes: state.bussinessTypeReducer.bussinessTypes,
  loading: state.bussinessTypeReducer.loading,
  error: state.bussinessTypeReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteBussinessType: state.deleteBussinessType,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBussinessTypeRecord: () =>
      dispatch(bussinessTypeAction.getBussinessTypeRecord()),
    getBussinessTypeByIdRecord: (index) =>
      dispatch(bussinessTypeAction.getBussinessTypeByIdRecord(index)),
    deleteBussinessTypeRecord: (index) =>
      dispatch(bussinessTypeAction.deleteBussinessTypeRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bussinessTypeListContainer);
