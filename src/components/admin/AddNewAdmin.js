import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import DatePicker from './DatePiceker'
import 'react-datepicker/dist/react-datepicker.css'
import * as Icon from 'react-feather'
import Resizer from 'react-image-file-resizer'
import { ToastContainer, toast } from 'react-toastify'

const AddNewAdmin = (props) => {
  const initialValues = {
    adminName: '',
    adminEmail: '',
    adminContactNo: '',
    adminPresentAddress: '',
    adminPermanentAddress: '',
    dateOfBirth: '',
    genderId: '',
    isActive: true,
    adminImageUrl: '',
    employeeId: '',
    nidNo: '',
    designationId: '',
    showWarning: props.showWarning,
    showSuccess: props.showSuccess,
    designation: props.designation,
  }

  const savedValues = {
    adminName: '',
    adminEmail: '',
    adminContactNo: '',
    adminPresentAddress: '',
    adminPermanentAddress: '',
    dateOfBirth: '',
    genderId: '',
    isActive: true,
    adminImageUrl: '',
    employeeId: '',
    nidNo: '',
    designationId: '',
    showWarning: props?.showWarning,
    showSuccess: props?.showSuccess,
    designation: props?.designation,
  }

  return (
    <Formik
      initialValues={initialValues || savedValues}
      validationSchema={Yup.object().shape({
        adminName: Yup.string()
          .min(2, 'Name is too short - should be 2 chars minimum.')
          .max(20, 'Name is too long - should be 20 chars maximum.')
          .required('Required'),
        adminEmail: Yup.string().email().required('Required'),
        adminContactNo: Yup.string()
          .required('No number provided.')
          .matches(
            /(01[3-9]\d{8})$/,
            'Number must be a valid Bangladeshi number.'
          ),
        adminPresentAddress: Yup.string()
          .min(2, 'Address is too short - should be 2 chars minimum.')
          .max(50, 'Address is too long - should be 50 chars maximum.')
          .required('Provide present address'),
        adminPermanentAddress: Yup.string()
          .min(2, 'Address is too short - should be 2 chars minimum.')
          .max(50, 'Address is too long - should be 50 chars maximum.')
          .required('Provide permanent address'),
        genderId: Yup.string().required('Required Field'),
        dateOfBirth: Yup.string().required('Required Field'),
        adminImageUrl: Yup.string().required('(180x180)px - Max Size:5mb'),
        employeeId: Yup.string().required('Required Field'),
        nidNo: Yup.string().required('Required Field'),
        designationId: Yup.string().required('Required Field'),
      })}
      onSubmit={(values, { onSubmitProps }) => {
        props.saveAdmin(values)
        onSubmitProps.resetForm()
      }}
      enableReinitialize
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          resetForm,
        } = props

        return (
          <form onSubmit={handleSubmit}>
            <ToastContainer autoClose={1500} />
            <div className='page-wrapper'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='panel panel-success'>
                      <div className='panel-heading'>
                        {' '}
                        Add New Admin{' '}
                        <span style={{ float: 'right' }}>
                          <Link
                            to='/AdminList'
                            data-toggle='tooltip'
                            data-placement='top'
                            title='Admin List'
                          >
                            <Icon.List className='text-light' />
                          </Link>
                        </span>
                      </div>

                      <div
                        className='panel-wrapper collapse in'
                        aria-expanded='true'
                      >
                        <div className='panel-body'>
                          <div className='form-body'>
                            <h3 className='box-title'> Admin Info</h3>
                            <hr className='m-t-0 m-b-40' />
                            <div className='row'>
                              {/* 1.1 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='name'
                                  >
                                    Admin Name{' '}
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
                                  <div className='col-md-8'>
                                    <input
                                      name='adminName'
                                      type='string'
                                      placeholder='Enter Admin name'
                                      value={values?.adminName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      autoComplete='off'
                                      className={
                                        'form-control' +
                                        (errors?.adminName && touched?.adminName
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {errors?.adminName &&
                                      touched?.adminName && (
                                        <div className='input-feedback'>
                                          {errors?.adminName}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>

                              {/* 1.2 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='adminEmail'
                                  >
                                    Email{' '}
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
                                  <div className='col-md-8'>
                                    <input
                                      name='adminEmail'
                                      type='email'
                                      placeholder='Enter Your Email Address'
                                      value={values?.adminEmail}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      autoComplete='off'
                                      className={
                                        'form-control' +
                                        (errors?.adminEmail &&
                                        touched?.adminEmail
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {errors?.adminEmail &&
                                      touched?.adminEmail && (
                                        <div className='input-feedback'>
                                          {errors?.adminEmail}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />
                            <div className='row'>
                              {/* 2.1 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='employeeId'
                                  >
                                    Employee ID{' '}
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
                                  <div className='col-md-8'>
                                    <input
                                      name='employeeId'
                                      type='string'
                                      placeholder='Enter your Employee ID'
                                      value={values?.employeeId}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      autoComplete='off'
                                      className={
                                        'form-control' +
                                        (errors?.employeeId &&
                                        touched?.employeeId
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {errors?.employeeId &&
                                      touched?.employeeId && (
                                        <div className='input-feedback'>
                                          {errors?.employeeId}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>

                              {/* 2.2 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='nidNo'
                                  >
                                    NID No{' '}
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
                                  <div className='col-md-8'>
                                    <input
                                      name='nidNo'
                                      type='nidNo'
                                      placeholder='Enter your NID Number'
                                      value={values?.nidNo}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      autoComplete='off'
                                      className={
                                        'form-control' +
                                        (errors?.nidNo && touched?.nidNo
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {errors?.nidNo && touched?.nidNo && (
                                      <div className='input-feedback'>
                                        {errors?.nidNo}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />
                            <div className='row'>
                              {/* 3.1 */}

                              {/* 3.2 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='name'
                                  >
                                    Present Address{' '}
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
                                  <div className='col-md-8'>
                                    <textarea
                                      name='adminPresentAddress'
                                      type='string'
                                      placeholder='Enter your Present Address'
                                      value={values?.adminPresentAddress}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      autoComplete='off'
                                      className={
                                        'form-control' +
                                        (errors?.adminPresentAddress &&
                                        touched?.adminPresentAddress
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {errors?.adminPresentAddress &&
                                      touched?.adminPresentAddress && (
                                        <div className='input-feedback'>
                                          {errors?.adminPresentAddress}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='name'
                                  >
                                    Permanent Address{' '}
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
                                  <div className='col-md-8'>
                                    <textarea
                                      name='adminPermanentAddress'
                                      type='string'
                                      placeholder='Enter your Permanent Address'
                                      value={values?.adminPermanentAddress}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      autoComplete='off'
                                      className={
                                        'form-control' +
                                        (errors?.adminPermanentAddress &&
                                        touched?.adminPermanentAddress
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {errors?.adminPermanentAddress &&
                                      touched?.adminPermanentAddress && (
                                        <div className='input-feedback'>
                                          {errors?.adminPermanentAddress}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />
                            <div className='row'>
                              {/* 4.1 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='name'
                                  >
                                    Contact No{' '}
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
                                  <div className='col-md-8'>
                                    <input
                                      name='adminContactNo'
                                      type='string'
                                      placeholder='Enter your conact number'
                                      value={values?.adminContactNo}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      autoComplete='off'
                                      className={
                                        'form-control' +
                                        (errors?.adminContactNo &&
                                        touched?.adminContactNo
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {errors?.adminContactNo &&
                                      touched?.adminContactNo && (
                                        <div className='input-feedback'>
                                          {errors?.adminContactNo}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>

                              {/* 4.2 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <div className='col-md-4'>
                                    <label className='control-label '>
                                      Select Image
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
                                  </div>
                                  <div className='col-md-8'>
                                    <div className=' input-file-container file-area'>
                                      <input
                                        type='file'
                                        accept="image/*"
                                        name='adminImageUrl'
                                        id='my-file'
                                        onChange={(event) => {
                                          //s
                                          const imageFile =
                                            event.target.files[0]
                                          var fileInput = false
                                          if (!imageFile) {
                                            return
                                          }
                                          if (imageFile) {
                                            if (
                                              !imageFile.name.match(
                                                /\.(jpg|jpeg|png|gif|webp)$/
                                              )
                                            ) {
                                              setFieldValue('')
                                              return false
                                            }
                                          } else {
                                            return
                                          }

                                          fileInput = true
                                          if (fileInput) {
                                            try {
                                              Resizer.imageFileResizer(
                                                imageFile,
                                                180,
                                                180,
                                                'JPEG',
                                                100,
                                                0,
                                                (uri) => {
                                                  setFieldValue(
                                                    'adminImageUrl',
                                                    uri
                                                  )
                                                  toast.success(
                                                    'Image Selected.'
                                                  )
                                                },
                                                'base64',
                                                180,
                                                180
                                              )
                                            } catch (err) {
                                              toast.error(
                                                'Something went wrong!'
                                              )
                                            }
                                          }
                                        }}
                                      />
                                      <div
                                        className='file-dummy'
                                        style={{
                                          padding: '15px',
                                        }}
                                      >
                                        <div className=''>
                                          {values?.adminImageUrl.length > 1000
                                            ? 'Image Selected'
                                            : 'Select Image'}
                                        </div>
                                      </div>
                                      {errors?.adminImageUrl &&
                                        touched?.adminImageUrl && (
                                          <div className='input-feedback'>
                                            {errors?.adminImageUrl}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />
                            <div className='row'>
                              {/* DESIGNATION */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='name'
                                  >
                                    Designation{' '}
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
                                  <div className='col-md-8'>
                                    <select
                                      name='designationId'
                                      onChange={handleChange}
                                      className={
                                        'form-control' +
                                        (errors?.designationId &&
                                        touched?.designationId
                                          ? ' is-invalid'
                                          : '')
                                      }
                                      // value={values.topic}
                                    >
                                      <option value=''>
                                        Select Your Designation
                                      </option>
                                      {values?.designation &&
                                        values?.designation.map((design) => (
                                          <option
                                            key={design?.empDesignationId}
                                            value={design?.empDesignationId}
                                          >
                                            {design?.empDesignationName}
                                          </option>
                                        ))}
                                    </select>
                                    {errors?.designationId &&
                                      touched?.designationId && (
                                        <div className='input-feedback'>
                                          {errors?.designationId}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>

                              {/* 3.2 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='name'
                                  >
                                    Date of Birth{' '}
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
                                  <div className='col-md-8'>
                                    <DatePicker
                                      name='dateOfBirth'
                                      value={values?.dateOfBirth}
                                      onChange={setFieldValue}

                                      // className="form-control"
                                    />
                                    {errors?.dateOfBirth &&
                                      touched?.dateOfBirth && (
                                        <div className='input-feedback'>
                                          {errors?.dateOfBirth}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />
                            <div className='row'>
                              {/* 5.1 */}
                              <div className='col-md-6'>
                                <div className='row'>
                                  <div className='col-md-8'>
                                    <div className='form-group'>
                                      <label
                                        className='control-label col-md-6'
                                        htmlFor='genderId'
                                      >
                                        Gender{' '}
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
                                      <div className='col-md-6'>
                                        <label style={{ paddingRight: '10px' }}>
                                          <Field
                                            type='radio'
                                            name='genderId'
                                            value='1'
                                          />{' '}
                                          Male
                                        </label>
                                        <label>
                                          <Field
                                            type='radio'
                                            name='genderId'
                                            value='2'
                                          />{' '}
                                          Female
                                        </label>
                                        {errors?.genderId &&
                                          touched?.genderId && (
                                            <div className='input-feedback'>
                                              {errors?.genderId}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-md-4'></div>
                                </div>
                              </div>

                              {/* 5.2 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label
                                    className='control-label col-md-4'
                                    htmlFor='isActive'
                                  >
                                    Active?
                                  </label>
                                  <div className='col-md-8'>
                                    <input
                                      type='checkbox'
                                      name='isActive'
                                      onChange={handleChange}
                                      checked={values?.isActive}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />
                          </div>
                          <div className='form-actions'>
                            <div className='row'>
                              <div
                                className='col-md-12'
                                style={{
                                  textAlign: 'center',
                                  paddingTop: ' 40px',
                                }}
                              >
                                <div className='row'>
                                  <div className=''>
                                    <button
                                      type='submit'
                                      className='btn btn-success'
                                    >
                                      <i className='fa fa-check'></i> Submit
                                    </button>
                                    <button
                                      type='button'
                                      className='btn btn-default'
                                      onClick={() => resetForm()}
                                    >
                                      Reset
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
export default AddNewAdmin
