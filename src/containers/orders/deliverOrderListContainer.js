import React, { Component } from "react";
import DeliverOrderList from "../../components/orders/DeliverOrderList";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as deliverOrderListAction from "../../store/actions/deliverOrderListAction";
///////////////////////////END/////////////////////////////////////////////////////

class deliverOrderListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "searchId":
        this.setState({ searchId: target.value });
        let searchVal = target.value;

        if (searchVal.length > 0) {
          await this.props.getDeliverOrderListByIdRecord(searchVal);
        } else {
          await this.props.getDeliverOrderListRecord(searchVal);
        }
        break;

      default:
        break;
    }
  };

  componentDidMount = async () => {
    await this.props.getDeliverOrderListRecord();
  };

  confirmOrder = async (orderNo) => {
    //////debugger;
    const data = {
      orderNo: orderNo,
    };

    await this.props.confirmOrderRecord(data);
    await this.props.getDeliverOrderListRecord();
  };

  cancelOrder = async (orderNo) => {
    //////debugger;
    const data = {
      orderNo: orderNo,
    };

    await this.props.cancelOrderRecord(data);
    await this.props.getDeliverOrderListRecord();
  };

  render() {
    return (
      <div id="wrapper">
        <DeliverOrderList
          key="DeliverOrderList"
          {...this.state}
          handleChange={this.handleChange}
          confirmOrder={this.confirmOrder}
          cancelOrder={this.cancelOrder}
          deliverOrders={this.props.deliverOrders}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  deliverOrders: state.deliverOrderListReducer.deliverOrders,
  data: state.deliverOrderListReducer.orderNo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDeliverOrderListRecord: () =>
      dispatch(deliverOrderListAction.getDeliverOrderListRecord()),
    getDeliverOrderListByIdRecord: (index) =>
      dispatch(deliverOrderListAction.getDeliverOrderListByIdRecord(index)),
    confirmOrderRecord: (data) =>
      dispatch(deliverOrderListAction.confirmOrderRecord(data)),
    cancelOrderRecord: (data) =>
      dispatch(deliverOrderListAction.cancelOrderRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(deliverOrderListContainer);
