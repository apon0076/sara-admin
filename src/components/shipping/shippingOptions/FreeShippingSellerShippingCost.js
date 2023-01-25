import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCityRecord,
  getAllAreaRecord,
} from '../../../store/actions/addressAction'
import { toast } from 'react-toastify'
import Creatable from 'react-select/creatable'

const FreeShippingSellerShippingCost = (props) => {
  const { shippingCostData } = props

  const [selectedSellers, setSelectedSellers] = useState([])
  const [allSellers, setAllSellers] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null)

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

  const [rateCharge, setRateCharge] = useState(0)
  const [shippingTotalCost, setShippingTotalCost] = useState(0)
  const [isActive, setIsActive] = useState(true)

  const getSellers =
    shippingCostData &&
    shippingCostData.sellers.length > 0 &&
    shippingCostData.sellers.map((obj) => ({
      sellerId: obj.sellerId,
      sellerName: obj.sellerName,
      rateCharge: 0,
      customDutiesChargePer: 0,
      tax: 0,
      vat: 0,
      ait: 0,
      fuelSurchargePer: 0,
      otherCost: 0,
      actualCost: 0,
      shippingTotalCost: 0,
    }))

  useEffect(() => {
    if (getSellers.length > 0) {
      setAllSellers(getSellers)
    }
  }, [getSellers.length > 0])

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

  const header = (
    <div className='table-header'>
      <h5 className='p-mx-0 p-my-1'>Seller Lists</h5>
      <span className='p-input-icon-left'>
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Search Seller'
        />
      </span>
    </div>
  )

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
        setArea('')
        break

      case 'cityList':
        setCity(e)
        dispatch(getAllAreaRecord(e.value))
        setCityId(e.value)
        setArea('')
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

  const onIndexTemplate = (data, props) => {
    return props.rowIndex + 1
  }

  const textEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
      />
    )
  }

  const rateChargeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Rate Charge</span>
        {rowData.rateCharge ? rowData.rateCharge : 0}
      </React.Fragment>
    )
  }

  const customDutiesChargePerBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Custom Duties (%)</span>
        {rowData.customDutiesChargePer ? rowData.customDutiesChargePer : 0}
      </React.Fragment>
    )
  }

  const taxBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>TAX (%)</span>
        {rowData.tax ? rowData.tax : 0}
      </React.Fragment>
    )
  }

  const vatBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>VAT (%)</span>
        {rowData.vat ? rowData.vat : 0}
      </React.Fragment>
    )
  }

  const aitBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>AIT (%)</span>
        {rowData.ait ? rowData.ait : 0}
      </React.Fragment>
    )
  }

  const fuelSurchargePerBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Fuel Surcharge (%)</span>
        {rowData.fuelSurchargePer ? rowData.fuelSurchargePer : 0}
      </React.Fragment>
    )
  }

  const otherCostBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Other Cost</span>
        {rowData.otherCost ? rowData.otherCost : 0}
      </React.Fragment>
    )
  }

  const actualCostBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Actual Cost</span>
        {rowData.rateCharge +
          (rowData.rateCharge * rowData.customDutiesChargePer) / 100 +
          (rowData.rateCharge * rowData.tax) / 100 +
          (rowData.rateCharge * rowData.vat) / 100 +
          (rowData.rateCharge * rowData.ait) / 100 +
          (rowData.rateCharge * rowData.fuelSurchargePer) / 100 +
          rowData.otherCost}
      </React.Fragment>
    )
  }

  const shippingCostBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Shipping Cost</span>
        {rowData.shippingTotalCost ? rowData.shippingTotalCost : 0}
      </React.Fragment>
    )
  }

  const onCategoryRowEditComplete = (e) => {
    let _selectedSellers = [...selectedSellers]
    let { newData, index } = e
    _selectedSellers[index] = newData
    setSelectedSellers(_selectedSellers)
    shippingCostData.getSellerShippingCostHandler(_selectedSellers)
  }

  const saveShippingCostFreeShippingSellerShippingCost = async (e) => {
    e.preventDefault()

    if (countryId === '') {
      let msg = 'Country Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = []

    selectedSellers.forEach((item) => {
      data.push({
        shippingCostId: shippingCostData.shippingCostId,
        shippingTypeId: shippingCostData.shippingTypeId,
        shippingOptionsId: shippingCostData.shippingOptionsId,
        countryId: countryId,
        cityId: cityId,
        areaId: typeof areaId === 'string' ? 0 : areaId,
        areaName: areaName,

        sellerId: item.sellerId,

        rateCharge: item.rateCharge,
        customDutiesChargePer: item.customDutiesChargePer,
        tax: item.tax,
        vat: item.vat,
        ait: item.ait,
        fuelSurchargePer: item.fuelSurchargePer,
        actualCost:
          item.rateCharge +
          (item.rateCharge * item.customDutiesChargePer) / 100 +
          (item.rateCharge * item.tax) / 100 +
          (item.rateCharge * item.vat) / 100 +
          (item.rateCharge * item.ait) / 100 +
          (item.rateCharge * item.fuelSurchargePer) / 100 +
          item.otherCost,
        shippingTotalCost: item.shippingTotalCost,
        otherCost: item.otherCost,
        isActive: isActive === true ? 'Y' : 'N',
      })
    })

    let finalData = {
      shippingCosts: [...data],
    }

    shippingCostData.saveShippingCost(finalData)
  }

  return (
    <div
      style={{
        display:
          shippingCostData.freeShippingSelected === false &&
          shippingCostData.sellerShippingCostSelected === false
            ? 'none'
            : shippingCostData.freeShippingSelected &&
              shippingCostData.sellerShippingCostSelected
            ? 'block'
            : 'none',
      }}
    >
      <div className='row'>
        <div className='panel-wrapper collapse in' aria-expanded='true'>
          <div className='panel-body'>
            <form className='form-horizontal'>
              <div className='form-body'>
                <div className='row'>
                  <div className='col-sm-12 col-md-5'>
                    <div className='datatable-crud-demo'>
                      <div className='card'>
                        <DataTable
                          value={allSellers}
                          selection={selectedSellers}
                          onSelectionChange={(e) => setSelectedSellers(e.value)}
                          dataKey='sellerId'
                          header={header}
                          paginator
                          rows={5}
                          rowsPerPageOptions={[5, 10, 25]}
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          globalFilter={globalFilter}
                          responsiveLayout='scroll'
                        >
                          <Column selectionMode='multiple' exportable={false} />
                          <Column field='sellerName' header='Seller' sortable />
                        </DataTable>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-7'>
                    <Row>
                      <Col xs={12} md={12}>
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
                      <Col xs={12} md={12}>
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
                      <Col xs={12} md={12}>
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
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-12 col-md-12'>
                  <div className='datatable-editing-demo'>
                    <div className='card p-fluid'>
                      <DataTable
                        value={selectedSellers}
                        editMode='row'
                        dataKey='sellerId'
                        onRowEditComplete={onCategoryRowEditComplete}
                        responsiveLayout='scroll'
                        emptyMessage='No Seller selected'
                      >
                        <Column
                          field='Index'
                          header='#'
                          body={onIndexTemplate}
                        />
                        <Column field='sellerName' header='Seller Name' />
                        <Column
                          field='rateCharge'
                          header='Rate Charge'
                          body={rateChargeBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          field='customDutiesChargePer'
                          header='Custom Duties (%)'
                          body={customDutiesChargePerBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          field='tax'
                          header='TAX (%)'
                          body={taxBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          field='vat'
                          header='VAT (%)'
                          body={vatBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          field='ait'
                          header='AIT (%)'
                          body={aitBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          field='fuelSurchargePer'
                          header='Fuel Surcharge (%)'
                          body={fuelSurchargePerBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          field='otherCost'
                          header='Other Cost'
                          body={otherCostBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          field='actualCost'
                          header='Actual Cost'
                          body={actualCostBodyTemplate}
                        />
                        <Column
                          field='shippingTotalCost'
                          header='Shipping Cost'
                          body={shippingCostBodyTemplate}
                          editor={(options) => textEditor(options)}
                        />
                        <Column
                          rowEditor
                          headerStyle={{ minWidth: '8rem' }}
                          bodyStyle={{ textAlign: 'center' }}
                        />
                      </DataTable>
                    </div>
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
                        onClick={saveShippingCostFreeShippingSellerShippingCost}
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
  )
}

export default FreeShippingSellerShippingCost
