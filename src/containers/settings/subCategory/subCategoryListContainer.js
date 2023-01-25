import React, { Component } from "react";
import SubCategoryList from "../../../components/settings/subCategory/SubCategoryList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as subCategoryAction from "../../../store/actions/subCategoryAction";
// import {
//   getSubCategoryRecord,
//   getSubCategoryByIdRecord,
//   deleteSubCategoryRecord,
// } from "../../../store/actions/subCategoryAction";
// import subCategoryReducer from "../../../store/reducers/subCategoryReducer";

////////////////END/////////////////

class subCategoryListContainer extends Component {
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
          await this.props.getSubCategoryRecord();
        } else {
          await this.props.getSubCategoryByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getSubCategoryRecord();
  };

  deleteSubCategory = async (id) => {
    //////debugger;
    await this.props.deleteSubCategoryRecord(id);
    await this.props.getSubCategoryRecord();
  };

  render() {
    return (
      <SubCategoryList
        key="SubCategoryList"
        {...this.state}
        subCategories={this.props.subCategories}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteSubCategory={this.deleteSubCategory}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  subCategories: state.subCategoryReducer.subCategories,
  loading: state.subCategoryReducer.loading,
  error: state.subCategoryReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteSize: state.deleteSize,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSubCategoryRecord: () =>
      dispatch(subCategoryAction.getSubCategoryRecord()),
    getSubCategoryByIdRecord: (index) =>
      dispatch(subCategoryAction.getSubCategoryByIdRecord(index)),
    deleteSubCategoryRecord: (index) =>
      dispatch(subCategoryAction.deleteSubCategoryRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(subCategoryListContainer);
