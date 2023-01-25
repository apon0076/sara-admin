import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import * as Icon from "react-feather";
import ShowAddress from "./ShowAddress";
import AddNewAddressModal from "./AddNewAddressModal";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";

export default function CreateCustomerAddress(props) {
  const { createAddress, setConfirmAddress, confirmAddress, setAddressChange } =
    props;
  const [selectedAddressModal, setSelectedAddressModal] = useState(false);
  const [addressViewToggle, setAddressViewToggle] = useState(false);
  const [addressEditId, setAddressEditId] = useState(null);
  const [editAddressData, setEditAddressData] = useState(null);

  const handleSeeMore = () => {
    setAddressViewToggle(!addressViewToggle);
  };
  useEffect(() => {
    const filtered_address_id = createAddress?.customerAddresses?.filter(
      (item) => item.shippingStatus === "Y"
    );
    if (filtered_address_id[0]?.customerAddressId !== undefined) {
      createAddress.getSelectedAddress(
        filtered_address_id[0]?.customerAddressId
      );
    }
  }, [createAddress?.customerAddresses]);

  const selectedAddressInfo = useSelector((state) => state.addressReducer);
  const { addressById, addressLoading } = selectedAddressInfo;
  useEffect(() => {
    setConfirmAddress(false);
  }, [createAddress?.customerAddress]);

  useEffect(() => {
    setAddressChange(true);
  }, [addressLoading]);

  //Modal Control
  const showAddressModal = () => {
    setSelectedAddressModal(true);
  };
  const handleOk = () => {
    setSelectedAddressModal(false);
    setAddressEditId(null);
    setEditAddressData(null);
  };
  const handleCancel = () => {
    setSelectedAddressModal(false);
    setAddressEditId(null);
    setEditAddressData(null);
  };
  // Edit Address Modal Handler
  const handleAddressEditModal = (addressId) => {
    setSelectedAddressModal(true);
    setAddressEditId(addressId);
  };
  return (
    <div
      style={{
        display:
          createAddress.customerAdded === false ||
          createAddress.customerAvailable === null
            ? "none"
            : createAddress.customerAdded || createAddress.customerAvailable
            ? "block"
            : "none",
      }}
    >
      {(createAddress.customerAvailable || createAddress.customerAdded) && (
        <div>
          <div
            className="row all_address__section"
            style={!addressViewToggle ? { maxHeight: "140px" } : null}
          >
            {createAddress?.customerAddresses.map((item, index) => (
              <>
                <div
                  style={{ cursor: "pointer" }}
                  className="col-md-3 col-sm-12 order-address"
                >
                  <div
                    className="card address-card order-address-item"
                    key={index}
                    style={
                      addressById[0]?.customerAddressId ===
                      item.customerAddressId
                        ? {
                            borderRadius: "10px",
                            margin: "5px",
                            border: "3px solid green",
                          }
                        : { borderRadius: "10px", margin: "5px" }
                    }
                    onClick={() =>
                      createAddress.getSelectedAddress(item.customerAddressId)
                    }
                  >
                    <div className="create-order-card-body">
                      <strong>{item.recipientName}</strong>
                      <br />
                      <b>
                        <i>{item.contactNumber}</i>
                      </b>
                      <br />
                      {item.address}
                    </div>
                  </div>
                  <button
                    className="address_edit__btn"
                    onClick={() =>
                      handleAddressEditModal(item.customerAddressId)
                    }
                  >
                    <FaEdit />
                  </button>
                </div>
              </>
            ))}
          </div>
          {createAddress?.customerAddresses.length > 4 ? (
            <div className="see_more_btn__section ">
              <button className="see-more btn" onClick={() => handleSeeMore()}>
                {!addressViewToggle ? (
                  <strong>See More </strong>
                ) : (
                  <strong>See Less </strong>
                )}
              </button>
            </div>
          ) : null}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="col-md-8 col-xs-12">
          <ShowAddress
            customerAddress={createAddress.customerAddress}
            addressFound={createAddress.addressFound}
            handleAddress={createAddress.handleAddress}
            addressLoading={addressLoading}
          />
        </div>
        <div className="col-md-4 col-xs-12">
          <div
            className="card address-card"
            style={{
              border: "1px solid #f1f1f1",
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            <div
              className="card-body"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => showAddressModal()}
            >
              <b>ADD NEW DELIVERY ADDRESS</b>
              <Icon.PlusCircle style={{ marginLeft: "8px" }} />
            </div>
          </div>
          <div
            htmlFor="confirmAddress"
            className="card address-card"
            style={{
              border: "1px solid #f1f1f1",
              padding: "5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              onClick={() => {
                setConfirmAddress(!confirmAddress);
                setAddressChange(false);
              }}
              type="checkbox"
              id="confirmAddress"
              name="confirmAddress"
              value={confirmAddress}
              style={{ cursor: "pointer" }}
              checked={!confirmAddress ? false : true}
              disabled={createAddress?.customerAddresses.length === 0}
            />
            <label
              style={{ margin: "5px 0 0 10px", cursor: "pointer" }}
              htmlFor="confirmAddress"
            >
              Confirm Address
            </label>
          </div>
        </div>
      </div>
      <Modal
        className="product_quick_modal"
        title={addressEditId === null ? `Add New Address` : `Update Address`}
        open={selectedAddressModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        destroyOnClose={true}
      >
        <AddNewAddressModal
          setIsModalVisible={setSelectedAddressModal}
          createAddress={createAddress}
          addressEditId={addressEditId}
          setEditAddressData={setEditAddressData}
          editAddressData={editAddressData}
        />
      </Modal>
    </div>
  );
}
