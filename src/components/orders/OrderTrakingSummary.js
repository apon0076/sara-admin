import moment from "moment";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import baseUrl from "../../utils/baseUrl";
import LoadingCard from "../shared/LoadingCard";
import "./Order.css";

export default function OrderTrakingSummary({ orderSummary, loading }) {
  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData.productImage)}
          alt={rowData.productUrl}
          className="product-image"
          style={{
            height: "50px",
            width: "50px",
            cursor: "pointer",
          }}
        ></img>
      </React.Fragment>
    );
  };
  const productTitleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.productTitle}</span>
      </React.Fragment>
    );
  };
  const sellerProductSkuBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.sellerProductSku === null ? "N/A" : rowData.sellerProductSku}
        </span>
      </React.Fragment>
    );
  };
  const sellerProductVariantsBodyTemplate = (rowData) => {
    const variant = rowData?.productVariant?.split(",");

    let final = [];
    variant &&
      variant.map((v, i) => {
        const single = v.split(": ");
        final.push(single);
      });

    return (
      <React.Fragment>
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
          {/* {rowData.productVariant === null ? 'N/A' : rowData.productVariant} */}
        </span>
      </React.Fragment>
    );
  };
  const productPriceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.productPrice}</span>
      </React.Fragment>
    );
  };
  const productQuantityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.productQuantity}</span>
      </React.Fragment>
    );
  };
  const totalAmountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.productQuantity * rowData.productPrice}</span>
      </React.Fragment>
    );
  };
  const headerTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="table-header">
          <div className="p-d-flex p-jc-between">
            <div>
              <strong
                style={{
                  color: "#0283d4",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                {rowData.shopName}
              </strong>
              <strong
                style={{
                  marginLeft: "5px",
                }}
              >
                <Chip
                  label={rowData.orderNo}
                  className="p-mr-2 p-mb-2"
                  style={{
                    color: "#0283d4",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                />
              </strong>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  return (
    <>
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <div className="modal_container">
          <div className="customer_details">
            <p className="section_title">Customer Details</p>
            <table className="customer_info__table">
              <tr>
                <th>Name:</th>
                <td>{orderSummary?.customerName}</td>
              </tr>
              <tr>
                <th>Contact No:</th>
                <td>
                  {JSON.parse(orderSummary?.shippingAddress)?.contactNumber}
                </td>
              </tr>
              <tr>
                <th>Order Date:</th>
                <td>
                  {moment(orderSummary?.createDate).format(
                    "Do MMMM YYYY, h:mm A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Shipping Address:</th>
                <td>{JSON.parse(orderSummary?.shippingAddress)?.address}</td>
              </tr>
              <tr>
                <th>Payment Method:</th>
                <td>
                  {orderSummary?.paymentMethodName === "" ? (
                    <>Not Selected Yet</>
                  ) : (
                    <>{orderSummary?.paymentMethodName}</>
                  )}
                </td>
              </tr>
            </table>

            <table className="payment_summary__table">
              <tr>
                <th>Sub-Total:</th>
                <td>{orderSummary?.orderSubtotalAmt}</td>
              </tr>

              <tr>
                <th>Discount:</th>
                <td>{0}</td>
              </tr>
              {orderSummary?.voucherAmount !== 0 && (
                <tr>
                  <th style={{ color: "#0283D4" }}>
                    Voucher/Coupon:
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#0243D4",
                      }}
                    >
                      {orderSummary?.voucherCode !== null ? (
                        <>
                          <br />({orderSummary?.voucherCode})
                        </>
                      ) : (
                        <></>
                      )}
                    </span>{" "}
                  </th>
                  <td style={{ fontWeight: "600" }}>
                    {orderSummary?.voucherAmount !== 0 ? (
                      <>-{orderSummary?.voucherAmount}</>
                    ) : (
                      <>0</>
                    )}
                  </td>
                </tr>
              )}
              <tr style={{ borderTop: "1px solid #dee2e6" }}>
                <th>VAT:</th>
                <td>{orderSummary?.totalVatFlatAmt}</td>
              </tr>
              <tr>
                <th>TAX:</th>
                <td>{orderSummary?.taxAmount}</td>
              </tr>
              <tr>
                <th>Shipping Cost:</th>
                <td>{orderSummary?.totalShippingCharge}</td>
              </tr>
              <tr style={{ borderTop: "1px solid #dee2e6" }}>
                <th>Grand Total:</th>
                <td>{orderSummary?.totalPayableAmount}</td>
              </tr>
            </table>
          </div>
          <div className="product_table__section">
            <div>
              <h4 className="">Order Details</h4>
              <div
                style={{
                  maxHeight: "60vh",
                  overflowY: "auto",
                  position: "relative",
                  width: "100%",
                  overflowX: "hidden",
                }}
              >
                {orderSummary?.shopWiseOrders?.map((data, index) => (
                  <DataTable
                    key={index}
                    value={data.orderDetails}
                    className="p-datatable-customers p-datatable-responsive-demo"
                    dataKey="orderNo"
                    rowHover
                    emptyMessage="No order(s) found"
                    header={headerTemplate(data)}
                  >
                    <Column
                      field="Index"
                      header="SN"
                      body={onIndexTemplate}
                      className="listSL"
                    />
                    <Column
                      field="productImage"
                      header="Image"
                      body={imageBodyTemplate}
                    />
                    <Column
                      field="productTitle"
                      filterField="productTitle"
                      header="Product Name"
                      body={productTitleBodyTemplate}
                      sortable
                    />
                    <Column
                      field="sellerProductSku"
                      filterField="sellerProductSku"
                      header="SKU"
                      body={sellerProductSkuBodyTemplate}
                      sortable
                    />
                    <Column
                      field="productVariant"
                      filterField="productVariant"
                      header="Variants"
                      body={sellerProductVariantsBodyTemplate}
                      sortable
                    />
                    <Column
                      field="productPrice"
                      filterField="productPrice"
                      header="Rate"
                      body={productPriceBodyTemplate}
                      sortable
                    />
                    <Column
                      field="productQuantity"
                      filterField="productQuantity"
                      header="Quantity"
                      body={productQuantityBodyTemplate}
                      sortable
                    />
                    <Column
                      field="totalPayableAmt"
                      header="Total"
                      body={totalAmountBodyTemplate}
                      sortable
                    />
                  </DataTable>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
