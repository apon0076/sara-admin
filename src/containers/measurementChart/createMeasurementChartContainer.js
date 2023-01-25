import React, { Component } from "react";
import CreateMeasurementChart from "../../components/measurementChart/CreateMeasurementChart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as measurementChartAction from "../../store/actions/measurementChartAction";
////////////////END////////////////////////////////////////////////////////////////

///////////////Bellow part is used for to load category Dropdown////////////////////
import * as categoryAction from "../../store/actions/categoryAction";
////////////////////////END/////////////////////////////////////////////////////////

///////////////Bellow part is used for to load Sub Sub category Dropdown////////////////////
import * as subCategoryAction from "../../store/actions/subCategoryAction";
// import {
//   getSubCategoryRecord,
//   getSubCategoryByIdRecord,
// } from "../../store/actions/subCategoryAction";
// import subCategoryReducer from "../../store/reducers/subCategoryReducer";
////////////////////////END/////////////////////////////////////////////////////////

class createMeasurementChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesurementChartId: "",
      categoryId: "",
      subCategoryId: "",
      file: "", // to store the Single pictures in base64 format.
      imageName: null, //Product Sub Image According to color
      files: [], // to store the Multile pictures in base64 format.
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = async () => {
    await this.props.getCategoryRecord();
    await this.props.getSubCategoryRecord();
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "mesurementChartId":
        this.setState({ 
          mesurementChartId: target.value 
        });
        break;

      case "categoryId":
        this.setState({ 
          categoryId: target.value 
        });
        break;

      case "subCategoryId":
        this.setState({ 
          subCategoryId: target.value 
        });
        break;

      default:
    }
  };

  fileSelectedHandler = (e) => {

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = (e) => {
      this.setState({ 
        file: file, 
        imageName: reader.result 
      });
      this.imageName = e.target.result;
      this.setState({ 
        imageName: e.target.result 
      });
    };
    reader.readAsDataURL(file);
  };

  checkValidation = async (e) => {

    if (this.state.categoryId === "") {
      let msg = "Please select category Name";
      toast(msg);
      return;
    } else if (this.state.subCategoryId === "") {
      let msg = "Please select sub category Name";
      toast(msg);
      return;
    } else {
      await this.saveMeasurementChart(e);
    }
  };

  saveMeasurementChart = async (e) => {
    e.preventDefault();

    const data = {
      mesurementChartId: this.state.mesurementChartId,
      categoryId: this.state.categoryId,
      subCategoryId: this.state.subCategoryId,
      imageName: this.state.imageName,
    };

    if (data.mesurementChartId === "") {
      data.mesurementChartId = 0;
    }

    let result = await this.props.createMeasurementChartRecord(data);

    if (result === "Success") {
      let msg = "Inserted Successfully";
      toast(msg);
    }

    this.clearData(e);
  };

  clearData = (e) => {
    e.preventDefault();
    
    this.setState({
      mesurementChartId: "",
      categoryId: "",
      subCategoryId: "",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateMeasurementChart
          key="CreateMeasurementChart"
          name="Add Measurement"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          categories={this.props.categories}
          subCategories={this.props.subCategories}
          fileSelectedHandler={this.fileSelectedHandler}
          checkValidation={this.checkValidation}
        />

        <ToastContainer position="bottom-right" rtl={false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  subCategories: state.subCategoryReducer.subCategories,
  data: state.measurementChartReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryRecord: () => 
      dispatch(categoryAction.getCategoryRecord()),
    getSubCategoryRecord: () =>
      dispatch(subCategoryAction.getSubCategoryRecord()),
    createMeasurementChartRecord: (data) =>
      dispatch(measurementChartAction.createMeasurementChartRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createMeasurementChartContainer);
