import React, { Component } from "react";
import SubSubCategoryList from "../../../components/settings/subSubCategory/SubSubCategoryList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as subSubCategoryAction from "../../../store/actions/subSubCategoryAction";
// import {
//   getSubSubCategoryRecord,
//   getSubSubCategoryByIdRecord,
//   deleteSubSubCategoryRecord,
// } from "../../../store/actions/subSubCategoryAction";
// import subSubCategoryReducer from "../../../store/reducers/subSubCategoryReducer";

////////////////END/////////////////

class subSubCategoryListContainer extends Component {
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
          await this.props.getSubSubCategoryRecord();
        } else {
          await this.props.getSubSubCategoryByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getSubSubCategoryRecord();
  };

  deleteSubSubCategory = async (id) => {
    //////debugger;
    await this.props.deleteSubSubCategoryRecord(id);
    await this.props.getSubSubCategoryRecord();
  };

  render() {
    return (
      <SubSubCategoryList
        key="SubSubCategoryList"
        {...this.state}
        subSubCategories={this.props.subSubCategories}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteSubSubCategory={this.deleteSubSubCategory}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  subSubCategories: state.subSubCategoryReducer.subSubCategories,
  loading: state.subSubCategoryReducer.loading,
  error: state.subSubCategoryReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteSubSubCategory: state.deleteSubSubCategory,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSubSubCategoryRecord: () =>
      dispatch(subSubCategoryAction.getSubSubCategoryRecord()),
    getSubSubCategoryByIdRecord: (index) =>
      dispatch(subSubCategoryAction.getSubSubCategoryByIdRecord(index)),
    deleteSubSubCategoryRecord: (index) =>
      dispatch(subSubCategoryAction.deleteSubSubCategoryRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(subSubCategoryListContainer);
