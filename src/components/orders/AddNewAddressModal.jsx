import { Form, Radio } from "antd";
import axios from "axios";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  getAllAreaRecord,
  getAllCityRecord,
  getAllCountryRecord,
} from "../../store/actions/addressAction";
import {
  createCustomerAddressRecord,
  CREATE_CUSTOMER_ADDRESS_RESET,
  getCustomerAddressRecord,
} from "../../store/actions/customerAction";
import baseUrl from "../../utils/baseUrl";
import CheckBox from "../shared/CheckBox";
import styles from "./../../assets/styles/addNewAddress.module.scss";

const AddNewAddressModal = (props) => {
  const {
    modalHandler,
    createAddress,
    addressEditId,
    setEditAddressData,
    editAddressData,
    setIsModalVisible,
  } = props;
  const [customerId, setCustomerId] = useState(null);
  const [customerAddressId, setCustomerAddressId] = useState(0);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [recipientName, setRecipientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [deliveryId, setDeliveryId] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState("");
  const [cityList, setCityList] = useState([]);
  const [area, setArea] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [areaList, setAreaList] = useState([]);
  const [editAddressLoading, setEditAddressLoading] = useState(false);

  const countries = useSelector((state) => state.addressReducer.allCountries);

  // Get Address for Edit
  const handleAPICall = async (id) => {
    setEditAddressLoading(true);
    try {
      const response = await axios.get(
        baseUrl + `/api/Customer/GetAddress?customerAddressId=${id}`
      );
      const dataObj = response.data.find((d) => d.customerAddressId === id);
      setEditAddressData(dataObj);
    } catch (error) {
      console.error(error);
    }
    setEditAddressLoading(false);
  };
  useEffect(() => {
    addressEditId !== null && handleAPICall(addressEditId);
  }, [addressEditId]);

  useEffect(() => {
    setCustomerId(createAddress.customerId);
  }, [createAddress]);

  const {
    allCities: cities,
    loading: cityLoading,
    success: citySuccess,
  } = useSelector((state) => state?.addressReducer);
  const {
    allAreas: areas,
    loading: areaLoading,
    success: areaSuccess,
  } = useSelector((state) => state?.addressReducer);

  useEffect(() => {
    countries && countries?.length === 0 && dispatch(getAllCountryRecord());
    setCountryList(
      countries.map(({ countryName: label, countryId: value }) => ({
        label,
        value,
      }))
    );
  }, [countries, dispatch]);

  useEffect(() => {
    citySuccess &&
      setCityList(
        cities.map(({ cityName: label, cityId: value }) => ({
          label,
          value,
        }))
      );
  }, [cities, citySuccess]);

  useEffect(() => {
    areaSuccess &&
      setAreaList(
        areas.map(({ areaName: label, areaId: value }) => ({
          label,
          value,
        }))
      );
  }, [areaSuccess, areas]);

  const handleChange = (field, e) => {
    switch (field) {
      case "countryList":
        setCountry(e);
        dispatch(getAllCityRecord(e.value));
        setArea("");
        break;

      case "cityList":
        setCity(e);
        dispatch(getAllAreaRecord(e.value));
        setCityId(e.value);
        setArea("");
        break;

      case "areaList":
        setArea(e);
        setAreaId(e.value);
        setAreaName(e.label);
        break;

      default:
        break;
    }
  };

  // Get Default Address for Edit
  useEffect(() => {
    if (
      editAddressData?.countryId !== undefined ||
      editAddressData?.cityId !== undefined
    ) {
      dispatch(getAllCityRecord(editAddressData?.countryId));
      dispatch(getAllAreaRecord(editAddressData?.cityId));
    }
  }, [editAddressData, dispatch]);

  useEffect(() => {
    setDeliveryId(editAddressData?.addressTypeId);
  }, [editAddressData]);

  const addAddressValidation = useSelector((state) => state?.customerReducer);
  const {
    addNewAddress: addOrEditAddress,
    loading,
    error,
  } = addAddressValidation;

  useEffect(() => {
    if (loading === false && error) {
      toast.current.show({
        severity: "error",
        summary: "Something Went Wrong.",
      });
      dispatch({ type: CREATE_CUSTOMER_ADDRESS_RESET });
    } else if (loading === false && addOrEditAddress?.succeed === false) {
      toast.current.show({
        severity: "error",
        summary: "Something Went Wrong.",
      });
      dispatch({ type: CREATE_CUSTOMER_ADDRESS_RESET });
    } else if (loading === false && addOrEditAddress?.succeed === true) {
      toast.current.show({
        severity: "success",
        summary: "Address Added Successfully.",
      });
      modalHandler();
      dispatch({ type: CREATE_CUSTOMER_ADDRESS_RESET });
      dispatch(getCustomerAddressRecord(customerId));
    }
  }, [
    dispatch,
    addAddressValidation,
    loading,
    error,
    addOrEditAddress.succeed,
    modalHandler,
    customerId,
  ]);
  useEffect(() => {
    editAddressData !== null && setCustomerId(editAddressData.customerId);
    editAddressData !== null &&
      setCustomerAddressId(editAddressData.customerAddressId);
    editAddressData !== null && setRecipientName(editAddressData.recipientName);
    editAddressData !== null && setContactNumber(editAddressData.contactNumber);
    editAddressData !== null && setDeliveryId(editAddressData.addressType);
    editAddressData !== null && setCityId(editAddressData.cityId);
    editAddressData !== null && setAreaId(editAddressData.areaId);
    editAddressData !== null && setAreaName(editAddressData.areaName);
    editAddressData !== null && setPostCode(editAddressData.postCode);
    editAddressData !== null && setFullAddress(editAddressData.address);
    editAddressData !== null &&
      setBillingAddress(editAddressData.status === "Y" ? true : false);
    editAddressData !== null &&
      setShippingAddress(editAddressData.shippingStatus === "Y" ? true : false);
  }, [editAddressData]);
  const saveAddress = async () => {
    // if (recipientName === "") {
    //   toast.current.show({
    //     severity: "error",
    //     summary: "Please Enter Recipient Name!!!",
    //   });
    //   return;
    // }

    // if (contactNumber === "") {
    //   toast.current.show({
    //     severity: "error",
    //     summary: "Please Enter Contact Number!!!",
    //   });
    //   return;
    // }

    if (country.length == 0 && editAddressData === null) {
      toast.current.show({
        severity: "error",
        summary: "Please Select Country!!!",
      });
      return;
    }

    if (cityId === "" && editAddressData === null) {
      toast.current.show({
        severity: "error",
        summary: "Please Enter District/City!!!",
      });
      return;
    }

    if (areaName === "" && editAddressData === null) {
      toast.current.show({
        severity: "error",
        summary: "Please Enter Area/Thana/Upazila!!!",
      });
      return;
    }

    let dataToSendApi = {
      customerId: customerId,
      customerAddressId: customerAddressId,
      recipientName: recipientName,
      contactNumber: contactNumber,
      addressTypeId: deliveryId,
      cityId: cityId,
      areaid: typeof areaId === "string" ? 0 : areaId,
      areaName: areaName,
      postCode: postCode,
      address: fullAddress,
      status: billingAddress === true ? "Y" : "N",
      shippingStatus: shippingAddress === true ? "Y" : "N",
    };
    dispatch(createCustomerAddressRecord({ dataToSendApi }));
    setIsModalVisible(false);
    setTimeout(() => {
      dispatch(getCustomerAddressRecord(customerId));
    }, 1500);
  };
  return (
    <>
      <Toast ref={toast}></Toast>
      <div>
        <Form
          layout="vertical"
          onFinish={saveAddress}
          className={`${styles.main_body_section}`}
        >
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item onChange={(e) => setRecipientName(e.target.value)}>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Recipient Name
                    </p>
                    <input
                      className={`${styles.input_field}`}
                      type="text"
                      placeholder="Full Name"
                      defaultValue={
                        addressEditId !== null
                          ? editAddressLoading
                            ? `...`
                            : editAddressData?.recipientName
                          : null
                      }
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item onChange={(e) => setContactNumber(e.target.value)}>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Contact Number
                    </p>
                    <input
                      className={`${styles.input_field}`}
                      type="number"
                      placeholder="Mobile Number"
                      defaultValue={
                        addressEditId !== null
                          ? editAddressLoading
                            ? `...`
                            : editAddressData?.contactNumber
                          : null
                      }
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Country{" "}
                      <span
                        style={{
                          color: "#D71110",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        *
                      </span>
                    </p>
                    <Select
                      className={`${styles.input_select}`}
                      placeholder={
                        addressEditId !== null
                          ? editAddressLoading
                            ? `...`
                            : editAddressData?.countryName
                          : "Select Country Name"
                      }
                      options={countryList}
                      name="country"
                      value={country}
                      onChange={(value) => handleChange("countryList", value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      District/City{" "}
                      <span
                        style={{
                          color: "#D71110",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        *
                      </span>
                    </p>
                    <Select
                      className={`${styles.input_select}`}
                      placeholder={
                        addressEditId !== null
                          ? editAddressLoading
                            ? `...`
                            : editAddressData?.cityName
                          : "Select District/City Name"
                      }
                      options={cityList}
                      name="city"
                      value={city}
                      onChange={(value) => handleChange("cityList", value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Area/Thana/Upazila{" "}
                      <span
                        style={{
                          color: "#D71110",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        *
                      </span>
                    </p>
                    <Select
                      className={`${styles.input_select}`}
                      placeholder={
                        addressEditId !== null
                          ? editAddressLoading
                            ? `...`
                            : editAddressData?.areaName
                          : "Select Area/Thana/Upazila Name"
                      }
                      options={areaList}
                      name="area"
                      value={area}
                      onChange={(value) => handleChange("areaList", value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item onChange={(e) => setPostCode(e.target.value)}>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Post Code{" "}
                    </p>
                    <input
                      className={`${styles.input_field}`}
                      type="text"
                      placeholder="Post Code"
                      defaultValue={
                        addressEditId !== null
                          ? editAddressLoading
                            ? `...`
                            : editAddressData?.postCode
                          : null
                      }
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item onChange={(e) => setFullAddress(e.target.value)}>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Address{" "}
                      <span
                        style={{
                          color: "#D71110",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        *
                      </span>
                    </p>
                    <textarea
                      className={`${styles.textarea_field}`}
                      type="text"
                      placeholder="House / Building / Street"
                      defaultValue={
                        addressEditId !== null
                          ? editAddressLoading
                            ? `...`
                            : editAddressData?.address
                          : null
                      }
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item className="effective_delivery_radio">
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Select Effective Delivery{" "}
                      <span
                        style={{
                          color: "#D71110",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        *
                      </span>
                    </p>
                    <Radio.Group
                      className={`${styles.radio_buttons_field}`}
                      defaultValue={deliveryId}
                      onChange={(e) => setDeliveryId(e.target.value)}
                    >
                      <Radio value={1}>Home</Radio>
                      <Radio value={2}>Office</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <Form.Item className="effective_delivery_radio">
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        color: "#000000",
                        marginBottom: "6px",
                      }}
                    >
                      Default Address (Optional){" "}
                    </p>
                    <CheckBox
                      label={"Default Shipping Address"}
                      setter={setShippingAddress}
                      isDefault={editAddressData?.shippingStatus}
                      editAddressLoading={editAddressLoading}
                    />
                    <CheckBox
                      label={"Default Billing Address"}
                      setter={setBillingAddress}
                      isDefault={editAddressData?.status}
                      editAddressLoading={editAddressLoading}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="d-flex flex-column column-gap">
                <div className="form-group">
                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    Your existing default address setting with be replaced if
                    you make some changes here.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            style={{ marginTop: "10px", fontWeight: 600 }}
            className={`${styles.submit_btn}`}
            type="submit"
          >
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddNewAddressModal;
