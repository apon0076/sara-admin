import React, { Component } from "react";
import WishList from "../../components/order/WishList";
import authService from "../../store/services/authService";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as wishListAction from "../../store/actions/wishListAction";
///////////////////////////END/////////////////////////////////////////////////////

class wishListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      customerId: "" 
    };

    this.handleChange = this.handleChange.bind(this);
    this.deleteWishList = this.deleteWishList.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;

    switch (target.name) {
      case "searchBy":
        this.setState({ searchBy: target.value });
        let searchVal = target.value;
        let userId = await authService.getEmployeeId();
        if (searchVal.length > 0) {
          await this.props.getWishListByIdRecord(userId, searchVal);
        } else {
          await this.props.getWishListByIdRecord(userId, null);
        }
        break;

      default:
        break;
    }
  };

  validUser = async () => {
    //////debugger;
    let userId = authService.getEmployeeId();

    if (userId != null) {
      this.setState({
        customerId: userId,
      });

      await this.props.getWishListByIdRecord(userId, null);
    } else {
      this.props.history.push(`/Login`);
    }
  };

  componentDidMount = async () => {
    await this.validUser();
  };

  deleteWishList = async (id) => {
    let result = await this.props.deleteWishListRecord(
      this.state.customerId,
      id
    );
    await this.validUser();
  };

  render() {
    return (
      <div id="wrapper">
        <WishList
          key="WishList"
          {...this.state}
          handleChange={this.handleChange}
          wishLists={this.props.wishLists}
          deleteWishList={this.deleteWishList}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wishLists: state.wishListReducer.wishLists,
  data: state.wishListReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getWishListByIdRecord: (index, searchBy) =>
      dispatch(wishListAction.getWishListByIdRecord(index, searchBy)),
    deleteWishListRecord: (customerId, id) =>
      dispatch(wishListAction.deleteWishListRecord(customerId, id)),
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(wishListContainer);
