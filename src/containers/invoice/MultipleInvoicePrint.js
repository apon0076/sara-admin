import React, { useEffect, useState } from "react";
import SellerInvoiceAdminAllDisplay from "../../components/invoice/SellerInvoiceAdminAllDisplay";
import Saraloader from "../../components/shared/saraloader/Saraloader";

const MultipleInvoicePrint = (props) => {
  const [trigger, setTrigger] = useState(true);

  const allInvoiceData = props?.location?.data?.invoiceApiData;

  const navigate = () => {
    setTrigger(true);
    setTimeout(() => setTrigger(false), 2000);
    window.location.href = `/report?type=order`;
  };

  const currencyFormat = (num) => {
    return num?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  useEffect(() => {
    setTimeout(() => setTrigger(false), 2000);
  }, []);

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
        {trigger && <Saraloader />}
        {allInvoiceData &&
          allInvoiceData.map((invoice, i) => (
            <>
              <SellerInvoiceAdminAllDisplay
                invoice={invoice}
                currencyFormat={currencyFormat}
              />
            </>
          ))}
      </div>
    </>
  );
};

export default MultipleInvoicePrint;
