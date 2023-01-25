import React, { Component } from "react";
import UnitList from "../../../components/settings/unit/UnitList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as unitAction from "../../../store/actions/unitAction";
// import {
//   getUnitRecord,
//   getUnitByIdRecord,
//   deleteUnitRecord,
// } from "../../../store/actions/unitAction";
// import unitReducer from "../../../store/reducers/unitReducer";

////////////////END/////////////////

class UnitListContainer extends Component {
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
          await this.props.getUnitRecord();
        } else {
          await this.props.getUnitByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getUnitRecord();
  };

  deleteUnit = async (id) => {
    //////debugger;

    await this.props.deleteUnitRecord(id);
    await this.props.getUnitRecord();
  };

  render() {
    return (
      <UnitList
        key="UnitList"
        {...this.state}
        units={this.props.units}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteUnit={this.deleteUnit}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  units: state.unitReducer.units,
  loading: state.unitReducer.loading,
  error: state.unitReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteBrand: state.deleteBrand,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUnitRecord: () => dispatch(unitAction.getUnitRecord()),
    getUnitByIdRecord: (index) => dispatch(unitAction.getUnitByIdRecord(index)),
    deleteUnitRecord: (index) => dispatch(unitAction.deleteUnitRecord(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitListContainer);
