import React, { Component } from "react";
import Invoice from "../../components/orders/Invoice";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as invoiceAction from "../../store/actions/invoiceAction";
///////////////////////////END/////////////////////////////////////////////////////

class invoiceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await this.props.getInvoiceByIdRecord(this.props.match.params.id);
  };

  render() {
    return (
      <div id="wrapper">
        <Invoice key="Invoice" {...this.state} invoices={this.props.invoices} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  invoices: state.invoiceReducer.invoices,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInvoiceRecord: () => 
      dispatch(invoiceAction.getInvoiceRecord()),
    getInvoiceByIdRecord: (index) =>
      dispatch(invoiceAction.getInvoiceByIdRecord(index)),
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(invoiceContainer);
