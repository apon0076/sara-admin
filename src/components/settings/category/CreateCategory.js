import React from 'react'
import { Link } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import { Dropdown } from 'primereact/dropdown'
import * as Icon from 'react-feather'
import baseUrl from '../../../utils/baseUrl'

const CreateCategory = (props) => {
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Create Category{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/CategoryList'>
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
                              Parent Category{' '}
                            </label>
                            <div className='dropdown-demo'>
                              <Dropdown
                                optionLabel='breadcrumbCategory'
                                options={props?.activeBreadcrumbsCategories}
                                filter
                                showClear
                                filterBy='breadcrumbCategory'
                                placeholder='Select Category'
                                name='selectedParentCategoryId'
                                value={props?.selectedParentCategoryId}
                                onChange={props?.handleChange}
                                className='form-control'
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Category Name{' '}
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
                              placeholder='Category Name'
                              name='categoryName'
                              value={props?.categoryName}
                              onChange={props?.handleChange}
                              className={
                                props?.errorCategoryName.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorCategoryName && (
                              <span className='error'>
                                {props?.errorCategoryName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='p-field p-fluid'>
                        <div className='form-group'>
                          <label className='control_label'>
                            Category Details{' '}
                            <span
                              aria-hidden='true'
                              style={{ color: 'red', fontWeight: 'bold' }}
                            >
                              *
                            </span>
                          </label>
                          <div
                            className={
                              props?.errorDescription.length !== 0
                                ? 'errorClass'
                                : ''
                            }
                          >
                            <Editor
                              editorState={props?.editorState}
                              toolbarClassName='toolbarClassName'
                              wrapperClassName='wrapperClassName'
                              editorClassName='form-control'
                              onEditorStateChange={props?.onEditorStateChange}
                              toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: {
                                  uploadCallback: props?._uploadImageCallBack,
                                },
                                inputAccept:
                                  'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel',
                              }}
                            />
                          </div>
                          {props?.errorDescription && (
                            <span className='error'>
                              {props?.errorDescription}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Meta Title{' '}
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
                              placeholder='Meta Title'
                              name='metaTitle'
                              value={props?.metaTitle}
                              onChange={props?.handleChange}
                              className={
                                props?.errorMetaTitle.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorMetaTitle && (
                              <span className='error'>
                                {props?.errorMetaTitle}
                              </span>
                            )}
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
                              placeholder='Meta Keywords'
                              name='metaKeywords'
                              value={props?.metaKeywords}
                              onChange={props?.handleChange}
                              className={
                                props?.errorMetaKeywords.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorMetaKeywords && (
                              <span className='error'>
                                {props?.errorMetaKeywords}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Meta Description{' '}
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
                              name='metaDescription'
                              component='textarea'
                              type='text'
                              rows='3'
                              value={props?.metaDescription}
                              onChange={props?.handleChange}
                              className={
                                props?.errorMetaDescription.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props?.errorMetaDescription && (
                              <span className='error'>
                                {props?.errorMetaDescription}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='row'>
                            <div className='col-sm-9 col-md-9'>
                              <div className='form-group file-area'>
                                <label className='control_label'>
                                  Category Image
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
                                  name='productImagePath'
                                  required='required'
                                  className='form-control'
                                  onChange={props?.categoryLogoUrlHandler}
                                />
                                {props?.productImagePath === '' ? (
                                  <div className='file-dummy'>
                                    <div className='default'>
                                      Upload Category Logo Image
                                    </div>
                                  </div>
                                ) : (
                                  <div className='file-dummy'>
                                    <div className='success'>
                                      Category Logo Image Uploaded Successfully
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
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props?.productImagePath)}
                                  className='thumb-md product-image'
                                  style={{
                                    marginTop: '30px',
                                    width: '120px',
                                    height: '60px',
                                    display: 'none',
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-2 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Display Order{' '}
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
                              placeholder='Display Order'
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
                        <div className='col-md-10 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-2 col-sm-12'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Show on Home Page?{' '}
                                </label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    id='showOnHomepage'
                                    type='checkbox'
                                    name='showOnHomepage'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={props?.showOnHomepage}
                                  />
                                  <label htmlFor='showOnHomepage'>
                                    {' '}
                                    &nbsp;Yes{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-2 col-sm-12'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Include on Top Menu?{' '}
                                </label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    id='includeInTopMenu'
                                    type='checkbox'
                                    name='includeInTopMenu'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={props?.includeInTopMenu}
                                  />
                                  <label htmlFor='includeInTopMenu'>
                                    {' '}
                                    &nbsp;Yes{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-2 col-sm-12'>
                              <div className='form-group'>
                                <label className='control_label'> Is Active?</label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    id='isActive'
                                    type='checkbox'
                                    name='isActive'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={props?.isActive}
                                  />
                                  <label htmlFor='isActive'> &nbsp;Yes </label>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-2 col-sm-12'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Is Returnable?
                                </label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    id='isReturnable'
                                    type='checkbox'
                                    name='isReturnable'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={props?.isReturnable}
                                  />
                                  <label htmlFor='isReturnable'>
                                    {' '}
                                    &nbsp;Yes{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-2 col-sm-12'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Is Product?
                                </label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    id='isProduct'
                                    type='checkbox'
                                    name='isProduct'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={props?.isProduct}
                                  />
                                  <label htmlFor='isProduct'> &nbsp;Yes </label>
                                </div>
                              </div>
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
                              onClick={props?.saveCategory}
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

export default CreateCategory
