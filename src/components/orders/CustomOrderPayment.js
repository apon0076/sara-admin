/* eslint-disable jsx-a11y/img-redundant-alt */
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  createOrderPaymentManualRecord,
  createOrderPaymentManualReset,
  getPaymentMethodRecord,
} from "../../store/actions/paymentMethodAction";
import baseUrl from "../../utils/baseUrl";
import "./CustomOrderPayment.css";

export default function CustomOrderPayment({ orderData, orderInfo }) {
  const [trnxId, setTrnxId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentTime, setPaymentTime] = useState(null);
  const [receivingAccount, setReceivingAccount] = useState("");
  const [document, setDocument] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const dispatch = useDispatch();
  let history = useHistory();

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
        color: "#fff",
      }}
      spin
    />
  );

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
  const isoPaymentDate =
    paymentDate !== null ? toIsoString(paymentDate).substring(0, 10) : null;
  const isoPaymentTime =
    paymentTime !== null ? toIsoString(paymentTime).substring(10, 19) : null;
  const payment_date_time = isoPaymentDate + isoPaymentTime;

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const onUploadFileChange = ({ target }) => {
    if (
      !target.files[0].name.match(
        /\.(jpg|jpeg|png|gif|webp|pdf|JPG|JPEG|PNG|GIF|WEBP|PDF)$/
      )
    ) {
      target.value = null;
      toast.error("Select a valid file.");
    } else {
      if (target.files < 1 || !target.validity.valid) {
        return;
      }
      fileToBase64(target.files[0], (err, result) => {
        if (result) {
          setDocument({
            doc: result,
          });
        }
      });
    }
  };
  useEffect(() => {
    if (paymentMethod?.paymentMethodId === 5) {
      setTrnxId("");
      setPaymentDate(null);
      setPaymentTime(null);
      setReceivingAccount("");
      setDocument({
        doc: "",
      });
      setRemarks("");
    }
  }, [paymentMethod]);

  useEffect(() => {
    dispatch(getPaymentMethodRecord());
  }, [dispatch]);
  const payment_method_name = useSelector(
    (state) => state?.paymentMethodReducer
  );
  const { paymentMethods } = payment_method_name;
  const onPaymentOptionChange = (e) => {
    setPaymentMethod(e.value);
  };
  const shipping_address = JSON.parse(orderData?.shippingAddress);
  const imageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={`${baseUrl}${rowData?.productImage}`}
          alt="Product Image"
          style={{
            height: "50px",
            width: "50px",
          }}
        ></img>
      </React.Fragment>
    );
  };
  const handlePayment = () => {
    const paymentData = {
      tranRefNo: trnxId,
      tranDate:
        paymentDate === null || paymentTime === null
          ? toIsoString(new Date()).substring(0, 19)
          : payment_date_time,
      orderProfileId: orderInfo?.message,
      orderInvoiceNo: orderInfo?.optional,
      paymentMethodId: paymentMethod?.paymentMethodId,
      paymentMethod: paymentMethod?.methodName,
      totalAmmount: orderData.totalPayableAmount,
      accountNo: receivingAccount,
      paymentStatus:
        paymentMethod?.paymentMethodId === 5 ? "Pending" : "Success",
      paymentStatusId: paymentMethod?.paymentMethodId === 5 ? 2 : 3,
      remarks: remarks,
      fileAttachment: document?.doc,
      other: "",
    };
    dispatch(createOrderPaymentManualRecord(paymentData));
  };
  const order_payment_info = useSelector((state) => state.paymentMethodReducer);
  const { loading, data } = order_payment_info;

  useEffect(() => {
    data?.data?.succeed && dispatch(createOrderPaymentManualReset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.succeed]);

  useEffect(() => {
    if (data?.data?.succeed === true) {
      toast.success("Payment Method Selected Successfully!");
      setTimeout(() => {
        history.push("/ManageOrdersAdmin?status=pending");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.succeed]);

  return (
    <>
      <div className="custom_order_payment__section">
        <div className="custom_order_payment__header_section">
          <ul>
            <li>
              <div className="custom_order_header__title">Invoice No:</div>
              {orderInfo?.optional}
            </li>
            <li>
              <div className="custom_order_header__title">Order Date:</div>

              {moment(new Date()).format("Do MMMM YYYY, h:mm A")}
            </li>
            <li>
              <div className="custom_order_header__title">Payment Method:</div>
              {orderData.paymentStatusId === 0
                ? "Not Selected Yet"
                : orderData.paymentStatusId === 2
                ? "Pending"
                : orderData.paymentStatusId === 3
                ? "Success"
                : orderData.paymentStatusId === 4
                ? "Partial"
                : null}
            </li>
          </ul>
        </div>
        <div className="custom_order_payment__header_section">
          <ul>
            <li>
              <div className="custom_order_header__title">Name:</div>
              {orderData.customerName}
            </li>
            <li>
              <div className="custom_order_header__title">Contact No:</div>
              {orderData.customerContactNo}
            </li>
            <li>
              <div className="custom_order_header__title">
                Shipping Address:
              </div>
              {shipping_address.address}
            </li>
          </ul>
        </div>
        <div className="custom_order_payment__header_section">
          <ul>
            <li>
              <div className="custom_order_header__title">Sub-Total:</div>
              {orderData.orderSubtotalAmt}
            </li>
            <li>
              <div className="custom_order_header__title">Shipping Cost:</div>
              {orderData.totalShippingCharge}
            </li>
            <li>
              <div className="custom_order_header__title">Discount:</div>
              {orderData.orderSubtotalDiscountAmt}
            </li>
            <li>
              <div className="custom_order_header__title">Coupon:</div>
              {orderData.voucherAmount}
            </li>
            <li>
              <div className="custom_order_header__title">Total:</div>
              {orderData.totalPayableAmount}
            </li>
          </ul>
        </div>
      </div>
      <div className="custom_order_table__section">
        <div className="custom_order_product__section">
          {orderData.shopWiseOrders.map((shopWiseData, shopWiseIndex) => (
            <div className="card custom_card">
              <h6
                style={{
                  background: "#f3f3f3",
                  padding: "5px",
                  fontWeight: "600",
                }}
              >
                {shopWiseData.shopName}
              </h6>
              <DataTable
                value={shopWiseData.orderDetails}
                responsiveLayout="scroll"
                key={shopWiseIndex}
              >
                <Column field="productTitle" header="Product Title"></Column>
                <Column field="sku" header="Style No."></Column>
                <Column
                  field="productVariant"
                  // body={variantsBodyTemplate}
                  header="Variants"
                ></Column>
                <Column
                  field="productImage"
                  body={imageBodyTemplate}
                  header="Image"
                ></Column>
                <Column field="productQuantity" header="Qty"></Column>
                <Column field="productPrice" header="Price"></Column>
              </DataTable>
            </div>
          ))}
        </div>
        <div className="custom_order_get_payment__section">
          <h6
            style={{ background: "#f3f3f3", padding: "5px", fontWeight: "600" }}
          >
            Payment Information
          </h6>
          <div className="input_field_row__section">
            <div className="input_field__section" style={{ width: "49%" }}>
              <label htmlFor="paymentOptions">
                Select Payment Option{" "}
                <span
                  aria-hidden="true"
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  *
                </span>
              </label>
              <Dropdown
                style={{ width: "100%" }}
                id="paymentOptions"
                value={paymentMethod}
                options={paymentMethods}
                onChange={onPaymentOptionChange}
                optionLabel="methodName"
                placeholder="Select a Payment Option"
              />
            </div>

            <div className="input_field__section" style={{ width: "49%" }}>
              <label htmlFor="amount">Amount</label>
              <InputText
                id="amount"
                style={{ width: "100%" }}
                value={orderData.totalPayableAmount}
              />
            </div>
          </div>
          <div className="input_field_row__section">
            <div style={{ width: "49%" }}>
              <label htmlFor="paymentDate">
                Payment Date{" "}
                {paymentMethod?.paymentMethodId !== 5 && (
                  <span
                    aria-hidden="true"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                )}
              </label>
              <Calendar
                style={{ width: "100%" }}
                id="paymentDate"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.value)}
                showIcon
                placeholder="Select Payment Date"
                readOnlyInput
                disabled={paymentMethod?.paymentMethodId === 5}
              />
            </div>
            <div className="input_field__section" style={{ width: "49%" }}>
              <label htmlFor="time12">
                Payment Time{" "}
                {paymentMethod?.paymentMethodId !== 5 && (
                  <span
                    aria-hidden="true"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                )}
              </label>
              <Calendar
                style={{ width: "100%" }}
                id="time12"
                value={paymentTime}
                onChange={(e) => setPaymentTime(e.value)}
                timeOnly
                hourFormat="12"
                placeholder="Payment Time (12:00 AM)"
                disabled={paymentMethod?.paymentMethodId === 5}
              />
            </div>
          </div>
          <div className="input_field_row__section">
            <div className="input_field__section" style={{ width: "49%" }}>
              <label htmlFor="trnx">Receiving Account No</label>
              <InputText
                id="trnx"
                style={{ width: "100%" }}
                value={receivingAccount}
                onChange={(e) => setReceivingAccount(e.target.value)}
                placeholder="Enter Receiving Account No"
                disabled={paymentMethod?.paymentMethodId === 5}
              />
            </div>
            <div className="input_field__section" style={{ width: "49%" }}>
              <label htmlFor="trnx">Transaction ID.</label>
              <InputText
                id="trnx"
                style={{ width: "100%" }}
                value={trnxId}
                onChange={(e) => setTrnxId(e.target.value)}
                placeholder="Enter Transaction ID"
                disabled={paymentMethod?.paymentMethodId === 5}
              />
            </div>
          </div>
          <div className="input_field_row__section">
            <div className="input_field__section">
              <label htmlFor="doc">Upload Document</label>
              <input
                className="input_file__field"
                type="file"
                name="filetobase64"
                onChange={onUploadFileChange}
              />
            </div>
          </div>
          <div className="input_field_row__section">
            <div className="input_field__section">
              <label htmlFor="remarks">Remarks</label>
              <InputTextarea
                rows={2}
                id="remarks"
                style={{ width: "100%" }}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter Remarks Here"
              />
            </div>
          </div>
          <div className="input_field_row__section">
            <div className="input_field__section">
              <Button
                label="Submit"
                aria-label="Submit"
                onClick={() => handlePayment()}
                disabled={
                  (paymentMethod?.paymentMethodId !== 5 &&
                    (paymentDate === null || paymentTime === null)) ||
                  loading
                }
              />
              <span className="spinner__icon">
                {loading ? <Spin indicator={antIcon} /> : null}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </>
  );
}
