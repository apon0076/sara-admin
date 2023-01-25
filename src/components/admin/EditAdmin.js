import React from 'react'
import { Link } from 'react-router-dom'
//import Breadcrumb from "../shared/breadcrumb/Breadcrumb";
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import DatePicker2 from './DatePicker2'
import 'react-datepicker/dist/react-datepicker.css'
import * as Icon from 'react-feather'

const EditAdmin = (props) => {
  const initialValues = {
    adminName: '',
    adminEmail: '',
    adminContactNo: '',
    adminPresentAddress: '',
    adminPermanentAddress: '',
    dateOfBirth: '',
    genderId: '',
    isActive: false,
    adminImageUrl: '',
    employeeId: '',
    nidNo: '',
    designationId: '',
    showWarning: props.showWarning,

    designation: props.designation,
  }
  const savedValues = {
    adminId: props.data.adminId,
    adminName: props.data.adminName,
    adminEmail: props.data.adminEmail,
    adminContactNo: props.data.adminContactNo,
    adminPresentAddress: props.data.adminPresentAddress,
    adminPermanentAddress: props.data.adminPermanentAddress,
    dateOfBirth: props.data.dateOfBirth,
    genderId: props.data.genderId === 1 ? '1' : '2',
    isActive: props.data.isActive === 'Y' ? true : false,
    adminImageUrl: props.data.adminImageUrl,
    employeeId: props.data.employeeId,
    nidNo: props.data.nidNo,
    designationId: props.data.designationId,
    showWarning: props.showWarning,
    designation: props.designation,
  }
  return (
    <Formik
      initialValues={savedValues || initialValues}
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
          .max(250, 'Address is too long - should be 250 chars maximum.')
          .required('Provide present address'),
        adminPermanentAddress: Yup.string()
          .min(2, 'Address is too short - should be 2 chars minimum.')
          .max(250, 'Address is too long - should be 250 chars maximum.')
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
        } = props

        return (
          <form onSubmit={handleSubmit}>
            <div className='page-wrapper'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='panel panel-success'>
                      <div className='panel-heading'>
                        {' '}
                        Update Admin's Information{' '}
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
                                      placeholder='Enter your name'
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
                                      disabled
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
                                    Email Address{' '}
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
                                      placeholder='Enter your email'
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
                                      disabled
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
                                      placeholder='Enter your employee id'
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
                                      placeholder='Enter your nid no'
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
                                      disabled
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
                            <br />
                            <div className='row'>
                              {/* 2.1 */}

                              {/* 2.2 */}
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
                            <br />
                            <div className='row'>
                              {/* 3.1 */}
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
                                      placeholder='Enter your number'
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
                                      disabled
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
                              {/* 3.2 */}
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <div className='col-md-4'>
                                    <label className='control-label '>
                                      Admin Image
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
                                        disabled
                                        // required="required"
                                        // onChange={props.shopLogoUrldHandler}
                                        onChange={(event) => {
                                          //s
                                          const imageFile =
                                            event.target.files[0]
                                          if (imageFile) {
                                            if (
                                              !imageFile.name.match(
                                                /\.(jpg|jpeg|png|gif|webp)$/
                                              )
                                            ) {
                                              return false
                                            }
                                          }
                                          //2)    CHECK THE SIZE OF FILE
                                          let aceptedSize =
                                            imageFile.size / (1 * 1000)
                                          if (aceptedSize > 150) {
                                            values.showWarning(
                                              'Size must be less than 150 kb'
                                            )

                                            return false
                                          }
                                          //3)     CHECK THE HEIGHT AND WIDTH OF THE IMAGE
                                          const reader = new FileReader()
                                          reader.readAsDataURL(imageFile)
                                          reader.addEventListener(
                                            'load',
                                            (event) => {
                                              const _loadedImageUrl =
                                                event.target.result
                                              const image =
                                                document.createElement('img')
                                              image.src = _loadedImageUrl
                                              image.addEventListener(
                                                'load',
                                                () => {
                                                  const { width, height } =
                                                    image
                                                  if (
                                                    width !== 180 ||
                                                    height !== 180
                                                  ) {
                                                    values.showWarning(
                                                      'Size must be of 180 x 180 pixels'
                                                    )

                                                    return false
                                                  } else {
                                                    const reader =
                                                      new FileReader()
                                                    reader.readAsDataURL(
                                                      imageFile
                                                    )
                                                    reader.onload = (e) => {
                                                      setFieldValue(
                                                        'adminImageUrl',
                                                        e.target.result
                                                      )
                                                      values.showWarning(
                                                        'Image Selected.'
                                                      )
                                                    }
                                                  }
                                                }
                                              )
                                            }
                                          )
                                          //e
                                          setFieldValue(
                                            'adminImageUrl',
                                            event.currentTarget.files[0]
                                          )
                                        }}
                                      />
                                      <div
                                        className='file-dummy'
                                        style={{
                                          padding: '15px',
                                          //width: "230px",
                                        }}
                                      >
                                        <div className='success'>
                                          {props?.adminImageUrl}
                                        </div>
                                        <div className='default'>
                                          Please Upload Profile Image
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
                                      value={values?.designationId}
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
                                {' '}
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
                                    <DatePicker2
                                      name='dateOfBirth'
                                      value={values?.dateOfBirth}
                                      onChange={setFieldValue}
                                      disabled
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
                            <br />
                            <div className='row'>
                              <div className='col-md-6'>
                                {/* 4.1 */}
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
                                            disabled
                                          />{' '}
                                          Male
                                        </label>
                                        <label>
                                          <Field
                                            type='radio'
                                            name='genderId'
                                            value='2'
                                            disabled
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
                              {/* 4.2 */}
                              <div className='col-md-6'>
                                {' '}
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
                                      <i className='fa fa-check'></i> Update
                                    </button>
                                    <Link to='/AdminList'>
                                      <button
                                        type='button'
                                        className='btn btn-default'
                                        onClick={props.goBack}
                                      >
                                        Cancel
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6'> </div>
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
export default EditAdmin
