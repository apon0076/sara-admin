import React from 'react'
import { Link } from 'react-router-dom'
import BackTop from '../BackTop/BackTop'
import 'primeicons/primeicons.css'
import '../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primeflex/primeflex.css'
import { Dropdown } from 'primereact/dropdown'
import baseUrl from '../../utils/baseUrl'

const BusinessInformation = (props) => {
  //1
  if (props.shopLogoUrl) {
    const imageUrl = props.shopLogoUrl
    const result = imageUrl && imageUrl.split('/')
    var shopLogoUrlName = result && result.slice(-1).pop()
  }

  let fieldName1
  if (props.shopLogoUrlFileName === '') {
    fieldName1 = shopLogoUrlName
  } else {
    fieldName1 = ''
  }

  //2
  if (props.shopBannerUrl) {
    const imageUrl = props.shopBannerUrl
    const result = imageUrl && imageUrl.split('/')
    var shopBannerUrlName = result && result.slice(-1).pop()
  }

  let fieldName2
  if (props.shopBannerUrlFileName === '') {
    fieldName2 = shopBannerUrlName
  } else {
    fieldName2 = ''
  }

  // //3
  if (props.bussinessDocUrl) {
    const imageUrl = props.bussinessDocUrl
    const result = imageUrl && imageUrl.split('/')
    var bussinessDocUrlName = result && result.slice(-1).pop()
  }

  let fieldName3
  if (props.bussinessDocUrlFileName === '') {
    fieldName3 = bussinessDocUrlName
  } else {
    fieldName3 = ''
  }

  return (
    <>
      <div className='page-wrapper'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='white-box'>
                <h3 className='box-title m-b-0'>Account &#38; Settings</h3>
                <p className='text-muted m-b-15'>Update Profile Information</p>
                <ul className='nav nav-tabs seller-tabs'>
                  <li className='active'>
                    <Link to='/BusinessInformation'>Business Information</Link>
                  </li>
                  <li>
                    <Link to='/ShippingProvider'>Shipping Provider</Link>
                  </li>
                  <li>
                    <Link to='/WarehouseAddress'>Warehouse Address</Link>
                  </li>
                  <li>
                    <Link to='/ReturnAddress'>Return Address</Link>
                  </li>
                  <li>
                    <Link to='/BankAccount'>Bank Account</Link>
                  </li>
                  <li>
                    <Link to='/ReturnPolicy'>Return Policy</Link>
                  </li>
                </ul>
                <form className='form-horizontal form-material'>
                  <div className='form-body'>
                    <h3 className='box-title'> Business Information</h3>
                    <hr className='m-t-0 m-b-40' />
                    <div className='m-20'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Shop Description{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              // className={
                              //   props.isError.shopDescription.length > 0
                              //     ? "is-invalid form-control"
                              //     : "form-control"
                              // }
                              value={props.shopDescription || ''}
                              name='shopDescription'
                              onChange={props.handleChange}
                            />

                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.shopDescription.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.shopDescription}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Country{' '}
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
                            <div className='dropdown-demo'>
                              <Dropdown
                                optionLabel='countryName'
                                options={props.allCountries}
                                filter
                                showClear
                                filterBy='countryName'
                                placeholder='Select Country'
                                className={
                                  props.errorCountryName.length !== 0
                                    ? 'errorClass form-control'
                                    : 'form-control' && 'form-control'
                                }
                                name='countryName'
                                value={props.countryName}
                                onChange={props.handleCountryChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>
                              Shop City{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              value={props.shopCity || ''}
                              name='shopCity'
                              onChange={props.handleChange}
                            />
                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.shopCity.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.shopCity}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>
                              Shop State{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='shopState'
                              value={props.shopState || ''}
                              onChange={props.handleChange}
                            />
                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.shopState.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.shopState}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>
                              Shop Zip Code{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='shopZipCode'
                              value={props.shopZipCode || ''}
                              onChange={props.handleChange}
                            />
                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.shopZipCode.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.shopZipCode}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>
                              Shop Address{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              name='shopAddress'
                              value={props.shopAddress || ''}
                              onChange={props.handleChange}
                            />
                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.shopAddress.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.shopAddress}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        {/* // */}
                        {/* 6 */}
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>
                              binNo{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              value={props.binNo || ''}
                              name='binNo'
                              onChange={props.handleChange}
                            />
                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.binNo.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.binNo}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        {/* 7 */}
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>
                              Owner Name{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              value={props.ownerName || ''}
                              name='ownerName'
                              onChange={props.handleChange}
                            />
                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.ownerName.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.ownerName}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        {/* 8 */}
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>
                              Shop Url{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <div className='input-group'>
                              <span className='input-group-addon'>
                                www.saralifestyle.com/
                              </span>
                              <input
                                type='text'
                                className='form-control'
                                name='shopUrl'
                                placeholder='Shop Name'
                                value={props.shopUrl}
                                onChange={props.handleChange}
                                onBlur={props.shopAvailability}
                              ></input>
                            </div>
                            {props.shopUrlAvalibleState === false ? (
                              <span
                                style={{
                                  padding: '10px',
                                  color: '#FF0000',
                                  margin: 'auto',
                                  fontWeight: '600',
                                }}
                              >
                                This URL already exist!!!!
                              </span>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-8'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Shop Logo{' '}
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
                                    name='shopLogo'
                                    id='my-file'
                                    onChange={props.shopLogoUrldHandler}
                                  />
                                  <div
                                    className='file-dummy'
                                    style={{
                                      width: '250px',
                                      height: '80px',
                                    }}
                                  >
                                    {props.LogoShowFile ? (
                                      <div className='success'>
                                        {' '}
                                        Shop Logo Selected
                                      </div>
                                    ) : (
                                      <div className='success'>
                                        Select Shop Logo for Update
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              {props.LogoShowFile ? (
                                <img
                                  src={props.LogoShowFile}
                                  style={{
                                    marginTop: '25px',
                                    width: 80,
                                    height: 80,
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.shopLogoUrl)}
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

                        <div className='col-md-6 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Shop Banner{' '}
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
                                    onChange={props.shopBannerdHandler}
                                  />
                                  <div
                                    className='file-dummy'
                                    style={{
                                      width: '300px',
                                      height: '80px',
                                    }}
                                  >
                                    {props.BannerShowFile ? (
                                      <div className='success'>
                                        {' '}
                                        Shop Banner Selected
                                      </div>
                                    ) : (
                                      <div className='success'>
                                        Select Shop Banner for Update
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              {props.BannerShowFile ? (
                                <img
                                  src={props.BannerShowFile}
                                  style={{
                                    marginTop: '25px',
                                    width: 240,
                                    height: 80,
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.shopBannerUrl)}
                                  alt='blank'
                                  style={{
                                    marginTop: '25px',
                                    width: 240,
                                    height: 80,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-8'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Bussiness Document{' '}
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
                                    onChange={props.businessDocHandler}
                                  />
                                  <div
                                    className='file-dummy'
                                    style={{
                                      width: '300px',
                                      height: '80px',
                                    }}
                                  >
                                    {props.DocumentShowFile ? (
                                      <div className='success'>
                                        {' '}
                                        Bussiness Document Selected
                                      </div>
                                    ) : (
                                      <div className='success'>
                                        Select Bussiness Document for Update
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              {props.DocumentShowFile ? (
                                <img
                                  src={props.DocumentShowFile}
                                  style={{
                                    marginTop: '25px',
                                    width: 80,
                                    height: 80,
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.bussinessDocUrl)}
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

                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <div className='checkbox checkbox-success'>
                              <input
                                name='isActive'
                                id='acceptTerms'
                                type='checkbox'
                                checked={props.isActive}
                                onChange={props.handleParentCheck}
                              />
                              <label
                                className='col-md-12'
                                htmlFor='acceptTerms'
                              >
                                &nbsp;Is Active?
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='form-actions'>
                          <div
                            className='col-md-12'
                            style={{ textAlign: 'center' }}
                          >
                            <button
                              type='submit'
                              className='btn btn-info'
                              style={{ marginRight: '5px' }}
                              onClick={props.updateProfile}
                            >
                              <i className='fa fa-edit'></i> Update
                            </button>
                            <Link to='/SellerHome'>
                              <button type='button' className='btn btn-default'>
                                Cancel
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackTop />
    </>
  )
}
export default BusinessInformation
