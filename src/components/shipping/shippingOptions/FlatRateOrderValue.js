import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { RHFInput } from 'react-hook-form-input'
import Select from 'react-select'
import { Dropdown } from 'primereact/dropdown'

const FlatRateOrderValue = (props) => {
  const { shippingCostData } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onChange' })

  return (
    <div
      className='row'
      style={{
        display:
          shippingCostData.flatRateSelected === false &&
          shippingCostData.orderValueSelected === false
            ? 'none'
            : shippingCostData.flatRateSelected &&
              shippingCostData.orderValueSelected
            ? 'block'
            : 'none',
      }}
    >
      <div className='panel-wrapper collapse in' aria-expanded='true'>
        <div className='panel-body'>
          <form className='form-horizontal'>
            <div className='form-body'>
              <Row style={{ marginTop: '5px' }}>
                <Col xs={12} md={4}>
                  <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <RHFInput
                      as={<Select options={shippingCostData.regions} />}
                      rules={{ required: true }}
                      name='country'
                      onChange={shippingCostData.handleCountryChange}
                      getOptionLabel={(x) => x.countryName}
                      getOptionValue={(x) => x.countryId}
                      className={errors.country && 'border-danger'}
                      register={() =>
                        register('country', {
                          required: true,
                        })
                      }
                      setValue={setValue}
                    />
                    {errors.country && (
                      <span className='text-danger'>
                        {errors.country.type === 'required' &&
                          'Please give country'}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <RHFInput
                      as={<Select options={shippingCostData.cityList} />}
                      rules={{ required: true }}
                      name='city'
                      onChange={shippingCostData.handleCityChange}
                      getOptionLabel={(x) => x.cityName}
                      getOptionValue={(x) => x.cityId}
                      className={errors.city && 'border-danger'}
                      register={() =>
                        register('city', {
                          required: true,
                        })
                      }
                      setValue={setValue}
                    />
                    {errors.city && (
                      <span className='text-danger'>
                        {errors.city.type === 'required' && 'Please give city'}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId='area'>
                    <Form.Label>Area</Form.Label>
                    <RHFInput
                      as={<Select options={shippingCostData.areaList} />}
                      rules={{ required: true }}
                      name='area'
                      onChange={shippingCostData.handleAreaChange}
                      getOptionLabel={(x) => x.areaName}
                      getOptionValue={(x) => x.areaId}
                      className={errors.area && 'border-danger'}
                      register={() =>
                        register('area', {
                          required: true,
                        })
                      }
                      setValue={setValue}
                    />
                    {errors.area && (
                      <span className='text-danger'>
                        {errors.area.type === 'required' && 'Please give area'}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className='row'>
                {/* <div className='col-md-4 col-sm-12'>
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
                        options={shippingCostData.units}
                        filter
                        showClear
                        filterBy='unitName'
                        placeholder='Select Product Quantity Unit*'
                        name='unitName'
                        value={shippingCostData.unitName}
                        onChange={shippingCostData.handleChange}
                        className={
                            shippingCostData.errorUnitName.length !== 0
                              ? "errorClass form-control"
                              : "form-control" && "form-control"
                          }
                      />
                      {shippingCostData.errorUnitName && (
                        <span className='error'>{shippingCostData.errorUnitName}</span>
                      )}
                    </div>
                  </div>
                </div> */}

                <div className='col-sm-12 col-md-6'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Min Amount{' '}
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
                      placeholder='Min Amount'
                      name='minValue'
                      value={shippingCostData.minValue}
                      onChange={shippingCostData.handleChange}
                      className={
                        shippingCostData.errorMinValue.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                    />
                    {shippingCostData.errorMinValue && (
                      <span className='error'>
                        {shippingCostData.errorMinValue}
                      </span>
                    )}
                  </div>
                </div>

                <div className='col-sm-12 col-md-6'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Max Amount{' '}
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
                      placeholder='Min Amount'
                      name='maxValue'
                      value={shippingCostData.maxValue}
                      onChange={shippingCostData.handleChange}
                      className={
                        shippingCostData.errorMaxValue.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                    />
                    {shippingCostData.errorMaxValue && (
                      <span className='error'>
                        {shippingCostData.errorMaxValue}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-12 col-md-6'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Actual Cost{' '}
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
                      placeholder='Actual'
                      name='actualCost'
                      value={shippingCostData.actualCost}
                      onChange={shippingCostData.handleChange}
                      className={
                        shippingCostData.errorActualCost.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                    />
                    {shippingCostData.errorActualCost && (
                      <span className='error'>
                        {shippingCostData.errorActualCost}
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-sm-12 col-md-6'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Shipping Cost{' '}
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
                      placeholder='Shipping Cost'
                      name='shippingTotalCost'
                      value={shippingCostData.shippingTotalCost}
                      onChange={shippingCostData.handleChange}
                      defaultValue='0'
                      className={
                        shippingCostData.errorShippingTotalCost.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                    />
                    {shippingCostData.errorShippingTotalCost && (
                      <span className='error'>
                        {shippingCostData.errorShippingTotalCost}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-12 col-sm-12'>
                  <div className='form-group'>
                    <label className='control_label'>Active </label>
                    <div className='checkbox checkbox-success'>
                      <input
                        id='isActive'
                        type='checkbox'
                        name='isActive'
                        checked={shippingCostData.isActive}
                        onChange={shippingCostData.handleParentCheck}
                      />
                      <label htmlFor='isActive'> &nbsp;Yes </label>
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
                        onClick={shippingCostData.saveShippingCostOrderValue}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FlatRateOrderValue
