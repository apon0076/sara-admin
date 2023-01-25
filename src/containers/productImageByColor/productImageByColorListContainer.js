import React, { Component } from "react";
import ProductImageByColorList from "../../components/productImageByColor/ProductImageByColorList";

////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as productImageByColorAction from "../../store/actions/productImageByColorAction";
// import {
//   getProductImageByColorRecord,
//   getProductImageByColorByIdRecord,
// } from "../../store/actions/productImageByColorAction";
// import productImageByColorReducer from "../../store/reducers/productImageByColorReducer";

class productImageByColorListContainer extends Component {
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
        this.setState({ searchId: target.value });

        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getProductImageByColorRecord();
        } else {
          await this.props.getProductImageByColorByIdRecord(searchBy);
        }

        break;
      default:
    }
  };

  componentDidMount = async () => {
    await this.props.getProductImageByColorRecord();
  };
  render() {
    return (
      <ProductImageByColorList
        key="ProductImageByColorList"
        name="Add Product Images By Color"
        {...this.state}
        values={this.values}
        productImgColors={this.props.productImgColors}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  productImgColors: state.productImageByColorReducer.productImgColors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductImageByColorRecord: () =>
      dispatch(productImageByColorAction.getProductImageByColorRecord()),

    getProductImageByColorByIdRecord: (id) =>
      dispatch(productImageByColorAction.getProductImageByColorByIdRecord(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productImageByColorListContainer);
