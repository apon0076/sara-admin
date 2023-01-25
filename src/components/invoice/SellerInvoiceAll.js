import React, { useEffect,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrderInvoiceRecord, getShopWiseOrderDetailsRecord } from "../../store/actions/orderAction";
import Saraloader from "../shared/saraloader/Saraloader";
import "./Invoice.css";
import SellerInvoiceAdminAllDisplay from "./SellerInvoiceAdminAllDisplay";
import SellerInvoiceAllDisplay from "./SellerInvoiceAllDisplay";
import SellerInvoiceCancelAdminAllDisplay from "./SellerInvoiceCancelAdminAllDisplay";
import SellerInvoiceCancelAllDisplay from "./SellerInvoiceCancelAllDisplay";
import SellerInvoiceReturnAdminAllDisplay from "./SellerInvoiceReturnAdminAllDisplay";
import SellerInvoiceReturnAllDisplay from "./SellerInvoiceReturnAllDisplay";

export default function SellerInvoiceAll(props) {
  const dispatch = useDispatch();
  const [shopWiseOrderNoList, setShopWiseOrderNoList] = useState('');

  const order_invoice_data = props.location.data;
  useEffect(() => (
    invoiceTypeValue === 1 && order_invoice_data && setShopWiseOrderNoList(order_invoice_data?.map(({ orderNo }) => orderNo).join(','))
  ), [order_invoice_data])
  
  useEffect(() => {
    invoiceTypeValue === 1 && order_invoice_data && shopWiseOrderNoList &&
    dispatch(
      getSellerOrderInvoiceRecord(shopWiseOrderNoList
      )
    );

    invoiceTypeValue !== 1 && order_invoice_data &&
      dispatch(
        getShopWiseOrderDetailsRecord(
          order_invoice_data.status,
          order_invoice_data.invoiceNo,
          order_invoice_data.ordersNoString
        )
      );


  }, [dispatch, order_invoice_data, shopWiseOrderNoList]);
  const { getShopWiseOrderDetails, sellerOrderInvoice, invoiceLoading } = useSelector(
    (state) => state.orderReducer
  );
  const AllInvoiceData = props?.location?.selectedOrders
    ? props?.location?.selectedOrders
    : "";

  // Find Invoice Type from Props
  const invoiceTypeValue = props?.location?.invoiceType
    ? props?.location?.invoiceType
    : 0;

  // For Back Button
  const filterTab = props?.location?.order_filter_tab;
  const navigate = () => {
    if (invoiceTypeValue === 1) {
      window.location.href = `/ManageOrder?status=${filterTab}`;
    }
    if (invoiceTypeValue === 2) {
      window.location.href = `/CancelSellerOrders?status=${filterTab}`;
    }
    if (invoiceTypeValue === 3) {
      window.location.href = `/ReturnOrders?status=${filterTab}`;
    }
    if (invoiceTypeValue === 4) {
      window.location.href = `/ManageOrdersAdmin?status=${filterTab}`;
    }
    if (invoiceTypeValue === 5) {
      window.location.href = `/ManageOrdersAdmin?status=${filterTab}`;
    }
    if (invoiceTypeValue === 6) {
      window.location.href = `/CancelOrders?status=${filterTab}`;
    }
    if (invoiceTypeValue === 7) {
      window.location.href = `/ReturnSellerOrders?status=${filterTab}`;
    }
  };

  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <>
      <span className="seller_invoice__print_btn2">
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print
        </button>
        <button className="btn btn-danger" onClick={navigate}>
          Close
        </button>
      </span>
      <div className="seller__print">
        {invoiceTypeValue === 1
          ? sellerOrderInvoice &&
          sellerOrderInvoice?.data?.map((invoice) => (
              <>
                <SellerInvoiceAllDisplay
                  invoice={invoice}
                  currencyFormat={currencyFormat}
                />
              </>
            ))
          : invoiceTypeValue === 2
          ? AllInvoiceData &&
            AllInvoiceData.map((invoice) => (
              <SellerInvoiceCancelAllDisplay
                invoice={invoice}
                currencyFormat={currencyFormat}
              />
            ))
          : invoiceTypeValue === 3
          ? AllInvoiceData &&
            AllInvoiceData.map((invoice) => (
              <SellerInvoiceReturnAdminAllDisplay
                invoice={invoice}
                key={invoice.orderProfileId}
                currencyFormat={currencyFormat}
              />
            ))
          : invoiceTypeValue === 4
          ? getShopWiseOrderDetails?.data &&
            getShopWiseOrderDetails.data.map((invoice) => (
              <>
                <SellerInvoiceAdminAllDisplay
                  invoice={invoice}
                  currencyFormat={currencyFormat}
                />
              </>
            ))
          : invoiceTypeValue === 5
          ? getShopWiseOrderDetails?.data &&
            getShopWiseOrderDetails.data.map((invoice) => (
              <>
                <SellerInvoiceAdminAllDisplay
                  invoice={invoice}
                  currencyFormat={currencyFormat}
                />
              </>
            ))
          : invoiceTypeValue === 7
          ? AllInvoiceData &&
            AllInvoiceData.map((invoice) => (
              <SellerInvoiceReturnAllDisplay
                invoice={invoice}
                currencyFormat={currencyFormat}
              />
            ))
          : AllInvoiceData &&
            AllInvoiceData.map((invoice) => (
              <SellerInvoiceCancelAdminAllDisplay
                invoice={invoice}
                currencyFormat={currencyFormat}
              />
            ))}
      </div>
      { invoiceLoading && <Saraloader />}
    </>
  );
}
