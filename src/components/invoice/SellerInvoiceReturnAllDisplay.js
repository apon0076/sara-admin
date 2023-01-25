import moment from "moment";
import React from "react";
import logo from "../../assets/images/sara_logo.png";
import "./Invoice.css";

export default function SellerInvoiceReturnAllDisplay(props) {
  const invoiceInfo = props?.invoice;
  const totalAmt =
    (invoiceInfo?.totalAmount || 0) +
    (invoiceInfo?.shippingCharge || 0) -
    (invoiceInfo?.couponAmt || 0);

  const shippingAddress = invoiceInfo
    ? JSON.parse(invoiceInfo?.shippingAddress)
    : "";

  const productVariantsBodyTemplate = (rowData) => {
    const variant = rowData?.split(",");

    let final = [];
    variant &&
      variant.map((v, i) => {
        const single = v.split(": ");
        final.push(single);
      });

    return (
      <span>
        {final.map((item, i) => (
          <>
            {item[0] === " null" ? (
              <></>
            ) : (
              <p style={{ marginBottom: "0px" }}>
                {item[0]}: <strong>{item[1]}</strong>
              </p>
            )}
          </>
        ))}
      </span>
    );
  };

  return (
    <div className="seller_invoice_container" style={{ marginBottom: "100vh" }}>
      <div
        className="seller_invoice_purchase_history"
        style={{ paddingTop: "3vh" }}
      >
        <div className="invoice_main_title">
          <strong style={{ fontSize: "24px" }}>Return Invoice</strong>
        </div>
        <div className="seller_invoice_purchase_history__header">
          <div
            className="seller_invoice_purchase_history__logo_section"
            style={{ marginRight: "10px" }}
          >
            <img src={logo} alt="logo" height={"70px"} width={"70px"} />
          </div>
          <div
            className="seller_invoice_purchase_history__header_info_return"
            style={{ marginLeft: "10px" }}
          >
            <p>
              <b>{invoiceInfo?.shopName}</b>
            </p>
            <p>
              <b>Return Req. Date:</b>
              {moment(invoiceInfo?.returnDate).format("Do MMMM YYYY, h:mm A")}
            </p>
            <p>
              <b>Return Tracking No:</b> {invoiceInfo?.returnInvoiceNo}
            </p>
          </div>
          <div className="seller_invoice_purchase_history__header_info_return">
            <p>
              <b>Old Order No:</b> {invoiceInfo?.shopwiseOrderNo}
            </p>
            <p>
              <b>Old Order date:</b>{" "}
              {moment(invoiceInfo?.orderDate).format("Do MMMM YYYY, h:mm A")}
            </p>
            <p>
              <b>Old Payment method:</b> {invoiceInfo?.paymentMethodName}
            </p>
          </div>
        </div>
        <div className="seller_invoice_purchase_history__address_section_return">
          <p>
            <b>Refund Method:</b> {invoiceInfo?.refundMethod}
            {/* Bkash */}
          </p>
          <p>
            <b>Refund Contact Number:</b> {invoiceInfo?.refundNumber}
            {/* 01612345678 */}
          </p>
          <p>
            <b>Return Type:</b> {invoiceInfo?.refundType}
            {/* Drop off */}
          </p>
        </div>
        <div className="seller_invoice_purchase_history__address_section">
          <div className="seller_invoice_purchase_history_delivery">
            <p className="seller_invoice_purchase_history__addresss_title">
              Delivery Address,
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Name: </span>
              {invoiceInfo?.sellerProfiles?.sellerName}
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Address: </span>
              {invoiceInfo?.sellerProfiles?.sellerPresentAddress}
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Contact: </span>
              {invoiceInfo?.sellerProfiles?.sellerContactNo}
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Email: </span> {invoiceInfo?.sellerProfiles?.sellerEmail}
            </p>
          </div>
          <div className="seller_invoice_purchase_history_billing">
            <p className="seller_invoice_purchase_history__addresss_title">
              Refund Request From,
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Name: </span>
              {shippingAddress?.recipientName}
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Address: </span>
              {shippingAddress?.address}
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Phone: </span>
              {shippingAddress?.contactNumber}
            </p>
            <p className="seller_invoice_purchase_history__addresss">
              <span>Email: </span> {invoiceInfo?.cusEmail}
            </p>
          </div>
        </div>

        <div className="invoice_product__list_section">
          <p className="invoice_product__list_section_title">Return Items:</p>
          <table className="invoice_product__list_section_table">
            <thead>
              <tr>
                <th className="invoice__index_col">SL</th>
                <th className="invoice__name_col">Product Name</th>
                <th className="invoice__name_col">Variants</th>
                <th className="invoice__sku_col">SKU</th>
                <th className="invoice__sku_col">Seller SKU</th>
                <th className="invoice__sku_col">Shop SKU</th>
                <th className="invoice__quantity_col">Qty</th>
                {/* <th>Variants</th> */}
                <th className="invoice__price_col">Unit Price (৳)</th>
                <th className="invoice__total_col">Sub-Total (৳)</th>
              </tr>
            </thead>
            <tbody>
              {invoiceInfo?.returnProductOrderDetailsViewModels?.map(
                (data, index) => (
                  <tr>
                    <td className="invoice__index_col">{index + 1}</td>
                    <td className="invoice__name_col">{data?.productTitle}</td>
                    <td className="invoice__name_col">
                      {productVariantsBodyTemplate(data?.productVariant)}
                    </td>
                    <td className="invoice__sku_col">{data?.sku}</td>
                    <td className="invoice__sku_col">
                      {data?.sellerProductSku}
                    </td>
                    <td className="invoice__sku_col">{data?.shopProductSku}</td>
                    <td className="invoice__quantity_col">
                      {data?.productQty}
                    </td>
                    {/* <td>4 GB Storage</td> */}
                    <td className="invoice__price_col">
                      {/* {parseFloat(data?.productPrice).toFixed(2)} */}
                      {props.currencyFormat(data?.productPrice)}
                    </td>

                    <td className="invoice__total_col">
                      {/* {parseFloat(
                        data?.productPrice * data?.productQty
                      ).toFixed(2)}{' '} */}
                      {props.currencyFormat(
                        data?.productPrice * data?.productQty
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div
            className="invoice__summary_section"
            style={{ paddingBottom: "10px" }}
          >
            <table>
              <tr>
                <td className="invoice__total_col">Gross Sub-Total:</td>
                <td className="invoice__total_col">
                  {/* {parseFloat(invoiceInfo?.totalAmount || 0).toFixed(2)}{' '} */}
                  {props.currencyFormat(invoiceInfo?.totalAmount || 0)}
                </td>
              </tr>
              <tr>
                <td className="invoice__total_col">Discount/Voucher:</td>
                <td className="invoice__total_col">
                  {props.currencyFormat(0)}
                </td>
              </tr>
              <tr>
                <td className="invoice__total_col">Net Amount:</td>
                <td className="invoice__total_col">
                  {/* {parseFloat(invoiceInfo?.totalAmount || 0).toFixed(2)}{' '} */}
                  {props.currencyFormat(invoiceInfo?.totalAmount || 0)}
                </td>
              </tr>
              <tr>
                <td className="invoice__total_col">VAT:</td>
                <td className="invoice__total_col">Included </td>
              </tr>
              <tr>
                <td className="invoice_total__row">Total Refund Amount (৳):</td>
                <td className="invoice_total__row">
                  {/* {parseFloat(totalAmt).toFixed(2)}{' '} */}
                  {props.currencyFormat(totalAmt || 0)}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="invoice_product__list_section">
          <p className="invoice_product__list_section_title">REFUND POLICY:</p>
          <p className="seller_invoice_purchase_history__policy">
            * Any cashback amount will not be considered as refund amount.
          </p>
          <p className="seller_invoice_purchase_history__policy_bottom">
            Call us at +8801885998899 for any help.
          </p>{" "}
        </div>
      </div>
    </div>
  );
}
