import React, { Component } from "react";
import SellerList from "../../components/seller/SellerList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

// import * as sellerAction from "../../store/actions/sellerAction";
import * as sellerAction from "../../store/actions/sellerAction";
// import {
//   getSellerRecord,
//   getSellerByIdRecord,
//   deleteSellerRecord,
// } from "../../store/actions/sellerAction";
// import sellerReducer from "../../store/reducers/sellerReducer";

////////////////END/////////////////

class sellerListContainer extends Component {
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
          await this.props.getSellerRecord();
        } else {
          await this.props.getSellerByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getSellerRecord();
  };

  deleteSeller = async (id) => {
    //////debugger;
    await this.props.deleteSellerRecord(id);
    await this.props.getSellerRecord();
  };

  render() {
    return (
      <SellerList
        key="SellerList"
        {...this.state}
        sellers={this.props.sellers.sort((a, b) => (a.timeM > b.timeM ? 1 : -1))}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteSeller={this.deleteSeller}
      />
    );
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  loading: state.sellerReducer.loading,
  error: state.sellerReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteSeller: state.deleteSeller,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSellerRecord: () => dispatch(sellerAction.getSellerRecord()),
    getSellerByIdRecord: (index) =>
      dispatch(sellerAction.getSellerByIdRecord(index)),
    deleteSellerRecord: (index) =>
      dispatch(sellerAction.deleteSellerRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sellerListContainer);
