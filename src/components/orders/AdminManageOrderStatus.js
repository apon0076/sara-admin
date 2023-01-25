import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOrderStatusTypeRecord } from "../../store/actions/orderAction";

export default function AdminManageOrderStatus({
  handleSubmit,
  handleChange,
  selectedOrders,
  setSenderName,
  setReceiverName,
  setTrakingRefNo,
  setLocation,
  setRemarks,
  checked,
  setChecked,
  setNote,
  page,
  remarks,
  senderName,
  receiverName,
  trakingRefNo,
  locations,
  note,
  statusName,
  statusId,
  setMusokChalan,
  musokChalan,
  setReturnMusokChalan,
  returnMusokChalan,
}) {
  const dispatch = useDispatch();
  const location = useHistory();
  var page_pathname = location?.location?.pathname;
  const order_status = useSelector(
    (state) => state.orderReducer.orderStatusType
  );
  const order_filter_tab = location?.location?.search?.substring(8);
  const status_for_api_call = order_filter_tab.replaceAll("_", " ");
  useEffect(() => {
    dispatch(getOrderStatusTypeRecord());
  }, [dispatch]);
  return (
    <div>
      <strong style={{ margin: "0" }}>Order Tracking</strong>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <label>Order Status</label>
        <Dropdown
          style={{
            width: "100%",
            padding: "1px 5px",
            border: "1px solid #B3B3B3",
            borderRadius: "3px",
          }}
          name="statusTypeName"
          options={order_status?.filter((status, i) =>
            page_pathname === "/CancelOrders" ||
            page_pathname === "/CancelSellerOrders"
              ? status?.displayOrder > 37 && status?.displayOrder < 43
              : page_pathname === "/ManageOrdersAdmin" &&
                order_filter_tab === "pending"
              ? (status?.displayOrder >= 4 && status?.displayOrder <= 7) ||
                status?.displayOrder === 37
              : page_pathname === "/ManageOrdersAdmin" &&
                order_filter_tab === "order_confirm"
              ? (status?.displayOrder >= 8 && status?.displayOrder <= 12) ||
                status?.displayOrder === 37
              : page_pathname === "/ManageOrdersAdmin" &&
                order_filter_tab === "order_processing"
              ? (status?.displayOrder >= 13 && status?.displayOrder <= 17) ||
                status?.displayOrder === 37
              : page_pathname === "/ManageOrdersAdmin" &&
                order_filter_tab === "ready_to_ship"
              ? status?.displayOrder >= 18 && status?.displayOrder <= 22
              : page_pathname === "/ManageOrdersAdmin" &&
                order_filter_tab === "picked"
              ? status?.displayOrder >= 23 && status?.displayOrder <= 32
              : page_pathname === "/ManageOrdersAdmin" &&
                order_filter_tab === "delivery_failed"
              ? status?.displayOrder >= 26 && status?.displayOrder <= 27
              : (page_pathname === "/ReturnOrders" ||
                  page_pathname === "/ReturnSellerOrders") &&
                order_filter_tab === "return_request"
              ? status?.displayOrder >= 48 && status?.displayOrder <= 52
              : (page_pathname === "/ReturnOrders" ||
                  page_pathname === "/ReturnSellerOrders") &&
                order_filter_tab === "parcel_pickup_pending"
              ? status?.displayOrder >= 53 && status?.displayOrder <= 57
              : (page_pathname === "/ReturnOrders" ||
                  page_pathname === "/ReturnSellerOrders") &&
                order_filter_tab === "parcel_returning"
              ? status?.displayOrder >= 58 &&
                status?.displayOrder <= 67 &&
                status?.displayOrder != 62
              : null
          )}
          onChange={handleChange}
          optionLabel="statusTypeName"
          placeholder={
            statusName
              ? statusName
              : order_status?.map((status_name, index) =>
                  status_for_api_call ===
                  status_name?.statusTypeName.toLowerCase()
                    ? status_name?.statusTypeName
                    : ""
                )
          }
        />
        <br />
        {page === "/CancelOrders" || page === "/CancelSellerOrders" ? null : (
          <div style={{ display: "flex", margin: "7px 0" }}>
            <Checkbox
              inputId="cb2"
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <label htmlFor="cb2" style={{ margin: "0 0 0 5px" }}>
              Show More Options
            </label>
          </div>
        )}
        <div style={{ height: checked ? "200px" : null, overflowY: "auto" }}>
          {checked ? (
            <>
              {(statusName === "Order Processing" ||
                (statusName === null &&
                  order_filter_tab === "order_processing")) && (
                <>
                  <label>Musok Chalan Number</label>
                  <br />
                  <input
                    onChange={(e) => setMusokChalan(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #B3B3B3",
                      borderRadius: "3px",
                    }}
                    type="text"
                    placeholder="Enter Musok Chalan Number"
                    value={musokChalan}
                  />
                  <br />
                </>
              )}
              {(statusName === "Delivery Failed" ||
                (statusName === null &&
                  order_filter_tab === "delivery_failed")) && (
                <>
                  <label>Return Musok Chalan</label>
                  <br />
                  <input
                    onChange={(e) => setReturnMusokChalan(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #B3B3B3",
                      borderRadius: "3px",
                    }}
                    type="text"
                    placeholder="Return Musok Chalan"
                    value={returnMusokChalan}
                  />
                  <br />
                </>
              )}
              <label>Sender Name</label>
              <br />
              <input
                onChange={(e) => setSenderName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "1px solid #B3B3B3",
                  borderRadius: "3px",
                }}
                type="text"
                placeholder="Enter Sender Name"
                value={senderName}
              />
              <br />
              <label>Receiver Name</label>
              <br />
              <input
                onChange={(e) => setReceiverName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "1px solid #B3B3B3",
                  borderRadius: "3px",
                }}
                type="text"
                placeholder="Enter Receiver Name"
                value={receiverName}
              />
              <br />
              <label>Tracking Reference No.</label>
              <br />
              <input
                onChange={(e) => setTrakingRefNo(e.target.value)}
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "1px solid #B3B3B3",
                  borderRadius: "3px",
                }}
                type="text"
                placeholder="Enter Tracking Reference No."
                value={trakingRefNo}
              />
              <br />
              <label>Location</label>
              <br />
              <input
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "1px solid #B3B3B3",
                  borderRadius: "3px",
                }}
                type="text"
                placeholder="Enter Location"
                value={locations}
              />
              <br />
            </>
          ) : null}
          {checked ||
          page === "/CancelSellerOrders" ||
          page === "/CancelOrders" ? (
            <>
              <label>Remarks.</label>
              <br />
              <textarea
                onChange={(e) => setRemarks(e.target.value)}
                style={{
                  width: "100%",
                  padding: "5px",
                  border: "1px solid #B3B3B3",
                  borderRadius: "3px",
                }}
                rows="2"
                placeholder="Enter Remarks"
                value={remarks}
              />
              <br />
              {page === "/CancelOrders" ||
              page === "/ReturnOrders" ||
              page === "/ManageOrdersAdmin" ? (
                <>
                  <label>Note</label>
                  <br />
                  <input
                    onChange={(e) => setNote(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #B3B3B3",
                      borderRadius: "3px",
                    }}
                    type="text"
                    placeholder="Enter Note"
                    value={note}
                  />
                  <br />
                </>
              ) : null}

              <br />
            </>
          ) : null}
        </div>

        <Button
          className="ps-btn ps-btn--fullwidth"
          type="submit"
          onClick={() => handleSubmit()}
          disabled={
            selectedOrders === null ||
            selectedOrders?.length === 0 ||
            statusName === null ||
            statusId === null
          }
        >
          <i className="fa fa-send"></i> Submit
        </Button>
      </div>
    </div>
  );
}
