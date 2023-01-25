import React from 'react'
import './Invoice.css'
import logo from "./../../assets/images/sara_logo.png";
import Barcode from 'react-barcode'
import QRCode from 'qrcode.react'
import baseUrl from '../../utils/baseUrl'
import moment from "moment";

export default function SellerInvoiceAllDisplay(props) {
  const invoiceInfo = props?.invoice

  const shippingAddress = invoiceInfo?.shippingAddress
    ? JSON.parse(invoiceInfo?.shippingAddress)
    : ''

  const productVariantsBodyTemplate = (rowData) => {
    const variant = rowData?.split(',')

    let final = []
    variant &&
      variant.map((v, i) => {
        const single = v.split(': ')
        final.push(single)
      })

    return (
      <span>
        {final.map((item, i) => (
          <>
            {item[0] === ' null' ? (
              <></>
            ) : (
              <p style={{ marginBottom: '0px' }}>
                {item[0]}: <strong>{item[1]}</strong>
              </p>
            )}
          </>
        ))}
      </span>
    )
  }

  return (
    <div className='seller_invoice_container' style={{ marginBottom: '100vh' }}>
      <div
        className='seller_incoice_barcode__area'
        style={{ paddingTop: '5vh' }}
      >
        <div className='seller_invoice_barcode__section'>
          <div className='seller_invoice_logo__section'>
            <div className='seller_invoice_logo__date_section'>
              <b>SaRa Lifestyle Ltd.</b>
              <p>
                Date:{" "}
                {moment(invoiceInfo?.createDate).format("Do MMMM YYYY, h:mm A")}
              </p>
              <p>Order No: {invoiceInfo?.orderNo}</p>
            </div>
            <div className='seller_invoice_logo__logo_section'>
              <img src={logo} alt='logo' />
            </div>
          </div>

          {/* <div className='barcode_section'>
            <Barcode value='SCS-000105550' />
            <p className='barcode_title'>Package Id: SCS-000105550</p>
          </div> */}

          <div className='barcode_section'>
            <Barcode height='50' value={invoiceInfo?.invoiceNo} />
            <p className='barcode_title'>
              Tracking Number: {invoiceInfo?.invoiceNo}
            </p>
          </div>

          <div className='qr_code__section'>
            <p className='qr_code__section_title' style={{ marginTop: '8px' }}>
              Seller Address:
            </p>
            <div className='qr_code__items'>
              <p className='qr_code__addresses'>
                {invoiceInfo?.sellerProfile?.sellerName},{' '}
                {invoiceInfo?.sellerProfile?.sellerContactNo}{' '}
                {invoiceInfo?.sellerProfile?.sellerEmail}{' '}
                {invoiceInfo?.sellerProfile?.sellerPermanentAddress}
              </p>
              <QRCode
                value={`${invoiceInfo?.sellerProfile?.sellerName}, ${invoiceInfo?.sellerProfile?.sellerContactNo}  ${invoiceInfo?.sellerProfile?.sellerEmail} ${invoiceInfo?.sellerProfile?.sellerPermanentAddress}`}
                size={85}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                includeMargin={false}
                renderAs={'canvas'}
                imageSettings={{
                  src: '',
                  x: null,
                  y: null,
                  height: 0,
                  width: 0,
                  excavate: false,
                }}
              />
            </div>
          </div>

          <div className='qr_code__section'>
            <p className='qr_code__section_title'>Delivery Address:</p>
            <div className='qr_code__items'>
              <p className='qr_code__addresses'>
                {shippingAddress?.recipientName}, {shippingAddress?.address} -{' '}
                {shippingAddress?.contactNumber}
              </p>
              <QRCode
                value={`${shippingAddress?.recipientName}, ${shippingAddress?.address} - ${shippingAddress?.contactNumber}`}
                size={85}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                includeMargin={false}
                renderAs={'canvas'}
                imageSettings={{
                  src: '',
                  x: null,
                  y: null,
                  height: 0,
                  width: 0,
                  excavate: false,
                }}
              />
            </div>
          </div>
          <div className='package_information__section'>
            <p>
              Payment: <br />
              <b>
                {invoiceInfo?.paymentMethodName
                  ? invoiceInfo?.paymentMethodName
                  : 'Not Selected'}
              </b>
            </p>
            <p>
              <b>{props.currencyFormat(invoiceInfo?.totalPayableAmt)}</b>{" "}
              <span>BDT</span>
            </p>
            {/* <p>
              Package Weight: <br /> <b>{invoiceInfo?.packageWeight || 0}</b> KG
            </p> */}
          </div>
        </div>
      </div>
      <div
        className='seller_invoice_purchase_history'
        style={{ paddingTop: '3vh' }}
      >
        <div className='seller_invoice_purchase_history__header'>
          <div className='seller_invoice_purchase_history__logo_section'>
            <img
              src={baseUrl.concat(invoiceInfo?.sellerProfile?.sellerImageUrl)}
              alt='logo'
            />
          </div>
          <p>
          <b>{invoiceInfo?.shopWiseOrders?.shopName}</b>
          </p>
          <div className='seller_invoice_purchase_history__header_info'>
            <p>
              <b>Order No:</b> {invoiceInfo?.orderNo}
            </p>
            <p>
              <b>Tracking No:</b> {invoiceInfo?.invoiceNo}
            </p>
          </div>
          <div className='seller_invoice_purchase_history__header_info'>
          <p>
              <b>Date:</b>{" "}
              {moment(invoiceInfo?.createDate).format("Do MMMM YYYY, h:mm A")}
            </p>
            <p>
              <b>Payment Method:</b>{' '}
              {invoiceInfo?.paymentMethodName
                ? invoiceInfo?.paymentMethodName
                : 'Not Selected'}
            </p>
          </div>
        </div>

        <div className='seller_invoice_purchase_history__address_section'>
          <div className='seller_invoice_purchase_history_delivery'>
            <p className='seller_invoice_purchase_history__addresss_title'>
              Delivery Address
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Name: </span>
              {shippingAddress?.recipientName}
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Address: </span>
              {shippingAddress?.address}
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Phone: </span>
              {shippingAddress?.contactNumber}
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Email: </span>
              {invoiceInfo?.cusEmail}
            </p>
          </div>
          <div className='seller_invoice_purchase_history_billing'>
            <p className='seller_invoice_purchase_history__addresss_title'>
              Billing Address
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Name: </span>
              {shippingAddress?.recipientName}
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Address: </span>
              {shippingAddress?.address}
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Phone: </span>
              {shippingAddress?.contactNumber}
            </p>
            <p className='seller_invoice_purchase_history__addresss'>
              <span>Email: </span>
              {invoiceInfo?.cusEmail}
            </p>
          </div>
        </div>
        <div className='invoice_product__list_section'>
          <p className='invoice_product__list_section_title'>Ordered Items :</p>
          <table className='invoice_product__list_section_table'>
            <thead>
              <tr>
                <th className='invoice__index_col'>SL</th>
                <th className='invoice__name_col'>Product Name</th>
                <th className='invoice__name_col'>Variants</th>
                <th className='invoice__sku_col'>SKU</th>
                <th className='invoice__sku_col'>Seller SKU</th>
                <th className='invoice__sku_col'>Shop SKU</th>
                <th className='invoice__quantity_col'>Qty</th>
                {/* <th>Variants</th> */}
                <th className='invoice__price_col'>Unit Price (৳)</th>
                <th className='invoice__total_col'>Sub-Total (৳)</th>
              </tr>
            </thead>
            <tbody>
              {invoiceInfo?.orderDetails.map((data, index) => (
                <tr>
                  <td className='invoice__index_col'>{index + 1}</td>
                  <td className='invoice__name_col'>{data?.productTitle}</td>
                  <td className='invoice__name_col'>
                    {productVariantsBodyTemplate(data?.productVariant)}
                  </td>
                  <td className='invoice__sku_col'>{data?.sku}</td>
                  <td className='invoice__sku_col'>{data?.sellerProductSku}</td>
                  <td className='invoice__sku_col'>{data?.shopProductSku}</td>
                  <td className='invoice__quantity_col'>
                    {data?.productQuantity}
                  </td>
                  <td className='invoice__price_col'>
                    {props.currencyFormat(data?.productPrice)}
                  </td>
                  <td className='invoice__total_col'>
                    {props.currencyFormat(data?.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className='invoice__summary_section'
            style={{ paddingBottom: '10px' }}
          >
            <table>
              <tr>
                <td className='invoice__total_col'>Gross Sub-Total:</td>
                <td className="invoice__total_col">
                  {props.currencyFormat(invoiceInfo?.grossSubTotal || 0)}
                </td>
              </tr>
              <tr>
                <td className='invoice__total_col'>Discount/Voucher:</td>
                <td className="invoice__total_col">
                  {props.currencyFormat(
                    invoiceInfo?.voucherAmount !== 0
                      ? invoiceInfo?.voucherAmount
                      : invoiceInfo?.totalDiscountFlatAmt
                  )}
                </td>
              </tr>
              <tr>
                <td className='invoice__total_col'>Net Amount:</td>
                <td className="invoice__total_col">
                  {props.currencyFormat(invoiceInfo?.netAmount || 0)}
                </td>
              </tr>
              <tr>
                <td className='invoice__total_col'>VAT:</td>
                <td className='invoice__total_col'>Included </td>
              </tr>
              <tr>
                <td>Shipping Cost:</td>
                <td>
                  {/* {invoiceInfo?.shippingCharge.toLocaleString('en-US') || 0}{' '} */}
                  {props.currencyFormat(invoiceInfo?.shippingCharge || 0)}
                </td>
              </tr>
              <tr>
                <td className='invoice_total__row'>Grand-Total (৳):</td>
                <td className='invoice_total__row'>
                  {props.currencyFormat(invoiceInfo?.totalPayableAmt || 0)}
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className='invoice_product__list_section'>
          <p className='invoice_product__list_section_title'>
            EXCHANGE POLICY:
          </p>
          <p className='seller_invoice_purchase_history__policy'>
            * We accept the exchange of unworn and unaltered garments within 15
            days of purchase given that the original invoice, tags and packaging
            are carefully preserved.
          </p>
          <p className='seller_invoice_purchase_history__policy'>
            * The exchange garments value must be equal or more than that of
            original invoice.
          </p>
          <p className='seller_invoice_purchase_history__policy'>
            * Products on discount or promotional offer, lingerie, masks and PPE
            are not exchangeable.{' '}
          </p>
          <p className='seller_invoice_purchase_history__policy'>
            * We do not have any return or refund facility.
          </p>
          <p className='seller_invoice_purchase_history__policy'>
            * We reserve all rights to determine whether the goods have been
            altered, used or damaged.
          </p>
          <p className='seller_invoice_purchase_history__policy'>
            Note: The customer can only replace the product once inside Dhaka
            city after purchase & for outside of Dhaka, the delivery cost have
            to beared by the customer. Thank you.
          </p>{' '}
          <p className='seller_invoice_purchase_history__policy_bottom'>
            Call us at +8801885998899 for any help.
          </p>{' '}
        </div>
      </div>
    </div>
  )
}
