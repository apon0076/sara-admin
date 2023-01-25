import React, { Component } from "react";
import VerifiedShopList from "../../components/shop/VerifiedShopList";

// import sellerService from "../../store/services/sellerService";
// import { NavLink, Redirect } from "react-router-dom";
// import { hashHistory } from "react-router";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as sellerAction from "../../store/actions/sellerAction";
// import {
//    getVerifiedShopRecord,
//    getVerifiedShopByIdRecord,
// } from "../../store/actions/sellerAction";
// import sellerReducer from "../../store/reducers/sellerReducer";

////////////////END/////////////////

class verifiedShopListContainer extends Component {
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
          await this.props.getVerifiedShopRecord();
        } else {
          await this.props.getVerifiedShopByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    // For Login Check
    // let userId = sellerService.getEmployeeId();
    // if (userId != null) {
    //   this.setState({
    //     authenticated: true,
    //     loginSuccessful: true,
    //   });
    // } else {
    //   this.setState({
    //     authenticated: false,
    //     loginSuccessful: false,
    //   });
    //   this.props.history.push('/Login');
    // }
    // await this.props.getVerifiedShopRecord();
  };

  render() {
    return (
      <VerifiedShopList
        key="VerifiedShopList"
        {...this.state}
        sellers={this.props.sellers}
        //loading={this.props.loading}
        //error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
      />
    );
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  searchId: state.searchId,
  handleChange: state.handleChange,
});

// Making available in  props

const mapDispatchToProps = (dispatch) => {
  return {
    getVerifiedShopRecord: () => dispatch(sellerAction.getVerifiedShopRecord()),

    getVerifiedShopByIdRecord: (index) =>
      dispatch(sellerAction.getVerifiedShopByIdRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(verifiedShopListContainer);
