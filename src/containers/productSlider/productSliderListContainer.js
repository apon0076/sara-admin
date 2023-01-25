import React, { Component } from "react";
import ProductSliderList from "../../components/productSlider/ProductSliderList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as productSliderAction from "../../store/actions/productSliderAction";
// import {
//   getProductSliderRecord,
//   getProductByIdRecord,
//   deleteProductSliderRecord,
// } from "../../store/actions/productSliderAction";
// import productSliderReducer from "../../store/reducers/productSliderReducer";

////////////////END/////////////////

class productSliderListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteProductSlider = this.deleteProductSlider.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "searchId":
        //////debugger;
        this.setState({ searchId: target.value });
        //////debugger;
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getProductSliderRecord();
        } else {
          await this.props.getProductSliderByIdRecord(searchBy);
        }

        break;
      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getProductSliderRecord();
  };

  deleteProductSlider = async (id, imageName) => {
    //////debugger;

    const data = {
      id: id,
      imageName: imageName,
    };

    await this.props.deleteProductSliderRecord(data);
    await this.props.getProductSliderRecord();
  };

  render() {
    return (
      <ProductSliderList
        key="ProductSliderList"
        {...this.state}
        sliders={this.props.sliders}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteProductSlider={this.deleteProductSlider}
      />
    );
  }
}

// Making available in  props
const mapStateToProps = (state) => ({
  data: state.productSliderReducer.data,
  sliders: state.productSliderReducer.sliders,
  loading: state.productSliderReducer.loading,
  error: state.productSliderReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteProductSlider: state.deleteProductSlider,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductSliderRecord: () =>
      dispatch(productSliderAction.getProductSliderRecord()),
    getProductSliderByIdRecord: (index) =>
      dispatch(productSliderAction.getProductSliderByIdRecord(index)),
    deleteProductSliderRecord: (data) =>
      dispatch(productSliderAction.deleteProductSliderRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productSliderListContainer);
