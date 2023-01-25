/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateShippingCostRecord } from "../../store/actions/shippingAction";
import baseUrl from "../../utils/baseUrl";
import ApplyCoupon from "./ApplyCoupon";

export default function AddProduct(props) {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
        color: "#1F5DA0",
      }}
      spin
    />
  );

  const dropDownOptions = [
    {
      OrderSource: "Facebook",
    },
    {
      OrderSource: "Instagram",
    },
    {
      OrderSource: "Email",
    },
    {
      OrderSource: "Whats App",
    },
    {
      OrderSource: "Over Phone Call",
    },
    {
      OrderSource: "SaRa Office Employee",
    },
    {
      OrderSource: "Snowtex Office Employee",
    },
    {
      OrderSource: "Shop Employee",
    },
    {
      OrderSource: "Other",
    },
  ];

  const { addProduct, confirmAddress, deliveryAddress, addressChange } = props;
  const {
    sellerProductSku: singleProductSellerSku,
    shopProductSku: singleProductShopSku,
    productId: singleProductId,
    productName: singleProductName,
    productTitle: singleProductTitle,
    productUrl: singleProductUrl,
    thumbnailImage: singleProductImage,
    categoryName: singleProductCategory,
    productPrice: singleProductPrice,
    shopId: singleProductShopId,
    shopName: singleProductShopName,
    commissionPercentage: singleProductCommissionPercentage,
    commissionAmount: singleProductCommissionAmount,
    unitId: singleProductUnitId,
    unit: singleProductUnit,
    productColorAndSizes,
  } = addProduct.singleProduct;

  const [variantToSend1, setVariantToSend1] = useState("");
  const [variantToSend2, setVariantToSend2] = useState("");
  const [sellerProductSku, setSellerProductSku] = useState("");
  const [shopProductSku, setShopProductSku] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [shopId, setShopId] = useState("");
  const [shopName, setShopName] = useState("");
  const [commissionPercentage, setCommissionPercentage] = useState("");
  const [commissionAmount, setCommissionAmount] = useState("");
  const [unitId, setUnitId] = useState("");
  const [unit, setUnit] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [voucher, setVoucher] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [productSingleQty, setProductSingleQty] = useState();
  const [productSingleId, setProductSingleId] = useState();
  const [singleShippingCosts, setSingleShippingCosts] = useState([]);

  const [greatestShippingCost, setGreatestShippingCost] = useState(0);
  const [greatestActualShippingCost, setGreatestActualShippingCost] =
    useState(0);
  const [orderSource, setOrderSource] = useState(null);
  const [inputQty, setInputQty] = useState(null);
  const [displayButton, setDisplayButton] = useState(false);

  const dispatch = useDispatch();
  const getVoucher = (data) => {
    setVoucher(data);
  };

  useEffect(() => {
    if (addProduct.productFound) {
      setSellerProductSku(
        addProduct.productFound ? singleProductSellerSku : ""
      );
      setShopProductSku(addProduct.productFound ? singleProductShopSku : "");
      setProductId(addProduct.productFound ? singleProductId : "");
      setProductName(addProduct.productFound ? singleProductName : "");
      setProductTitle(addProduct.productFound ? singleProductTitle : "");
      setThumbnailImage(addProduct.productFound ? singleProductImage : "");
      setProductUrl(addProduct.productFound ? singleProductUrl : "");
      setCategoryName(addProduct.productFound ? singleProductCategory : "");
      setProductPrice(addProduct.productFound ? singleProductPrice : "");
      setProductQuantity(productQuantity);
      setShopId(addProduct.productFound ? singleProductShopId : "");
      setShopName(addProduct.productFound ? singleProductShopName : "");
      setCommissionPercentage(
        addProduct.productFound ? singleProductCommissionPercentage : ""
      );
      setCommissionAmount(
        addProduct.productFound ? singleProductCommissionAmount : ""
      );
      setUnitId(addProduct.productFound ? singleProductUnitId : "");
      setUnit(addProduct.productFound ? singleProductUnit : "");
      setVariantToSend1(addProduct.productFound ? productColorAndSizes[0] : "");
      setVariantToSend2(addProduct.productFound ? productColorAndSizes[1] : "");
    }
  }, [addProduct.productFound]);

  let emptyProduct = {
    sellerProductSku: "",
    shopProductSku: "",
    productId: "",
    productName: "",
    productTitle: "",
    productUrl: "",
    thumbnailImage: "",
    categoryName: "",
    productPrice: "",
    shopId: "",
    shopName: "",
    commissionPercentage: "",
    commissionAmount: "",
    unitId: "",
    unit: "",
    quantity: 0,
    variantToSend1: "",
    variantToSend2: "",
  };

  let initialProduct = {
    sellerProductSku: addProduct?.singleProduct?.sellerProductSku,
    shopProductSku: addProduct?.singleProduct?.shopProductSku,
    productId: addProduct?.singleProduct?.productId,
    productName: addProduct?.singleProduct?.productName,
    productTitle: addProduct?.singleProduct?.productTitle,
    productUrl: addProduct?.singleProduct?.productUrl,
    quantity: addProduct?.singleProduct?.productQuantity,
    thumbnailImage: addProduct?.singleProduct?.thumbnailImage,
    categoryName: addProduct?.singleProduct?.categoryName,
    productPrice: addProduct?.singleProduct?.productPrice,
    shopId: addProduct?.singleProduct?.shopId,
    shopName: addProduct?.singleProduct?.shopName,
    commissionPercentage: addProduct?.singleProduct?.commissionPercentage,
    commissionAmount: addProduct?.singleProduct?.commissionAmount,
    unitId: addProduct?.singleProduct?.unitId,
    unit: addProduct?.singleProduct?.unit,
    variantToSend1: addProduct?.singleProduct?.productColorAndSizes
      ? addProduct?.singleProduct?.productColorAndSizes[0]
      : null,
    variantToSend2: addProduct?.singleProduct?.productColorAndSizes
      ? addProduct?.singleProduct?.productColorAndSizes[1]
      : null,
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(
    addProduct.productFound ? initialProduct : emptyProduct
  );
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderSubtotalAmt, setOrderSubtotalAmt] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [VoucherDiscountPercent, setVoucherDiscountPercent] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [orderSubtotalDiscountAmt, setOrderSubtotalDiscountAmt] = useState(0);
  const [shippingAddressId, setShippingAddressId] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCharges, setShippingCharges] = useState();
  const [totalShippingCharge, setTotalShippingCharge] = useState(0);
  const [totalVatFlatAmt, setTotalVatFlatAmt] = useState(0);
  const [otherChargeAmount, setOtherChargeAmount] = useState(0);
  const [customerAddress, setCustomerAddress] = useState(
    addProduct.customerAddress
  );
  const [address, setAddress] = useState("");
  const [statusId, setStatusId] = useState(0);
  const [statusName, setStatusName] = useState("");
  const [shippingStatus, setShippingStatus] = useState("N");
  const [orderProfileId, setOrderProfileId] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState("invoiceNo");
  const [couponAmt, setCouponAmt] = useState(0);
  const [orderGuid, setOrderGuid] = useState("");
  const [customerCurrencyCode, setCustomerCurrencyCode] = useState("BDT");
  const [currencyRate, setCurrencyRate] = useState(1);
  const [otherChargeTypeId, setOtherChargeTypeId] = useState(0);
  const [paymentStatusId, settPaymentStatusId] = useState(0);
  const [paymentMethodId, setPaymentMethodId] = useState(0);
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [payAccountNo, setPayAccountNo] = useState("0");
  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState(null);
  const [customerContactNo, setCustomerContactNo] = useState(null);
  const [VAT, setVAT] = useState(0);
  const [Tax, setTax] = useState(0);
  const [DiscountAmount, setDiscountAmount] = useState(0);

  const [variant, setVariant] = useState(null);

  useEffect(() => {
    setCustomerId(addProduct.customerId);
    setCustomerName(addProduct.cusName);
    setCustomerContactNo(addProduct.contactNo);
    setShippingAddressId(addProduct.shippingAddressId);
    setDiscountAmount(DiscountAmount <= 0 ? 0 : DiscountAmount);
  }, [addProduct]);

  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    {
      customerAddress &&
        customerAddress.map((data) => setRecipientName(data.recipientName));
    }
    {
      customerAddress &&
        customerAddress.map((data) => setContactNumber(data.contactNumber));
    }
    {
      customerAddress &&
        customerAddress.map((data) => setAddress(data.address));
    }
    {
      customerAddress &&
        customerAddress.map((data) => setDivisionName(data.divisionName));
    }
    {
      customerAddress &&
        customerAddress.map((data) => setCityName(data.cityName));
    }
    {
      customerAddress &&
        customerAddress.map((data) => setAreaName(data.areaName));
    }
    {
      customerAddress &&
        customerAddress.map((data) => setPostCode(data.postCode));
    }
  }, [addProduct.addressFound]);

  const openNew = () => {
    setProduct(initialProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "BDT",
    });
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);
    if (product.productName.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);
        _products[index] = _product;
        toast.current.show({
          severity: "info",
          summary: "Modified",
          detail: "Product Info Updated",
          life: 3000,
        });
      } else {
        _product.id = product.sellerProductSku;
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "New Product Added to List",
          life: 3000,
        });
      }
      setProducts(_products);
      setProductDialog(false);
      setProduct(initialProduct);
      addProduct.handler();
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter(
      (val) => val.sellerProductSku !== product.sellerProductSku
    );
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(initialProduct);
    toast.current.show({
      severity: "warn",
      summary: "Deleted",
      detail: "Product Removed from List",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "danger",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onInputNumberChange = (e, name, stock) => {
    setInputQty(e.target.value);
    if (stock >= e.target.value) {
      const val = e.target.value || 0;
      let _product = { ...product };
      _product[`${name}`] = val;
      setProduct(_product);
    }
  };
  useEffect(() => {
    if (confirmAddress === false) {
      setProducts([]);
      setGreatestShippingCost(0);
      setGreatestActualShippingCost(0);
    }
  }, [confirmAddress]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {addProduct.productFound && (
          <>
            {setDisplayButton(false)}
            {products.map((data) => (
              <>
                {data?.sellerProductSku ===
                addProduct?.singleProduct?.sellerProductSku ? (
                  <b style={{ fontSize: "14px", color: "#db1b1b" }}>
                    {" "}
                    Already Added this Product SKU !!!
                    {setDisplayButton(true)}
                  </b>
                ) : (
                  <></>
                )}
              </>
            ))}

            {addProduct?.singleProduct?.productQuantity === 0 ? (
              <b style={{ fontSize: "15px", color: "#db1b1b" }}>
                {" "}
                Out Of Stock !!!
              </b>
            ) : (
              <>
                {!displayButton && (
                  <>
                    {" "}
                    <Button
                      label="New"
                      icon="pi pi-plus"
                      className="p-button-success p-mr-2"
                      onClick={openNew}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <b style={{ fontSize: "12px", color: "rgb(102 104 106)" }}>
                      ({addProduct?.singleProduct?.productQuantity} Left)
                    </b>
                  </>
                )}
              </>
            )}
          </>
        )}
      </React.Fragment>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={baseUrl.concat(rowData.thumbnailImage)}
        alt={rowData.productName}
        className="product-image"
        style={{ height: "50px", width: "50px" }}
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.productPrice);
  };

  const variantBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <p>
          <span>{rowData?.variantToSend1?.variantName}</span> :{" "}
          <span>{rowData?.variantToSend1?.variantOptionText}</span> <br />
          {rowData?.variantToSend2?.variantName && (
            <>
              <span>{rowData?.variantToSend2?.variantName}</span> :{" "}
            </>
          )}
          {rowData?.variantToSend2?.variantOptionText && (
            <>
              <span>{rowData?.variantToSend2?.variantOptionText}</span>
            </>
          )}
        </p>
      </React.Fragment>
    );
  };
  const quantityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <p>{rowData?.quantity}</p>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const productDialogFooter = (id, qty) => {
    return (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDialog}
        />
        <Button
          label="Add"
          icon="pi pi-check"
          className="p-button-text"
          onClick={() => {
            saveProduct();
            setProductSingleId(id);
            setProductSingleQty(qty);
            // handleDuplicate(id);
          }}
          disabled={
            inputQty < 1 ||
            inputQty > addProduct?.singleProduct?.productQuantity
          }
        />
      </React.Fragment>
    );
  };

  const deleteProductDialogFooter = (productId) => {
    return (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDeleteProductDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={() => {
            deleteProduct();
            handleRemovedForShipping(productId);
          }}
        />
      </React.Fragment>
    );
  };

  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  const result = products.reduce(
    (h, obj) =>
      Object.assign(h, { [obj.shopId]: (h[obj.shopId] || []).concat(obj) }),
    {}
  );

  let dataArray = Object.keys(result).map((k) => result[k]);

  const calculateTotalPrice = () => {
    let sum = products.reduce(
      (accumulator, current) =>
        accumulator + current.quantity * current.productPrice,
      0
    );
    setTotalPrice(sum);
    setOrderSubtotalAmt(sum);
  };

  const setVoucherData = (voucher) => {
    if (
      voucher.voucherDiscountPercent !== undefined &&
      voucher.voucherDiscountPercent > 0
    ) {
      setVoucherAmount((totalPrice * voucher?.voucherDiscountPercent) / 100);
    } else if (
      voucher.voucherMaximumAmount !== undefined &&
      voucher.voucherMaximumAmount > 0
    ) {
      setVoucherAmount(voucher.voucherMaximumAmount);
    }
    setVoucherCode(voucher.voucherCode);
    setVoucherDiscountPercent(voucher.voucherDiscountPercent);
  };

  useEffect(() => {
    {
      Math.round(
        orderSubtotalAmt -
          (orderSubtotalAmt / 100) * voucher.voucherDiscountPercent
      ) > voucher.voucherMaximumAmount
        ? setVoucherData(voucher)
        : Math.round(
            orderSubtotalAmt -
              (orderSubtotalAmt / 100) * voucher.voucherDiscountPercent
          ) < voucher.voucherMaximumAmount
        ? setVoucherData(voucher)
        : setVoucherData(voucher);
    }
  }, [voucher, orderSubtotalAmt]);

  const calculateTotalPayableAmount = () => {
    if (DiscountAmount + voucherAmount > totalPrice) {
      setTotalPayableAmount(VAT + Tax + greatestShippingCost);
    } else {
      setTotalPayableAmount(
        totalPrice -
          (DiscountAmount + voucherAmount) +
          VAT +
          Tax +
          greatestShippingCost
      );
    }
  };

  useEffect(() => {
    setGreatestShippingCost(0);
    setGreatestActualShippingCost(0);
  }, [addressChange]);

  useEffect(() => {
    calculateTotalPrice();
    calculateTotalPayableAmount();
  }, [calculateTotalPrice, calculateTotalPayableAmount, greatestShippingCost]);

  let shopToSendObject = [];

  dataArray.forEach((item) => {
    shopToSendObject.push({
      shopWiseOrderId: 0,
      shopId: item[0].shopId,
      shopName: item[0].shopName,
      orderNo: 0,
      totalSalesAmt: 0,
      couponAmt: 0,
      note: "note",
      totalDiscountFlatAmt: 0,
      totalVatFlatAmt: VAT,
      otherChargeTypeId: 0,
      otherChargeAmount: 0,
      isActive: "Y",
      statusId: statusId,
      statusName: statusName,
      totalPayableAmt: totalPayableAmount,
      // commissionAmount:
      //   (item.reduce((a, b) => a + b.quantity * b.productPrice, 0) *
      //     item[0].commissionPercentage) /
      //   greatestShippingCost,
      // commissionPercentage: item[0].commissionPercentage,
      orderProfileId: 0,
      actualShippingCost: greatestActualShippingCost,
      shippingCharge: greatestShippingCost,
      orderDetails: item.map((product) => ({
        orderDetailId: 0,
        shopWiseOrderId: 0,
        shopId: product.shopId,
        productPrice: product.productPrice,
        productQuantity: product.quantity,
        productTitle: product.productName,
        productImage: product.thumbnailImage,
        productUrl: product.productUrl,
        productId: product.productId,
        vatTypeId: 0,
        vatType: "vatType",
        vatFlatAmt: 0,
        sellerProductSku: product.sellerProductSku,
        inventoryTypeId: product.inventoryTypeId,
        shopProductSku: product?.shopProductSku,
        unitId: product.unitId,
        unit: product.unit,
        vatPercent: 0,
        discountFlatAmt: 0,
        discountPercent: 0,
        note: "note",
        isActive: "Y",
        statusId: statusId,
        statusName: statusName,
        // commissionPercentage:
        //   (product?.productPrice * product?.commissionPercentage) / 100,
        // commissionAmount: product?.commissionAmount,
        productSize: product?.variantToSend2?.variantOptionText,
        productVariant: `${product?.variantToSend1?.variantName}: ${product?.variantToSend1?.variantOptionText}, ${product?.variantToSend2?.variantName}: ${product?.variantToSend2?.variantOptionText}`,
        sku: product?.productTitle,
      })),
    });
  });
  let dataToSendApi = {
    orderProfileId,
    invoiceNo,
    customerId,
    customerName,
    customerContactNo,
    couponAmt,
    shippingAddressId: deliveryAddress?.customerAddressId,
    shippingAddress: addProduct.addressData,
    orderGuid,
    customerCurrencyCode,
    currencyRate,
    orderSubtotalAmt,
    orderSubtotalDiscountAmt: DiscountAmount,
    totalVatFlatAmt: VAT,
    totalShippingCharge: greatestShippingCost,
    orderSourch: orderSource?.OrderSource,
    otherChargeTypeId,
    otherChargeAmount,
    totalPayableAmount: totalPayableAmount,
    paymentStatusId,
    paymentMethodId,
    paymentMethodName,
    payAccountNo,
    isActive: "Y",
    statusId: statusId,
    statusName: statusName,
    voucherCode: voucherCode ? voucherCode : "",
    voucherPercentage: VoucherDiscountPercent ? VoucherDiscountPercent : 0,
    voucherAmount: voucherAmount ? voucherAmount : 0,
    shopWiseOrders: shopToSendObject,
    actualShippingCost: greatestActualShippingCost,
  };
  useEffect(() => {
    if (products.length) {
      dispatch(
        calculateShippingCostRecord(
          deliveryAddress.countryId,
          deliveryAddress.cityId,
          deliveryAddress.areaId,
          productSingleId,
          productSingleQty
        )
      );
    }
  }, [products, deliveryAddress]);
  const shipping_cost = useSelector((state) => state.shippingReducer);
  const { calculateShippingCost, loading: shippingLoading } = shipping_cost;
  useEffect(() => {
    if (calculateShippingCost.data !== undefined) {
      if (singleShippingCosts < 1) {
        setSingleShippingCosts([
          ...singleShippingCosts,
          {
            productId: calculateShippingCost.data.productId,
            qty: calculateShippingCost.data.orderQty,
            shippingCost: calculateShippingCost.data.shippingCost,
            actualCost: calculateShippingCost.data.actualCost,
          },
        ]);
      } else {
        for (var i = 0; i < singleShippingCosts?.length; i++) {
          if (singleShippingCosts[i].productId === productSingleId) {
            singleShippingCosts.splice(i, 1);
            setSingleShippingCosts([
              ...singleShippingCosts,
              {
                productId: calculateShippingCost.data.productId,
                qty: calculateShippingCost.data.orderQty,
                shippingCost: calculateShippingCost.data.shippingCost,
                actualCost: calculateShippingCost.data.actualCost,
              },
            ]);
          } else {
            setSingleShippingCosts([
              ...singleShippingCosts,
              {
                productId: calculateShippingCost.data.productId,
                qty: calculateShippingCost.data.orderQty,
                shippingCost: calculateShippingCost.data.shippingCost,
                actualCost: calculateShippingCost.data.actualCost,
              },
            ]);
          }
        }
      }
    }
  }, [calculateShippingCost.data]);
  const handleRemovedForShipping = (id) => {
    for (var i = 0; i < singleShippingCosts?.length; i++) {
      if (singleShippingCosts[i].productId === id) {
        singleShippingCosts.splice(i, 1);
        setSingleShippingCosts(singleShippingCosts.splice(i, 1));
      }
    }
  };
  useEffect(() => {
    const initialValue = 0;
    setShippingCharges(
      singleShippingCosts.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.shippingCost,
        initialValue
      )
    );
  }, [singleShippingCosts]);
  // ==============
  // Find Biggest Shipping Cost Start
  useEffect(() => {
    if (singleShippingCosts?.length > 0) {
      const greatestShipping = singleShippingCosts.map((object) => {
        return object?.shippingCost;
      });
      const max = Math.max(...greatestShipping);
      setGreatestShippingCost(max);
      setTotalShippingCharge(greatestShippingCost);
    } else if (singleShippingCosts?.length === 0) {
      setGreatestShippingCost(0);
      setTotalShippingCharge(0);
    }
  }, [singleShippingCosts]);
  // Find Biggest Shipping Cost End

  // Find Biggest Actual Shipping Cost Start
  useEffect(() => {
    if (singleShippingCosts?.length > 0) {
      const greatestShipping = singleShippingCosts.map((object) => {
        return object?.actualCost;
      });
      const max = Math.max(...greatestShipping);
      setGreatestActualShippingCost(max);
    } else if (singleShippingCosts?.length === 0) {
      setGreatestActualShippingCost(0);
    }
  }, [singleShippingCosts]);
  // Find Biggest Actual Shipping Cost End

  // ==============
  const voucherInfo = useSelector(
    (state) => state.voucherReducer.voucherValidity
  );
  const placeOrder = () => {
    addProduct.handleOrder(dataToSendApi);
  };

  const handleOrderSourceChange = (e) => {
    setOrderSource(e.value);
  };
  return (
    <div
      className="row"
      style={{
        marginTop: "10px",
        display: confirmAddress === true ? "block" : "none",
      }}
    >
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ fontSize: "17px", fontWeight: "600" }}>
                  Manage Products
                </div>
                <Toolbar
                  style={{ margin: "0", padding: "0" }}
                  left={leftToolbarTemplate}
                ></Toolbar>
                <div style={{ width: "40%", position: "relative" }}>
                  <input
                    autoFocus
                    type="text"
                    id="productSku"
                    className="form-control"
                    placeholder="Enter Product SKU"
                    name="productSku"
                    value={addProduct.productSku}
                    onChange={addProduct.handleChange}
                    autoComplete="off"
                  />

                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={addProduct.getProduct}
                    style={{
                      position: "absolute",
                      top: "1px",
                      right: "-6px",
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <DataTable
                ref={dt}
                value={products}
                dataKey="sellerProductSku"
                responsiveLayout="scroll"
              >
                <Column
                  field="sellerProductSku"
                  header="Product SKU"
                  sortable
                ></Column>
                <Column
                  field="productName"
                  header="Product Name"
                  sortable
                ></Column>
                <Column
                  field="categoryName"
                  header="Category"
                  sortable
                ></Column>
                <Column
                  field="productTitle"
                  header="SKU/Style"
                  sortable
                ></Column>
                <Column
                  field="productPrice"
                  header="Variant"
                  body={variantBodyTemplate}
                ></Column>
                <Column
                  field="thumbnailImage"
                  header="Image"
                  body={imageBodyTemplate}
                ></Column>
                <Column
                  field="productPrice"
                  header="Price"
                  body={priceBodyTemplate}
                  sortable
                ></Column>
                <Column
                  field="quantity"
                  header="Quantity"
                  sortable
                  body={quantityBodyTemplate}
                ></Column>
                <Column
                  header="Action"
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "8rem" }}
                ></Column>
              </DataTable>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ padding: "10px", width: "19%" }}>
                <span style={{ fontSize: "20px", fontWeight: "600" }}>
                  Order Source
                </span>
                <Dropdown
                  style={{ fontSize: "14px", minWidth: "100%" }}
                  value={orderSource}
                  options={dropDownOptions}
                  onChange={handleOrderSourceChange}
                  optionLabel="OrderSource"
                  name="OrderSource"
                  placeholder="Select Order Source"
                  filter
                  filterBy="OrderSource"
                />
              </div>
              <div>
                <figure className={{ float: "right" }}>
                  <figcaption
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <strong style={{ textTransform: "uppercase" }}>
                          Sub Total
                        </strong>
                      </div>
                      <div className="col-md-6">
                        <b>TK {totalPrice}</b>
                      </div>
                    </div>
                  </figcaption>

                  <figcaption
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <strong style={{ textTransform: "uppercase" }}>
                          Discount
                        </strong>
                      </div>
                      <div className="col-md-6">
                        {DiscountAmount <= 0 ? (
                          <b>TK 0</b>
                        ) : (
                          <b>-TK {DiscountAmount}</b>
                        )}
                      </div>
                    </div>
                  </figcaption>

                  {voucherInfo.voucherDiscountPercent !== undefined &&
                  voucherInfo.voucherDiscountPercent > 0 ? (
                    <figcaption
                      style={{
                        paddingTop: "5px",
                        paddingBottom: "10px",
                        borderBottom: "1px solid #eaeaea",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <strong
                            style={{
                              textTransform: "uppercase",
                              color: "red",
                            }}
                          >
                            Voucher
                          </strong>
                        </div>
                        <div className="col-md-6" style={{ color: "red" }}>
                          <b>
                            - TK{" "}
                            {(totalPrice *
                              voucherInfo?.voucherDiscountPercent) /
                              100}
                          </b>{" "}
                          <small>
                            {" "}
                            ({voucherInfo?.voucherDiscountPercent}%)
                          </small>
                        </div>
                      </div>
                    </figcaption>
                  ) : voucherInfo.voucherMaximumAmount !== undefined &&
                    voucherInfo.voucherMaximumAmount > 0 ? (
                    <figcaption
                      style={{
                        paddingTop: "5px",
                        paddingBottom: "10px",
                        borderBottom: "1px solid #eaeaea",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <strong
                            style={{
                              textTransform: "uppercase",
                              color: "red",
                            }}
                          >
                            Coupon
                          </strong>
                        </div>
                        <div className="col-md-6" style={{ color: "red" }}>
                          <b>- TK {voucherInfo?.voucherMaximumAmount}</b>{" "}
                        </div>
                      </div>
                    </figcaption>
                  ) : null}

                  <figcaption
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "10px",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <strong style={{ textTransform: "uppercase" }}>
                          VAT
                        </strong>
                      </div>
                      <div className="col-md-6">
                        {VAT === 0 ? <b>TK 0</b> : <b>TK {VAT}</b>}
                      </div>
                    </div>
                  </figcaption>

                  <figcaption
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <strong style={{ textTransform: "uppercase" }}>
                          TAX
                        </strong>
                      </div>
                      <div className="col-md-6">
                        {Tax === 0 ? <b>TK 0</b> : <b>TK {Tax}</b>}
                      </div>
                    </div>
                  </figcaption>

                  <figcaption
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "20px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <strong style={{ textTransform: "uppercase" }}>
                          Shipping
                        </strong>
                      </div>
                      <div className="col-md-6">
                        {!greatestShippingCost ? (
                          <b>TK 0</b>
                        ) : (
                          <b>TK {greatestShippingCost}</b>
                        )}
                      </div>
                    </div>
                  </figcaption>

                  <figcaption
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <strong style={{ textTransform: "uppercase" }}>
                          Grand Total
                        </strong>
                      </div>
                      <div className="col-md-6">
                        {voucherInfo?.voucherDiscountPercent !== undefined &&
                        voucherInfo.voucherDiscountPercent > 0 ? (
                          <b>
                            Tk{" "}
                            {totalPrice -
                              (DiscountAmount +
                                (totalPrice *
                                  voucherInfo?.voucherDiscountPercent) /
                                  100) +
                              VAT +
                              Tax +
                              greatestShippingCost}
                          </b>
                        ) : voucherInfo?.voucherMaximumAmount !== undefined &&
                          voucherInfo.voucherMaximumAmount > 0 ? (
                          <b>
                            Tk{" "}
                            {voucherInfo?.voucherMaximumAmount > totalPrice
                              ? VAT + Tax + greatestShippingCost
                              : totalPrice -
                                (DiscountAmount +
                                  voucherInfo?.voucherMaximumAmount) +
                                VAT +
                                Tax +
                                greatestShippingCost}
                            {}
                          </b>
                        ) : (
                          <b>Tk {totalPrice + greatestShippingCost}</b>
                        )}
                      </div>
                    </div>
                  </figcaption>
                </figure>

                <ApplyCoupon
                  applyCoupon={props}
                  getVoucher={getVoucher}
                  productSize={products?.length}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {props?.saving ? (
                <Spin indicator={antIcon} />
              ) : (
                <Button
                  disabled={!(products?.length > 0 && orderSource !== null)}
                  style={{
                    padding: "7px 20px",
                    fontSize: "17px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30%",
                  }}
                  onClick={() => placeOrder()}
                >
                  Create Order{" "}
                </Button>
              )}
            </div>
            <Dialog
              visible={productDialog}
              style={{ width: "450px" }}
              header="Product Details"
              modal
              className="p-fluid"
              footer={productDialogFooter(
                addProduct?.singleProduct?.productId,
                product.quantity
              )}
              onHide={hideDialog}
            >
              {addProduct?.singleProduct?.thumbnailImage && (
                <img
                  src={baseUrl.concat(
                    addProduct?.singleProduct?.thumbnailImage
                  )}
                  alt={addProduct?.singleProduct?.productName}
                  className="product-image p-d-block p-m-auto p-pb-3"
                  style={{ height: "120px", width: "120px" }}
                />
              )}
              <div className="form-group">
                <label className="control_label">
                  Product Name
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
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <input
                      type="text"
                      id="productName"
                      className="form-control"
                      name="productName"
                      value={addProduct?.singleProduct?.productName}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="control_label">
                  Category{" "}
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
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <input
                      type="text"
                      id="categoryName"
                      className="form-control"
                      name="categoryName"
                      value={addProduct?.singleProduct?.categoryName}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="control_label">
                  Variant{" "}
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
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    {addProduct?.singleProduct?.productColorAndSizes && (
                      <input
                        type="text"
                        id="Variant"
                        className="form-control"
                        name="variantName"
                        value={`${addProduct?.singleProduct?.productColorAndSizes[0]?.variantName}: ${addProduct?.singleProduct?.productColorAndSizes[0]?.variantOptionText}, ${addProduct?.singleProduct?.productColorAndSizes[1]?.variantName}: ${addProduct?.singleProduct?.productColorAndSizes[1]?.variantOptionText}`}
                        readOnly
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <label className="control_label">
                      Price{" "}
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
                    <input
                      type="text"
                      id="productPrice"
                      className="form-control"
                      name="productPrice"
                      value={addProduct?.singleProduct?.productPrice}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="control_label">
                      Quantity{" "}
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
                    <input
                      autoFocus
                      type="text"
                      id="quantity"
                      className="form-control"
                      name="quantity"
                      // placeholder={product.quantity}
                      placeholder={`${addProduct?.singleProduct?.productQuantity} Left`}
                      onChange={(e) =>
                        onInputNumberChange(
                          e,
                          "quantity",
                          addProduct?.singleProduct?.productQuantity
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </Dialog>

            <Dialog
              visible={deleteProductDialog}
              style={{ width: "450px" }}
              header="Confirm"
              modal
              footer={deleteProductDialogFooter(product.productId)}
              onHide={hideDeleteProductDialog}
            >
              <div className="confirmation-content">
                {product && (
                  <>
                    <i
                      className="pi pi-exclamation-triangle p-mr-3"
                      style={{ fontSize: "2.1rem" }}
                    />
                    <span style={{ fontSize: "13px" }}>
                      Are you sure you want to delete{" "}
                      <b>{product.productName}</b>?
                    </span>
                  </>
                )}
              </div>
            </Dialog>

            <Dialog
              visible={deleteProductsDialog}
              style={{ width: "450px" }}
              header="Confirm"
              modal
              footer={deleteProductsDialogFooter}
              onHide={hideDeleteProductsDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle p-mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {product && (
                  <span>
                    Are you sure you want to delete the selected products?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
