import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import { Dropdown } from 'primereact/dropdown'

const editProductVariantOption = (props) => {
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Update Product Variant Option{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/ProductVariantOptionList'>
                    <Icon.List className='text-light' />
                  </Link>
                </span>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form className='form-horizontal'>
                    <div className='form-body'>
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
                              <input
                                type='text'
                                placeholder='Enter Category Name'
                                name='categoryName'
                                value={props?.categoryName}
                                className={'form-control'}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Variant{' '}
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
                              <input
                                type='text'
                                placeholder='Enter Variant Name'
                                name='variantName'
                                value={props?.variantName}
                                className={'form-control'}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Variant Option Text{' '}
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
                              placeholder='Enter Variant Option Text'
                              name='variantOptionText'
                              value={props?.variantOptionText}
                              onChange={props?.handleChange}
                              className={
                                props?.errorVariantOptionText.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              disabled
                            />
                            {props?.errorVariantOptionText && (
                              <span className='error'>
                                {props?.errorVariantOptionText}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-md-4 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Variant Option Value{' '}
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
                              placeholder='Variant Option Value'
                              name='variantOptionValue'
                              value={props?.variantOptionValue}
                              onChange={props?.handleChange}
                              className={
                                props?.errorVariantOptionValue.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorVariantOptionValue && (
                              <span className='error'>
                                {props?.errorVariantOptionValue}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-md-4 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Variant Remark{' '}
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
                              placeholder='Variant Remark'
                              name='variantRemark'
                              value={props?.variantRemark}
                              onChange={props?.handleChange}
                              className={
                                props?.errorVariantRemark.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorVariantRemark && (
                              <span className='error'>
                                {props?.errorVariantRemark}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Display Order Number{' '}
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
                              placeholder='Enter Display Order Number'
                              name='displayOrder'
                              value={props?.displayOrder}
                              onChange={props?.handleChange}
                              className={
                                props?.errorDisplayOrder.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorDisplayOrder && (
                              <span className='error'>
                                {props?.errorDisplayOrder}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='form-footer '>
                      <div className='form-group row'>
                        <div className='text-center'>
                          <div className='btn-group text-center'>
                            <button
                              type='submit'
                              className='btn btn-success'
                              onClick={props?.updateProductVariantOption}
                            >
                              Update
                            </button>
                            <Link to='/ProductVariantOptionList'>
                              <button
                                className='btn btn-danger'
                                style={{ cursor: 'pointer' }}
                              >
                                Cancel
                              </button>
                            </Link>
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
      </div>
    </div>
  )
}

export default editProductVariantOption
