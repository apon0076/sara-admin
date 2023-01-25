import React, { Component } from "react";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
///////////////Bellow part is used for to load Size Dropdown////////////////////
/* import * as colorAction from "../../store/actions/colorAction";
import { getColorRecord } from "../../store/actions/colorAction";
import colorReducer from "../../store/reducers/colorReducer"; */
////////////////////////END/////////////////////////////////////////////////////////
///////////////Bellow part is used for to load Product SKU Dropdown////////////////////
import * as productAction from "../../store/actions/productAction";
////////////////END/////////////////////////////////////////////////////////////////
import * as productImageAction from "../../store/actions/productImageAction";
import CreateProductImage from "../../components/productImage/CreateProductImage";

////////////////////////END/////////////////////////////////////////////////////////

class createProductImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: 0,
      colorId: "",
      imageName: "",
      productId: "",
      productSku: "",
      // colorId: "",
      file: "", // to store the Single pictures in base64 format.
      //  imageName: null, //Product Base Image

      files: [], // to store the Multile pictures in base64 format.
      multiProductImages: [],
    };
    //////debugger;
    this.handleChange = this.handleChange.bind(this);
    this.clearData = this.clearData.bind(this);
    this.saveProductImage = this.saveProductImage.bind(this);
    this.fileMultiSelectedHandler = this.fileMultiSelectedHandler.bind(this);
  }
  componentDidMount = async () => {
    //////debugger;

    await this.props.getProductRecord();
    //await this.props.getColorRecord();
  };

  handleChange = async (e) => {
    //////debugger;
    // let searchBy = "";
    const { target } = e;
    switch (target.name) {
      case "imageId":
        this.setState({ imageId: target.value });
        break;

      case "productId":
        this.setState({ productId: target.value });
        /*    searchBy = target.value;
        if (searchBy === "Select Sku") {
          this.props.getColorRecord();
        } else {
          this.props.getColorByProductIdRecord(searchBy);
        } */
        break;

      case "productSku":
        this.setState({ productSku: target.value });
        break;

      default:
    }
  };

  /*   fileSelectedHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = (e) => {
      this.setState({ file: file, imageName: reader.result });
      this.imageName = e.target.result;
      this.setState({ imageName: e.target.result });
    };
    reader.readAsDataURL(file);
  }; */

  fileMultiSelectedHandler = (e) => {
    //////debugger;
    e.preventDefault();
    //FileList to Array
    let files = Array.from(e.target.files);
    //file reader for each file and update state arrays
    files.forEach((file, i) => {
      let reader = new FileReader();
      reader.onload = () => {
        this.setState((prevState) => ({
          files: [...prevState.files, file],
          multiProductImages: [...prevState.multiProductImages, reader.result],
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      productId: "",
      productSku: "",
      colorId: "",
    });
  };

  saveProductImage = async (e) => {
    //////debugger;
    e.preventDefault();

    const data = {
      imageId: this.state.imageId,
      productId: this.state.productId,
      // colorId: this.state.colorId,
      imageName: this.state.imageName,
    };

    let myImagesItems = [];
    this.state.multiProductImages.forEach((item) => {
      myImagesItems.push({
        imageName: item,
        productImageId: 0,
      });
    });

    if (data.imageId === "") {
      data.imageId = 0;
    }

    var result = await this.props.createProductImageRecord(data);
    toast.info(result.payload.success.data.message);
    this.clearData(e);
  };

  render() {
    return (
      <div id="wrapper">
        <CreateProductImage
          key="CreateProductImage"
          name="Add Product Images"
          {...this.state}
          handleChange={this.handleChange}
          saveProductImage={this.saveProductImage}
          values={this.values}
          products={this.props.products}
          colors={this.props.colors}
          fileMultiSelectedHandler={this.fileMultiSelectedHandler}
        />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  /*  colors: state.colorReducer.colors, */
  data: state.productReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductRecord: () => dispatch(productAction.getProductRecord()),
    /*     getColorRecord: () => dispatch(colorAction.getColorRecord()),
    getColorByProductIdRecord: (id) => dispatch(productAction.getColorByProductIdRecord(id)), */
    createProductImageRecord: (data) =>
      dispatch(productImageAction.createProductImageRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createProductImageContainer);
