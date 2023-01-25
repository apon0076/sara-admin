import React, { Component } from "react";
import PendingOrderList from "../../components/orders/PendingOrderList";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as pendingOrderListAction from "../../store/actions/pendingOrderListAction";
///////////////////////////END/////////////////////////////////////////////////////

class pendingOrderListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.processOrder = this.processOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;

    switch (target.name) {
      case "searchId":
        this.setState({ searchId: target.value });
        let searchVal = target.value;
        //////debugger;
        if (searchVal.length > 0) {
          await this.props.getOrderListByIdRecord("0", searchVal);
        } else {
          await this.props.getOrderListRecord(searchVal);
        }
        break;

      default:
        break;
    }
  };

  componentDidMount = async () => {
    await this.props.getOrderListRecord();
  };

  processOrder = async (orderNo) => {
    //////debugger;
    const data = {
      orderNo: orderNo,
    };

    await this.props.processOrderRecord(data);
    await this.props.getOrderListRecord();
  };

  cancelOrder = async (orderNo) => {
    const data = {
      orderNo: orderNo,
    };

    await this.props.cancelOrderRecord(data);
    await this.props.getOrderListRecord();
  };

  render() {
    return (
      <div id="wrapper">
        <PendingOrderList
          key="PendingOrderList"
          {...this.state}
          handleChange={this.handleChange}
          processOrder={this.processOrder}
          cancelOrder={this.cancelOrder}
          orders={this.props.orders}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.pendingOrderListReducer.orders,
  data: state.pendingOrderListReducer.orderNo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderListRecord: () =>
      dispatch(pendingOrderListAction.getOrderListRecord()),
    getOrderListByIdRecord: (index, searchBy) =>
      dispatch(pendingOrderListAction.getOrderListByIdRecord(index, searchBy)),
    getOrderListByOrderIdRecord: (index, searchBy) =>
      dispatch(pendingOrderListAction.getOrderListByOrderIdRecord(index, searchBy)),
    processOrderRecord: (data) =>
      dispatch(pendingOrderListAction.processOrderRecord(data)),
    cancelOrderRecord: (data) =>
      dispatch(pendingOrderListAction.cancelOrderRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pendingOrderListContainer);
