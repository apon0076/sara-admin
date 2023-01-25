import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import baseUrl from '../../../utils/baseUrl'

const CreateBrand = (props) => {
  const animatedComponents = makeAnimated()
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Create Brand{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/BrandList'>
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
                              Brand Name{' '}
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
                              placeholder='Brand Name'
                              name='brandName'
                              value={props?.brandName}
                              onChange={props?.handleChange}
                              className={
                                props?.errorBrandName.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorBrandName && (
                              <span className='error'>
                                {props?.errorBrandName}
                              </span>
                            )}
                          </div>
                        </div>

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
                            <Select
                              options={props?.categories}
                              components={animatedComponents}
                              isMulti
                              isSearchable
                              onChange={props?.handleMultiSelectChange}
                              value={props?.productBrandCategoryMap}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Brand Description{' '}
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
                            <textarea
                              name='brandDetails'
                              component='textarea'
                              type='text'
                              rows='4'
                              value={props?.brandDetails}
                              onChange={props?.handleChange}
                              className={
                                props.errorBrandDetails.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorBrandDetails && (
                              <span className='error'>
                                {props?.errorBrandDetails}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='row'>
                            <div className='col-sm-9 col-md-9'>
                              <div className='form-group file-area'>
                                <label className='control_label'>
                                  Brand Image
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
                                  type='file'
                                  accept="image/*"
                                  name='brandLogoUrl'
                                  required='required'
                                  className='form-control'
                                  onChange={props?.brandLogoUrlHandler}
                                />
                                {props?.brandLogoUrl === '' ? (
                                  <div className='file-dummy'>
                                    <div className='default'>
                                      Upload Brand Logo Image
                                    </div>
                                  </div>
                                ) : (
                                  <div className='file-dummy'>
                                    <div className='success'>
                                      Brand Logo Image Uploaded Successfully
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className='col-sm-3 col-md-3'>
                              {props?.showFile ? (
                                <img
                                  src={props?.showFile}
                                  className='thumb-md product-image'
                                  style={{
                                    marginTop: '30px',
                                    width: '120px',
                                    height: '70px',
                                  }}
                                  alt=''
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props?.brandLogoUrl)}
                                  className='thumb-md product-image'
                                  style={{
                                    marginTop: '30px',
                                    width: '120px',
                                    height: '60px',
                                    display: 'none',
                                  }}
                                  alt=''
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-4 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>Active </label>
                            <div className='checkbox checkbox-success'>
                              <input
                                id='isActive'
                                type='checkbox'
                                name='isActive'
                                checked={props?.isActive}
                                onChange={props?.handleParentCheck}
                              />
                              <label htmlFor='isActive'> &nbsp;Yes </label>
                            </div>
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
                              onClick={props?.saveBrand}
                            >
                              Create
                            </button>
                            <Link to='/Home'>
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

export default CreateBrand
