import React, { Component } from "react";
import EditProductImage from "../../components/productImage/EditProductImage";

////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as productImageAction from "../../store/actions/productImageAction";
// import { updateProductImageRecord } from "../../store/actions/productImageAction";
// import productImageReducer from "../../store/reducers/productImageReducer";

// ////////////////////////END/////////////////////////////////////////////////////////

// ///////////////Bellow part is used for to load Size Dropdown////////////////////
// import * as colorAction from "../../store/actions/colorAction";
// import { getColorRecord } from "../../store/actions/colorAction";
// import colorReducer from "../../store/reducers/colorReducer";
////////////////////////END/////////////////////////////////////////////////////////

class editProductImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImageId: "",
      colorId: "",
      imageType: "",
      productId: "",
      productSku: "",
      colorId: "",
      imageName: [], //Product Sub Image According to color
      files: [], // to store the Multile pictures in base64 format.
      multiProductImages: [],
    };
    //////debugger;
    this.handleChange = this.handleChange.bind(this);
    this.clearData = this.clearData.bind(this);
    this.saveProductImage = this.saveProductImage.bind(this);
  }
  componentDidMount = async () => {
    //////debugger;

    await this.props.getColorRecord();
  };

  handleChange = (e) => {
    //////debugger;
    let searchBy = "";
    const { target } = e;
    switch (target.name) {
      case "productImageId":
        this.setState({ productImageId: target.value });
        break;

      case "colorId":
        this.setState({ colorId: target.value });
        break;

      case "productId":
        this.setState({ productId: target.value });
        break;

      case "productSku":
        this.setState({ productSku: target.value });
        break;

      case "colorId":
        this.setState({ colorId: target.value });
        break;

      case "productImages":
        this.setState({ productImages: target.value });
        break;

      default:
    }
  };

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

  updateProductImage = async (e) => {
    //////debugger;
    e.preventDefault();

    const data = {
      productImageId: this.state.productImageId,
      productSku: this.state.productSku,
      colorId: this.state.colorId,
    };

    let myImagesItems = [];
    this.state.multiProductImages.forEach((item) => {
      myImagesItems.push({
        imageName: item,
        productImageId: 0,
      });
    });

    data.productImages = myImagesItems;

    if (data.productImageId === "") {
      data.productImageId = 0;
    }

    await this.props.updateProductImageRecord(data);
    this.clearData(e);
    this.props.history.push("/ProductList");
  };

  render() {
    return (
      <div id="wrapper">
        <EditProductImage
          key="EditProductImage"
          name="Update Product Images"
          {...this.state}
          handleChange={this.handleChange}
          updateProductImage={this.updateProductImage}
          values={this.values}
          colors={this.props.colors}
          fileMultiSelectedHandler={this.fileMultiSelectedHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  colors: state.colorReducer.colors,
  data: state.productReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getColorRecord: () => dispatch(colorAction.getColorRecord()),
    updateProductImageRecord: (data) =>
      dispatch(productImageAction.updateProductImageRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editProductImageContainer);
