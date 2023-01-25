import React from "react";
import { Link } from "react-router-dom";
//import baseUrl from "../../utils/baseUrl";

const DeliverOrderList = (props) => {
  var orderData = props.deliverOrders.map(function (order, idx) {
    return (
      <tr id="addr0" key={idx}>
        <td>{idx}</td>
        <td> {order.orderNo}</td>
        <td> {order.createDate}</td>
        <td> {order.totalOrderQuantity}</td>
        <td> {order.totalOrderAmount}</td>
        <td> {order.totalPaymentAmount}</td>

        <td> {order.paymentStatus}</td>
        <td> {order.orderStatus}</td>

        <td>
          <div className="btn-group">
            <Link to={`/Invoice/${order.orderNo}`} className="btn btn-success">
              Details
            </Link>
          </div>
          <button
            className="btn btn-info"
            onClick={() => {
              props.confirmOrder(order.orderNo);
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-warning"
            onClick={(event) => {
              props.cancelOrder(order.orderNo);
            }}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/*  Table Start */}
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box">
              <h3 className="box-title m-b-10">Delivered Order List</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>ORDER NO</th>
                      <th>ORDER DATE</th>
                      <th>QTY</th>
                      <th>UNIT PRICE</th>
                      <th>TOTAL AMOUNT</th>
                      <th>PAYMENT TYPE</th>
                      <th>ORDER STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>{orderData}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeliverOrderList;
