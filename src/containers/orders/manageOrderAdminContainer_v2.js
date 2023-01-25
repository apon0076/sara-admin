/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AdminOrderTraking from "../../components/orders/AdminOrderTraking";
import OrderTrakingSummary from "../../components/orders/OrderTrakingSummary";
import { Paginator } from "../../components/paginator/Paginator";
import LoadingCard from "../../components/shared/LoadingCard";
import {
  getCountOrderStatusRecord,
  getOrderStatusWiseRecord,
  getOrderStatusWiseSummaryRecord,
  getShopWiseOrderDetailsRecord,
} from "../../store/actions/orderAction";
import { getPaymentMethodRecord } from "../../store/actions/paymentMethodAction";
import { getAllSellerRecord } from "../../store/actions/sellerAction";
import authenticationService from "../../store/services/authenticationService";

export default function ManageOrderAdminContainer_v2() {
  const [counts, setCounts] = useState(1);
  const [expandedRows, setExpandedRows] = useState(null);
  const [orderSummaryVisible, setOrderSummaryVisible] = useState(false);
  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [statusId, setStatusId] = useState(null);
  const [statusName, setStatusName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(30);
  const [totalPage, setTotalPage] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectVendor, setSelectVendor] = useState(null);
  const [selectPaymentStatus, setSelectPaymentStatus] = useState(null);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(null);
  const [searchKeywordApi, setSearchKeywordApi] = useState("");
  const [startDateApi, setStartDateApi] = useState(null);
  const [endDateApi, setEndDateApi] = useState(null);
  const [selectVendorApi, setSelectVendorApi] = useState(null);
  const [selectPaymentStatusApi, setSelectPaymentStatusApi] = useState(null);
  const [selectPaymentMethodApi, setSelectPaymentMethodApi] = useState(null);
  const [orderListSingleSummary, setOrderListSingleSummary] = useState(null);
  const [shopWiseOrderDetails, setShopWiseOrderDetails] = useState(null);
  const [manageOrderId, setManageOrderId] = useState(null);
  const [manageOrderCusName, setManageOrderCusName] = useState(null);
  const [manageOrderCusPhn, setManageOrderCusPhn] = useState(null);
  const [manageOrderVoucherCode, setManageOrderVoucherCode] = useState(null);
  const [manageOrderVoucherAmt, setManageOrderVoucherAmt] = useState(null);
  const [manageOrderPaymentMethodName, setManageOrderPaymentMethodName] =
    useState(null);
  const [manageOrderCustomerId, setManageOrderCustomerId] = useState(null);
  const [ordersNoString, setOrdersNoString] = useState("");

  const [statusNoArray, setStatusNoArray] = useState([0, 0, 0, 0, 0, 0, 0]);
  let initialStatusNoArray = [0, 0, 0, 0, 0, 0, 0];
  let history = useHistory();

  useEffect(() => {
    let roleId = authenticationService.getRoleId();
    if (roleId === "1") {
    } else {
      history.push("/Login");
    }
  }, [history]);

  useEffect(() => {
    setStatusId(null);
    setStatusName(null);
  }, [orderDetailsVisible]);

  const location = useHistory();
  const order_filter_tab = location?.location?.search?.substring(8);
  const status_for_api_call = order_filter_tab.replaceAll("_", " ");
  const dispatch = useDispatch();

  const paymentStatusArr = [
    { paymentStatus: "Initial", code: 1 },
    { paymentStatus: "Pending", code: 2 },
    { paymentStatus: "Success", code: 3 },
    { paymentStatus: "Partial", code: 4 },
    { paymentStatus: "Failed", code: 5 },
    { paymentStatus: "Cancel", code: 6 },
  ];

  const orders_info = useSelector(
    (state) => state.orderReducer.orderListByStatus
  );
  const loading = useSelector((state) => state.orderReducer.loading);
  const {
    getStatusWiseOrderSummary,
    orderSummaryLoading,
    getShopWiseOrderDetails,
    orderDetailsLoading,
    getCountOrderStatusData,
    getCountOrderStatusLoading,
    getCountOrderStatusError,
  } = useSelector((state) => state.orderReducer);
  const order_list = orders_info.data;

  const allStatusInfo = (allStatusData, statusNo) => {
    allStatusData &&
      allStatusData.map((data) => {
        if (data.statusName === "Pending") {
          statusNo[0] = data.countStatus;
        } else if (data.statusName === "Order Confirm") {
          statusNo[1] = data.countStatus;
        } else if (data.statusName === "Order Processing") {
          statusNo[2] = data.countStatus;
        } else if (data.statusName === "Ready to Ship") {
          statusNo[3] = data.countStatus;
        } else if (data.statusName === "Picked") {
          statusNo[4] = data.countStatus;
        } else if (data.statusName === "Delivered") {
          statusNo[5] = data.countStatus;
        } else if (data.statusName === "Delivery Failed") {
          statusNo[6] = data.countStatus;
        }
        setStatusNoArray(statusNo);
      });
  };

  useEffect(() => {
    dispatch(getCountOrderStatusRecord());
  }, [dispatch, order_list]);

  // useEffect(() => {
  //   setInterval(async () => {
  //     dispatch(getCountOrderStatusRecord());
  //   }, 10000);
  // }, []);

  useEffect(() => {
    getCountOrderStatusData?.data &&
      allStatusInfo(getCountOrderStatusData?.data, initialStatusNoArray);
  }, [getCountOrderStatusData?.data, order_list]);


  useEffect(() => {
    order_list &&
      order_list
        .filter(
          (filter_data, filter_index) => filter_data.invoiceNo === manageOrderId
        )
        .map(
          (data, index) => (
            setManageOrderCusName(data.customerName),
            setManageOrderCusPhn(data.cusContactNo),
            setManageOrderVoucherCode(data.voucherCode),
            setManageOrderVoucherAmt(data.voucherAmount),
            setManageOrderPaymentMethodName(data.paymentMethodName),
            setManageOrderCustomerId(data.customerId)
          )
        );
  }, [manageOrderId]);
  useEffect(() => {
    if (orders_info?.headers?.pagination) {
      var paginated_data_to_parse = orders_info.headers.pagination;
      const paginated_data = JSON.parse(paginated_data_to_parse);
      setCurrentPage(paginated_data.currentPage);
      setTotalPage(paginated_data.totalPages);
      setTotalItems(paginated_data.totalItems);
      setItemPerPage(paginated_data.itemsPerPage);
    }
  }, [orders_info?.headers?.pagination]);

  useEffect(() => {
    if (getStatusWiseOrderSummary.data !== undefined) {
      getStatusWiseOrderSummary.data
        .filter((filter_data, filter_index) => filter_index === 0)
        .map((data, index) => setOrderListSingleSummary(data));
    }
  }, [getStatusWiseOrderSummary]);
  useEffect(() => {
    if (getShopWiseOrderDetails.data !== undefined) {
      getShopWiseOrderDetails.data
        .filter((filter_data, filter_index) => filter_index === 0)
        .map((data, index) => setShopWiseOrderDetails(data));
    }
  }, [getShopWiseOrderDetails]);

  const onVendorChange = (e) => {
    setSelectVendor(e.value);
  };
  const onPaymentStatusChange = (e) => {
    setSelectPaymentStatus(e.value);
  };
  const onPaymentMethodChange = (e) => {
    setSelectPaymentMethod(e.value);
  };
  useEffect(() => {
    dispatch(getPaymentMethodRecord());
    dispatch(getAllSellerRecord());
  }, [dispatch]);
  const paymentMethods = useSelector(
    (state) => state.paymentMethodReducer.paymentMethods
  );
  const vendorList = useSelector((state) => state.sellerReducer.sellerList);
  const toIsoString = (date) => {
    var tzo = -date?.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num) {
        return (num < 10 ? "0" : "") + num;
      };
    return (
      date?.getFullYear() +
      "-" +
      pad(date?.getMonth() + 1) +
      "-" +
      pad(date?.getDate()) +
      "T" +
      pad(date?.getHours()) +
      ":" +
      pad(date?.getMinutes()) +
      ":" +
      pad(date?.getSeconds()) +
      dif +
      pad(Math?.floor(Math?.abs(tzo) / 60)) +
      ":" +
      pad(Math?.abs(tzo) % 60)
    );
  };

  useEffect(() => {
    dispatch(
      getOrderStatusWiseRecord(
        status_for_api_call,
        currentPage,
        itemPerPage,
        searchKeywordApi,
        startDateApi !== null
          ? toIsoString(startDateApi).substring(0, 10)
          : null,
        endDateApi !== null ? toIsoString(endDateApi).substring(0, 10) : null,
        selectVendorApi,
        selectPaymentStatusApi,
        selectPaymentMethodApi
      )
    );
  }, [
    dispatch,
    status_for_api_call,
    counts,
    order_filter_tab,
    currentPage,
    itemPerPage,
    searchKeywordApi,
    startDateApi,
    endDateApi,
    selectVendorApi,
    selectPaymentStatusApi,
    selectPaymentMethodApi,
  ]);

  const filterOrders = (
    searchKeyword,
    startDate,
    endDate,
    selectVendor,
    selectPaymentStatus,
    selectPaymentMethod
  ) => {
    setCurrentPage(1);
    setSearchKeywordApi(searchKeyword);
    setStartDateApi(startDate);
    setEndDateApi(endDate);
    setSelectVendorApi(selectVendor?.shopId);
    setSelectPaymentStatusApi(selectPaymentStatus?.code);
    setSelectPaymentMethodApi(selectPaymentMethod?.paymentMethodId);
  };
  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1);
    setItemPerPage(pagePerItems);
  };
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    let order_no_arr = [];
    selectedOrders.map((data, index) => order_no_arr.push(data.orderNo));
    setOrdersNoString(order_no_arr.toString());
  }, [selectedOrders]);

  const handleMultiplePrint = (invoiceNo, status) => {
    history.push({
      pathname: `/invoiceAdmin`,
      data: { status, invoiceNo, ordersNoString },
      invoiceType,
      order_filter_tab,
    });
  };

  const invoiceType = 5;
  const paymentMethodBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData?.paymentMethodName
            ? rowData?.paymentMethodName === "COD"
              ? "Cash On Delivery"
              : rowData?.paymentMethodName
            : "Not Selected Yet"}
        </span>
      </React.Fragment>
    );
  };
  const expandAll = () => {
    let _expandedRows = {};
    order_list.forEach((p) => (_expandedRows[`${p.invoiceNo}`] = true));
    setExpandedRows(_expandedRows);
  };
  const collapseAll = () => {
    setExpandedRows(null);
  };
  const invoiceNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.invoiceNo}</span>
      </React.Fragment>
    );
  };
  const subtotalBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.totalPayableAmount}</span>
      </React.Fragment>
    );
  };
  const customerBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.customerName}</span>
      </React.Fragment>
    );
  };
  const dateTimeTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.createDate).format("Do MMMM YYYY, h:mm A")}</span>
      </React.Fragment>
    );
  };
  const orderNoNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.orderNo}</span>
      </React.Fragment>
    );
  };
  const orderDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.createDate).format("Do MMMM YYYY, h:mm A")}</span>
      </React.Fragment>
    );
  };
  const priceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.totalPayableAmt}</span>
      </React.Fragment>
    );
  };
  const sellerBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.shopName}</span>
      </React.Fragment>
    );
  };
  const handleManageOrder = (statusName, invoiceNo, orderNo) => {
    setManageOrderId(invoiceNo);
    dispatch(getShopWiseOrderDetailsRecord(statusName, invoiceNo, orderNo));
  };
  const productDetailsTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          onClick={() => {
            handleManageOrder(
              rowData.statusName,
              rowData.invoiceNo,
              rowData.orderNo
            );
            setOrderDetailsVisible(true);
          }}
        >
          Manage
        </Button>
      </React.Fragment>
    );
  };
  const handleOrderSummary = (statusName, invoiceNo) => {
    dispatch(getOrderStatusWiseSummaryRecord(statusName, invoiceNo));
  };

  const productSummaryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          onClick={() => {
            handleOrderSummary(rowData.statusName, rowData.invoiceNo);
            setOrderSummaryVisible(true);
          }}
        >
          Details
        </Button>
      </React.Fragment>
    );
  };
  const rowExpansionTemplate = (data) => {
    // setOrderSummary(data);
    return (
      <div className="orders-subtable">
        <h5>
          Orders for {data?.invoiceNo}{" "}
          {/* <Link
            to={{
              pathname: `/invoiceAdmin`,
              selectedOrders: order,
              invoiceType,
              order_filter_tab,
            }}
          > */}
          <button
            onClick={() => handleMultiplePrint(data.invoiceNo, data.statusName)}
            className="btn btn-info"
            style={{
              padding: "4px 20px",
              fontSize: "13px ",
              marginRight: "5px",
              marginLeft: "10px",
            }}
            disabled={selectedOrders === null || selectedOrders?.length === 0}
          >
            Print
          </button>
          {/* </Link> */}
        </h5>

        <DataTable
          value={data?.shopWiseOrders}
          responsiveLayout="scroll"
          emptyMessage="No order(s) found"
          rowHover
          selection={selectedOrders}
          onSelectionChange={(e) => setSelectedOrders(e.value)}
        >
          <Column selectionMode="multiple" />
          <Column
            field="orderNo"
            filterField="orderNo"
            header="Order No"
            body={orderNoNoBodyTemplate}
            sortable
          />
          <Column
            field="shopName"
            filterField="shopName"
            header="Seller"
            body={sellerBodyTemplate}
            sortable
          />
          <Column
            field="createDate"
            filterField="createDate"
            header="Order Date"
            body={orderDateBodyTemplate}
            sortable
          />
          <Column
            field="totalPayableAmt"
            filterField="totalPayableAmt"
            header="Price"
            body={priceBodyTemplate}
            sortable
          />
          <Column header="Action" body={productDetailsTemplate} />
        </DataTable>
      </div>
    );
  };
  const header = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="table-header-container">
        {expandedRows === null ? (
          <Button
            icon="pi pi-plus"
            label="Expand All"
            onClick={expandAll}
            className="mr-2"
          />
        ) : (
          <Button
            icon="pi pi-minus"
            label="Collapse All"
            onClick={collapseAll}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "spaceBetween",
        }}
        className="order_filter__section"
      >
        <div style={{ margin: "0 2px", width: "190px", position: "relative" }}>
          <InputText
            style={{
              width: "100%",
            }}
            className="manage_product__search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Keyword"
          />
          {searchKeyword !== "" ? (
            <button
              style={{
                position: "absolute",
                top: "6px",
                right: "8px",
                borderRadius: "100%",
                border: "1px solid #ced4da",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSearchKeyword("");
                setSearchKeywordApi("");
                setCurrentPage(1);
              }}
            >
              <i className="pi pi-times"></i>
            </button>
          ) : null}
        </div>
        <div style={{ margin: "0 2px", width: "155px", position: "relative" }}>
          <Calendar
            id="icon"
            maxDate={endDate}
            value={startDate}
            onChange={(e) => setStartDate(e.value)}
            showIcon
            placeholder="Start Date"
            readOnlyInput
          />
          {startDate !== null ? (
            <button
              style={{
                position: "absolute",
                top: "6px",
                right: "33px",
                borderRadius: "100%",
                border: "1px solid #ced4da",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setStartDate(null);
                setStartDateApi(null);
                setCurrentPage(1);
              }}
            >
              <i className="pi pi-times"></i>
            </button>
          ) : null}
        </div>
        <div style={{ margin: "0 2px", width: "155px", position: "relative" }}>
          <Calendar
            id="icon disableddays"
            minDate={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.value)}
            showIcon
            placeholder="End Date"
            readOnlyInput
          />
          {endDate !== null ? (
            <button
              style={{
                position: "absolute",
                top: "6px",
                right: "33px",
                borderRadius: "100%",
                border: "1px solid #ced4da",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setEndDate(null);
                setEndDateApi(null);
                setCurrentPage(1);
              }}
            >
              <i className="pi pi-times"></i>
            </button>
          ) : null}
        </div>
        <div style={{ margin: "0 2px", width: "155px", position: "relative" }}>
          <Dropdown
            style={{
              width: "100%",
            }}
            value={selectVendor}
            options={vendorList.data}
            onChange={onVendorChange}
            optionLabel="shopName"
            placeholder="Select a Vendor"
            filter
            showClear
          />
          {selectVendor !== null ? (
            <button
              style={{
                position: "absolute",
                top: "6px",
                right: "8px",
                borderRadius: "100%",
                border: "1px solid #ced4da",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectVendor(null);
                setSelectVendorApi(null);
                setCurrentPage(1);
              }}
            >
              <i className="pi pi-times"></i>
            </button>
          ) : null}
        </div>
        <div style={{ margin: "0 2px", width: "160px", position: "relative" }}>
          <Dropdown
            style={{
              width: "100%",
            }}
            value={selectPaymentStatus}
            options={paymentStatusArr}
            onChange={onPaymentStatusChange}
            optionLabel="paymentStatus"
            placeholder="Payment Status"
          />
          {selectPaymentStatus !== null ? (
            <button
              style={{
                position: "absolute",
                top: "6px",
                right: "8px",
                borderRadius: "100%",
                border: "1px solid #ced4da",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectPaymentStatus(null);
                setSelectPaymentStatusApi(null);
                setCurrentPage(1);
              }}
            >
              <i className="pi pi-times"></i>
            </button>
          ) : null}
        </div>
        <div style={{ margin: "0 2px", width: "160px", position: "relative" }}>
          <Dropdown
            style={{
              width: "100%",
            }}
            value={selectPaymentMethod}
            options={paymentMethods}
            onChange={onPaymentMethodChange}
            optionLabel="methodName"
            placeholder="Payment Method"
            filter
            showClear
          />
          {selectPaymentMethod !== null ? (
            <button
              style={{
                position: "absolute",
                top: "6px",
                right: "8px",
                borderRadius: "100%",
                border: "1px solid #ced4da",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectPaymentMethod(null);
                setSelectPaymentMethodApi(null);
                setCurrentPage(1);
              }}
            >
              <i className="pi pi-times"></i>
            </button>
          ) : null}
        </div>
        <div style={{ position: "relative" }}>
          <Button
            onClick={() =>
              filterOrders(
                searchKeyword,
                startDate,
                endDate,
                selectVendor,
                selectPaymentStatus,
                selectPaymentMethod
              )
            }
            style={{ marginLeft: "3px" }}
            label="Search"
            disabled={startDate?.getTime() > endDate?.getTime()}
          />
          {startDate?.getTime() > endDate?.getTime() ? (
            <>
              <div
                style={{
                  position: "absolute",
                  width: "230px",
                  background: "#A596F1",
                  color: "#fff",
                  padding: "4px",
                  left: "-165px",
                  top: "-29px",
                  whiteSpace: "nowrap",
                }}
              >
                Start Date Should Be Older Than End Date
              </div>
              <div
                style={{
                  position: "absolute",
                  height: "10px",
                  width: "10px",
                  background: "#A596F1",
                  transform: "rotate(45deg)",
                  top: "-13px",
                  right: "27px",
                }}
              ></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="col-md-12">
          <div className="white-box">
            <div className="datatable-rowexpansion-demo">
              <div className="card">
                <ul class="nav nav-tabs seller-tabs">
                  <li>
                    <Link
                      to={`/ManageOrdersAdmin?status=pending`}
                      style={
                        order_filter_tab === "pending"
                          ? { color: "#7391CD" }
                          : null
                      }
                    >
                      Pending{" "}
                      <span style={{ fontWeight: "700", color: "#1F5DA0" }}>
                        {statusNoArray[0] === 0 ? null : (
                          <span>
                            (
                            <span style={{ color: "#D71110" }}>
                              {statusNoArray[0]}
                            </span>
                            )
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrdersAdmin?status=order_confirm`}
                      style={
                        order_filter_tab === "order_confirm"
                          ? { color: "#7391CD" }
                          : null
                      }
                    >
                      Order Confirm{" "}
                      <span style={{ fontWeight: "700", color: "#1F5DA0" }}>
                        {statusNoArray[1] === 0 ? null : (
                          <span>
                            (
                            <span style={{ color: "#D71110" }}>
                              {statusNoArray[1]}
                            </span>
                            )
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrdersAdmin?status=order_processing`}
                      style={
                        order_filter_tab === "order_processing"
                          ? { color: "#7391CD" }
                          : null
                      }
                    >
                      Order Processing{" "}
                      <span style={{ fontWeight: "700", color: "#1F5DA0" }}>
                        {statusNoArray[2] === 0 ? null : (
                          <span>
                            (
                            <span style={{ color: "#D71110" }}>
                              {statusNoArray[2]}
                            </span>
                            )
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrdersAdmin?status=ready_to_ship`}
                      style={
                        order_filter_tab === "ready_to_ship"
                          ? { color: "#7391CD" }
                          : null
                      }
                    >
                      Ready to Ship{" "}
                      <span style={{ fontWeight: "700", color: "#1F5DA0" }}>
                        {statusNoArray[3] === 0 ? null : (
                          <span>
                            (
                            <span style={{ color: "#D71110" }}>
                              {statusNoArray[3]}
                            </span>
                            )
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrdersAdmin?status=picked`}
                      style={
                        order_filter_tab === "picked"
                          ? { color: "#7391CD" }
                          : null
                      }
                    >
                      Picked{" "}
                      <span style={{ fontWeight: "700", color: "#1F5DA0" }}>
                        {statusNoArray[4] === 0 ? null : (
                          <span>
                            (
                            <span style={{ color: "#D71110" }}>
                              {statusNoArray[4]}
                            </span>
                            )
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrdersAdmin?status=delivered`}
                      style={
                        order_filter_tab === "delivered"
                          ? { color: "#7391CD" }
                          : null
                      }
                    >
                      Delivered{" "}
                      {/* <span style={{ fontWeight: "700", color: "#1F5DA0" }}>
                        ({statusNoArray[5]})
                      </span> */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrdersAdmin?status=delivery_failed`}
                      style={
                        order_filter_tab === "delivery_failed"
                          ? { color: "#7391CD" }
                          : null
                      }
                    >
                      Delivery Failed{" "}
                      <span style={{ fontWeight: "700", color: "#1F5DA0" }}>
                        {statusNoArray[6] === 0 ? null : (
                          <span>
                            (
                            <span style={{ color: "#D71110" }}>
                              {statusNoArray[6]}
                            </span>
                            )
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="card">
                {loading ? (
                  <LoadingCard count={1} />
                ) : (
                  <>
                    <DataTable
                      value={order_list}
                      expandedRows={expandedRows}
                      onRowToggle={(e) => setExpandedRows(e.data)}
                      responsiveLayout="scroll"
                      rowExpansionTemplate={rowExpansionTemplate}
                      dataKey="invoiceNo"
                      rowHover
                      header={header}
                      emptyMessage="No order(s) found"
                    >
                      <Column expander style={{ width: "3em" }} />
                      <Column
                        field="invoiceNo"
                        filterField="invoiceNo"
                        header="Invoice No"
                        body={invoiceNoBodyTemplate}
                        sortable
                      />
                      <Column
                        field="customerName"
                        header="Customer Name"
                        body={customerBodyTemplate}
                        sortable
                      />
                      <Column
                        field="createDate"
                        header="Date and Time"
                        body={dateTimeTemplate}
                        sortable
                      />
                      <Column
                        field="orderSubtotalAmt"
                        header="Subtotal Amount"
                        body={subtotalBodyTemplate}
                        sortable
                      />
                      <Column
                        field="paymentMethodName"
                        header="Payment Method"
                        body={paymentMethodBodyTemplate}
                        sortable
                      />
                      <Column header="Action" body={productSummaryTemplate} />
                    </DataTable>
                    <Paginator
                      totalPage={totalPage}
                      currentPage={currentPage}
                      itemPerPage={itemPerPage}
                      totalItems={totalItems}
                      items={order_list}
                      itemsPerPageOptions={[30, 60, 90, 100, 200, 300]}
                      handleItemPerPage={handleItemPerPage}
                      handleCurrentPage={handleCurrentPage}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {orderListSingleSummary !== null ? (
        <Modal
          title={`Invoice No: #${orderListSingleSummary?.invoiceNo}
          `}
          centered
          visible={orderSummaryVisible}
          onOk={() => setOrderSummaryVisible(false)}
          onCancel={() => setOrderSummaryVisible(false)}
          width={1500}
        >
          <OrderTrakingSummary
            orderSummary={orderListSingleSummary}
            loading={orderSummaryLoading}
          />
        </Modal>
      ) : null}

      {shopWiseOrderDetails !== null ? (
        <Modal
          title="Order Details"
          centered
          visible={orderDetailsVisible}
          onOk={() => setOrderDetailsVisible(false)}
          onCancel={() => setOrderDetailsVisible(false)}
          width={1500}
        >
          <AdminOrderTraking
            orderSummary={shopWiseOrderDetails}
            setOrderDetailsVisible={setOrderDetailsVisible}
            page={history.location.pathname}
            counts={counts}
            setCounts={setCounts}
            order_filter_tab={order_filter_tab}
            setExpandedRows={setExpandedRows}
            setStatusId={setStatusId}
            setStatusName={setStatusName}
            statusId={statusId}
            statusName={statusName}
            manageOrderCusName={manageOrderCusName}
            manageOrderCusPhn={manageOrderCusPhn}
            manageOrderVoucherCode={manageOrderVoucherCode}
            manageOrderVoucherAmt={manageOrderVoucherAmt}
            manageOrderPaymentMethodName={manageOrderPaymentMethodName}
            manageOrderCustomerId={manageOrderCustomerId}
            orderDetailsLoading={orderDetailsLoading}
          />
        </Modal>
      ) : null}
    </div>
  );
}
