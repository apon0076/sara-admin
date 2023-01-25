import React from "react";
import "./Invoice.css";
import baseUrl from "../../utils/baseUrl";
import moment from "moment";

export default function SellerInvoiceCancelAdminAllDisplay(props) {
  const invoiceInfo = props?.invoice;
  const totalAmt =
    (invoiceInfo?.totalAmount || 0) +
    (invoiceInfo?.actualShipping_cost || 0) -
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
    <div className="seller_invoice_container" style={{ marginBottom: "50vh" }}>
      <div
        className="seller_invoice_purchase_history"
        style={{ paddingTop: "3vh" }}
      >
        <div className="invoice_main_title">
          <strong style={{ fontSize: "24px" }}>Cancel Invoice</strong>
        </div>

        <div className="seller_invoice_purchase_history__header">
          <div className="seller_invoice_purchase_history__logo_section">
            <img
              src={baseUrl.concat(invoiceInfo?.sellerProfile?.sellerImageUrl)}
              alt="logo"
            />
          </div>
          <p>
            <b>{invoiceInfo?.shopName}</b>
          </p>
          <div className="seller_invoice_purchase_history__header_info">
            <p>
              <b>Order No:</b> {invoiceInfo?.shopwiseOrderNo}
            </p>
            <p>
              <b>Tracking No:</b> {invoiceInfo?.cancelInvoiceNo}
            </p>
          </div>
          <div className="seller_invoice_purchase_history__header_info">
            <p>
              <b>Date:</b>{" "}
              {moment(invoiceInfo?.cancelDate).format("Do MMMM YYYY, h:mm A")}
            </p>
            <p>
              <b>Payment Method:</b>{" "}
              {invoiceInfo?.paymentMethodName
                ? invoiceInfo?.paymentMethodName
                : "Not Selected"}
            </p>
          </div>
        </div>

        <div className="seller_invoice_purchase_history__address_section">
          <div className="seller_invoice_purchase_history_delivery">
            <p className="seller_invoice_purchase_history__addresss_title">
              Delivery Address
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
              <span>Email: </span>
              {invoiceInfo?.cusEmail}
            </p>
          </div>
          <div className="seller_invoice_purchase_history_billing">
            <p className="seller_invoice_purchase_history__addresss_title">
              Billing Address
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
              <span>Email: </span>
              {invoiceInfo?.cusEmail}
            </p>
          </div>
        </div>
        <div className="invoice_product__list_section">
          <p className="invoice_product__list_section_title">
            Canceled Items :
          </p>
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
              {invoiceInfo?.cancelOrderDetailsViewModels.map((data, index) => (
                <tr>
                  <td className="invoice__index_col">{index + 1}</td>
                  <td className="invoice__name_col">{data?.productTitle}</td>
                  <td className="invoice__name_col">
                    {productVariantsBodyTemplate(data?.productVariant)}
                  </td>
                  <td className="invoice__sku_col">{data?.sku}</td>
                  <td className="invoice__sku_col">{data?.sellerProductSku}</td>
                  <td className="invoice__sku_col">{data?.shopProductSku}</td>
                  <td className="invoice__quantity_col">{data?.productQty}</td>
                  {/* <td>4 GB Storage</td> */}
                  <td className="invoice__price_col">
                    {/* {parseFloat(data?.productPrice).toFixed(2)} */}
                    {props.currencyFormat(data?.productPrice)}
                  </td>
                  <td className="invoice__total_col">
                    {/* {parseFloat(data?.productPrice * data?.productQty).toFixed(
                      2
                    )}{' '} */}
                    {props.currencyFormat(
                      data?.productPrice * data?.productQty
                    )}
                  </td>
                </tr>
              ))}
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
                <td>Shipping Cost:</td>
                <td>
                  {/* {invoiceInfo?.actualShipping_cost?.toLocaleString('en-US') ||
                    0} */}
                  {props.currencyFormat(invoiceInfo?.actualShipping_cost || 0)}
                </td>
              </tr>
              <tr>
                <td className="invoice_total__row">Grand-Total (৳):</td>
                <td className="invoice_total__row">
                  {/* {parseFloat(totalAmt).toFixed(2)}{' '} */}
                  {props.currencyFormat(totalAmt || 0)}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="invoice_product__list_section">
          <p className="invoice_product__list_section_title">
            Cancel Reason:{" "}
            <span className="seller_invoice_purchase_history__cancel_reason">
              {invoiceInfo?.note}
            </span>
          </p>
        </div>

        <div className="invoice_product__list_section">
          <p className="invoice_product__list_section_title">
            EXCHANGE POLICY:
          </p>
          <p className="seller_invoice_purchase_history__policy">
            * We accept the exchange of unworn and unaltered garments within 15
            days of purchase given that the original invoice, tags and packaging
            are carefully preserved.
          </p>
          <p className="seller_invoice_purchase_history__policy">
            * The exchange garments value must be equal or more than that of
            original invoice.
          </p>
          <p className="seller_invoice_purchase_history__policy">
            * Products on discount or promotional offer, lingerie, masks and PPE
            are not exchangeable.{" "}
          </p>
          <p className="seller_invoice_purchase_history__policy">
            * We do not have any return or refund facility.
          </p>
          <p className="seller_invoice_purchase_history__policy">
            * We reserve all rights to determine whether the goods have been
            altered, used or damaged.
          </p>
          <p className="seller_invoice_purchase_history__policy">
            Note: The customer can only replace the product once inside Dhaka
            city after purchase & for outside of Dhaka, the delivery cost have
            to beared by the customer. Thank you.
          </p>{" "}
          <p className="seller_invoice_purchase_history__policy_bottom">
            Call us at +8801885998899 for any help.
          </p>{" "}
        </div>
      </div>
    </div>
  );
}
