/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import LoadingCard from '../shared/LoadingCard'

export default function ShowAddress(props) {
  const { customerAddress, addressFound, handleAddress, addressLoading } = props
  const [shippingAddress, setShippingAddress] = useState(null)
  const [address, setAddress] = useState(null)
  const [recipientName, setRecipientName] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  useEffect(() => {
    {
      customerAddress &&
        customerAddress.map((data) => setRecipientName(data.recipientName))
    }
    {
      customerAddress &&
        customerAddress.map((data) => setContactNumber(data.contactNumber))
    }
    {
      customerAddress &&
        customerAddress.map((data) =>
          setShippingAddress(
            JSON.stringify({
              recipientName: data.recipientName,
              contactNumber: data.contactNumber,
              address: data.address,
              areaName: data.areaName,
              cityName: data.cityName,
              divisionName: data.divisionName,
              postCode: data.postCode,
              additionalInformation: data.additionalInformation,
            })
          )
        )
    }
    {
      customerAddress &&
        customerAddress.map((data) =>
          handleAddress(
            JSON.stringify({
              recipientName: data.recipientName,
              contactNumber: data.contactNumber,
              address: data.address,
              areaName: data.areaName,
              cityName: data.cityName,
              divisionName: data.divisionName,
              postCode: data.postCode,
              additionalInformation: data.additionalInformation,
            })
          )
        )
    }
  }, [customerAddress])

  const getAddress = JSON.parse(shippingAddress)

  useEffect(() => {
    getAddress && setAddress(getAddress.address)
  }, [getAddress])

  return (
    <div
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        display:
          customerAddress.length === 0 || addressFound === null
            ? 'none'
            : addressFound
            ? 'block'
            : 'none',
      }}
    >
      <div className='alert alert-info' role='alert'>
        <label className='control_label'> Bill To </label>
        {addressLoading ? (
          <LoadingCard count={1} />
        ) : (
          <address>
            {recipientName}
            <br />
            {contactNumber}
            <br />
            {address}
          </address>
        )}
      </div>
    </div>
  )
}