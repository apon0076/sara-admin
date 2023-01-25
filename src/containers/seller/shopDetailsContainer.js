import React, { Component } from "react";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as sellerAction from "../../store/actions/sellerAction";
import ShopDetails from "../../components/seller/ShopDetails";

////////////////END/////////////////

class shopDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.shopDetails = this.shopDetails.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "searchId":
        //////debugger;
        this.setState({ searchId: target.value });
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getPendingSellerRecord();
        } else {
          await this.props.getPendingSellerByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async (shopId) => {
    //////debugger;
    //sellerId: this.props.match.params.id,
    await this.props.getPendingSellerByIdRecord(shopId);
    await this.props.getPendingSellerRecord();
  };

  shopDetails = async (shopId) => {
    ////////debugger;
    // const data = {
    //   shopId: shopId,
    // };
    await this.props.getPendingSellerByIdRecord(shopId);
    await this.props.getPendingSellerRecord();
  };

  render() {
    return (
      <ShopDetails
        key="ShopDetails"
        {...this.state}
        sellers={this.props.sellers}
        //loading={this.props.loading}
        //error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        shopDetails={this.shopDetails}
      />
    );
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  //loading: state.sellerReducer.loading,
  //error: state.sellerReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  //deleteSeller: state.deleteSeller,
  shopDetails: state.shopDetails,
  data: state.sellerReducer.shopId,
});

// Making available in  props

const mapDispatchToProps = (dispatch) => {
  return {
    getPendingSellerRecord: () =>
      dispatch(sellerAction.getPendingSellerRecord()),
    getPendingSellerByIdRecord: (index) =>
      dispatch(sellerAction.getPendingSellerByIdRecord(index)),
    //deletePopUpRecord: (data) => dispatch(sellerAction.deletePopUpRecord(data)),
    getPendingSellerById: (index) =>
      dispatch(sellerAction.getPendingSellerById(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(shopDetailsContainer);
