import React, { Component } from "react";
import CreateSecondaryImage from "../../components/secondaryImage/CreateSecondaryImage";

////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
////////////////END/////////////////////////////////////////////////////////////////
import * as secondaryImageAction from "../../store/actions/secondaryImageAction";
// import { createSecondaryImageRecord } from "../../store/actions/secondaryImageAction";
// import secondaryImageReducer from "../../store/reducers/secondaryImageReducer";

///////////////Bellow part is used for to load Product SKU Dropdown////////////////////
import * as productAction from "../../store/actions/productAction";
// import { getProductRecord } from "../../store/actions/productAction";
// import productReducer from "../../store/reducers/productReducer";
import { toast, ToastContainer } from "react-toastify";

////////////////////////END/////////////////////////////////////////////////////////

class createSecondaryImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: "",
      productId: "",
      firstImageName: "",
      secondImageName: "",
      thirdImageName: "",
      fourthImageName: "",

      imageName: [], //Product Sub Image According to color
      files: [], // to store the Multile pictures in base64 format.
      multiProductImages: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearData = this.clearData.bind(this);
    this.saveProductImage = this.saveProductImage.bind(this);
  }

  componentDidMount = async () => {
    await this.props.getProductRecord();
  };

  handleChange = (e) => {
    //////debugger;

    const { target } = e;
    switch (target.name) {
      case "imageId":
        this.setState({ imageId: target.value });
        break;

      case "productId":
        this.setState({ productId: target.value });
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
      imageId: "",
      imageName: "",
    });
  };

  saveProductImage = async (e) => {
    //////debugger;
    e.preventDefault();

    let length = this.state.multiProductImages.length;
    if (length > 4 || length < 4) {
      let msg = "Please select four images!!!";
      toast(msg);
      return;
    }

    this.state.firstImageName = this.state.multiProductImages[0];
    this.state.secondImageName = this.state.multiProductImages[1];
    this.state.thirdImageName = this.state.multiProductImages[2];
    this.state.fourthImageName = this.state.multiProductImages[3];

    const data = {
      imageId: this.state.imageId,
      productId: this.state.productId,
      firstImageName: this.state.firstImageName,
      secondImageName: this.state.secondImageName,
      thirdImageName: this.state.thirdImageName,
      fourthImageName: this.state.fourthImageName,
    };

    if (data.productImageId === "") {
      data.productImageId = 0;
    }

    if (data.imageId === "") {
      data.imageId = 0;
    }

    var result = await this.props.createSecondaryImageRecord(data);
    toast.info(result.type);
    //toast.info(result.payload.success.data.message);
    this.clearData(e);
  };

  render() {
    return (
      <div id="wrapper">
        <CreateSecondaryImage
          key="CreateSecondaryImage"
          name="Add Product Images"
          {...this.state}
          handleChange={this.handleChange}
          saveProductImage={this.saveProductImage}
          values={this.values}
          images={this.props.images}
          products={this.props.products}
          fileMultiSelectedHandler={this.fileMultiSelectedHandler}
        />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  images: state.secondaryImageReducer.images,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductRecord: () => dispatch(productAction.getProductRecord()),
    createSecondaryImageRecord: (data) =>
      dispatch(secondaryImageAction.createSecondaryImageRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createSecondaryImageContainer);
