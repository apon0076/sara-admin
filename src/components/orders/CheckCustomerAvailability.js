import React from 'react'

export default function CheckCustomerAvailability(props) {
  const { check } = props
  return (
    <div>
      <div className='row'>
        <div className='col-md-12 col-sm-12'>
          <form className='form-horizontal'>
            <div className='form-body'>
              <div className='form-group'>
                <label className='control_label'>
                  Check Customer Availability{' '}
                  <span
                    aria-hidden='true'
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    *
                  </span>
                </label>
                <div className='row'>
                  <div className='col-md-10 col-sm-10'>
                    <input
                      autoFocus
                      type='text'
                      id='contactNo'
                      className={
                        check.errorContactNo.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                      placeholder='Enter Contact Number To Check If Already Exists'
                      name='contactNo'
                      value={check.contactNo}
                      onChange={check.handleChange}
                    />
                  </div>
                  <div className='col-md-2 col-sm-2'>
                    <button
                      disabled={check.errorContactNo.length !== 0}
                      type='submit'
                      className='btn btn-success'
                      onClick={check.checkUser}
                    >
                      <i className='fa fa-search'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {check.customerInfo &&
        check.customerInfo.map((profile, index) => (
          <form
            className='form-horizontal'
            key={index}
            style={{ display: check.customerAvailable ? 'block' : 'none' }}
          >
            <div className='form-body'>
              <div className='row'>
                <div className='col-md-6 col-sm-12'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Customer Name{' '}
                      <span
                        aria-hidden='true'
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Customer Name'
                      name='cusName'
                      value={profile.cusName}
                      readOnly
                    />
                  </div>
                </div>
                <div className='col-md-6 col-sm-12'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Contact Number{' '}
                      <span
                        aria-hidden='true'
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Customer Contact Number'
                      name='cusContactNo'
                      value={profile.cusContactNo}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        ))}
    </div>
  )
}
