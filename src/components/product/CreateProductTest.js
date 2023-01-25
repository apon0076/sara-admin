import React, { useState } from 'react'
import ClassicEditor from './../../../node_modules/@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '../../../node_modules/@ckeditor/ckeditor5-react'

import 'primeicons/primeicons.css'
import '../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primeflex/primeflex.css'

import { Dropdown } from 'primereact/dropdown'
import BackTop from '../BackTop/BackTop'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import baseUrl from '../../utils/baseUrl'
import CreateProductVariantTable from './CreateProductVariantTable'

const CreateProductAdmin = (props) => {
  const animatedComponents = makeAnimated()
  let totlength = props.productVariant.length + 4
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-info'>
              <div className='white-box'>
                <ul className='nav nav-tabs seller-tabs'>
                  <li className='active'>
                    <Link to='/createProductAdmin'>Create Product</Link>
                  </li>
                  <li>
                    <Link to='/pendingProduct'>Pending Product</Link>
                  </li>
                  <li>
                    <Link to='/approvedProduct'>Approved Product</Link>
                  </li>
                  <li>
                    <Link to='/rejectedProduct'>Rejected Product</Link>
                  </li>
                </ul>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form className='form-horizontal'>
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Name{' '}
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
                              id='productName'
                              className={
                                props.errorProductName.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              placeholder='Product Name'
                              name='productName'
                              value={props.productName}
                              onChange={props.handleChange}
                            />

                            <span className='text-danger'>
                              {props.errorProductName}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Title{' '}
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
                              id='productTitle'
                              className={
                                props.errorProductTitle.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              placeholder='Product Title'
                              name='productTitle'
                              value={props.productTitle}
                              onChange={props.handleChange}
                            />
                            <span className='text-danger'>
                              {props.errorProductTitle}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Category{' '}
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
                                optionLabel='breadcrumbCategory'
                                options={
                                  props.activeBreadcrumbsProductCategories
                                }
                                filter
                                showClear
                                filterBy='breadcrumbCategory'
                                placeholder='Select Category'
                                className='form-control'
                                name='parentCategoryId'
                                value={props.parentCategoryId}
                                onChange={props.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Brand{' '}
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
                                optionLabel='brandName'
                                options={props.brands}
                                filter
                                showClear
                                filterBy='brandName'
                                placeholder='Select Brand'
                                className={
                                  props.errorBrandName.length !== 0
                                    ? 'errorClass form-control'
                                    : 'form-control' && 'form-control'
                                }
                                name='brandName'
                                value={props.brandName}
                                onChange={props.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Unit{' '}
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
                                optionLabel='unitName'
                                options={props.units}
                                filter
                                showClear
                                filterBy='unitName'
                                placeholder='Select Product Quantity Unit'
                                className={
                                  props.errorUnitName.length !== 0
                                    ? 'errorClass form-control'
                                    : 'form-control' && 'form-control'
                                }
                                name='unitName'
                                value={props.unitName}
                                onChange={props.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Max Price{' '}
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
                              type='number'
                              id='maxPrice'
                              className={
                                props.errorMaxPrice.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              placeholder='Max Price'
                              name='maxPrice'
                              value={props.maxPrice}
                              onChange={props.handleChange}
                            />
                            <span className='text-danger'>
                              {props.errorMaxPrice}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              What's in the box?{' '}
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
                              id='boxInsideElement'
                              className={
                                props.errorBoxInsideElement.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              placeholder="What's in the box?"
                              name='boxInsideElement'
                              value={props.boxInsideElement}
                              onChange={props.handleChange}
                            />
                            <span className='text-danger'>
                              {props.errorBoxInsideElement}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Meta Keywords{' '}
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
                              id='metaKeywords'
                              className={
                                props.errorMetaKeywords.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              placeholder='Meta Keywords'
                              name='metaKeywords'
                              value={props.metaKeywords}
                              onChange={props.handleChange}
                            />
                            <span className='text-danger'>
                              {props.errorMetaKeywords}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-12 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>Video URL </label>
                            <input
                              type='text'
                              id='productVideoUrl'
                              className={
                                props.errorProductVideoUrl.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              placeholder='Video URL'
                              name='productVideoUrl'
                              value={props.productVideoUrl}
                              onChange={props.handleChange}
                            />
                            <span className='text-danger'>
                              {props.errorProductVideoUrl}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Thumbnail Image{' '}
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
                                    name='thumbnailImage'
                                    id='my-file'
                                    onChange={
                                      props.fileSelectedHandlerThumbnailImage
                                    }
                                  />
                                  <div
                                    className='file-dummy'
                                    style={{
                                      padding: '15px',
                                      width: '230px',
                                    }}
                                  >
                                    <div className='success'>Select Image</div>
                                    <div className='default'>
                                      Please Upload Thumbnail Image
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              {props.showFile ? (
                                <img
                                  src={props.showFile}
                                  style={{
                                    marginTop: '25px',
                                    width: 50,
                                    height: 50,
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.thumbnailImage)}
                                  alt='blank'
                                  style={{
                                    marginTop: '25px',
                                    width: 50,
                                    height: 50,
                                    display: 'none',
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Status{' '}
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
                            <div className='checkbox checkbox-success'>
                              <input
                                name='isActive'
                                id='acceptTerms'
                                type='checkbox'
                                defaultChecked='true'
                                //value={props.productStatus}
                                //onChange={props.handleChange}
                                style={{ border: '1px solid #6c7273' }}
                              />
                              <label className='col-md-12' htmlFor='Available'>
                                &nbsp;Is Available?
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Description{' '}
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
                            <div
                              className={
                                props.errorProductDescription.length !== 0
                                  ? 'errorClass editor'
                                  : 'editor'
                              }
                            >
                              <CKEditor
                                editor={ClassicEditor}
                                data={props.productDescription}
                                onChange={props.productDescriptionChange}
                                // onChange={(event, editor) =>
                                // }
                                className={
                                  props.productDescription.length !== 0
                                    ? 'errorClass form-control'
                                    : 'form-control' && 'form-control'
                                }
                              />
                            </div>
                            <span className='text-danger'>
                              {props.errorProductDescription}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Specification{' '}
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
                            <div
                              className={
                                props.errorProductSpecification.length !== 0
                                  ? 'errorClass editor'
                                  : 'editor'
                              }
                            >
                              <CKEditor
                                editor={ClassicEditor}
                                data={props.productSpecification}
                                onChange={props.productSpecificationChange}
                              />
                            </div>
                            <span className='text-danger'>
                              {props.errorProductSpecification}
                            </span>
                          </div>
                        </div>
                      </div>

                      {props.productVariant.length === 0 ? (
                        ''
                      ) : (
                        <div className='row'>
                          <div className='col-md-12 col-sm-12'>
                            <div className='form-group'>
                              <label className='control_label'>
                                Price &amp; Stock{' '}
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
                              <form>
                                <div className='price_and_stock'>
                                  <div className='form-group'>
                                    <div className='row'>
                                      <div className='col-md-12'>
                                        <table
                                          className='table mt-30'
                                          id='tableImg'
                                        >
                                          <tbody>
                                            <tr>
                                              {props.productVariant.map(
                                                (variant, index) => {
                                                  return (
                                                    <td key={index}>
                                                      <Select
                                                        name={`field${index}`}
                                                        placeholder={`Select ${variant.variantName}`}
                                                        options={variant.productVariantOptions.map(
                                                          (data) => ({
                                                            label:
                                                              data.variantOptionText,
                                                            value:
                                                              data.variantOptionId,
                                                          })
                                                        )}
                                                        components={
                                                          animatedComponents
                                                        }
                                                        isMulti
                                                        isSearchable
                                                        onChange={
                                                          props.handleMultiSelectChange
                                                        }
                                                        value={
                                                          props.productVariantMap
                                                        }
                                                      />
                                                    </td>
                                                  )
                                                }
                                              )}
                                              <td className='pull-right'>
                                                <button
                                                  type='submit'
                                                  className='btn btn-info'
                                                  onClick={
                                                    props.combineProductVariant
                                                  }
                                                >
                                                  <i className='fa fa-check'></i>{' '}
                                                  Add
                                                </button>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                              <CreateProductVariantTable
                                productVariants={props}
                              />
                              <form>
                                <div className='price_and_stock'>
                                  <div
                                    className='alert text-center'
                                    role='alert'
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                  >
                                    {isCollapsed ? (
                                      <div className='display-icon'>
                                        <span className='text'>Less</span>{' '}
                                        <Icon.ChevronsUp className='text-dark icon' />
                                      </div>
                                    ) : (
                                      <div className='display-icon'>
                                        <span className='text'>More</span>{' '}
                                        <Icon.ChevronsDown className='text-dark icon' />
                                      </div>
                                    )}
                                  </div>
                                  {isCollapsed && (
                                    <>
                                      <label className='control_label'>
                                        Service &amp; Delivery{' '}
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
                                      <div className='container-fluid'>
                                        <div className='service_and_delivery'>
                                          <div className='row'>
                                            <div className='col-md-6 col-sm-12'>
                                              <div className='form-group'>
                                                <label className='control_label'>
                                                  Warranty Type{' '}
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
                                                <select
                                                  className='form-control'
                                                  data-placeholder='Select'
                                                  tabIndex='1'
                                                  name='warrantyTypeId'
                                                  onChange={props.handleChange}
                                                >
                                                  <option key='0' value='0'>
                                                    No Warrenty
                                                  </option>
                                                  <option key='1' value='1'>
                                                    Seller Warrenty
                                                  </option>
                                                  {/* <option key='2' value='2'>
                                                    Non-local Warrenty
                                                  </option> */}
                                                  <option key='3' value='3'>
                                                    International Seller
                                                    Warrenty
                                                  </option>
                                                  <option key='4' value='4'>
                                                    International Manufacturer
                                                    Warrenty
                                                  </option>
                                                  <option key='5' value='5'>
                                                    Brand Warrenty
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                            <div className='col-md-6 col-sm-12'>
                                              <div className='form-group'>
                                                <label className='control_label'>
                                                  Warranty Period{' '}
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
                                                <select
                                                  className='form-control'
                                                  data-placeholder='Select'
                                                  tabIndex='1'
                                                  name='warrantyPeriodId'
                                                  onChange={props.handleChange}
                                                >
                                                  <option key='0' value='0'>
                                                    No Warrrenty
                                                  </option>
                                                  <option key='1' value='1'>
                                                    1 Month
                                                  </option>
                                                  <option key='2' value='2'>
                                                    2 Month
                                                  </option>
                                                  <option key='3' value='3'>
                                                    3 Month
                                                  </option>
                                                  <option key='4' value='4'>
                                                    4 Month
                                                  </option>
                                                  <option key='5' value='5'>
                                                    5 Month
                                                  </option>
                                                  <option key='6' value='6'>
                                                    6 Month
                                                  </option>
                                                  <option key='12' value='12'>
                                                    12 Month
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='row'>
                                            <div className='col-md-6 col-sm-12'>
                                              <div className='form-group'>
                                                <label className='control_label'>
                                                  Warranty Policy{' '}
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
                                                  id='warrantyPolicy'
                                                  //className="form-control"
                                                  className={
                                                    props.errorWarrantyPolicy
                                                      .length !== 0
                                                      ? 'errorClass form-control'
                                                      : 'form-control' &&
                                                        'form-control'
                                                  }
                                                  placeholder='Warranty Policy'
                                                  name='warrantyPolicy'
                                                  value={props.warrantyPolicy}
                                                  onChange={props.handleChange}
                                                />
                                                <span className='text-danger'>
                                                  {props.errorWarrantyPolicy}
                                                </span>
                                              </div>
                                            </div>
                                            <div className='col-md-6 col-sm-12'>
                                              <div className='form-group'>
                                                <label className='control_label'>
                                                  Package Weight (kg){' '}
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
                                                  type='number'
                                                  id='packageWeight'
                                                  //className="form-control"
                                                  className={
                                                    props.errorPackageWeight
                                                      .length !== 0
                                                      ? 'errorClass form-control'
                                                      : 'form-control' &&
                                                        'form-control'
                                                  }
                                                  value={props.packageWeight}
                                                  placeholder='Package Weight'
                                                  name='packageWeight'
                                                  onChange={props.handleChange}
                                                />
                                                <span className='text-danger'>
                                                  {props.errorPackageWeight}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='row'>
                                            <div className='col-md-12 col-sm-12'>
                                              <div className='form-group'>
                                                <label className='control_label'>
                                                  Package Dimensions (cm){' '}
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
                                                  <div className='col-sm-4'>
                                                    <input
                                                      type='number'
                                                      id='packageLength'
                                                      //className="form-control"
                                                      className={
                                                        props.errorPackageLength
                                                          .length !== 0
                                                          ? 'errorClass form-control'
                                                          : 'form-control' &&
                                                            'form-control'
                                                      }
                                                      placeholder='Length (cm)'
                                                      name='packageLength'
                                                      value={
                                                        props.packageLength
                                                      }
                                                      onChange={
                                                        props.handleChange
                                                      }
                                                    />
                                                    <span className='text-danger'>
                                                      {props.errorPackageLength}
                                                    </span>
                                                  </div>
                                                  <div className='col-sm-4'>
                                                    <input
                                                      type='number'
                                                      id='packageWidth'
                                                      // className="form-control"
                                                      className={
                                                        props.errorPackageWidth
                                                          .length !== 0
                                                          ? 'errorClass form-control'
                                                          : 'form-control' &&
                                                            'form-control'
                                                      }
                                                      placeholder='Width (cm)'
                                                      name='packageWidth'
                                                      value={props.packageWidth}
                                                      onChange={
                                                        props.handleChange
                                                      }
                                                    />
                                                    <span className='text-danger'>
                                                      {props.errorPackageWidth}
                                                    </span>
                                                  </div>
                                                  <div className='col-sm-4'>
                                                    <input
                                                      type='number'
                                                      id='packageHeight'
                                                      //className="form-control"
                                                      className={
                                                        props.errorPackageHeight
                                                          .length !== 0
                                                          ? 'errorClass form-control'
                                                          : 'form-control' &&
                                                            'form-control'
                                                      }
                                                      placeholder='Height (cm)
                '
                                                      name='packageHeight'
                                                      value={
                                                        props.packageHeight
                                                      }
                                                      onChange={
                                                        props.handleChange
                                                      }
                                                    />
                                                    <span className='text-danger'>
                                                      {props.errorPackageHeight}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>

                  <div className='form-actions m-t-30 fixed-footer'>
                    <button
                      type='submit'
                      className='btn btn-success'
                      onClick={props.createProduct}
                    >
                      <i className='fa fa-check'></i> Create
                    </button>
                    <button type='button' className='btn btn-default'>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackTop />
    </div>
  )
}
export default CreateProductAdmin
