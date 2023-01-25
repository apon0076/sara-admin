import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import * as addressAction from '../../store/actions/addressAction'
import * as unitAction from '../../store/actions/unitAction'
import * as activeBreadcrumbsCategoryAction from '../../store/actions/activeBreadcrumbsCategoryAction'
import * as sellerAction from '../../store/actions/sellerAction'
import authenticationService from '../../store/services/authenticationService'
import CreateShippingCost from '../../components/shipping/CreateShippingCost'

class createShippingCostContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingCostId: 0,

      shippingTypeId: 0,
      shippingOptionsId: 0,
      countryId: '',
      cityId: '',
      areaId: '',
      postalCode: '',

      unitId: '',
      minValue: '',
      maxValue: '',

      categoryId: '',
      sellerId: '',
      voucherNo: '',
      startDate: new Date(),
      endDate: new Date(),

      rateCharge: 0,
      customDutiesChargePer: 0,
      customDutiesChargePerAmount: 0,
      tax: 0,
      taxAmount: 0,
      vat: 0,
      vatAmount: 0,
      ait: 0,
      aitAmount: 0,
      fuelSurchargePer: 0,
      fuelSurchargePerAmount: 0,
      otherCost: 0,
      actualCost: 0,
      shippingTotalCost: 0,

      isActive: true,

      flatRateSelected: false,
      courierRateSelected: false,
      freeShippingSelected: false,
      warehouseSelected: false,
      couponShippingSelected: false,

      fixedRateSelected: false,
      orderWeightSelected: false,
      orderValueSelected: false,
      orderQtySelected: false,
      productCategorySelected: false,
      sellerShippingCostSelected: false,

      selectedCategories: [],
      selectedSellers: [],

      errorShippingTypeId: '',
      errorShippingOptionsId: '',
      errorCountryId: '',
      errorCityId: '',
      errorAreaId: '',
      errorPostalCode: '',
      errorRateCharge: '',
      errorActualCost: '',
      errorShippingTotalCost: '',
      errorVoucherNo: '',

      errorMinValue: '',
      errorMaxValue: '',

      country: '',
      city: '',
      area: '',
      areaName: '',
      countryList: '',
      cityList: '',
      areaList: '',

      selectedArea: '',
      filteredAreas: '',

      unitName: '',
      errorUnitName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveShippingCost = this.saveShippingCost.bind(this)
    this.getProductCategoryHandler = this.getProductCategoryHandler.bind(this)
    this.getSellerShippingCostHandler =
      this.getSellerShippingCostHandler.bind(this)

  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    //End Temporary Authentication
    await this.props.getShippingTypeRecord()
    await this.props.getShippingOptionsRecord()
    await this.props.getAllCountryRecord()
    await this.props.getActiveBreadcrumbsProductCategoryRecord()
    await this.props.getUnitRecord()
    await this.props.getVerifiedShopRecord()
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target

    switch (target.name) {
      case 'typeName':
        this.setState({
          typeName: target.value,
          shippingTypeId: target.value.shippingTypeId,
          errorShippingTypeId:
            target.value.length < 1 ? 'Select one Shipping type' : '',
        })
        {
          this.state.typeName === 'Flat Rate' ||
            (target.value.shippingTypeId === 1 &&
              this.setState({
                flatRateSelected: true,
                courierRateSelected: false,
                freeShippingSelected: false,
                warehouseSelected: false,
                couponShippingSelected: false,
              }))
        }
        {
          this.state.typeName === 'Courier Rate' ||
            (target.value.shippingTypeId === 2 &&
              this.setState({
                flatRateSelected: false,
                courierRateSelected: true,
                freeShippingSelected: false,
                warehouseSelected: false,
                couponShippingSelected: false,
              }))
        }
        {
          this.state.typeName === 'Free Shipping' ||
            (target.value.shippingTypeId === 3 &&
              this.setState({
                flatRateSelected: false,
                courierRateSelected: false,
                freeShippingSelected: true,
                warehouseSelected: false,
                couponShippingSelected: false,
              }))
        }
        {
          this.state.typeName === 'Warehouse' ||
            (target.value.shippingTypeId === 4 &&
              this.setState({
                flatRateSelected: false,
                courierRateSelected: false,
                freeShippingSelected: false,
                warehouseSelected: true,
                couponShippingSelected: false,
              }))
        }
        {
          this.state.typeName === 'Coupon Shipping' ||
            (target.value.shippingTypeId === 5 &&
              this.setState({
                flatRateSelected: false,
                courierRateSelected: false,
                freeShippingSelected: false,
                warehouseSelected: false,
                couponShippingSelected: true,
              }))
        }
        break
      case 'optionName':
        this.setState({
          optionName: target.value,
          shippingOptionsId: target.value.shippingOptionsId,
          errorShippingOptionsId:
            target.value.length < 1 ? 'Select one Shipping option' : '',
        })
        {
          this.state.optionName === 'Fixed Rate' ||
            (target.value.shippingOptionsId === 1 &&
              this.setState({
                fixedRateSelected: true,
                orderWeightSelected: false,
                orderValueSelected: false,
                orderQtySelected: false,
                productCategorySelected: false,
                sellerShippingCostSelected: false,
              }))
        }
        {
          this.state.optionName === 'Order Weight' ||
            (target.value.shippingOptionsId === 2 &&
              this.setState({
                fixedRateSelected: false,
                orderWeightSelected: true,
                orderValueSelected: false,
                orderQtySelected: false,
                productCategorySelected: false,
                sellerShippingCostSelected: false,
              }))
        }
        {
          this.state.optionName === 'Order Value' ||
            (target.value.shippingOptionsId === 3 &&
              this.setState({
                fixedRateSelected: false,
                orderWeightSelected: false,
                orderValueSelected: true,
                orderQtySelected: false,
                productCategorySelected: false,
                sellerShippingCostSelected: false,
              }))
        }
        {
          this.state.optionName === 'Order Qty' ||
            (target.value.shippingOptionsId === 4 &&
              this.setState({
                fixedRateSelected: false,
                orderWeightSelected: false,
                orderValueSelected: false,
                orderQtySelected: true,
                productCategorySelected: false,
                sellerShippingCostSelected: false,
              }))
        }
        {
          this.state.optionName === 'Product Category' ||
            (target.value.shippingOptionsId === 5 &&
              this.setState({
                fixedRateSelected: false,
                orderWeightSelected: false,
                orderValueSelected: false,
                orderQtySelected: false,
                productCategorySelected: true,
                sellerShippingCostSelected: false,
              }))
        }
        {
          this.state.optionName === 'Seller Shipping Cost' ||
            (target.value.shippingOptionsId === 6 &&
              this.setState({
                fixedRateSelected: false,
                orderWeightSelected: false,
                orderValueSelected: false,
                orderQtySelected: false,
                productCategorySelected: false,
                sellerShippingCostSelected: true,
              }))
        }
        break

      default:
    }
  }


  getProductCategoryHandler = (data) => {
    this.setState({
      selectedCategories: data,
    })
  }

  getSellerShippingCostHandler = (data) => {
    this.setState({
      selectedSellers: data,
    })
  }

  saveShippingCost = async (finalData) => {
    const result = await this.props.createShippingCostRecord(finalData)

    if (result && result.payload.success === true) {
      toast.success('Shipping Cost Created Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingCostList')
      }, 2500)
    } else if (result && result.payload.success === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {}, 2500)
    } else if (result.type === 'CREATE_SHIPPING_COST_SUCCESS') {
      toast.success('Shipping Cost Created Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingCostList')
      }, 2500)
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {}, 2500)
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <CreateShippingCost
          key='CreateShippingCost'
          name='Add Shipping Cost'
          {...this.state}
          handleChange={this.handleChange}
          shippingType={this.props.shippingType.filter(
            (item) => item.isActive === 'Y'
          )}
          shippingOptions={this.props.shippingOptions.filter(
            (item) => item.isActive === 'Y'
          )}
          allCountries={this.props.allCountries}
          allCities={this.props.allCities}
          allAreas={this.props.allAreas}
          categories={this.props.categories}
          sellers={this.props.sellers}
          values={this.values}
          saveShippingCost={this.saveShippingCost}
          saveShippingCostProductCategory={this.saveShippingCostProductCategory}
          getProductCategoryHandler={this.getProductCategoryHandler}
          getSellerShippingCostHandler={this.getSellerShippingCostHandler}
          saveShippingCostSellerShippingCost={
            this.saveShippingCostSellerShippingCost
          }
          units={this.props.units}
          searchArea={this.searchArea}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.shippingReducer.shippingCost,
  shippingType: state.shippingReducer.shippingType,
  shippingOptions: state.shippingReducer.shippingOptions,
  allCountries: state.addressReducer.allCountries,
  allCities: state.addressReducer.allCities,
  allAreas: state.addressReducer.allAreas,
  categories:
    state.activeBreadcrumbsCategoryReducer.activeBreadcrumbsProductCategories,
  units: state.unitReducer.units,
  sellers: state.sellerReducer.sellers,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getShippingTypeRecord: (data) =>
      dispatch(shippingAction.getShippingTypeRecord(data)),
    getShippingOptionsRecord: (data) =>
      dispatch(shippingAction.getShippingOptionsRecord(data)),
    getAllCountryRecord: () => dispatch(addressAction.getAllCountryRecord()),
    getAllCityRecord: (countryId) =>
      dispatch(addressAction.getAllCityRecord(countryId)),
    getAllAreaRecord: (cityId) =>
      dispatch(addressAction.getAllAreaRecord(cityId)),
    getActiveBreadcrumbsProductCategoryRecord: () =>
      dispatch(
        activeBreadcrumbsCategoryAction.getActiveBreadcrumbsProductCategoryRecord()
      ),
    getUnitRecord: () => dispatch(unitAction.getUnitRecord()),
    getVerifiedShopRecord: () => dispatch(sellerAction.getVerifiedShopRecord()),
    createShippingCostRecord: (data) =>
      dispatch(shippingAction.createShippingCostRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createShippingCostContainer)
