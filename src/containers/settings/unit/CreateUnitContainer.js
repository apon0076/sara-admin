import React, { Component } from "react";
import CreateUnit from "../../../components/settings/unit/CreateUnit";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as unitAction from "../../../store/actions/unitAction";
// import { createUnitRecord } from "../../../store/actions/unitAction";
// import unitReducer from "../../../store/reducers/unitReducer";

////////////////END/////////////////

class CreateUnitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitId: "",
      unitName: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveUnit = this.saveUnit.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = () => {
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveUnit(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "unitId":
        this.setState({ unitId: target.value });
        break;

      case "unitName":
        this.setState({ unitName: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  saveUnit = async (e) => {
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
      unitId: this.state.unitId,
      unitName: this.state.unitName,
      activeYn: "Y",
    };

    if (data.unitId === "") {
      data.unitId = 0;
    }

    await this.props.createUnitRecord(data);

    this.clearData(e);
  };

  editUnit = (id, name, activeYn) => {
    //////debugger;

    if (activeYn === "Y") {
      this.setState({ activeYn: this.state.checked });
    } else {
      this.setState({ activeYn: this.state.unchecked });
    }

    this.setState({ unitId: id, unitName: name });
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      unitId: "",
      unitName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateUnit
          key="CreateUnit"
          name="Add Unit"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          saveUnit={this.saveUnit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.unitReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createUnitRecord: (data) => dispatch(unitAction.createUnitRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUnitContainer);
