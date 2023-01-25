import React, { Component } from "react";
import PendingSellerList from "../../components/seller/PendingSellerList";
import * as bussinessTypeAction from "../../store/actions/bussinessTypeAction";
import { toast, ToastContainer } from "react-toastify";

import sellerService from "../../store/services/sellerService";
import * as businessTypeAction from "../../store/actions/bussinessTypeAction";
// import { NavLink, Redirect } from "react-router-dom";
// import { hashHistory } from "react-router";

// import { shopDetails } from "../../components/seller/ShopDetails";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as sellerAction from "../../store/actions/sellerAction";
// import {
//   getPendingSellerRecord,
//   getPendingSellerByIdRecord,
//   approveShopRecord,
//   rejectShopRecord,
// } from "../../store/actions/sellerAction";
// import sellerReducer from "../../store/reducers/sellerReducer";
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

////////////////END/////////////////

class pendingSellerListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
      open: false,
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.shopDetails = this.shopDetails.bind(this);
    this.approveShop = this.approveShop.bind(this);
    this.rejectShop = this.rejectShop.bind(this);
    this.paginate = this.paginate.bind(this);
    this.loadMoreData = this.loadMoreData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      open: !this.state.open,
    });
  }

  //PAGINATION LOGIC:
  paginate = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };
  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
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

  componentDidMount = async () => {
    //////debugger;
    // For Login Check
    let userId = sellerService.getEmployeeId();

    if (userId != null) {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      });
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      });

      this.props.history.push("/Login");
    }

    //////debugger;
    await this.props.getPendingSellerRecord();
    await this.props.getBusinessTypes();

    // var tdata = this.props.sellers;
    // var slice = tdata.slice(
    //   this.state.offset,
    //   this.state.offset + this.state.perPage
    // );
    // this.setState({
    //   pageCount: Math.ceil(tdata.length / this.state.perPage),
    //   orgtableData: tdata,
    //   tableData: slice,
    // });
  };

  approveShop = async (seller) => {
    //////debugger;
    const data = {
      shopId: seller.shopId,
      sellerId: seller.sellerId,
      status: "Y",
    };
    //////debugger;
    const response = await this.props.approveShopRecord(data);
    if (response.payload.succeed === true) {
      toast.success("Seller Verification Complete!");
      //////debugger;
      return false;
    }
  };

  rejectShop = async (seller) => {
    //////debugger;
    const data = {
      shopId: seller.shopId,
      shopName: seller.shopName,
      bussinessTypeId: seller.bussinessTypeId,
      binNo: seller.binNo,
      shopCity: seller.shopCity,
      shopState: seller.shopState,
      zipCode: seller.zipCode,
      shopAddress: seller.shopAddress,
      isVerified: "Y",
      isActive: "R",
    };
    await this.props.rejectShopRecord(data);
    await this.props.getPendingSellerRecord();
  };

  shopDetails = async (seller) => {
    //////debugger;
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(seller, null, 4));

    // const data = {
    //   shopId: shopId,
    // };
    // await this.props.getPendingSellerByIdRecord(shopId);
    // await this.props.getPendingSellerRecord();
  };

  render() {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.sellers.length / this.state.postsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const pageNumbersLength = pageNumbers.length;

    return (
      <>
        <PendingSellerList
          key="PendingSellerList"
          {...this.state}
          sellers={this.props.sellers}
          loading={this.props.loading}
          error={this.props.error}
          handleChange={this.handleChange}
          approveShop={this.approveShop}
          rejectShop={this.rejectShop}
          values={this.values}
          searchId={this.props.searchId}
          shopDetails={this.shopDetails}
          businessTypes={this.props.businessTypes}
          postsPerPage={this.state.postsPerPage}
          paginate={this.paginate}
          pageNumbers={pageNumbers}
          pageNumbersLength={pageNumbersLength}
        />
        <ToastContainer autoClose={1500} />
      </>
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
  //deleteSeller: state.deleteSeller,
  shopDetails: state.shopDetails,
  data: state.sellerReducer.shopId,
  businessTypes: state.bussinessTypeReducer.bussinessTypes,
  loading: state.sellerReducer.loading,
  error: state.sellerReducer.error,
});

// Making available in  props

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessTypes: () =>
      dispatch(businessTypeAction.getBussinessTypeRecord()),

    getPendingSellerRecord: () =>
      dispatch(sellerAction.getPendingSellerRecord()),

    getPendingSellerByIdRecord: (index) =>
      dispatch(sellerAction.getPendingSellerByIdRecord(index)),

    getPendingSellerById: (index) =>
      dispatch(sellerAction.getPendingSellerById(index)),

    approveShopRecord: (data) => dispatch(sellerAction.approveShopRecord(data)),
    rejectShopRecord: (data) => dispatch(sellerAction.rejectShopRecord(data)),

    getBussinessTypeRecord: () =>
      dispatch(bussinessTypeAction.getBussinessTypeRecord()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pendingSellerListContainer);
