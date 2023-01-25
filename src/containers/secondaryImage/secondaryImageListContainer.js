import React, { Component } from "react";
import SecondaryImageList from "../../components/secondaryImage/SecondaryImageList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as secondaryImageAction from "../../store/actions/secondaryImageAction";
// import {
//   getSecondaryImageRecord,
//   getSecondaryImageByIdRecord,
//   deleteSecondaryImageRecord,
// } from "../../store/actions/secondaryImageAction";
// import secondaryImageReducer from "../../store/reducers/secondaryImageReducer";

////////////////END/////////////////

class secondaryImageListContainer extends Component {
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
        //////debugger;
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getSecondaryImageRecord();
        } else {
          await this.props.getSecondaryImageByIdRecord(searchBy);
        }

        break;
      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;

    await this.props.getSecondaryImageRecord();
  };

  deleteProduct = async (
    id,
    firstImageName,
    secondImageName,
    thirdImageName,
    fourthImageName
  ) => {
    //////debugger;

    await this.props.deleteSecondaryImageRecord(
      id,
      firstImageName,
      secondImageName,
      thirdImageName,
      fourthImageName
    );
    await this.props.getSecondaryImageRecord();
  };

  render() {
    return (
      <SecondaryImageList
        key="SecondaryImageList"
        {...this.state}
        secondaryImages={this.props.secondaryImages}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteProduct={this.deleteProduct}
      />
    );
  }
}

// Making available in  props
const mapStateToProps = (state) => ({
  secondaryImages: state.secondaryImageReducer.secondaryImages,
  loading: state.secondaryImageReducer.loading,
  error: state.secondaryImageReducer.error,

  data: state.secondaryImageReducer.data,
  searchId: state.searchId,
  handleChange: state.handleChange,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSecondaryImageRecord: () =>
      dispatch(secondaryImageAction.getSecondaryImageRecord()),
    getSecondaryImageByIdRecord: (index) =>
      dispatch(secondaryImageAction.getSecondaryImageByIdRecord(index)),
    deleteSecondaryImageRecord: (
      id,
      firstImageName,
      secondImageName,
      thirdImageName,
      fourthImageName
    ) =>
      dispatch(
        secondaryImageAction.deleteSecondaryImageRecord(
          id,
          firstImageName,
          secondImageName,
          thirdImageName,
          fourthImageName
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secondaryImageListContainer);
