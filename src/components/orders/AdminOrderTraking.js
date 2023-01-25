/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  updateProductWiseCancelOrderStatusRecord,
  updateProductWiseCancelOrderStatusReset,
  updateProductWiseOrderStatusRecord,
  updateProductWiseOrderStatusReset,
} from "../../store/actions/orderAction";
import baseUrl from "../../utils/baseUrl";
import LoadingCard from "../shared/LoadingCard";
import AdminManageOrderStatus from "./AdminManageOrderStatus";

export default function AdminOrderTraking({
  orderSummary,
  setOrderDetailsVisible,
  counts,
  setCounts,
  order_filter_tab,
  setExpandedRows,
  setStatusId,
  setStatusName,
  statusId,
  statusName,
  page,
  manageOrderCusName,
  manageOrderCusPhn,
  manageOrderVoucherCode,
  manageOrderVoucherAmt,
  manageOrderPaymentMethodName,
  manageOrderCustomerId,
  orderDetailsLoading,
}) {
  const [selectedOrders, setSelectedOrders] = useState(null);
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [trakingRefNo, setTrakingRefNo] = useState("");
  const [locations, setLocation] = useState("");
  const [remarks, setRemarks] = useState("");
  const [note, setNote] = useState("");
  const [checked, setChecked] = useState(false);
  const [musokChalan, setMusokChalan] = useState("");
  const [returnMusokChalan, setReturnMusokChalan] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  let totalPrice = 0;
  const handleChange = (e) => {
    const select = e.target;
    switch (select.name) {
      case "statusTypeName":
        setStatusId(select?.value?.displayOrder);
        setStatusName(select?.value?.statusTypeName);
        break;
      default:
    }
  };

  const handleSingleOrderPrint = (status, invoiceNo, ordersNoString) => {
    history.push({
      pathname: `/invoiceAdmin`,
      data: { status, invoiceNo, ordersNoString },
      invoiceType,
      order_filter_tab,
    });
  };
  const handleSubmit = () => {
    let arrayObj = {
      orderTrackingId: 0,
      orderProfileId: orderSummary?.orderProfileId,
      shopwiseOrderId: orderSummary.shopWiseOrderId,
      shopwiseOrderNo: orderSummary?.orderNo,
      courierId: 0,
      courierTrackingNo: "",
      trackingNumber: "",
      trackingStatusId: Number(statusId),
      trackingStatusName: statusName,
      orderInvoiceNo: orderSummary?.invoiceNo,
      sender: senderName,
      receiver: receiverName,
      location: locations,
      remarks: remarks,
      isActive: "Y",
      trackingRefNo: trakingRefNo,
      requestType: "order",
      note: note,
      customerId: manageOrderCustomerId,
      mushokChallanNo: musokChalan,
      returnMushokChallanNo: returnMusokChalan,
      orderDetails: selectedOrders?.map((item) => ({
        orderDetailId: item?.orderDetailId,
        orderProfileId: item?.orderProfileId,
        shopId: item?.shopId,
        productId: item?.productId,
        productPrice: item?.productPrice,
        productQuantity: item?.productQuantity,
        statusId: Number(statusId),
        statusName: statusName,
        vatTypeId: item?.vatTypeId,
        vatType: item?.vatType,
        vatAmt: item?.vatFaltAmt,
        sellerProductSku: item?.sellerProductSku,
        inventoryTypeId: item?.inventoryTypeId,
        shopProductSku: item?.shopProductSku,
        productDetailsId: 0,
        productName: item?.productTitle,
        productTitle: item?.productTitle,
        thumbnailImage: item?.productImage,
      })),
    };
    let cancelArrayObj = {
      orderProfileId: orderSummary?.orderProfileId,
      orderInvoiceNo: orderSummary?.invoiceNo,
      shopId: orderSummary?.shopId,
      shopWiseOrderId: orderSummary.shopWiseOrderId,
      shopwiseOrderNo: orderSummary?.orderNo,
      customerId: orderSummary?.customerId,
      shippingCost: orderSummary?.shippingCharge,
      trackingStatusId: Number(statusId),
      trackingStatus: statusName,
      isActive: "Y",
      remarks: remarks,
      note: note,
      cancelOrderDetailsViewModels: selectedOrders?.map((item) => ({
        productId: item?.productId,
        productTitle: item?.productTitle,
        sku: item?.sku,
        sellerProductSku: item?.sellerProductSku,
        shopProductSku: item?.shopProductSku,
        productQty: item?.productQuantity,
        isActive: "Y",
      })),
    };
    if (statusId === 37) {
      dispatch(updateProductWiseCancelOrderStatusRecord(cancelArrayObj));
    } else {
      dispatch(updateProductWiseOrderStatusRecord(arrayObj));
    }
  };

  const status_update = useSelector(
    (state) => state.orderReducer.updateProductWiseOrderStatus
  );
  const cancel_status_update = useSelector(
    (state) => state.orderReducer.cancelOrderStatus
  );
  const loading = useSelector((state) => state.orderReducer.loading);

  useEffect(() => {
    dispatch(updateProductWiseOrderStatusReset());
  }, [dispatch, status_update?.succeed]);

  useEffect(() => {
    dispatch(updateProductWiseCancelOrderStatusReset());
  }, [dispatch, cancel_status_update?.succeed]);

  useEffect(() => {
    if (
      status_update?.succeed === true ||
      cancel_status_update?.succeed === true
    ) {
      setCounts(counts + 1);
      setOrderDetailsVisible(false);
      setSelectedOrders(null);
      setExpandedRows(null);
      setStatusId(null);
      setStatusName(null);
      setChecked(false);
      setRemarks("");
      setLocation("");
      setTrakingRefNo("");
      setReceiverName("");
      setSenderName("");
      setNote("");
      setMusokChalan("");
      setReturnMusokChalan("");
    }
  }, [
    status_update,
    cancel_status_update,
    setCounts,
    counts,
    setOrderDetailsVisible,
    setExpandedRows,
    setStatusId,
    setStatusName,
  ]);

  for (var i = 0; i < orderSummary?.orderDetails?.length; i++) {
    totalPrice =
      totalPrice +
      (orderSummary?.orderDetails[i]?.productPrice -
        (orderSummary?.orderDetails[i]?.productPrice *
          orderSummary?.orderDetails[i]?.discountPercent) /
          100) *
        orderSummary?.orderDetails[i]?.productQuantity;
  }
  const invoiceType = 4;

  const imageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Image</span>
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
  const productDiscountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.discountPercent}</span>
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
        <span>
          {(rowData.productPrice -
            (rowData.productPrice * rowData.discountPercent) / 100) *
            rowData.productQuantity}
        </span>
      </React.Fragment>
    );
  };
  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };
  return (
    <div style={{ margin: "0px -10px -10px" }}>
      {orderDetailsLoading ? (
        <LoadingCard count={1} />
      ) : (
        <div className="row">
          <div className="col-md-4">
            <strong>Customer Details</strong>
            <div className="table-responsive">
              <table style={{ width: "100%" }}>
                <tr>
                  <th style={{ padding: "2px" }}>Name:</th>
                  <td style={{ padding: "2px" }}>{manageOrderCusName}</td>
                </tr>
                <tr>
                  <th style={{ padding: "2px" }}>Contact No:</th>
                  <td style={{ padding: "2px" }}>{manageOrderCusPhn}</td>
                </tr>
                <tr>
                  <th style={{ padding: "2px" }}>Order Date:</th>
                  <td style={{ padding: "2px" }}>
                    {moment(orderSummary?.createDate).format(
                      "Do MMMM YYYY, h:mm A"
                    )}
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "2px" }}>Shipping Address:</th>
                  <td style={{ padding: "2px" }}>
                    {JSON.parse(orderSummary?.shippingAddress)?.address}
                  </td>
                </tr>
              </table>
              <br />
              <table style={{ width: "100%" }}>
                {!checked && (
                  <>
                    <tr
                      style={{
                        borderTop: "1px solid #dee2e6",
                      }}
                    >
                      <th style={{ padding: "2px", color: "#0283D4" }}>
                        Sub-Total:
                      </th>
                      <td style={{ padding: "2px", fontWeight: "600" }}>
                        {totalPrice}
                      </td>
                    </tr>

                    <tr>
                      <th style={{ padding: "2px", color: "#0283D4" }}>
                        Discount:
                      </th>
                      <td style={{ padding: "2px", fontWeight: "600" }}>
                        {orderSummary?.totalDiscountFlatAmt}
                      </td>
                    </tr>

                    {orderSummary?.voucherAmount !== 0 && (
                      <tr>
                        <th style={{ padding: "2px", color: "#0283D4" }}>
                          Voucher/Coupon:
                          <span
                            style={{
                              padding: "2px",
                              fontWeight: "500",
                              color: "#0243D4",
                            }}
                          >
                            {manageOrderVoucherCode ? (
                              <>
                                <br />({manageOrderVoucherCode})
                              </>
                            ) : (
                              <></>
                            )}
                          </span>{" "}
                        </th>
                        <td style={{ padding: "2px", fontWeight: "600" }}>
                          {manageOrderVoucherAmt !== 0 ? (
                            <>-{manageOrderVoucherAmt}</>
                          ) : (
                            <>0</>
                          )}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <th style={{ padding: "2px", color: "#0283D4" }}>VAT:</th>
                      <td style={{ padding: "2px", fontWeight: "600" }}>
                        {orderSummary?.totalVatFlatAmt}
                      </td>
                    </tr>

                    <tr>
                      <th style={{ padding: "2px", color: "#0283D4" }}>TAX:</th>
                      <td style={{ padding: "2px", fontWeight: "600" }}>{0}</td>
                    </tr>
                    <tr>
                      <th style={{ padding: "2px", color: "#0283D4" }}>
                        Shipping Cost:
                      </th>
                      <td style={{ padding: "2px", fontWeight: "600" }}>
                        {orderSummary?.shippingCharge}
                      </td>
                    </tr>
                  </>
                )}

                <tr style={{ borderTop: "1px solid #dee2e6" }}>
                  <th style={{ padding: "2px", color: "#E74A4F" }}>
                    Grand Total:
                  </th>
                  <td style={{ padding: "2px", fontWeight: "600" }}>
                    {orderSummary?.totalPayableAmt}
                  </td>
                </tr>
              </table>
              <br />
              {order_filter_tab === "delivered" ? null : (
                <div>
                  <AdminManageOrderStatus
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    selectedOrders={selectedOrders}
                    setSenderName={setSenderName}
                    setReceiverName={setReceiverName}
                    setTrakingRefNo={setTrakingRefNo}
                    setLocation={setLocation}
                    setRemarks={setRemarks}
                    statusId={statusId}
                    setStatusName={setStatusName}
                    setChecked={setChecked}
                    checked={checked}
                    setNote={setNote}
                    senderName={senderName}
                    receiverName={receiverName}
                    trakingRefNo={trakingRefNo}
                    locations={locations}
                    note={note}
                    statusName={statusName}
                    page={page}
                    setMusokChalan={setMusokChalan}
                    musokChalan={musokChalan}
                    setReturnMusokChalan={setReturnMusokChalan}
                    returnMusokChalan={returnMusokChalan}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-md-8">
            {loading ? (
              <LoadingCard count={1} />
            ) : (
              <div className="datatable-responsive-demo">
                <strong>Order Details</strong>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 5px",
                    backgroundColor: "#F8F9FA",
                    borderTop: "1px solid #dee2e6",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p
                      style={{
                        color: "#0283d4",
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {orderSummary?.shopName}
                    </p>
                    <p
                      style={{
                        marginLeft: "5px",
                        backgroundColor: "#DEE2E6",
                        color: "#0283d4",
                        fontSize: "14px",
                        fontWeight: "600",
                        borderRadius: "20px",
                        padding: "2px 10px",
                      }}
                    >
                      {orderSummary?.orderNo}
                    </p>
                    <div className="m-3 border rounded">
                      
                      <button
                        className="btn btn-primary"
                        style={{
                          fontSize: "8px",
                          padding: "5px",
                          borderRadius: "15px",
                          marginLeft: "5px",
                        }}
                        onClick={() =>
                          handleSingleOrderPrint(
                            order_filter_tab,
                            orderSummary?.invoiceNo,
                            orderSummary?.orderNo
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-printer"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "#0283d4",
                      fontSize: "14px",
                      fontWeight: "650",
                    }}
                  >
                    Payment Method:{" "}
                    {manageOrderPaymentMethodName
                      ? manageOrderPaymentMethodName === "COD"
                        ? "Cash On Delivery"
                        : manageOrderPaymentMethodName
                      : "Not Selected Yet"}
                  </p>
                </div>
                <div
                  style={{
                    maxHeight: "60vh",
                    overflowY: "auto",
                    position: "relative",
                    width: "100%",
                    overflowX: "hidden",
                  }}
                >
                  <DataTable
                    value={orderSummary?.orderDetails}
                    className="p-datatable-customers p-datatable-responsive-demo"
                    rowHover
                    emptyMessage="No order(s) found"
                    selection={selectedOrders}
                    onSelectionChange={(e) => setSelectedOrders(e.value)}
                    responsiveLayout="scroll"
                  >
                    <Column selectionMode="multiple" />
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
                      headerStyle={{ width: "20%" }}
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
                      ield="discountPercent"
                      filterField="discountPercent"
                      header="Discount (%)"
                      body={productDiscountBodyTemplate}
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
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
