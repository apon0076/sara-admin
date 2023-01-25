import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { RHFInput } from 'react-hook-form-input'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCityRecord,
  getAllAreaRecord,
} from '../../../store/actions/addressAction'
import { toast } from 'react-toastify'
import Creatable from 'react-select/creatable'

const FlatRateOrderWeight = (props) => {
  const { shippingCostData } = props

  const [country, setCountry] = useState([])
  const [countryId, setCountryId] = useState('')
  const [countryList, setCountryList] = useState([])
  const [city, setCity] = useState([])
  const [cityId, setCityId] = useState('')
  const [cityList, setCityList] = useState([])
  const [area, setArea] = useState([])
  const [areaId, setAreaId] = useState('')
  const [areaName, setAreaName] = useState('')
  const [areaList, setAreaList] = useState([])

  const [unitId, setUnitId] = useState('')
  const [unitName, setUnitName] = useState('')

  const [minValue, setMinValue] = useState(0)
  const [errorMinValue, setErrorMinValue] = useState('')
  const [maxValue, setMaxValue] = useState(0)
  const [errorMaxValue, setErrorMaxValue] = useState('')

  const [rateCharge, setRateCharge] = useState(0)
  const [errorRateCharge, setErrorRateCharge] = useState('')
  const [customDutiesChargePer, setCustomDutiesChargePer] = useState(0)
  const [customDutiesChargePerAmount, setCustomDutiesChargePerAmount] =
    useState(0)
  const [tax, setTax] = useState(0)
  const [taxAmount, setTaxAmount] = useState(0)
  const [vat, setVat] = useState(0)
  const [vatAmount, setVatAmount] = useState(0)
  const [ait, setAit] = useState(0)
  const [aitAmount, setAitAmount] = useState(0)
  const [fuelSurchargePer, setFuelSurchargePer] = useState(0)
  const [fuelSurchargePerAmount, setFuelSurchargePerAmount] = useState(0)
  const [otherCostValue, setOtherCostValue] = useState(0)
  const [actualCost, setActualCost] = useState(0)
  const [shippingTotalCost, setShippingTotalCost] = useState(0)
  const [errorShippingTotalCost, setErrorShippingTotalCost] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [otherCost, setOtherCost] = useState(null)

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onChange' })

  useEffect(() => {
    setCountryList(
      shippingCostData.allCountries.map(
        ({ countryName: label, countryId: value }) => ({
          label,
          value,
        })
      )
    )
  }, [props])

  const handleChange = (e) => {
    const { target } = e

    switch (target.name) {
      case 'rateCharge':
        setRateCharge(target.value <= 0 ? 0 : target.value)
        setErrorRateCharge(target.value <= 0 ? 'Enter Rate Charge' : '')
        setActualCost(
          parseFloat(target.value < 0 ? 0 : target.value || 0) +
            parseFloat(customDutiesChargePerAmount) +
            parseFloat(taxAmount) +
            parseFloat(vatAmount) +
            parseFloat(aitAmount) +
            parseFloat(fuelSurchargePerAmount) +
            parseFloat(otherCostValue || 0)
        )
        break
      case 'customDutiesChargePer':
        setCustomDutiesChargePer(target.value <= 0 ? 0 : target.value)
        setCustomDutiesChargePerAmount(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100)
        )
        setActualCost(
          parseFloat(
            (rateCharge * (target.value < 0 ? 0 : target.value)) / 100
          ) +
            parseFloat(rateCharge || 0) +
            parseFloat(taxAmount) +
            parseFloat(vatAmount) +
            parseFloat(aitAmount) +
            parseFloat(fuelSurchargePerAmount) +
            parseFloat(otherCostValue || 0)
        )
        break
      case 'tax':
        setTax(target.value <= 0 ? 0 : target.value)
        setTaxAmount(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100)
        )
        setActualCost(
          parseFloat(
            (rateCharge * (target.value < 0 ? 0 : target.value)) / 100
          ) +
            parseFloat(rateCharge || 0) +
            parseFloat(customDutiesChargePerAmount) +
            parseFloat(vatAmount) +
            parseFloat(aitAmount) +
            parseFloat(fuelSurchargePerAmount) +
            parseFloat(otherCostValue || 0)
        )
        break
      case 'vat':
        setVat(target.value <= 0 ? 0 : target.value)
        setVatAmount(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100)
        )
        setActualCost(
          parseFloat(
            (rateCharge * (target.value < 0 ? 0 : target.value)) / 100
          ) +
            parseFloat(rateCharge || 0) +
            parseFloat(customDutiesChargePerAmount) +
            parseFloat(taxAmount) +
            parseFloat(aitAmount) +
            parseFloat(fuelSurchargePerAmount) +
            parseFloat(otherCostValue || 0)
        )
        break
      case 'ait':
        setAit(target.value <= 0 ? 0 : target.value)
        setAitAmount(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100)
        )
        setActualCost(
          parseFloat(
            (rateCharge * (target.value < 0 ? 0 : target.value)) / 100
          ) +
            parseFloat(rateCharge || 0) +
            parseFloat(customDutiesChargePerAmount) +
            parseFloat(vatAmount) +
            parseFloat(taxAmount) +
            parseFloat(fuelSurchargePerAmount) +
            parseFloat(otherCostValue || 0)
        )
        break
      case 'fuelSurchargePer':
        setFuelSurchargePer(target.value <= 0 ? 0 : target.value)
        setFuelSurchargePerAmount(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100)
        )
        setActualCost(
          parseFloat(
            (rateCharge * (target.value < 0 ? 0 : target.value)) / 100
          ) +
            parseFloat(rateCharge || 0) +
            parseFloat(customDutiesChargePerAmount) +
            parseFloat(vatAmount) +
            parseFloat(aitAmount) +
            parseFloat(taxAmount) +
            parseFloat(otherCostValue || 0)
        )
        break
      case 'otherCostValue':
        setOtherCostValue(target.value <= 0 ? 0 : target.value)
        setActualCost(
          parseFloat(rateCharge || 0) +
            parseFloat(customDutiesChargePerAmount) +
            parseFloat(taxAmount) +
            parseFloat(vatAmount) +
            parseFloat(aitAmount) +
            parseFloat(fuelSurchargePerAmount) +
            parseFloat(target.value < 0 ? 0 : target.value || 0)
        )
        break
      case 'minValue':
        setMinValue(target.value <= 0 ? 0 : target.value)
        break

      case 'maxValue':
        setMaxValue(target.value <= 0 ? 0 : target.value)
        break

      default:
    }
  }

  const handleOtherCostCheck = (e) => {
    if (rateCharge === 0 || rateCharge === '') {
      let msg = 'Rate Charge should not be 0 !!'
      toast.error(msg)
      setOtherCost(!e.target.checked)
      setTimeout(() => {}, 3000)
      return
    }

    setOtherCost(e.target.checked)
    setCustomDutiesChargePer(0)
    setTax(0)
    setVat(0)
    setAit(0)
    setFuelSurchargePer(0)
    setOtherCostValue(0)
    setActualCost(rateCharge)
  }

  const dispatch = useDispatch()

  const {
    allCities,
    loading: cityLoading,
    loaded: cityLoaded,
  } = useSelector((state) => state.addressReducer)
  const {
    allAreas,
    loading: areaLoading,
    loaded: areaLoaded,
  } = useSelector((state) => state.addressReducer)

  useEffect(() => {
    cityLoaded &&
      setCityList(
        allCities.map(({ cityName: label, cityId: value }) => ({
          label,
          value,
        }))
      )
  }, [cityLoaded])

  useEffect(() => {
    areaLoaded &&
      setAreaList(
        allAreas.map(({ areaName: label, areaId: value }) => ({
          label,
          value,
        }))
      )
  }, [areaLoaded])

  const handleAddressChange = (field, e) => {
    switch (field) {
      case 'countryList':
        setCountry(e)
        dispatch(getAllCityRecord(e.value))
        setCountryId(e.value)
        break

      case 'cityList':
        setCity(e)
        dispatch(getAllAreaRecord(e.value))
        setCityId(e.value)
        break

      case 'areaList':
        setArea(e)
        setAreaId(e.value)
        setAreaName(e.label)
        break

      default:
        break
    }
  }

  const handleUnitChange = (e) => {
    setUnitId(e.unitId)
    setUnitName(e.unitName)
  }

  const createShippingCostFlateRateOrderWeight = async (e) => {
    e.preventDefault()

    if (countryId === '') {
      let msg = 'Country Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (unitId === '') {
      let msg = 'Unit Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (minValue === 0) {
      let msg = 'Minimum Value Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (maxValue === 0) {
      let msg = 'Maximum Value Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (rateCharge === 0) {
      let msg = 'Rate Charge Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (shippingTotalCost === 0) {
      let msg = 'Shipping Cost Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      shippingCostId: shippingCostData.shippingCostId,
      shippingTypeId: shippingCostData.shippingTypeId,
      shippingOptionsId: shippingCostData.shippingOptionsId,
      countryId: countryId,
      cityId: cityId,
      areaId: typeof areaId === 'string' ? 0 : areaId,
      areaName: areaName,

      unitId: unitId,
      minValue: minValue,
      maxValue: maxValue,

      rateCharge: rateCharge,
      customDutiesChargePer: customDutiesChargePer,
      tax: tax,
      vat: vat,
      ait: ait,
      fuelSurchargePer: fuelSurchargePer,
      otherCost: otherCostValue,
      actualCost: actualCost,
      shippingTotalCost: shippingTotalCost,
      isActive: isActive === true ? 'Y' : 'N',
    }

    let finalData = {
      shippingCosts: [data],
    }
    shippingCostData.saveShippingCost(finalData)
  }

  return (
    <div
      className='row'
      style={{
        display:
          shippingCostData.flatRateSelected === false &&
          shippingCostData.orderWeightSelected === false
            ? 'none'
            : shippingCostData.flatRateSelected &&
              shippingCostData.orderWeightSelected
            ? 'block'
            : 'none',
      }}
    >
      <div className='panel-wrapper collapse in' aria-expanded='true'>
        <div className='panel-body'>
          <form className='form-horizontal'>
            <div className='form-body'>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Group controlId='country'>
                    <Form.Label>
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
                    </Form.Label>
                    <Select
                      placeholder='Select Country Name'
                      options={countryList}
                      name='country'
                      value={country}
                      onChange={(value) =>
                        handleAddressChange('countryList', value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId='city'>
                    <Form.Label>
                      City
                    </Form.Label>
                    <Select
                      placeholder='Select City Name'
                      options={cityList}
                      name='city'
                      value={city}
                      onChange={(value) =>
                        handleAddressChange('cityList', value)
                      }
                      isLoading={cityLoading}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId='area'>
                    <Form.Label>
                      Area
                    </Form.Label>
                    <Creatable
                      placeholder='Select or Create Area Name'
                      options={areaList}
                      name='area'
                      value={area}
                      onChange={(value) =>
                        handleAddressChange('areaList', value)
                      }
                      isLoading={areaLoading}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className='row'>
                <Col xs={12} md={4}>
                  <Form.Group controlId='unitName'>
                    <Form.Label>
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
                    </Form.Label>
                    <RHFInput
                      as={<Select options={shippingCostData.units} />}
                      placeholder='Select Unit Name'
                      rules={{ required: true }}
                      name='unitName'
                      onChange={handleUnitChange}
                      getOptionLabel={(x) => x.unitName}
                      getOptionValue={(x) => x.unitId}
                      className={errors.unitName && 'border-danger'}
                      register={() =>
                        register('unitName', {
                          required: true,
                        })
                      }
                      setValue={setValue}
                    />
                    {errors.unitName && (
                      <span className='text-danger'>
                        {errors.unitName.type === 'required' &&
                          'Please select unit'}
                      </span>
                    )}
                  </Form.Group>
                </Col>

                <div className='col-sm-12 col-md-4'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Minimum Value{' '}
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
                      placeholder='Min Value'
                      name='minValue'
                      value={minValue}
                      onChange={handleChange}
                      className={
                        errorMinValue.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                    />
                    {errorMinValue && (
                      <span className='error'>{errorMinValue}</span>
                    )}
                  </div>
                </div>

                <div className='col-sm-12 col-md-4'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Maximum Value{' '}
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
                      placeholder='Max Value'
                      name='maxValue'
                      value={maxValue}
                      onChange={handleChange}
                      className={
                        errorMaxValue.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                    />
                    {errorMaxValue && (
                      <span className='error'>{errorMaxValue}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-12 col-md-6'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Rate Charge{' '}
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
                      placeholder='Rate Charge'
                      name='rateCharge'
                      value={rateCharge}
                      onChange={handleChange}
                      className={
                        errorRateCharge.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                      readOnly={otherCost ? true : false}
                    />
                    {errorRateCharge && (
                      <span className='error'>{errorRateCharge}</span>
                    )}
                  </div>
                </div>

                <div className='col-md-6 col-sm-12'>
                  <div className='form-group'>
                    <label className='control_label'>
                      Other Shipping Cost{' '}
                    </label>
                    <div className='checkbox checkbox-success'>
                      <input
                        id='otherCost'
                        type='checkbox'
                        name='otherCost'
                        checked={otherCost}
                        onChange={handleOtherCostCheck}
                      />
                      <label htmlFor='otherCost'> &nbsp;Yes</label>
                    </div>
                  </div>
                </div>
              </div>

              {otherCost && (
                <>
                  <div className='row'>
                    <div className='col-sm-12 col-md-4'>
                      <div className='form-group'>
                        <label className='control_label'>
                          Customs Duties Charge (%)
                        </label>
                        <input
                          type='number'
                          placeholder='Customs Duties Charge (%)'
                          name='customDutiesChargePer'
                          value={customDutiesChargePer}
                          onChange={handleChange}
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>
                      <div className='form-group'>
                        <label className='control_label'>Tax (%)</label>
                        <input
                          type='number'
                          placeholder='Tax (%)'
                          name='tax'
                          value={tax}
                          onChange={handleChange}
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>
                      <div className='form-group'>
                        <label className='control_label'>VAT (%)</label>
                        <input
                          type='number'
                          placeholder='VAT (%)'
                          name='vat'
                          value={vat}
                          onChange={handleChange}
                          className='form-control'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-12 col-md-4'>
                      <div className='form-group'>
                        <label className='control_label'>AIT (%)</label>
                        <input
                          type='number'
                          placeholder='AIT (%)'
                          name='ait'
                          value={ait}
                          onChange={handleChange}
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>
                      <div className='form-group'>
                        <label className='control_label'>
                          Fuel Surcharge (%)
                        </label>
                        <input
                          type='number'
                          placeholder='Fuel Surcharge (%)'
                          name='fuelSurchargePer'
                          value={fuelSurchargePer}
                          onChange={handleChange}
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>
                      <div className='form-group'>
                        <label className='control_label'>
                          Other Cost Amount
                        </label>
                        <input
                          type='number'
                          placeholder='Other Cost Amount'
                          name='otherCostValue'
                          value={otherCostValue}
                          onChange={handleChange}
                          className='form-control'
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

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
                      type='number'
                      placeholder='Enter Actual Cost'
                      name='actualCost'
                      value={actualCost}
                      className='form-control'
                      readOnly
                    />
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
                      type='number'
                      placeholder='Enter Shipping Cost'
                      name='shippingTotalCost'
                      value={shippingTotalCost}
                      onChange={(e) =>
                        setShippingTotalCost(
                          e.target.value < 0 ? 0 : e.target.value
                        )
                      }
                      className={
                        errorShippingTotalCost.length !== 0
                          ? 'errorClass form-control'
                          : 'form-control' && 'form-control'
                      }
                    />
                    {errorShippingTotalCost && (
                      <span className='error'>{errorShippingTotalCost}</span>
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
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
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
                        onClick={createShippingCostFlateRateOrderWeight}
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

export default FlatRateOrderWeight
