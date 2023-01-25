import React, { Component } from "react";
import EditUnit from "../../../components/settings/unit/EditUnit";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as unitAction from "../../../store/actions/unitAction";
// import { updateUnitRecord } from "../../../store/actions/unitAction";
// import unitReducer from "../../../store/reducers/unitReducer";

////////////////END/////////////////

class editUnitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitId: "",
      unitName: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = () => {
    //////debugger;

    this.setState({
      unitId: this.props.match.params.id,
      unitName: this.props.match.params.name,
      activeYn: this.props.match.params.activeYn,
    });

    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.updateUnit(e);
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

  updateUnit = async (e) => {
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

    await this.props.updateUnitRecord(data);
    this.clearData(e);
    this.props.history.push("/UnitList");
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
        <EditUnit
          key="EditUnit"
          name="Update Unit"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          updateUnit={this.updateUnit}
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
    updateUnitRecord: (data) => dispatch(unitAction.updateUnitRecord(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(editUnitContainer);
