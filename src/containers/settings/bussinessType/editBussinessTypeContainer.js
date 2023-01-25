import React, { Component } from "react";
import EditBussinessTypeList from "../../../components/settings/bussinessType/EditBussinessTypeList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as bussinessTypeAction from "../../../store/actions/bussinessTypeAction";
// import { updateBussinessTypeRecord } from "../../../store/actions/bussinessTypeAction";
// import bussinessTypeReducer from "../../../store/reducers/bussinessTypeReducer";

////////////////END/////////////////

class editBussinessTypeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bussinessTypeId: "",
      bussinessTypeName: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateBussinessType = this.updateBussinessType.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      bussinessTypeId: this.props.match.params.id,
      bussinessTypeName: this.props.match.params.name,
    });
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

  updateBussinessType = async (e) => {
    e.preventDefault();
    //////debugger;
    /*     let isActive = "";
                let isChecked = this.activeYn.current.checked;
                if (isChecked === true) {
                  isActive = "Y";
                } else {
                  isActive = "N";
                } */
    //var result = this.validate(this.state.categoryName);

    const data = {
      bussinessTypeId: this.state.bussinessTypeId,
      bussinessTypeName: this.state.bussinessTypeName,
      activeYn: "Y",
    };

    if (data.bussinessTypeId === "") {
      data.bussinessTypeId = 0;
    }

    await this.props.updateBussinessTypeRecord(data);
    this.clearData(e);
    this.props.history.push("/BussinessTypeList");
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      bussinessTypeId: "",
      bussinessTypeName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <EditBussinessTypeList
          key="EditBussinessTypeList"
          name="Update Bussiness Type"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          updateBussinessType={this.updateBussinessType}
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
    updateBussinessTypeRecord: (data) =>
      dispatch(bussinessTypeAction.updateBussinessTypeRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editBussinessTypeContainer);
