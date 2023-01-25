import Column from "antd/es/table/Column";
import moment from "moment";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getPaymentMethodRecord } from "../../store/actions/paymentMethodAction";
import { postRefundDataRecord, postRefundDataReset } from "../../store/actions/refundActions";
import baseUrl from "../../utils/baseUrl";
import "./refund.css";

export default function CancelRefundModal({
  orderInfo,
  counts,
  setCounts,
  setRefundVisible,
}) {
  const [referenceNo, setReferenceNo] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNo, setAccountNo] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [amount, setAmount] = useState(orderInfo?.totalAmount);
  const [remark, setRemark] = useState("");
  const [document, setDocument] = useState(null);
  const dispatch = useDispatch();
  let history = useHistory();
  const refund_page_location = history?.location?.pathname;

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
            showFile: URL.createObjectURL(target.files[0]),
          });
        }
      });
    }
  };
  const dataForCancelRefundPost = {
    orderProfileId: orderInfo.orderProfileId,
    orderInvoiceNo: orderInfo.orderInvoiceNo,
    shopwiseOrderId: orderInfo.shopWiseOrderId,
    shopwiseOrderNo: orderInfo.shopwiseOrderNo,
    customerId: orderInfo.customerId,
    paymentMethodId: selectedMethod?.paymentMethodId,
    accountNo: accountNo,
    chequeNo: chequeNo,
    cardNo: "string",
    documentUrl: document?.doc,
    amount: Number(amount),
    status: "Success",
    remarks: remark,
    isActive: "Y",
    requestType: "cancel",
    referenceNo: referenceNo,
    cancelReturnInvoiceNo: orderInfo.cancelInvoiceNo,
    BankName: "",
  };
  const dataForReturnRefundPost = {
    orderProfileId: orderInfo.orderProfileId,
    orderInvoiceNo: orderInfo.orderInvoiceNo,
    shopwiseOrderId: orderInfo.shopWiseOrderId,
    shopwiseOrderNo: orderInfo.shopwiseOrderNo,
    customerId: orderInfo.customerId,
    paymentMethodId: selectedMethod?.paymentMethodId,
    accountNo: accountNo,
    chequeNo: chequeNo,
    cardNo: "string",
    documentUrl: document?.doc,
    amount: Number(amount),
    status: "Success",
    remarks: remark,
    isActive: "Y",
    requestType: "return",
    referenceNo: referenceNo,
    cancelReturnInvoiceNo: orderInfo.returnInvoiceNo,
    BankName: "",
  };
  useEffect(() => {
    dispatch(getPaymentMethodRecord());
  }, [dispatch]);
  const payment_method_name = useSelector(
    (state) => state?.paymentMethodReducer
  );
  const { paymentMethods, loading } = payment_method_name;
  const onPaymentMethodChange = (e) => {
    setSelectedMethod(e.value);
  };
  const onBankChange = (e) => {
    setSelectedBank(e.value);
  };
  const onSubmitRefund = () => {
    if (
      refund_page_location === "/ReturnOrders" ||
      refund_page_location === "/ReturnSellerOrders"
    ) {
      dispatch(postRefundDataRecord(dataForReturnRefundPost));
    } else {
      dispatch(postRefundDataRecord(dataForCancelRefundPost));
    }
  };
  const return_refund_msg = useSelector(
    (state) => state.refundReducer?.post_refund
  );

  useEffect(() => {
    return_refund_msg?.success?.succeed && dispatch(postRefundDataReset());
  }, [dispatch, return_refund_msg?.success?.succeed]);

  const refund_loading = useSelector((state) => state.refundReducer.loading);
  useEffect(() => {
    if (return_refund_msg?.success?.succeed === true) {
      setCounts(counts + 1);
      setRefundVisible(false);
      setReferenceNo("");
      setSelectedMethod(null);
      setSelectedBank(null);
      setDocument(null);
      setAccountNo("");
      setChequeNo("");
      setAmount(orderInfo?.totalAmount);
      setRemark("");
    }
  }, [
    counts,
    orderInfo.totalAmount,
    return_refund_msg,
    setCounts,
    setRefundVisible,
  ]);

  const bankList = [
    { name: "SCBL" },
    { name: "DBBL" },
    { name: "Agrani Bank" },
    { name: "City Bank" },
  ];
  const onIndexTemplate = (data, props) => {
    return props.rowIndex + 1;
  };
  const productImageBodyTemplate = (rowData) => {
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
  const productAmountBodyTemplate = (rowData) => {
    const total_amount = rowData?.productPrice * rowData?.productQty;
    return (
      <React.Fragment>
        <span>{total_amount}</span>
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
  return (
    <div className="refund_modal__container">
      <ToastContainer autoClose={2500} />
      <div className="order_n_product_section">
        <div className="order_details">
          <div className="order_details_section">
            <p className="order_info">
              {refund_page_location === "/ReturnOrders" ||
              refund_page_location === "/ReturnSellerOrders" ? (
                <>
                  <strong>Return Invoice No:</strong>
                  {orderInfo?.returnInvoiceNo}
                </>
              ) : (
                <>
                  <strong>Cancel Invoice No:</strong>
                  {orderInfo?.cancelInvoiceNo}
                </>
              )}
            </p>
            <p className="order_info">
              <strong>Order Invoice No:</strong> {orderInfo?.orderInvoiceNo}
            </p>
            <p className="order_info">
              {refund_page_location === "/ReturnOrders" ||
              refund_page_location === "/ReturnSellerOrders" ? (
                <>
                  <strong>Return Date:</strong>
                  {moment(orderInfo?.returnDate).format("Do MMMM YYYY, h:mm A")}
                </>
              ) : (
                <>
                  <strong>Cancel Date:</strong>
                  {moment(orderInfo?.cancelDate).format("Do MMMM YYYY, h:mm A")}
                </>
              )}
            </p>
          </div>
          <div className="order_details_section">
            <p className="order_info">
              <strong>Total Amount:</strong>
              {orderInfo?.totalAmount} TK
            </p>
            <p className="order_info">
              <strong>Payment Method:</strong>
              {orderInfo?.paymentMethodName
                ? orderInfo?.paymentMethodName === "COD"
                  ? "Cash On Delivery"
                  : orderInfo?.paymentMethodName
                : "Not Selected Yet"}
            </p>
          </div>
        </div>
        <div
          style={{
            maxHeight: "50vh",
            overflowY: "auto",
            position: "relative",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <DataTable
            className="p-datatable-customers p-datatable-responsive-demo"
            value={
              refund_page_location === "/ReturnOrders" ||
              refund_page_location === "/ReturnSellerOrders"
                ? orderInfo?.returnProductOrderDetailsViewModels
                : orderInfo?.cancelOrderDetailsViewModels
            }
            rowHover
            // paginator
            // rows={10}
            emptyMessage="No order(s) found"
            // currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
            // paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
            // rowsPerPageOptions={[10, 25, 50]}
          >
            <Column field="Index" header="SN" body={onIndexTemplate} />
            <Column
              field="productTitle"
              filterField="productTitle"
              header="Product Name"
              headerStyle={{ width: "20%" }}
              sortable
            />
            <Column
              field="productImage"
              filterField="productImage"
              header="Image"
              body={productImageBodyTemplate}
            />
            <Column
              field="sellerProductSku"
              filterField="sellerProductSku"
              header="Seller SKU"
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
              header="Unit Price"
              sortable
            />
            <Column
              field="productQty"
              filterField="productQty"
              header="Quantity"
              sortable
            />
            <Column
              field="amount"
              filterField="amount"
              header="Amount"
              body={productAmountBodyTemplate}
              sortable
            />
          </DataTable>
        </div>
      </div>
      <div className="refund_section">
        <label>Reference No.</label>
        <InputText
          className="refund_section_input"
          value={referenceNo}
          onChange={(e) => setReferenceNo(e.target.value)}
          placeholder="Enter Reference No."
        />
        <br />
        <div className="payment_method_input__group">
          <div className="input_box__area">
            <label>Payment Method</label>
            <Dropdown
              className="payment_method__dropdown"
              value={selectedMethod}
              options={paymentMethods?.filter(
                (data) => data?.paymentMethodId != 5
              )}
              onChange={onPaymentMethodChange}
              optionLabel="methodName"
              placeholder="Select a Payment Method"
            />
          </div>
          <div className="">
            <label>Amount</label>
            <InputNumber
              mode="currency"
              currency="BDT"
              className="refund_section_input"
              onChange={(e) => {
                setAmount(e.value === null ? orderInfo?.totalAmount : e.value);
              }}
              placeholder={amount === null ? orderInfo?.totalAmount : amount}
              defaultValue={orderInfo?.totalAmount}
              value={amount === null ? orderInfo?.totalAmount : amount}
              max={orderInfo?.totalAmount}
              min={1}
            />
          </div>
        </div>
        {selectedMethod?.paymentMethodId === 11 ? (
          <>
            <label>Name of Bank</label>
            <Dropdown
              className="payment_method__dropdown"
              value={selectedBank}
              options={bankList}
              onChange={onBankChange}
              optionLabel="name"
              placeholder="Select a Bank"
            />
            <label>Cheque No.</label>
            <InputText
              className="refund_section_input"
              value={chequeNo}
              onChange={(e) => setChequeNo(e.target.value)}
              placeholder="Enter Cheque No."
            />
          </>
        ) : null}
        <label>Account No.</label>
        <InputText
          className="refund_section_input"
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
          placeholder="Enter Account No."
        />
        <br />
        <label>Upload Document</label>
        <input
          className="refund_section_doc_input"
          type="file"
          name="filetobase64"
          onChange={onUploadFileChange}
        />
        <br />
        <label>Remarks</label>
        <InputTextarea
          className="refund_section_input"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          rows={2}
          cols={30}
          placeholder="Enter Remarks"
        />
        <br />
        {refund_loading ? (
          <Button
            className="submit_btn"
            label="Submit"
            iconPos="left"
            loading
          />
        ) : (
          <Button
            className="submit_btn"
            onClick={() => onSubmitRefund()}
            label="Submit"
          />
        )}
      </div>
    </div>
  );
}
