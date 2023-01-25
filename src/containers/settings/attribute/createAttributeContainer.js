import React, { Component } from "react";
import CreateAttribute from "../../../components/settings/attribute/CreateAttribute";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as attributeAction from "../../../store/actions/attributeAction";
// import { createAttributeRecord } from "../../../store/actions/attributeAction";
// import attributeReducer from "../../../store/reducers/attributeReducer";

////////////////END/////////////////

class createAttributeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeId: "",
      attributeName: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveAttribute = this.saveAttribute.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = () => {
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveAttribute(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "attributeId":
        this.setState({ attributeId: target.value });
        break;

      case "attributeName":
        this.setState({ attributeName: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  saveAttribute = async (e) => {
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
      attributeId: this.state.attributeId,
      attributeName: this.state.attributeName,
      activeYn: "Y",
    };

    if (data.attributeId === "") {
      data.attributeId = 0;
    }

    await this.props.createAttributeRecord(data);

    this.clearData(e);
  };

  editAttribute = (id, name, activeYn) => {
    //////debugger;

    if (activeYn === "Y") {
      this.setState({ activeYn: this.state.checked });
    } else {
      this.setState({ activeYn: this.state.unchecked });
    }

    this.setState({ brandId: id, brandName: name });
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      attributeId: "",
      attributeName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateAttribute
          key="CreateAttribute"
          name="Add Attribute"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          saveAttribute={this.saveAttribute}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.attributeReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createAttributeRecord: (data) =>
      dispatch(attributeAction.createAttributeRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createAttributeContainer);
