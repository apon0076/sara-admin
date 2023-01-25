import React, { Component } from "react";
import EditAttribute from "../../../components/settings/attribute/EditAttribute";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as attributeAction from "../../../store/actions/attributeAction";
// import { updateAttributeRecord } from "../../../store/actions/attributeAction";
// import attributeReducer from "../../../store/reducers/attributeReducer";

////////////////END/////////////////

class editAttributeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeId: "",
      attributeName: "",
      activeYn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateAttribute = this.updateAttribute.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = () => {
    //////debugger;
    this.setState({
      attributeId: this.props.match.params.id,
      attributeName: this.props.match.params.name,
      activeYn: (this.props.match.params.activeYn = "Y" ? true : false),
    });
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveAttribute(e);
    }
  };

  handleChange = (e) => {
    //////debugger;
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

  updateAttribute = async (e) => {
    e.preventDefault();
    //////debugger;
    const data = {
      attributeId: this.state.attributeId,
      attributeName: this.state.attributeName,
      activeYn: (this.state.activeYn = true ? "Y" : "N"),
    };

    if (data.attributeId === "") {
      data.attributeId = 0;
    }

    await this.props.updateAttributeRecord(data);

    this.clearData(e);
    this.props.history.push("/AttributeList");
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
        <EditAttribute
          key="EditAttribute"
          name="Update Attribute"
          buttonName="Update"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          updateAttribute={this.updateAttribute}
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
    updateAttributeRecord: (data) =>
      dispatch(attributeAction.updateAttributeRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editAttributeContainer);
