import React from "react";

// const styles = {
//   width: "50%",
// };

const Invoice = (props) => {
  //////debugger;

  let invoiceArray = [];
  // props.invoices.map(function (order) {
  //   invoiceArray.push(order.orderNo);
  //   invoiceArray.push(order.createDate);
  //   invoiceArray.push(order.customerName);
  //   invoiceArray.push(order.deliveryAddress);
  //   invoiceArray.push(order.presentAddress);
  //   invoiceArray.push(order.phoneNo);
  //   invoiceArray.push(order.email);
  //   invoiceArray.push(order.totalOrderQuantity);
  //   invoiceArray.push(order.totalPaymentAmount);
  //   invoiceArray.push(order.vatAmount);
  //   invoiceArray.push(order.totalShippingCost);
  //   invoiceArray.push(order.totalNetPaymentAmount);
  // });

  var invoiceData = props.invoices.map(function (invoice, idx) {
    return (
      <tr id="addr0" key={idx}>
        <td>{idx}</td>

        <td>{invoice.productName}</td>
        <td>{invoice.description}</td>
        <td>{invoice.orderQuantity}</td>
        <td>{invoice.unitPrice}</td>
        <td>{invoice.subTotal}</td>
      </tr>
    );
  });

  return (
    <div className="content-wrapper">
      <div className="card">
        <div className="card-body">
          <section className="content-header">
            <h3>Invoice # {invoiceArray[0]}</h3>
          </section>

          <section className="invoice">
            <div className="row mt-3">
              <div className="col-lg-6">
                <h4>
                  <i className="fa fa-globe"></i> SaRa Lifestyle Ltd
                </h4>
              </div>
              <div className="col-lg-6">
                <h5 className="float-sm-right">Date: {invoiceArray[1]}</h5>
              </div>
            </div>

            <hr />
            <div className="row invoice-info">
              <div className="col-sm-4 invoice-col">
                From
                <address>
                  <strong>SaRa Lifestyle Ltd</strong>
                  <br />
                  Avenue #02, Road #14, House No #966, Mirpur DOHS, Dhaka-1216,
                  Bangladesh.
                  <br />
                  Phone: + 88 01885998899
                  <br />
                  Email: ecom@saralifestyle.com.bd ||
                  support@saralifestyle.com.bd
                </address>
              </div>
              <div className="col-sm-4 invoice-col">
                To
                <address>
                  <strong>{invoiceArray[2]}</strong>
                  <br />
                  Delivery Address: {invoiceArray[3]}
                  Present Address: {invoiceArray[4]}
                  <br />
                  Phone: +88 {invoiceArray[5]}
                  <br />
                  Email: {invoiceArray[6]}
                </address>
              </div>
              {/*               <div className="col-sm-4 invoice-col">
                <b>Invoice #{invoiceArray[0]}</b>
                <br />
                <br />
                <b>Order ID:</b> {invoiceArray[7]}
                <br />
                <b>Payment Due:</b> 2/22/2014
                <br />
                <b>Account:</b> 968-34567
              </div> */}
            </div>

            <div className="row">
              <div className="col-12 table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>price</th>
                      <th>Net Amount</th>
                    </tr>
                  </thead>
                  <tbody>{invoiceData}</tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 payment-icons">
                <p className="lead">Payment Methods:</p>
                <img
                  src="/assets/images/payment-icons/visa-dark.png"
                  alt="Visa"
                />
                <img
                  src="/assets/images/payment-icons/mastro-dark.png"
                  alt="Mastercard"
                />
                <img
                  src="/assets/images/payment-icons/american-dark.png"
                  alt="American Express"
                />
                <img
                  src="/assets/images/payment-icons/paypal-dark.png"
                  alt="Paypal"
                />
                {/*   <p className="bg-light p-2 mt-3 rounded">
                  Etsy doostang zoodles disqus groupon greplin oooj voxy
                  zoodles, weebly ning heekya handango imeem plugg dopplr
                  jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                </p> */}
              </div>
              <div className="col-lg-6">
                {/*    <p className="lead">Amount Due 2/22/2014</p> */}
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      {/* <tr>
                        <th style={styles}>Total Qty:</th>
                        <td>{invoiceArray[7]}</td>
                      </tr>

                      <tr>
                        <th style={styles}>Subtotal:</th>
                        <td>${invoiceArray[8]}</td>
                      </tr>
                      <tr>
                        <th>Tax </th>
                        <td>${invoiceArray[9]}</td>
                      </tr>
                      <tr>
                        <th>Shipping:</th>
                        <td>${invoiceArray[10]}</td>
                      </tr>
                      <tr>
                        <th>Total:</th>
                        <td>${invoiceArray[11]}</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <hr />
            <div className="row no-print">
              <div className="col-lg-3">
                <a href="#!" target="_blank" className="btn btn-dark m-1">
                  <i className="fa fa-print"></i> Print
                </a>
              </div>
              <div className="col-lg-9">
                <div className="float-sm-right">
                  <button className="btn btn-success m-1">
                    <i className="fa fa-credit-card"></i> Submit Payment
                  </button>
                  <button className="btn btn-primary m-1">
                    <i className="fa fa-download"></i> Generate PDF
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Invoice;
