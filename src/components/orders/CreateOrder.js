import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import CheckCustomerAvailability from './CheckCustomerAvailability'
import CreateNewCustomer from './CreateNewCustomer'
import CreateCustomerAddress from './CreateCustomerAddress'
import AddProduct from './AddProduct'

const CreateOrder = (props) => {
  const [confirmAddress, setConfirmAddress] = useState(false)
  const [addressChange, setAddressChange] = useState(false)
  return (
    <>
      <div className='page-wrapper'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='panel panel-success'>
                <div className='panel-heading'>
                  Create Order
                  <span style={{ float: 'right' }}>
                    <Link to='/ManageOrdersAdmin?status=pending'>
                      <Icon.List className='text-light' />
                    </Link>
                  </span>
                </div>
                <div className='panel-wrapper collapse in' aria-expanded='true'>
                  <div className='panel-body'>
                    {console.log('props',props)}
                    <CheckCustomerAvailability check={props} />
                    <CreateNewCustomer createCustomer={props} />
                    <CreateCustomerAddress
                      createAddress={props}
                      setConfirmAddress={setConfirmAddress}
                      confirmAddress={confirmAddress}
                      setAddressChange={setAddressChange}
                    />
                    <AddProduct
                      addProduct={props}
                      confirmAddress={confirmAddress}
                      deliveryAddress={props?.customerAddress[0]}
                      addressChange={addressChange}
                      saving={props?.saving}
                    />
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
export default CreateOrder