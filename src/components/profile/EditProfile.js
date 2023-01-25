import React, { useState, useEffect } from 'react'
import baseUrl from '../../utils/baseUrl'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import DatePicker from '../admin/DatePiceker'
import moment from 'moment'

const EditProfile = (props) => {
  const [dateOfBirth, setDateOfBirth] = useState('')
  
  useEffect(() => {
    setDateOfBirth(props.dateOfBirth)
  }, [props?.dateOfBirth])
  
  if (props.adminImageUrl) {
    const imageUrl = props.adminImageUrl
    const result = imageUrl && imageUrl.split('/')
    var imageName = result && result.slice(-1).pop()
  }

  let fieldName
  if (props.adminProfilePicFileName === '') {
    fieldName = imageName
  } else {
    fieldName = ''
  }
  const handleDateOfBirth = (date, dateString) => {
    setDateOfBirth(dateString)
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
                        src={
                          props.adminImageUrl &&
                          props.adminImageUrl.length < 100
                            ? baseUrl.concat(props.adminImageUrl)
                            : props.adminImageUrl
                        }
                        className='thumb-lg img-circle'
                        alt='seller'
                      />
                    </a>
                    {props.profileById.map((profile) => (
                      <>
                        <h4
                          className='text-white'
                          style={{ textTransform: 'capitalize' }}
                        >
                          {profile.adminName}
                        </h4>
                        <h5 className='text-white'>{profile.designation}</h5>
                      </>
                    ))}
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
                    to={'/Profile'}
                    //  data-toggle="tab"
                  >
                    {/* <i
                      className="fa fa-times"
                      style={{ fontSize: "25px", color: "black" }}
                    ></i> */}
                    <Icon.X className='text-dark' />
                  </Link>
                </div>
              </div>
              <div className='tab-pane' id='settings'>
                <form className='form-horizontal form-material'>
                  {/* 1 */}
                  <div className='form-group'>
                    <label className='col-md-12'>Email</label>
                    <div className='col-md-12'>
                      <input
                        type='text'
                        placeholder='Full name'
                        className='form-control form-control-line'
                        name='adminEmail'
                        value={props.adminEmail}
                        disabled
                      />
                    </div>
                  </div>
                  {/* 2 */}
                  <div className='form-group '>
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
                        placeholder='Enter Full Name'
                        className='form-control form-control-line'
                        name='adminName'
                        value={props.adminName}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.adminName.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.adminName}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className='form-group'>
                    <label className='col-md-12'>
                      Contact Number{' '}
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
                        placeholder='Enter Contact Number'
                        className='form-control form-control-line'
                        name='adminContactNo'
                        value={props.adminContactNo}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.adminContactNo.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.adminContactNo}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* 3 */}
                  <div className='form-group'>
                    <label className='col-md-12'>
                      NID Number{' '}
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
                        placeholder='Enter NID Number'
                        className='form-control form-control-line'
                        name='nidNo'
                        value={props.nidNo}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.nidNo.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.nidNo}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* <div className='form-group'>
                    <label className='col-md-12'>
                      Date of Birth{' '}
                      <span
                        aria-hidden='true'
                        style={{ color: 'red', fontWeight: 'bold' }}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-md-12'>
                      <DatePicker
                        showTime
                        use12Hours={true}
                        format='YYYY-MM-DD'
                        className='form-control'
                        placeholder='Select Date & Time'
                        value={props.dateOfBirth}
                        onChange={(date, dateString) =>
                          handleDateOfBirth(date, dateString, 2)
                        }
                      />
                    </div>
                  </div> */}

                  {/* 4 */}
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
                        placeholder='Enter Present Address'
                        className='form-control form-control-line'
                        name='adminPresentAddress'
                        value={props.adminPresentAddress}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.adminPresentAddress.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.adminPresentAddress}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  {/* 5 */}
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
                        placeholder='Enter Permanent Address'
                        className='form-control form-control-line'
                        name='adminPermanentAddress'
                        value={props.adminPermanentAddress}
                        onChange={props.handleChange}
                      />
                      <span
                        style={{
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        {props.isError.adminPermanentAddress.length > 0 && (
                          <span className='invalid-feedback'>
                            {props.isError.adminPermanentAddress}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* 6 */}
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
                              src={baseUrl.concat(props.adminImageUrl)}
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

                  <br></br>
                  <div className='form-group'>
                    <div className='col-sm-12' style={{ textAlign: 'center' }}>
                      <button
                        className='btn btn-success'
                        onClick={props.updateProfile}
                        style={{
                          marginLeft: '0',
                          width: '180px',
                          height: '40px',
                        }}
                      >
                        Update Profile
                      </button>
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

export default EditProfile
