import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import authenticationService from '../../../store/services/authenticationService'
import EditProductVariantOption from '../../../components/settings/variant/EditProductVariantOption'
import * as activeBreadcrumbsCategoryAction from '../../../store/actions/activeBreadcrumbsCategoryAction'
import * as productVariantAction from '../../../store/actions/productVariantAction'
import * as productVariantOptionAction from '../../../store/actions/productVariantOptionAction'

class editProductVariantOptionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      variantOptionId: '',
      productCategoryId: '',
      selectedProductCategoryId: '',
      productVariantId: '',
      selectedProductVariantId: '',
      variantOptionText: '',
      variantRemark: '',
      displayOrder: '',
      variantTempleteId: 1,
      variantOptionValue: '',
      isDelete: '',
      isCommon: '',
      categoryName: '',
      variantName: '',

      errorCategoryName: '',
      errorVariantName: '',
      errorVariantOptionText: '',
      errorVariantOptionValue: '',
      errorVariantRemark: '',
      errorDisplayOrder: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.updateProductVariantOption = this.updateProductVariantOption.bind(this)
    this.resetForm = this.resetForm.bind(this)
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
    await this.props.getProductVariantRecord()
    await this.props.getActiveBreadcrumbsCategoryRecord()
    this.setState({
      variantOptionId:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.variantOptionId,
      productCategoryId:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.productCategoryId,
      productVariantId:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.productVariantId,
      variantOptionText:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.variantOptionText,
      variantRemark:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.variantRemark,
      displayOrder:
        this.props?.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.displayOrder,
      variantTempleteId:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.variantTempleteId,
      variantOptionValue:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.variantOptionValue,
      categoryName:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.categoryName,
      variantName:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.variantName,
      isDelete:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.isDelete === 'Y'
          ? true
          : false,
      isCommon:
        this.props.history?.location?.state?.rowData &&
        this.props.history?.location?.state?.rowData?.isCommon === 'Y'
          ? true
          : false,
    })
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.updateProductVariantOption(e)
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'categoryName':
        this.setState({
          categoryName: target.value,
          errorCategoryName:
            value.length < 4 ? 'Atleast 4 characaters required' : '',
        })
        break
      case 'productCategoryId':
        this.setState({ productCategoryId: target.value })
        break
      case 'selectedProductCategoryId':
        this.setState({
          selectedProductCategoryId: target.value,
          productCategoryId: target.value?.productCategoryId,
        })
        break
      case 'variantName':
        this.setState({
          variantName: target.value,
          errorVariantName:
            value.length < 4 ? 'Atleast 4 characaters required' : '',
        })
        break
      case 'productVariantId':
        this.setState({ productVariantId: target.value })
        break
      case 'selectedProductVariantId':
        this.setState({
          selectedProductVariantId: target.value,
          productVariantId: target.value?.productVariantId,
        })
        break
      case 'variantOptionText':
        this.setState({
          variantOptionText: target.value,
          errorVariantOptionText: value.length < 2 ? 'Required Field' : '',
        })
        break
      case 'variantOptionValue':
        this.setState({
          variantOptionValue: target.value,
          errorVariantOptionValue: value.length < 2 ? 'Required Field' : '',
        })
        break
      case 'variantRemark':
        this.setState({
          variantRemark: target.value,
          errorVariantRemark: value.length < 2 ? 'Required Field' : '',
        })
        break
      case 'displayOrder':
        this.setState({
          displayOrder: target.value < 0 ? 0 : target.value,
        })
        break
      case 'isCommon':
        this.setState({ isCommon: target.value })
        break

      default:
    }
  }

  handleParentCheck = (e) => {
    const { target } = e
    switch (target.name) {
      case 'isCommon':
        this.setState({ isCommon: !this.state?.isCommon })
        break
      default:
    }
  }

  updateProductVariantOption = async (e) => {
    e.preventDefault()
    if (this.state?.categoryName === '') {
      let msg = 'Category Name is required!!!'
      toast.warn(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state?.variantName === '') {
      let msg = 'Variant Name is required!!!'
      toast.warn(msg)
      setTimeout(() => {}, 3000)
      return
    }
 
    if (this.state?.variantOptionValue === '') {
      let msg = 'Variant Option Value is required!!!'
      toast.warn(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state?.displayOrder === '') {
      let msg = 'Display Order is required!!!'
      toast.warn(msg)
      setTimeout(() => {}, 3000)
      return
    }
    const data = {
      variantOptionId: this.state?.variantOptionId,
      productCategoryId: this.state?.productCategoryId,
      productVariantId: this.state?.productVariantId,
      variantOptionText: this.state?.variantOptionText,
      variantRemark: this.state?.variantRemark,
      display_order: this.state?.displayOrder,
      variantTempleteId: this.state?.variantTempleteId,
      variantOptionValue: this.state?.variantOptionValue,
      isDelete: this.state?.isDelete === true ? 'Y' : 'N',
      isCommon: this.state?.isCommon === true ? 'Y' : 'N',
      categoryName: this.state?.categoryName,
      variantName: this.state?.variantName,
    }

    let finalData = {
      productVariantOptions: [data],
    }

    const result = await this.props.updateProductVariantOptionRecord(finalData)

    if (result.type === 'UPDATE_PRODUCT_VARIANT_OPTION_SUCCESS') {
      toast.success('Variant Option Updated Successfully')
      setTimeout(() => {
        this.props.history.push('/ProductVariantOptionList')
      }, 2500)
    }
    if (result.type === 'UPDATE_PRODUCT_VARIANT_OPTION_ERROR') {
      toast.error('Something Went Wrong! Please Try Again Later...')
      setTimeout(() => {
        this.props.history.push(`/ProductVariantOptionList`)
      }, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      productVariantOptions: [
        {
          variantOptionId: '',
          productCategoryId: '',
          selectedProductCategoryId: '',
          productVariantId: '',
          selectedProductVariantId: '',
          variantOptionText: '',
          variantRemark: '',
          displayOrder: '',
          variantTempleteId: '',
          variantOptionValue: '',
          isDelete: '',
          isCommon: false,
          categoryName: '',
          variantName: '',
          errorCategoryName: '',
          errorVariantName: '',
          errorVariantOptionText: '',
          errorVariantOptionValue: '',
          errorVariantRemark: '',
          errorDisplay_order: '',
        },
      ],
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <EditProductVariantOption
          key='EditProductVariantOption'
          name='Edit Product Variant Option'
          {...this.state}
          keyPressed={this.keyPressed}
          values={this.values}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          activeBreadcrumbsCategories={this.props?.activeBreadcrumbsCategories}
          variants={this.props?.variants}
          value={this.props?.location?.state?.rowData}
          resetForm={this.resetForm}
          updateProductVariantOption={this.updateProductVariantOption}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  variants: state.productVariantReducer?.variants,
  activeBreadcrumbsCategories:
    state.activeBreadcrumbsCategoryReducer?.activeBreadcrumbsCategories,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveBreadcrumbsCategoryRecord: () =>
      dispatch(
        activeBreadcrumbsCategoryAction.getActiveBreadcrumbsCategoryRecord()
      ),
    getProductVariantRecord: () =>
      dispatch(productVariantAction.getProductVariantRecord()),
    updateProductVariantOptionRecord: (data) =>
      dispatch(
        productVariantOptionAction.updateProductVariantOptionRecord(data)
      ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editProductVariantOptionContainer)
