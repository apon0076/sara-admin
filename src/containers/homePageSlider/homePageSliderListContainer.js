import React, { Component } from "react";
import HomePageSliderList from "../../components/homePageSlider/HomePageSliderList";

////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";

import * as homePageSliderAction from "../../store/actions/homePageSliderAction";
// import {
//   getHomePageSliderRecord,
//   getHomePageSliderByIdRecord,
//   deleteHomePageSliderRecord,
// } from "../../store/actions/homePageSliderAction";
// import homePageSliderReducer from "../../store/reducers/homePageSliderReducer";
////////////////END/////////////////

class createHomePageSliderContainer extends Component {
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
        this.setState({ searchId: target.value });

        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getHomePageSliderRecord();
        } else {
          await this.props.getHomePageSliderByIdRecord(searchBy);
        }
        break;

      default:
    }
  };

  componentDidMount = async () => {
    await this.props.getHomePageSliderRecord();
  };

  deleteSlider = async (id, imageName) => {

    const data = {
      id: id,
      imageName: imageName,
    };

    await this.props.deleteHomePageSliderRecord(data);
    await this.props.getHomePageSliderRecord();
  };

  render() {
    return (
      <HomePageSliderList
        key="HomePageSliderList"
        {...this.state}
        sliders={this.props.sliders}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteSlider={this.deleteSlider}
      />
    );
  }
}

// Making available in  props
const mapStateToProps = (state) => ({
  data: state.homePageSliderReducer.data,
  sliders: state.homePageSliderReducer.sliders,
  loading: state.homePageSliderReducer.loading,
  error: state.homePageSliderReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteSlider: state.deleteSlider,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHomePageSliderRecord: () =>
      dispatch(homePageSliderAction.getHomePageSliderRecord()),
    getHomePageSliderByIdRecord: (index) =>
      dispatch(homePageSliderAction.getHomePageSliderByIdRecord(index)),
    deleteHomePageSliderRecord: (data) =>
      dispatch(homePageSliderAction.deleteHomePageSliderRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createHomePageSliderContainer);
