import React from 'react'
import { Link } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import { Dropdown } from 'primereact/dropdown'
import baseUrl from '../../../utils/baseUrl'
import * as Icon from 'react-feather'

const editCateogry = (props) => {
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Update Category{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/CategoryList'>
                    <Icon.List className='text-light' />
                  </Link>
                </span>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form>
                    <div className='form-body'>
                      <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-fluid p-col-12 p-md-6'>
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

                        <div className='p-field p-col-12 p-md-6'>
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
                                placeholder={props?.categoryName}
                                name='selectedParentCategoryId'
                                value={props?.selectedParentCategoryId}
                                onChange={props?.handleChange}
                                className='form-control'
                              />
                            </div>
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
                      <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-12 p-md-6'>
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
                        <div className='p-field p-col-12 p-md-6'>
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
                      <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-12 p-md-6'>
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
                        <div className='p-field p-col-12 p-md-6'>
                          <div className='form-group file-area'>
                            <label className='control_label'>
                              Change Category Image
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
                              <div className='col-sm-8'>
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
                                      Please Upload Category Image
                                    </div>
                                  </div>
                                ) : (
                                  <div className='file-dummy'>
                                    <div className='success'>
                                      Category Image Uploaded Successfully
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className='col-sm-4 col-md-2'>
                                {props?.showFile ? (
                                  <img
                                    src={props?.showFile}
                                    className='thumb-md img-circle'
                                    style={{
                                      height: '70px',
                                      width: '70px',
                                      borderRadius: '10px',
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={baseUrl.concat(
                                      props?.productImagePath
                                    )}
                                    className='thumb-md img-circle'
                                    style={{
                                      height: '70px',
                                      width: '70px',
                                      borderRadius: '10px',
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-12 p-md-2'>
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
                        <div className='p-field p-col-12 p-md-10'>
                          <div className='p-fluid p-formgrid p-grid'>
                            <div className='p-field p-col-12 p-md-2'>
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
                                    defaultChecked={
                                      props?.value?.showOnHomepage === 'Y'
                                        ? true
                                        : false
                                    }
                                  />
                                  <label htmlFor='showOnHomepage'>
                                    &nbsp;Yes{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className='p-field p-col-12 p-md-2'>
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
                                    defaultChecked={
                                      props?.value?.includeInTopMenu === 'Y'
                                        ? true
                                        : false
                                    }
                                  />
                                  <label htmlFor='includeInTopMenu'>
                                    &nbsp;Yes{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className='p-field p-col-12 p-md-2'>
                              <div className='form-group'>
                                <label className='control_label'>Active?</label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    type='checkbox'
                                    name='isActive'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={
                                      props?.value?.isActive === 'Y'
                                        ? true
                                        : false
                                    }
                                  />
                                  <label htmlFor='isActive'>&nbsp;Yes </label>
                                </div>
                              </div>
                            </div>
                            <div className='p-field p-col-12 p-md-2'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Is Product?
                                </label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    type='checkbox'
                                    name='isProduct'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={
                                      props?.value?.isProduct === 'Y'
                                        ? true
                                        : false
                                    }
                                  />
                                  <label htmlFor='isProduct'>&nbsp;Yes </label>
                                </div>
                              </div>
                            </div>
                            <div className='p-field p-col-12 p-md-2'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Is Returnable?
                                </label>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    type='checkbox'
                                    name='isReturnable'
                                    onChange={props?.handleParentCheck}
                                    defaultChecked={
                                      props?.value?.isReturnable === 'Y'
                                        ? true
                                        : false
                                    }
                                  />
                                  <label htmlFor='isReturnable'>
                                    &nbsp;Yes{' '}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='form-footer'>
                      <div className='form-group row'>
                        <div className='text-center'>
                          <div className='btn-group text-center'>
                            <button
                              type='submit'
                              className='btn btn-lg btn-success'
                              onClick={props?.saveCategory}
                            >
                              Update
                            </button>
                            <Link to='/CategoryList'>
                              <button
                                className='btn btn-lg btn-danger'
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

export default editCateogry
