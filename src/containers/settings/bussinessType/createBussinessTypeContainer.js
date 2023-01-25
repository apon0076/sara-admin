import React, { Component } from "react";
import CreateBussinessType from "../../../components/settings/bussinessType/CreateBussinessType";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as bussinessTypeAction from "../../../store/actions/bussinessTypeAction";
// import { createBussinessTypeRecord } from "../../../store/actions/bussinessTypeAction";
// import bussinessTypeReducer from "../../../store/reducers/bussinessTypeReducer";

////////////////END/////////////////

class createBussinessTypeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //bussinessTypeId: "",
      bussinessTypeName: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveBussinessType = this.saveBussinessType.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = () => {
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveBrand(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "bussinessTypeId":
        this.setState({ bussinessTypeId: target.value });
        break;

      case "bussinessTypeName":
        this.setState({ bussinessTypeName: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  saveBussinessType = async (e) => {
    //e.preventDefault();
    //////debugger;
    const data = {
      //bussinessTypeId: this.state.bussinessTypeId,
      bussinessTypeName: e.bussinessTypeName,
      activeYn: "Y",
    };

    // if (data.bussinessTypeId === "") {
    //   data.bussinessTypeId = 0;
    // }

    await this.props.createBussinessTypeRecord(data);

    this.clearData(e);
  };

  editCategory = (id, name, activeYn) => {
    //////debugger;

    if (activeYn === "Y") {
      this.setState({ activeYn: this.state.checked });
    } else {
      this.setState({ activeYn: this.state.unchecked });
    }

    this.setState({ bussinessTypeId: id, bussinessTypeName: name });
  };

  clearData = (e) => {
    //e.preventDefault();
    this.setState({
      //bussinessTypeId: "",
      bussinessTypeName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateBussinessType
          key="CreateBussinessType"
          name="Add Bussiness Type"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          saveBussinessType={this.saveBussinessType}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.bussinessTypeReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createBussinessTypeRecord: (data) =>
      dispatch(bussinessTypeAction.createBussinessTypeRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createBussinessTypeContainer);
