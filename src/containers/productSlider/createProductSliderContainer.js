import React, { Component } from "react";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as productSliderAction from "../../store/actions/productSliderAction";
import CreateProductSlider from "../../components/productSlider/CreateProductSlider";

////////////////END////////////////////////////////////////////////////////////////

class createProductSliderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderId: "",
      sliderName: "",
      imageName: "",
      file: "", // to store the Single pictures in base64 format.
      files: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.clearData = this.clearData.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "sliderId":
        this.setState({ sliderId: target.value });
        break;

      case "sliderName":
        this.setState({ sliderName: target.value });
        break;

      default:
    }
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

  checkValidation = async (e) => {
    //////debugger;
    if (this.state.sliderName === "") {
      let msg = "Please Enter Slider Name";
      toast(msg);
      return;
    } else {
      await this.saveProductSlider(e);
    }
  };

  saveProductSlider = async (e) => {
    //////debugger;
    e.preventDefault();
    const data = {
      sliderId: this.state.sliderId,
      sliderName: this.state.sliderName,
      imageName: this.state.imageName,
    };

    if (data.sliderId === "") {
      data.sliderId = 0;
    }

    var result = await this.props.createProductSliderRecord(data);
    //////debugger;
    toast(result);
  };

  clearData = () => {
    this.setState({
      sliderId: "",
      sliderName: "",
    });
  };

  render() {
    const { sliderId, sliderName, imageName } = this.state;
    const values = { sliderId, sliderName, imageName };
    return (
      <div id="wrapper">
        <CreateProductSlider
          key="CreateProductSlider"
          name="Add PRODUCT SLIDER"
          {...this.state}
          values={values}
          handleChange={this.handleChange}
          checkValidation={this.checkValidation}
          clearData={this.clearData}
          fileSelectedHandler={this.fileSelectedHandler}
        />
        <ToastContainer position="bottom-right" rtl={false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.productSliderReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createProductSliderRecord: (data) =>
      dispatch(productSliderAction.createProductSliderRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createProductSliderContainer);
