import React, { Component } from "react";
import ProcessingOrderList from "../../components/orders/ProcessingOrderList";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as processingOrderListAction from "../../store/actions/processingOrderListAction";
///////////////////////////END/////////////////////////////////////////////////////

class processingOrderListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.deliverOrder = this.deliverOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;

    switch (target.name) {
      case "searchId":
        this.setState({ searchId: target.value });
        let searchVal = target.value;
        if (searchVal.length > 0) {
          await this.props.getProcessingOrderListByIdRecord(searchVal);
        } else {
          await this.props.getProcessingOrderListRecord(searchVal);
        }
        break;

      default:
        break;
    }
  };

  componentDidMount = async () => {
    await this.props.getProcessingOrderListRecord();
  };

  deliverOrder = async (orderNo) => {
    //////debugger;
    const data = {
      orderNo: orderNo,
    };

    await this.props.deliverOrderRecord(data);
    await this.props.getProcessingOrderListRecord();
  };

  cancelOrder = async (orderNo) => {
    //////debugger;
    const data = {
      orderNo: orderNo,
    };

    await this.props.cancelOrderRecord(data);
    await this.props.getProcessingOrderListRecord();
  };

  render() {
    return (
      <div id="wrapper">
        <ProcessingOrderList
          key="ProcessingOrderList"
          {...this.state}
          handleChange={this.handleChange}
          deliverOrder={this.deliverOrder}
          cancelOrder={this.cancelOrder}
          processOrders={this.props.processOrders}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  processOrders: state.processingOrderListReducer.processOrders,
  data: state.processingOrderListReducer.orderNo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProcessingOrderListRecord: () =>
      dispatch(processingOrderListAction.getProcessingOrderListRecord()),
    getProcessingOrderListByIdRecord: (index) =>
      dispatch(processingOrderListAction.getProcessingOrderListByIdRecord(index)),
    deliverOrderRecord: (data) =>
      dispatch(processingOrderListAction.deliverOrderRecord(data)),
    cancelOrderRecord: (data) =>
      dispatch(processingOrderListAction.cancelOrderRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(processingOrderListContainer);
