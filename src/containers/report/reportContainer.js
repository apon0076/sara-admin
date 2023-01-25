import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import { ImFilePdf } from 'react-icons/im'
import { SiMicrosoftexcel } from 'react-icons/si'
import { FaFileCsv } from 'react-icons/fa'
import { RiPrinterLine } from 'react-icons/ri'
import { Button } from 'primereact/button'
import '../../components/report/report.css'
import { getExcelOrderRecord, getOrderInvoiceListRecord } from '../../store/actions/reportAction'
import authenticationService from '../../store/services/authenticationService'
import ReportFilterOptions from '../../components/report/reportFilterOptions'
import ReportFilterProperties from '../../components/report/reportFilterProperties'
import Saraloader from '../../components/shared/saraloader/Saraloader'

const ReportContainer = () => {
  const [apiData, setApiData] = useState(null)
  const [invoiceApiData, setInvoiceApiData] = useState(null)
  const [option, setOption] = useState(0)
  const [format, setFormat] = useState(1)
  const [sku, setSku] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [orderSource, setOrderSource] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)
  const [shopName, setShopName] = useState(null)
  const [disable, setDisable] = useState(true)

  const dispatch = useDispatch()

  let pdfFile = new jsPDF({ orientation: 'landscape' })

  let history = useHistory()
  useEffect(() => {
    let roleId = authenticationService?.getRoleId()
    if (roleId === '1') {
    } else {
      history.push('/Login')
    }
  }, [])

  let location = useHistory()
  const order_filter_tab = location?.location?.search?.substring(6)

  const handleChange = (e) => {
    if (e.target.name === 'sku') {
      setSku(e.target.value)
    }
    if (e.target.name === 'paymentMethodName') {
      setPaymentMethod(e.value)
    }
    if (e.target.name === 'paymentStatusName') {
      setPaymentStatus(e.value)
    }
    if (e.target.name === 'orderSourceName') {
      setOrderSource(e.value)
    }
    if (e.target.name === 'orderStatusName') {
      setOrderStatus(e.value)
    }
    if (e.target.name === 'shopName') {
      setShopName(e.value)
    }
  }

  const handleOptionChange = (value) => {
    setOption(value)
  }

  const handleDateChange = (value, type) => {
    if (type === 'start') {
      setStartDate(value)
    } else if (type === 'end') {
      setEndDate(value)
    }
  }

  const { orderReportData, loaded: orderReportLoaded, orderInvoiceListData, orderInvoiceLoading } = useSelector(
    (state) => state?.reportReducer
  )

  useEffect(() => {
    if (order_filter_tab === 'order' && option !== 7) {
      setApiData(orderReportData?.data)
    } 
  }, [orderReportData])

  useEffect(() => {
    if (order_filter_tab === 'order' && option === 7) {
      setInvoiceApiData(orderInvoiceListData?.data)
    } 
  }, [orderInvoiceListData])

  useEffect(() => {
    setSku('')
    setStartDate(null)
    setEndDate(null)
    setPaymentMethod(null)
    setPaymentStatus(null)
    setOrderSource(null)
    setOrderStatus(null)
    setDisable(true)
  }, [option])

  useEffect(() => {
    if (option === 0 || option === 1 || option === 7) {
      if (startDate !== null && endDate !== null) {
        setDisable(false)
      } else {
        setDisable(true)
      }
    } else {
      if (startDate !== null && endDate !== null) {
        if (option === 2 && sku !== '') {
          setDisable(false)
        } else if (option === 3 && paymentMethod !== null) {
          setDisable(false)
        } else if (option === 4 && paymentStatus !== null) {
          setDisable(false)
        } else if (option === 5 && orderSource !== null) {
          setDisable(false)
        } else if (option === 6 && orderStatus !== null) {
          setDisable(false)
        } 
        else {
          setDisable(true)
        }
      } else {
        setDisable(true)
      }
    }
  }, [
    option,
    startDate,
    endDate,
    sku,
    paymentMethod,
    paymentStatus,
    orderSource,
    orderStatus,
  ])

  useEffect(() => {
    if (apiData?.length === 0) {
      toast.error('Sorry, No Data Found!!')
      return
    }

    // Format file name according to properties
    const name = formatFileName()
    if (order_filter_tab === 'order') {
      if (format === 1) {
        const data = formatDataForOrderReportPDF(apiData)
        orderReportLoaded && generateOrderReportPDF(data, name)
      } else if (format === 2 || format === 3) {
        const data = formatDataForOrderReportExcelOrCSV(apiData)
        orderReportLoaded && generateOrderReportExcelOrCSV(data, name)
      }
    }
  }, [apiData])

  useEffect(() => {
    if (invoiceApiData?.length === 0) {
      toast.error('Sorry, No Data Found!!!')
      return
    }
     invoiceApiData && history.push({
      pathname: `/multiple_invoice_print`,
      data: { invoiceApiData},
    });
  }, [invoiceApiData])

  
  // Generate Order Report for Excel Or CSV start
  const generateOrderReportExcelOrCSV = (sheetData, name) => {
    let work_book = XLSX.utils.book_new()
    let work_sheet = XLSX.utils.json_to_sheet(sheetData)

    XLSX.utils.book_append_sheet(work_book, work_sheet, 'Sheet1')

    if (format === 2) {
      XLSX.writeFile(work_book, `Order-${name}.xlsx`)
    } else if (format === 3) {
      XLSX.writeFile(work_book, `Order-${name}.csv`)
    }
  }
  // Generate Order Report for Excel Or CSV end

  // Generate Order Report for PDF - Start
  const createOrderPDFHeaders = (keys) => {
    let result = []
    let width = [
      14, 15, 15, 16, 15, 14, 16, 15, 9, 15, 15, 15, 15, 14, 14, 14, 15, 15, 16,
      16, 16, 15, 15, 15, 14, 16,
    ]
    for (var i = 0; i < keys?.length; i += 1) {
      result.push({
        name: keys[i],
        width: width[i],
        align: 'center',
        padding: 0,
      })
    }
    return result
  }

  let orderPDFHeaders = createOrderPDFHeaders([
    'Mushok Challan',
    'Order Date',
    'Order No',
    'Product Title',
    'Seller Product SKU',

    'SKU / Style',
    'Variants',
    'Unit Price',
    'Qty',
    'Subtotal Amount',

    'Discount (%)',
    'Discount Amount',
    'Voucher Code',
    'Voucher (%)',
    'Voucher Amount',

    'Net Amount',
    // 'Payable Amount',
    'Shipping Charge',
    'Grand Total',
    'Customer Name',

    'Contact Number',
    'Payment Method',
    'Payment Status',
    'Payment Date',
    'Order Status',

    'Shop Name',
    'Tracking Number',
  ])

  const generateOrderReportPDF = (pdfData, name) => {
    let date = new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    let time = new Date().toLocaleString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })

    pdfFile.setFontSize(16)
    pdfFile.text('SaRa LifeStyle', 130, 13)

    pdfFile.setFontSize(11)
    pdfFile.text(
      'Address: Avenue #02, Road #14, House No #966, Mirpur DOHS, Dhaka-1216, Bangladesh.',
      73,
      20
    )
    pdfFile.text(
      'Mobile: +88-01885-998899, Email: support@saralifestyle.com, Website: www.saralifestyle.com',
      70,
      25
    )
    pdfFile.setFontSize(10)
    pdfFile.text(
      `Order Summary: ${toIsoString(startDate).substring(
        0,
        10
      )} to ${toIsoString(endDate).substring(0, 10)}
      `,
      70,
      30
    )

    pdfFile.text(
      `${
        option !== 1
          ? `${
              sku === '' &&
              paymentMethod?.methodName === undefined &&
              paymentStatus?.PaymentStatusName === undefined &&
              orderSource?.OrderSource === undefined &&
              orderStatus?.OrderStatusName === undefined
                ? ''
                : 'Type: '
            }${sku ? `${sku}, ` : ''}${
              paymentMethod?.methodName ? `${paymentMethod?.methodName}, ` : ''
            }${
              paymentStatus?.PaymentStatusName
                ? `Payment: ${paymentStatus?.PaymentStatusName}, `
                : ''
            }${
              orderSource?.OrderSource ? `${orderSource?.OrderSource}, ` : ''
            }${
              orderStatus?.OrderStatusName
                ? `Order: ${orderStatus?.OrderStatusName}, `
                : ''
            }`
          : ''
      }`,
      150,
      30
    )

    pdfFile.setFontSize(8)
    pdfFile.text(`Printing Date: ${date}`, 3, 13)
    pdfFile.text(`Printing Time: ${time}`, 3, 16)

    pdfFile.table(1, 35, pdfData, orderPDFHeaders, {
      fontSize: 6,
      padding: 1,
    })

    pdfFile.setProperties({ title: `Order-${name}` })

    window.open(pdfFile.output('bloburl', { filename: `Order-${name}.pdf` }))
  }
  // Generate Order Report for PDF - End

  // Date format - start
  const toIsoString = (date) => {
    var tzo = -date?.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
        return (num < 10 ? '0' : '') + num
      }
    return (
      date?.getFullYear() +
      '-' +
      pad(date?.getMonth() + 1) +
      '-' +
      pad(date?.getDate()) +
      'T' +
      pad(date?.getHours()) +
      ':' +
      pad(date?.getMinutes()) +
      ':' +
      pad(date?.getSeconds()) +
      dif +
      pad(Math?.floor(Math?.abs(tzo) / 60)) +
      ':' +
      pad(Math?.abs(tzo) % 60)
    )
  }
  // Date format - end

  // Get Data and Format for Order Report for PDF - Start
  const formatDataForOrderReportPDF = (dataFromAPI) => {
    let formattedData = []
    dataFromAPI &&
      dataFromAPI.map((data, i) => {
        let singleData = {
          'Mushok Challan': data?.mushokChallanNo
            ? data?.mushokChallanNo.toString()
            : '-',
          'Order Date': data?.orderDate
            ? data?.orderDate.toString().substring(0, 10)
            : '-',
          'Order No': data?.orderNo ? data?.orderNo.toString() : '-',
          'Product Title': data?.productTitle
            ? data?.productTitle.toString()
            : '-',
          'Seller Product SKU': data?.sellerProductSku
            ? data?.sellerProductSku.toString()
            : '-',
          'SKU / Style': data?.sku ? data?.sku.toString() : '-',

          Variants: data?.productVariant
            ? data?.productVariant.toString()
            : '-',
          'Unit Price': data?.productPrice
            ? parseFloat(data?.productPrice).toFixed(2).toString()
            : '0',
          Qty: data?.productQuantity
            ? parseInt(data?.productQuantity).toString()
            : '0',

          'Subtotal Amount': (data?.productPrice && data?.productQuantity)
            ? parseFloat(parseInt(data?.productQuantity) * data?.productPrice).toFixed(2).toString()
            : '0',
          'Discount (%)': data?.discountPercent
            ? data?.discountPercent.toString()
            : '0',
          'Discount Amount': data?.discountAmount
            ? data?.discountAmount.toString()
            : '0',
          'Voucher Code': data?.voucherCode
            ? data?.voucherCode.toString()
            : '-',
          'Voucher (%)': data?.voucherPercentage
            ? parseFloat(data?.voucherPercentage).toFixed(2).toString()
            : '0',
          'Voucher Amount': data?.voucherAmount
            ? parseFloat(data?.voucherAmount).toFixed(2).toString()
            : '0',
          'Net Amount': data?.netAmount
              ? parseFloat(data?.netAmount).toFixed(2).toString()
              : '0',
          // 'Payable Amount': data?.payableAmount
          //   ? parseFloat(data?.payableAmount).toFixed(2).toString()
          //   : '0',
          'Shipping Charge': data?.totalShippingCharge
            ? data?.totalShippingCharge.toString()
            : '0',
          'Grand Total': data?.grandTotal
            ? parseFloat(data?.grandTotal).toFixed(2).toString()
            : '0',

          'Customer Name': data?.customerName
            ? data?.customerName.toString()
            : '-',
          'Contact Number': data?.customerContactNo
            ? data?.customerContactNo.toString()
            : '-',
          'Payment Method': data?.paymentMethodName
            ? data?.paymentMethodName.toString()
            : '-',
          'Payment Status': data?.paymentStatus
            ? data?.paymentStatus.toString()
            : '-',
          'Payment Date': data?.paymentDate
            ? data?.paymentDate.toString().substring(0, 10)
            : '-',
          'Order Status': data?.statusName ? data?.statusName.toString() : '-',
          'Shop Name': data?.shopName ? data?.shopName.toString() : '-',
          'Tracking Number': data?.trackingNumber
            ? data?.trackingNumber.toString()
            : '-',
        }
        formattedData.push(Object.assign({}, singleData))
      })
    return formattedData
  }
  // Get Data and Format for Order Report for PDF - End

  // Get Data and Format for Order Report for Excel Or CSV - Start
  const formatDataForOrderReportExcelOrCSV = (dataFromAPI) => {
    let formattedData = []
    dataFromAPI &&
      dataFromAPI.map((data, i) => {
        let singleData = {
          'Courier Tracking': data?.courierTracking
            ? data?.courierTracking.toString()
            : '-',
          'Mushok Challan': data?.mushokChallanNo
            ? data?.mushokChallanNo.toString()
            : '-',
          'Order Date': data?.orderDate
            ? data?.orderDate.toString().substring(0, 10)
            : '-',
          'Order No': data?.orderNo ? data?.orderNo.toString() : '-',
          'Product Title': data?.productTitle
            ? data?.productTitle.toString()
            : '-',
          'Seller Product SKU': data?.sellerProductSku
            ? data?.sellerProductSku.toString()
            : '-',
          'SKU / Style': data?.sku ? data?.sku.toString() : '-',
          Variants: data?.productVariant
            ? data?.productVariant.toString()
            : '-',
          'Unit Price': data?.productPrice
            ? parseFloat(data?.productPrice).toFixed(2).toString()
            : '0',
          Qty: data?.productQuantity
            ? parseInt(data?.productQuantity).toString()
            : '0',

          'Subtotal Amount': (data?.productPrice && data?.productQuantity)
            ? parseFloat(parseInt(data?.productQuantity) * data?.productPrice).toFixed(2).toString()
            : '0',
          'Discount (%)': data?.discountPercent
            ? data?.discountPercent.toString()
            : '0',
          'Discount Amount': data?.discountAmount
            ? data?.discountAmount.toString()
            : '0',

          'Voucher Code': data?.voucherCode
            ? data?.voucherCode.toString()
            : '-',
          'Voucher (%)': data?.voucherPercentage
            ? parseFloat(data?.voucherPercentage).toFixed(2).toString()
            : '0',
          'Voucher Amount': data?.voucherAmount
            ? parseFloat(data?.voucherAmount).toFixed(2).toString()
            : '0',
            
          'Net Amount': data?.netAmount
              ? parseFloat(data?.netAmount).toFixed(2).toString()
              : '0',
          // 'Payable Amount': data?.payableAmount
          //   ? parseFloat(data?.payableAmount).toFixed(2).toString()
          //   : '0',
          Shipping: data?.totalShippingCharge
            ? data?.totalShippingCharge.toString()
            : '0',
          'Grand Total': data?.grandTotal
            ? parseFloat(data?.grandTotal).toFixed(2).toString()
            : '0',

          'Customer Name': data?.customerName
            ? data?.customerName.toString()
            : '-',
          'Contact Number': data?.customerContactNo
            ? data?.customerContactNo.toString()
            : '-',
          'Full Address': `${data?.address ? data?.address.toString() : '-'}, Area: ${
            data?.areaName ? data?.areaName.toString() : '-'
          }, City: ${
            data?.cityName ? data?.cityName.toString() : '-'
          }`,
          // Address: `${data?.address ? data?.address.toString() : '-'}, Area: ${
          //   data?.areaName ? data?.areaName.toString() : '-'
          // }, City: ${
          //   data?.cityName ? data?.cityName.toString() : '-'
          // }, Country: ${
          //   data?.countryName ? data?.countryName.toString() : '-'
          // }`,

          'Payment Method': data?.paymentMethodName
            ? data?.paymentMethodName.toString()
            : '-',
          'Payment Status': data?.paymentStatus
            ? data?.paymentStatus.toString()
            : '-',
          'Payment Date': data?.paymentDate
            ? data?.paymentDate.toString().substring(0, 10)
            : '-',

          'Order Status': data?.statusName ? data?.statusName.toString() : '-',
          'Shop Name': data?.shopName ? data?.shopName.toString() : '-',
          'Tracking Number': data?.trackingNumber
            ? data?.trackingNumber.toString()
            : '-',
          Source: data?.orderSourch ? data?.orderSourch.toString() : '-',
        }
        formattedData.push(Object.assign({}, singleData))
      })
    return formattedData
  }
  // Get Data and Format for Order Report for Excel Or CSV - End

  // File Name format - start
  const formatFileName = () => {
    let optionalName = ''
    if (option === 0) {
      optionalName = `-by-All`
    } else if (sku) {
      optionalName = `-by-${sku}`
    } else if (paymentMethod?.methodName) {
      optionalName = `-by-${paymentMethod?.methodName}`
    } else if (paymentStatus?.PaymentStatusName) {
      optionalName = `-by-${paymentStatus?.PaymentStatusName}`
    } else if (orderSource?.OrderSource) {
      optionalName = `-by-${orderSource?.OrderSource}`
    } else if (orderStatus?.OrderStatusName) {
      optionalName = `-by-${orderStatus?.OrderStatusName}`
    }

    let formattedName = `${toIsoString(startDate).substring(
      0,
      10
    )}-to-${toIsoString(endDate).substring(0, 10)}${optionalName}`

    return formattedName
  }
  // File Name format - end

  // Report generate button call - start
  const reportGenerate = () => {
    if (startDate === null || endDate === null) {
      toast.error('Both Order Start and End Date Required!!!')
      return
    } else if (option === 2 && sku === '') {
      toast.error('Product SKU/Style Required!!!')
      return
    } else if (option === 3 && paymentMethod === null) {
      toast.error('Payment Method Required!!!')
      return
    } else if (option === 4 && paymentStatus === null) {
      toast.error('Payment Status Required!!!')
      return
    } else if (option === 5 && orderSource === null) {
      toast.error('Order Source Required!!!')
      return
    } else if (option === 6 && orderStatus === null) {
      toast.error('Order Status Required!!!')
      return
    }

    if(option !== 7) {
    // For Order report - start
    order_filter_tab === 'order' &&
      dispatch(
        getExcelOrderRecord(
          startDate ? toIsoString(startDate).substring(0, 10) : '',
          endDate ? toIsoString(endDate).substring(0, 10) : '',
          sku ? sku : '',
          paymentMethod?.methodName ? paymentMethod?.methodName : '',
          paymentStatus?.PaymentStatusName
            ? paymentStatus?.PaymentStatusName
            : '',
          orderSource?.OrderSource ? orderSource?.OrderSource : '',
          orderStatus?.OrderStatusName ? orderStatus?.OrderStatusName : ''
        )
      )
    // For Order report - end
    }
    else {
      // For Order invoice list - start
    order_filter_tab === 'order' &&
    dispatch(
      getOrderInvoiceListRecord(
        startDate ? toIsoString(startDate).substring(0, 10) : '',
        endDate ? toIsoString(endDate).substring(0, 10) : '',
        orderStatus?.OrderStatusName ? orderStatus?.OrderStatusName : '',
        shopName?.shopId ? shopName?.shopId : 0,
        paymentMethod?.paymentMethodId ? paymentMethod?.paymentMethodId: 0,
        paymentStatus?.PaymentStatusNameId ? paymentStatus?.PaymentStatusNameId : 0,
        orderSource?.OrderSource ? orderSource?.OrderSource : '',
        )
    )
  // For Order invoice list - end
    }

  }
  // Report generate button call - end

  return (
    <>
      <ToastContainer autoClose={2500} />
      <div className='page-wrapper'>
        <div className='container-fluid'>
          <div className='col-md-12'>
            <div className='white-box white-box-title'>
              <div className='datatable-row'>
                <div className='report-head'>
                  <span className='header-display'>
                    <span>
                      <RiPrinterLine size='2rem' />
                    </span>
                    <span>
                      Report for{' '}
                      {order_filter_tab === 'order' ? 'Order History' : ''}{' '}
                    </span>
                  </span>
                </div>
                <div className='option-body'>
                  <div className='option-lebel'>
                    Choose {order_filter_tab === 'order' ? 'Order' : ''} Option
                  </div>
                  <div className='option-body-element'>
                    <div style={{ width: '50%' }}>
                      {/* Report Filter Options */}
                      <ReportFilterOptions
                        handleOptionChange={handleOptionChange}
                        option={option}
                        order_filter_tab={order_filter_tab}
                      />

                      {/* Report Format Selector */}
                      <div className='format-container'>
                        <button
                          className={`format_button ${
                            format === 1 ? 'format-active' : ''
                          }`}
                          onClick={() => setFormat(1)}
                        >
                          <ImFilePdf
                            className={`icon-opt ${
                              format === 1 ? 'icon-active' : ''
                            }`}
                          />
                          <span className='option-text'>PDF</span>
                        </button>
                        {option !== 7 && <button
                          className={`format_button ${
                            format === 2 ? 'format-active' : ''
                          }`}
                          onClick={() => setFormat(2)}
                        >
                          <SiMicrosoftexcel
                            className={`icon-opt ${
                              format === 2 ? 'icon-active' : ''
                            }`}
                          />
                          <span className='option-text'>Excel</span>
                        </button>
                        }

                        { option !== 7 &&
                        <button
                          className={`format_button ${
                            format === 3 ? 'format-active' : ''
                          }`}
                          onClick={() => setFormat(3)}
                        >
                          <FaFileCsv
                            className={`icon-opt ${
                              format === 3 ? 'icon-active' : ''
                            }`}
                          />
                          <span className='option-text'>CSV</span>
                        </button>
                        }
                      </div>

                      {/* Report Generator Button */}
                      <div className='button-container'>
                        <Button
                          disabled={disable}
                          className='generate-btn'
                          onClick={() => reportGenerate()}
                        >
                          Generate Report
                        </Button>
                      </div>
                    </div>

                    <div style={{ width: '50%' }}>
                      {/* Report Filter Properties */}
                      <ReportFilterProperties
                        handleChange={handleChange}
                        option={option}
                        sku={sku}
                        orderStatus={orderStatus}
                        orderSource={orderSource}
                        paymentStatus={paymentStatus}
                        paymentMethod={paymentMethod}
                        startDate={startDate}
                        endDate={endDate}
                        shopName={shopName}
                        handleDateChange={handleDateChange}
                        order_filter_tab={order_filter_tab}
                      />
                    </div>

                    { orderInvoiceLoading && <Saraloader />}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReportContainer