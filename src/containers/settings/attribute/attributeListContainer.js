import React, { Component } from "react";
import AttributeList from "../../../components/settings/attribute/AttributeList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as attributeAction from "../../../store/actions/attributeAction";
// import {
//   getAttributeRecord,
//   getAttributeByIdRecord,
//   deleteAttributeRecord,
// } from "../../../store/actions/attributeAction";
// import attributeReducer from "../../../store/reducers/attributeReducer";

////////////////END/////////////////

class attributeListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "searchId":
        //////debugger;
        this.setState({ searchId: target.value });
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getAttributeRecord();
        } else {
          await this.props.getAttributeByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getAttributeRecord();
  };

  deleteAttribute = async (id) => {
    //////debugger;

    await this.props.deleteAttributeRecord(id);
    await this.props.getAttributeRecord();
  };

  render() {
    return (
      <AttributeList
        key="AttributeList"
        // name="Add Attribute"
        {...this.state}
        name={this.props.name}
        attributes={this.props.attributes}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteAttribute={this.deleteAttribute}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  attributes: state.attributeReducer.attributes,
  loading: state.attributeReducer.loading,
  error: state.attributeReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteAttribute: state.deleteAttribute,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAttributeRecord: () => dispatch(attributeAction.getAttributeRecord()),
    getAttributeByIdRecord: (index) =>
      dispatch(attributeAction.getAttributeByIdRecord(index)),
    deleteAttributeRecord: (index) =>
      dispatch(attributeAction.deleteAttributeRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(attributeListContainer);
