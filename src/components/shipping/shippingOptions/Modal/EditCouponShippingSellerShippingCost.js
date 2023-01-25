import React, { useEffect, useState, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { Toast } from 'primereact/toast'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { RHFInput } from 'react-hook-form-input'
import { DatePicker } from 'antd'
import moment from 'moment'

export default function EditCouponShippingSellerShippingCost(props) {
  const { data, allCountries, updateShippingCost } = props

  const [shippingCostId, setShippingCostId] = useState()
  const [shippingTypeId, setShippingTypeId] = useState()
  const [typeName, setTypeName] = useState()
  const [shippingOptionsId, setsShippingOptionsId] = useState()
  const [optionName, setsOptionName] = useState()
  const [countryId, setCountryId] = useState()
  const [countryName, setCountryName] = useState()
  const [defaultCountry, setDefaultCountry] = useState([])
  const [cityId, setCityId] = useState()
  const [cityName, setCityName] = useState()
  const [defaultCity, setDefaultCity] = useState([])
  const [cityList, setCityList] = useState([])
  const [areaId, setAreaId] = useState()
  const [areaName, setAreaName] = useState()
  const [defaultArea, setDefaultArea] = useState([])
  const [areaList, setAreaList] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [voucherNo, setVoucherNo] = useState()

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

  const [actualCost, setActualCost] = useState()
  const [shippingTotalCost, setShippingTotalCost] = useState()
  const [isActive, setIsActive] = useState()

  const [errorShippingTotalCost, setErrorShippingTotalCost] = useState('')

  const [sellerId, setSellerId] = useState()

  const toast = useRef(null)

  useEffect(() => {
    setShippingCostId(data.shippingCostId)
    setShippingTypeId(data.shippingTypeId)
    setTypeName(data.typeName)
    setsShippingOptionsId(data.shippingOptionsId)
    setsOptionName(data.optionName)
    setCountryId(data.countryId)
    setCountryName(data.countryName)
    setCityId(data.cityId)
    setCityName(data.cityName)
    setAreaId(data.areaId)
    setAreaName(data.areaName)
    setVoucherNo(data.voucherNo)
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setRateCharge(data.rateCharge)
    setCustomDutiesChargePer(data.customDutiesChargePer)
    setTax(data.tax)
    setVat(data.vat)
    setAit(data.ait)
    setFuelSurchargePer(data.fuelSurchargePer)
    setOtherCostValue(data.otherCost)
    setActualCost(data.actualCost)
    setShippingTotalCost(data.shippingTotalCost)
    setIsActive(data.isActive === 'Y' ? true : false)
    setSellerId(data.sellerId)
    setDefaultCountry([
      {
        countryId: data.countryId,
        countryName: data.countryName,
      },
    ])
    setDefaultCity([
      {
        cityId: data.cityId,
        cityName: data.cityName,
      },
    ])
    setDefaultArea([
      {
        areaId: data.areaId,
        areaName: data.areaName,
      },
    ])
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
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100) +
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
        setTaxAmount(parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100))
        setActualCost(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100) +
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
        setVatAmount(parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100))
        setActualCost(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100) +
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
        setAitAmount(parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100))
        setActualCost(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100) +
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
        setFuelSurchargePerAmount(parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100))
        setActualCost(
          parseFloat((rateCharge * (target.value < 0 ? 0 : target.value)) / 100) +
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
            parseFloat((target.value < 0 ? 0 : target.value) || 0)
        )
        break
      default:
    }
  }

  const handleCountryChange = (e) => {
    setDefaultCountry(e)
    setCountryId(e.countryId)
    setCityList(e.cities)
    setDefaultCity(null)
    setDefaultArea(null)
  }

  const handleCityChange = (e) => {
    setDefaultCity(e)
    setCityId(e.cityId)
    setAreaList(e.areas)
    setDefaultArea(null)
  }

  const handleAreaChange = (e) => {
    setDefaultArea(e)
    setAreaId(e.areaId)
    setAreaName(e.areaName)
  }

  const handleStartDate = (date, dateString) => {
    setStartDate(dateString)
  }

  const handleEndDate = (date, dateString) => {
    setEndDate(dateString)
  }

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onChange' })

  const updateShippingCostCouponShippingSellerShippingCost = async (e) => {
    e.preventDefault()

    if (actualCost === '') {
      let msg = 'Actual Cost Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (shippingTotalCost === '') {
      let msg = 'Shipping Total Cost Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (voucherNo === '') {
      let msg = 'Voucher No. Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      shippingCostId: shippingCostId,
      shippingTypeId: shippingTypeId,
      shippingOptionsId: shippingOptionsId,
      countryId: countryId,
      cityId: cityId,
      areaId: areaId,
      areaName: areaName,
      voucherNo: voucherNo,
      startDate: startDate,
      endDate: endDate,

      sellerId: sellerId,
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

    updateShippingCost(data)
  }

  return (
    <div>
      <Toast ref={toast}></Toast>
      <form className='form-horizontal'>
        <div className='form-body'>
          <Row>
            <Col xs={12} md={6}>
              <div className='form-group'>
                <label className='control_label'>
                  Shipping Type Name{' '}
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
                  placeholder='Shipping Type'
                  name='typeName'
                  value={typeName}
                  className='form-control'
                  readOnly
                />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className='form-group'>
                <label className='control_label'>
                  Shipping Option{' '}
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
                  placeholder='Shipping Option'
                  name='optionName'
                  value={optionName}
                  className='form-control'
                  readOnly
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={4}>
              <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <RHFInput
                  as={<Select options={allCountries} isDisabled={true} />}
                  rules={{ required: true }}
                  name='country'
                  value={defaultCountry}
                  onChange={handleCountryChange}
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
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <RHFInput
                  as={<Select options={cityList} isDisabled={true}/>}
                  rules={{ required: true }}
                  name='city'
                  value={defaultCity}
                  onChange={handleCityChange}
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
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId='area'>
                <Form.Label>Area</Form.Label>
                <RHFInput
                  as={<Select options={areaList} isDisabled={true}/>}
                  rules={{ required: true }}
                  name='area'
                  value={defaultArea}
                  onChange={handleAreaChange}
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
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={4}>
              <div className='form-group'>
                <label className='control_label'>
                  Coupon/Voucher{' '}
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
                  placeholder='Coupon/Voucher'
                  name='voucherNo'
                  value={voucherNo}
                  onChange={(e) => setVoucherNo(e.target.value)}
                  className='form-control'
                />
              </div>
            </Col>

            <div className='col-sm-12 col-md-4'>
              <label className='control_label'>
                Start Date & Time{' '}
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
              <DatePicker
                showTime
                use12Hours={true}
                format='YYYY-MM-DD HH:mm'
                className='form-control'
                placeholder='Select Start Date & Time'
                value={moment(startDate)}
                onChange={(date, dateString) =>
                  handleStartDate(date, dateString, 1)
                }
              />
            </div>

            <div className='col-sm-12 col-md-4'>
              <label className='control_label'>
                End Date & Time{' '}
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
              <DatePicker
                showTime
                use12Hours={true}
                format='YYYY-MM-DD HH:mm'
                className='form-control'
                placeholder='Select End Date & Time'
                value={moment(endDate)}
                onChange={(date, dateString) =>
                  handleEndDate(date, dateString, 2)
                }
              />
            </div>
          </Row>

          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <div className='form-group'>
                <label className='control_label'>
                  Seller Name{' '}
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
                  type='test'
                  placeholder='Seller Name'
                  name='sellerName'
                  value={data.sellerName}
                  className={'form-control' && 'form-control'}
                  readOnly
                />
              </div>
            </div>

            <div className='col-sm-12 col-md-12'>
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
                />
                {errorRateCharge && (
                  <span className='error'>{errorRateCharge}</span>
                )}
              </div>
            </div>
          </div>

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
                <label className='control_label'>Fuel Surcharge (%)</label>
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
                <label className='control_label'>Other Cost Amount</label>
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
                  placeholder='Actual'
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
                  placeholder='Shipping Cost'
                  name='shippingTotalCost'
                  value={shippingTotalCost}
                  onChange={(e) => setShippingTotalCost(e.target.value < 0 ? 0 : e.target.value)}
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

          <Row>
            <Col xs={12} md={12}>
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
            </Col>
          </Row>

          <div className='form-footer '>
            <div className='form-group row'>
              <div className='text-center'>
                <div className='btn-group text-center'>
                  <button
                    type='submit'
                    className='btn btn-success'
                    onClick={updateShippingCostCouponShippingSellerShippingCost}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
