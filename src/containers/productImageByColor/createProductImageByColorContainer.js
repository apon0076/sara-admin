import React, { Component } from "react";
import CreateProductImageByColor from "../../components/productImageByColor/CreateProductImageByColor";

////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as productImageByColorAction from "../../store/actions/productImageByColorAction";
// import { createProductImageByColorRecord } from "../../store/actions/productImageByColorAction";
// import productImageByColorReducer from "../../store/reducers/productImageByColorReducer";

///////////////Bellow part is used for to load Size Dropdown////////////////////
// import * as colorAction from "../../store/actions/colorAction";
// import { getColorRecord } from "../../store/actions/colorAction";
// import colorReducer from "../../store/reducers/colorReducer";
////////////////////////END/////////////////////////////////////////////////////////

///////////////Bellow part is used for to load Product SKU Dropdown////////////////////
import * as productAction from "../../store/actions/productAction";
// import { getProductRecord } from "../../store/actions/productAction";
// import productReducer from "../../store/reducers/productReducer";
////////////////////////END/////////////////////////////////////////////////////////

class createProductImageByColorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: 0,
      colorId: "",
      productId: "",
      productSku: "",
      file: "", // to store the Single pictures in base64 format.
      imageName: null, //Product Base Image
      primaryImage: null,
      items: [],
      inventoryItems: [],
      rows: [0],
      files: [], // to store the Multile pictures in base64 format.
      multiProductImages: [],
      colorDetails: "",
      imageDetails: "",
      productImageByColorDetails: "",
    };
    //////debugger;
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    this.clearData = this.clearData.bind(this);
    this.saveProductImage = this.saveProductImage.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileMultiSelectedHandler = this.fileMultiSelectedHandler.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
  }
  componentDidMount = async () => {
    //////debugger;

    await this.props.getProductRecord();
    //await this.props.getColorRecord();
  };

  handleChange2 = (e) => {
    //////debugger;

    const { target } = e;

    switch (target.name) {
      case "imageId":
        this.setState({ imageId: target.value });
        break;

      case "productId":
        this.setState({ productId: target.value });
        let searchBy = target.value;
        if (searchBy === "Select Sku") {
          this.props.getColorRecord();
        } else {
          this.props.getColorByProductIdRecord(searchBy);
        }
        break;

      default:
    }
  };

  handleChange = (idx) => (e) => {
    //////debugger;
    const { name, value } = e.target;
    const { target } = e;

    switch (target.name) {
      case "colorId":
        this.setState({ colorId: target.value });
        break;
      default:
    }
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });

    this.setState((prevState) => ({
      items: [...prevState.items, target.name, target.value],
    }));

    const { items } = this.state;

    items.push({ colorId: target.value });
    //items.push({ name: target.name, value: target.value });

    //items[1].name = e.target.value;
    this.setState({
      items,
    });
  };

  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };

  handleAddRow = (e) => {
    e.preventDefault();
    //////debugger;
    const item = {
      colorId: "",
      imageName: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };

  fileSelectedHandler = (e) => {
    //////debugger;
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = (e) => {
      this.setState({ file: file, imageName: reader.result });
      this.imageName = e.target.result;
      this.setState({ imageName: e.target.result });
    };
    reader.readAsDataURL(file);
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
          inventoryItems: [...prevState.inventoryItems, this.state.colorId],
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

      colorDetails: this.state.items,
      multiProductImages: this.state.multiProductImages,
      inventoryItems: this.state.inventoryItems,
    };

    let myItems = [];
    data.multiProductImages.forEach((item, i) => {
      myItems.push({
        colorId: this.state.inventoryItems[i],
        imageName: item,
      });
    });

    data.productImageByColorDetails = myItems;

    if (data.imageId === "") {
      data.imageId = 0;
    }

    await this.props.createProductImageByColorRecord(data);
    this.clearData(e);
  };

  render() {
    return (
      <div id="wrapper">
        <CreateProductImageByColor
          key="CreateProductImageByColor"
          name="Add Product Images By Color"
          {...this.state}
          handleChange={this.handleChange}
          handleChange2={this.handleChange2}
          saveProductImage={this.saveProductImage}
          values={this.values}
          products={this.props.products}
          productImgColors={this.props.productImgColors}
          fileSelectedHandler={this.fileSelectedHandler}
          fileMultiSelectedHandler={this.fileMultiSelectedHandler}
          handleAddRow={this.handleAddRow}
          handleRemoveRow={this.handleRemoveRow}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  productImgColors: state.productImageByColorReducer.productImgColors,
  data: state.productImageByColorReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductRecord: () => dispatch(productAction.getProductRecord()),
    getColorByProductIdRecord: (id) =>
      dispatch(productImageByColorAction.getColorByProductIdRecord(id)),
    createProductImageByColorRecord: (data) =>
      dispatch(productImageByColorAction.createProductImageByColorRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createProductImageByColorContainer);
