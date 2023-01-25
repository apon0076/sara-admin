/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { CREATE_CUSTOMER_ADDRESS_RESET } from "../../store/actions/customerAction";

export default function NewAddressModal(props) {
  const { createAddress } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });
  const modal_res = useSelector((state) => state.customerReducer.addNewAddress);
  useEffect(() => {
    if (modal_res) {
      if (modal_res?.data?.succeed === true) {
        setTimeout(() => {
          props.setSelectedAddressModal(false);
          dispatch({ type: CREATE_CUSTOMER_ADDRESS_RESET });
        }, 1000);
      }
    }
  }, [modal_res]);

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title" id="exampleModalLongTitle">
          Add New Address
        </h3>
        <button
          onClick={() => props.setSelectedAddressModal(false)}
          type="button"
          className="close"
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="country">
                <Form.Label>
                  Country{" "}
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </Form.Label>
                <Select
                  options={createAddress.countryList}
                  name="country"
                  value={createAddress.country}
                  onChange={(value) =>
                    createAddress.handleAddressChange("countryList", value)
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="city">
                <Form.Label>
                  District/City{" "}
                  <span
                    aria-hidden="true"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </Form.Label>
                <Select
                  options={createAddress.cityList}
                  name="city"
                  value={createAddress.city}
                  onChange={(value) =>
                    createAddress.handleAddressChange("cityList", value)
                  }
                  isLoading={createAddress.loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="country">
                <Form.Label>
                  Area/Thana/Upazila{" "}
                  <span
                    aria-hidden="true"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </Form.Label>
                <Creatable
                  options={createAddress.areaList}
                  name="area"
                  value={createAddress.area}
                  onChange={(value) =>
                    createAddress.handleAddressChange("areaList", value)
                  }
                  isLoading={createAddress.loading}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="postCode">
                <Form.Label>Post Code </Form.Label>
                <input
                  type="text"
                  id="postCode"
                  className={
                    createAddress.errorPostCode.length !== 0
                      ? "errorClass form-control"
                      : "form-control" && "form-control"
                  }
                  placeholder="Enter Post Code"
                  name="postCode"
                  value={createAddress.postCode}
                  onChange={createAddress.handleChange}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Form.Group controlId="address">
                <Form.Label>
                  Full Address{" "}
                  <span
                    aria-hidden="true"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </Form.Label>
                <textarea
                  id="address"
                  rows="4"
                  className={
                    createAddress.errorAddress.length !== 0
                      ? "errorClass form-control"
                      : "form-control" && "form-control"
                  }
                  placeholder="Enter Full Address"
                  name="address"
                  value={createAddress.address}
                  onChange={createAddress.handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </form>
        <Button
          className="ps-btn ps-btn--fullwidth"
          type="submit"
          onClick={createAddress.createAddress}
        >
          Confirm Address
        </Button>
      </div>
    </div>
  );
}
