import React, { Component } from "react";
import CreatePopUp from "../../components/popUp/CreatePopUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as popUpAction from "../../store/actions/popUpAction";
////////////////END////////////////////////////////////////////////////////////////

class createPopUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerId: "",
      bannerName: "",
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
      case "bannerId":
        this.setState({ bannerId: target.value });
        break;

      case "bannerName":
        this.setState({ bannerName: target.value });
        break;

      default:
    }
  };
  fileSelectedHandler = (e) => {
    //////debugger;
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
    //////debugger;
    if (this.state.bannerName === "") {
      let msg = "Please select Banner Name";
      toast(msg);
      return;
    } else {
      await this.savePopUp(e);
    }
  };

  savePopUp = async (e) => {
    //////debugger;
    e.preventDefault();

    const data = {
      bannerId: this.state.bannerId,
      bannerName: this.state.bannerName,
      imageName: this.state.imageName,
    };

    if (data.bannerId === "") {
      data.bannerId = 0;
    }

    await this.props.createPopUpRecord(data);
  };

  clearData = () => {
    this.setState({
      bannerId: "",
      bannerName: "",
    });
  };

  render() {
    const { 
      bannerId, 
      bannerName, 
      imageName 
    } = this.state;

    const values = { 
      bannerId, 
      bannerName, 
      imageName 
    };

    return (
      <div id="wrapper">
        <CreatePopUp
          key="CreatePopUp"
          name="Add POPUP BANNER"
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
  data: state.popUpReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createPopUpRecord: (data) => 
      dispatch(popUpAction.createPopUpRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createPopUpContainer);
