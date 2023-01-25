import React, { Component } from "react";
import ProductImageList from "../../components/productImage/ProductImageList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as productImageAction from "../../store/actions/productImageAction";
// import {
//   getProductImageRecord,
//   getProductImageByIdRecord,
//   deleteProductImageRecord,
// } from "../../store/actions/productImageAction";
// import productImageReducer from "../../store/reducers/productImageReducer";

////////////////END/////////////////

class productImageListContainer extends Component {
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
          await this.props.getProductImageRecord();
        } else {
          await this.props.getProductImageByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getProductImageRecord();
  };

  deleteProductImage = async (id) => {
    //////debugger;

    await this.props.deleteProductImageRecord(id);
    await this.props.getProductImageRecord();
  };

  render() {
    return (
      <ProductImageList
        key="ProductImageList"
        {...this.state}
        productImages={this.props.productImages}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteProductImage={this.deleteProductImage}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  productImages: state.productImageReducer.productImages,
  loading: state.productImageReducer.loading,
  error: state.productImageReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteBrand: state.deleteBrand,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductImageRecord: () =>
      dispatch(productImageAction.getProductImageRecord()),
    getProductImageByIdRecord: (index) =>
      dispatch(productImageAction.getProductImageByIdRecord(index)),
    deleteProductImageRecord: (index) =>
      dispatch(productImageAction.deleteProductImageRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productImageListContainer);
