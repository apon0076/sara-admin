import React from 'react'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import * as Icon from 'react-feather'

const EditSellerProfile = (props) => {
  if (props.sellerProfileById) {
    const imageUrl = props.sellerProfileById.sellerImageUrl
    const result = imageUrl && imageUrl.split('/')
    var imageName = result && result.slice(-1).pop()
  }

  let fieldName
  if (props.fileName === '') {
    fieldName = imageName
  } else {
    fieldName = ''
  }

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4 col-xs-12'>
            <div className='white-box'>
              <div className='user-bg'>
                <img
                  width='100%'
                  alt='user'
                  src='/assets/plugins/images/large/Sara_Logo.jpg'
                />
                <div className='overlay-box'>
                  <div className='user-content'>
                    <a>
                      <img
                        src={baseUrl.concat(
                          props.sellerProfileById.sellerImageUrl
                        )}
                        className='thumb-lg img-circle'
                        alt='seller'
                      />
                    </a>
                    <h4
                      className='text-white'
                      style={{ textTransform: 'capitalize' }}
                    >
                      {props.sellerProfileById.sellerName}
                    </h4>
                    <h5 className='text-white'>
                      {props.sellerProfileById.sellerEmail}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //   //  // */}
          <div className='col-md-8 col-xs-12'>
            <div className='white-box'>
              <div className='row'>
                <div
                  className='col-sm-12'
                  style={{
                    textAlign: 'end',
                    paddingRight: '25px',
                  }}
                >
                  <Link
                    to={'/SellerProfile'}
                    data-toggle='tooltip'
                    data-placement='top'
                    title='Cancel'
                  >
                    <Icon.X className='text-dark' />
                  </Link>
                </div>
              </div>
              <div className='tab-content'>
                <form className='form-horizontal form-material'>
                  <div className='form-group hidden'>
                    <label className='col-md-12'>Seller Id</label>
                    <div className='col-md-12'>
                      <input
                        type='hidden'
                        placeholder='Is Active'
                        className='form-control form-control-line'
                        name='isActive'
                        value={props.sellerId}
                        onChange={props.handleChange}
                      />{' '}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='example-email' className='col-md-12'>
                      Seller Email
                    </label>
                    <div className='col-md-12'>
                      <input
                        disabled='disabled'
                        type='email'
                        placeholder='test@gmail.com'
                        className='form-control form-control-line'
                        name='sellerEmail'
                        value={props.sellerEmail}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-md-12'>
                      Full Name{' '}
                      <span
                        aria-hidden='true'
                        style={{ color: 'red', fontWeight: 'bold' }}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-md-12'>
                      <input
                        type='text'
                        placeholder='Full name'
                        className='form-control form-control-line'
                        name='sellerName'
                        value={props.sellerName}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.sellerName.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.sellerName}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-md-12'>
                      Phone Number{' '}
                      <span
                        aria-hidden='true'
                        style={{ color: 'red', fontWeight: 'bold' }}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-md-12'>
                      <input
                        type='number'
                        placeholder='+880-01711-0000-00'
                        className='form-control form-control-line'
                        name='sellerContactNo'
                        value={props.sellerContactNo}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.sellerContactNo.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.sellerContactNo}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-md-12'>
                      Present Address{' '}
                      <span
                        aria-hidden='true'
                        style={{ color: 'red', fontWeight: 'bold' }}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-md-12'>
                      <textarea
                        rows={3}
                        type='text'
                        placeholder='Present Address'
                        className='form-control form-control-line'
                        name='sellerPresentAddress'
                        value={props.sellerPresentAddress}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.sellerPresentAddress.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.sellerPresentAddress}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-md-12'>
                      Permanent Address{' '}
                      <span
                        aria-hidden='true'
                        style={{ color: 'red', fontWeight: 'bold' }}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-md-12'>
                      <textarea
                        rows={3}
                        type='text'
                        placeholder='Permanent Address'
                        className='form-control form-control-line'
                        name='sellerPermanentAddress'
                        value={props.sellerPermanentAddress}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.sellerPermanentAddress.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.sellerPermanentAddress}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className='form-group input-file-container'>
                    <div className='col-md-12 col-sm-12'>
                      <div className='row'>
                        <div className='col-md-8'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Change Profile Image{' '}
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
                            <div className='input-file-container file-area'>
                              <input
                                type='file'
                                name='shopBannerUrl'
                                id='my-file'
                                onChange={props.fileSelectedHandlerSellerLogo}
                              />
                              <div
                                className='file-dummy'
                                style={{
                                  width: '300px',
                                  height: '80px',
                                }}
                              >
                                {props.showFile ? (
                                  <div className='success'>
                                    {' '}
                                    Profile Image Selected
                                  </div>
                                ) : (
                                  <div className='success'>
                                    Select Profile Image for Update
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          {props.showFile ? (
                            <img
                              src={props.showFile}
                              style={{
                                marginTop: '25px',
                                width: 80,
                                height: 80,
                              }}
                            />
                          ) : (
                            <img
                              src={baseUrl.concat(
                                props.sellerProfileById.sellerImageUrl
                              )}
                              alt='blank'
                              style={{
                                marginTop: '25px',
                                width: 80,
                                height: 80,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='form-group'>
                    <br></br>
                    <div className='col-sm-12' style={{ textAlign: 'center' }}>
                      <button
                        onClick={props.updateSellerProfile}
                        className='btn btn-success'
                        style={{
                          marginLeft: '0',
                          width: '180px',
                          height: '40px',
                        }}
                      >
                        {' '}
                        <i className='fa fa-edit'></i>&nbsp; Update
                      </button>
                      {/* <Link to="/SellerProfile">
                        <button
                          className="btn btn-info"
                          style={{ marginLeft: "0" }}
                        >
                          <i className="fa fa-backward"></i> Go Back
                        </button>
                      </Link> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSellerProfile
