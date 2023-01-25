import React from "react";
import { Link } from "react-router-dom";
//import baseUrl from "../../utils/baseUrl";

const ProcessOrderList = (props) => {
  //////debugger;
  var orderData = props.processOrders.map(function (order, idx) {
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
            onClick={(event) => {
              props.deliverOrder(order.orderNo);
            }}
          >
            Deliver
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
    <div className="content-wrapper">
      <div className="container-fluid">
        {/*  Table Start */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-table"></i> Data Exporting
              </div>

              <ul className="navbar-nav mr-auto align-items-center">
                <li className="nav-item">
                  <a className="nav-link toggle-menu" href="#!">
                    <i></i>
                  </a>
                </li>
                <li className="nav-item">
                  <form className="search-bar">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter keywords"
                      name="searchId"
                      value={props.searchId}
                      onChange={props.handleChange}
                    />
                    <a href="#!">
                      <i
                        className="icon-magnifier"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </a>
                  </form>
                </li>
              </ul>

              <div className="card-body">
                <div className="table-responsive">
                  <table id="example" className="table table-bordered">
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

                    <tfoot>
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
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProcessOrderList;
