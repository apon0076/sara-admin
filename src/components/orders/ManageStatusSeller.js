import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form"
import { RHFInput } from 'react-hook-form-input';
import Select from 'react-select';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

const ManageStatusSchema = yup.object().shape({
    sender: yup.string()
        .min(2, "Sender name should be minimum of 2 characters.")
        .max(20, "Sender name should be minimum of 20 characters.")
        .required("Sender name is required!"),
    receiver: yup.string()
        .min(2, "Receiver name should be minimum of 2 characters.")
        .max(20, "Receiver name should be minimum of 20 characters.")
        .required("Receiver name is required!"),
    location: yup.string()
        .min(5, "Location should be minimum of 5 characters.")
        .max(100, "Location should be minimum of 100 characters.")
        .required("Location is required!"),
    remarks: yup.string()
        .min(5, "Remarks should be minimum of 5 characters.")
        .max(50, "Remarks should be minimum of 50 characters.")
        .required("Remarks is required!"),
})

export default function ManageStatusSeller(props) {
    const { show, handleClose } = props;
    const { orderProfileId, orderNo, shopWiseOrderId, statusId, statusName } = props.orders;
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [location, setLocation] = useState('');
    const [remarks, setRemarks] = useState('');
    const [orderStatusId, setOrderStatusId] = useState('');
    const [orderStatusName, setOrderStatusName] = useState('');
    const [defaultOrderStatus, setDefaultOrderStatus] = useState([]);
    const [updateStatus, setUpdateStatus] = useState({});

    useEffect(() => {
        setDefaultOrderStatus([
            {
                orderStatusTypeId: statusId,
                statusTypeName: statusName
            }
        ]);
    }, [props.orders])

    const { register, handleSubmit, reset, errors, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(ManageStatusSchema),
    })

    setValue('defaultOrderStatus', defaultOrderStatus & defaultOrderStatus ? defaultOrderStatus : '');

    const resetForm = () => {
        setSender('');
        setReceiver('');
        setLocation('');
        setRemarks('');
    }

    const handleStatusChange = (obj) => {
        setUpdateStatus(obj)
        setOrderStatusId(obj.orderStatusTypeId);
        setOrderStatusName(obj.statusTypeName);
    };

    const createOrderTracking = async (data, e) => {
        e.target.reset(); // reset after form submit

        let orderTrackingData = {
            orderTrackingId: 0,
            orderId: orderProfileId,
            shopwiseOrderId: shopWiseOrderId,
            trackingNumber: orderNo,
            trackingDate: new Date(),
            orderStatusId: orderStatusId,
            orderStatusName: orderStatusName,
            orderNo: orderNo,
            sender: data.sender,
            receiver: data.receiver,
            location: data.location,
            remarks: data.remarks,
            isActive: 'Y'
        };

        props.changeStatus(orderTrackingData, updateStatus, resetForm)
    };

    return (
        <>
            <div
                className="modal fade"
                id="statusModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div id="divToPrint">
                            <div className="modal-header">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <h6 className="modal-title" id="exampleModalLongTitle">
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body p-5 m-5">
                                <Row>
                                    <Form
                                        className="card card-body p-5 m-5"
                                        onSubmit={handleSubmit(createOrderTracking)}
                                    >
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Form.Group controlId="orderStatus">
                                                    <Form.Label>Order Status</Form.Label>
                                                    <RHFInput
                                                        as={<Select options={props.orderStatusType} />}
                                                        rules={{ required: true }}
                                                        name="orderStatus"
                                                        value={defaultOrderStatus}
                                                        onChange={handleStatusChange}
                                                        getOptionLabel={(x) => x.statusTypeName}
                                                        getOptionValue={(x) => x.orderStatusTypeId}
                                                        className={errors.orderStatus && 'border-danger'}
                                                        register={() =>
                                                            register('orderStatus', {
                                                                required: true
                                                            })
                                                        }
                                                        setValue={setValue}
                                                    />
                                                    {errors.division && (
                                                        <span className="text-danger">
                                                            {errors.division.type === 'required' &&
                                                                'Please give division'}
                                                        </span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Form.Group controlId="sender">
                                                    <Form.Label>Sender Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Sender Name"
                                                        name="sender"
                                                        value={sender}
                                                        onChange={(e) => setSender(e.target.value)}
                                                        className="form-control"
                                                        ref={register}
                                                        autoComplete="off"
                                                        style={{ height: '40px', borderRadius: '4px' }}
                                                    />
                                                    {errors.sender && (
                                                        <span className="error">
                                                            {errors.sender.message}
                                                        </span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Form.Group controlId="receiver">
                                                    <Form.Label>Receiver Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Receiver Name"
                                                        name="receiver"
                                                        value={receiver}
                                                        onChange={(e) => setReceiver(e.target.value)}
                                                        className="form-control"
                                                        ref={register}
                                                        autoComplete="off"
                                                        style={{ height: '40px', borderRadius: '4px' }}
                                                    />
                                                    {errors.receiver && (
                                                        <span className="error">
                                                            {errors.receiver.message}
                                                        </span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Form.Group controlId="location">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Location"
                                                        name="location"
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        className="form-control"
                                                        ref={register}
                                                        autoComplete="off"
                                                        style={{ height: '40px', borderRadius: '4px' }}
                                                    />
                                                    {errors.location && (
                                                        <span className="error">
                                                            {errors.location.message}
                                                        </span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Form.Group controlId="remarks">
                                                    <Form.Label>Remarks</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder="Enter Remarks"
                                                        name="remarks"
                                                        value={remarks}
                                                        onChange={(e) => setRemarks(e.target.value)}
                                                        className="form-control"
                                                        ref={register}
                                                        autoComplete="off"
                                                        style={{ borderRadius: '4px' }}
                                                    />
                                                    {errors.remarks && (
                                                        <span className="error">
                                                            {errors.remarks.message}
                                                        </span>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            className="ps-btn ps-btn--fullwidth"
                                            type="submit"
                                        >
                                            <i className="fa fa-send"></i> Submit
                                        </Button>
                                    </Form>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal> */}
        </>
    )
}
