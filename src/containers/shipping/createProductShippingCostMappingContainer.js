import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as productAction from '../../store/actions/productAction'
import * as shippingAction from '../../store/actions/shippingAction'
import authenticationService from '../../store/services/authenticationService'
import CreateProductShippingCostMapping from '../../components/shipping/CreateProductShippingCostMapping'

class createProductShippingCostMappingContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shippingMappingId: 0,
            productId: '',
            productName: '',
            shippingTypeId: '',
            typeName:'',
            shippingOptionsId: '',
            optionName:'',
            courierId: '',
            courierName: '',
            isActive: true,
            ip: '',
            errorProductId: '',
            errorShippingTypeId: '',
            errorShippingOptionsId: '',
            errorCourierId: '',

        }

        this.handleChange = this.handleChange.bind(this)
        this.saveProductShippingCostMapping = this.saveProductShippingCostMapping.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.handleParentCheck = this.handleParentCheck.bind(this)
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
        await this.props.getAllVerifiedProductsRecord()
        await this.props.getShippingTypeRecord()
        await this.props.getShippingOptionsRecord()
        await this.props.getCourierProfileRecord()
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ value: e.target.value })
        const { target } = e
        switch (target.name) {
            case "productName":
                this.setState({
                    productName: target.value,
                    productId: target.value.productId,
                    errorProductId: target.value.length < 1 ? "Select one product" : ""
                })
                break
            case "typeName":
                this.setState({
                    typeName: target.value,
                    shippingTypeId: target.value.shippingTypeId,
                    errorShippingTypeId: target.value.length < 1 ? "Select one shipping type" : ""
                })
                break
            case "optionName":
                this.setState({
                    optionName: target.value,
                    shippingOptionsId: target.value.shippingOptionsId,
                    errorShippingOptionsId: target.value.length < 1 ? "Select one shipping option" : ""
                })
                break
            case "courierName":
                this.setState({
                    courierName: target.value,
                    courierId: target.value.courierId,
                    errorCourierId: target.value.length < 1 ? "Select one courier" : ""
                })
                break

            default:
        }
    }

    handleParentCheck = (e) => {
        const isActive = e.target.checked
        this.setState({ isActive })
    }

    resetForm = () => {
        this.setState({
            name: '',
            isActive: true,
            errorName: '',
        })
    }

    saveProductShippingCostMapping = async (e) => {
        e.preventDefault()

        // if (this.state.name === '') {
        //     let msg = 'Shipping Option Name Is Required!!!'
        //     toast.error(msg)
        //     setTimeout(() => { }, 3000)
        //     return
        // }
        // if (this.state.name === '') {
        //     let msg = 'Shipping Option Name Is Required!!!'
        //     toast.error(msg)
        //     setTimeout(() => { }, 3000)
        //     return
        // }
        // if (this.state.name === '') {
        //     let msg = 'Shipping Option Name Is Required!!!'
        //     toast.error(msg)
        //     setTimeout(() => { }, 3000)
        //     return
        // }
        // if (this.state.name === '') {
        //     let msg = 'Shipping Option Name Is Required!!!'
        //     toast.error(msg)
        //     setTimeout(() => { }, 3000)
        //     return
        // }

        const data = {
            shippingMappingId: this.state.shippingMappingId,
            productId: this.state.productId,
            shippingTypeId: this.state.shippingTypeId,
            shippingOptionsId: this.state.shippingOptionsId,
            courierId: this.state.courierId,
            isActive: this.state.isActive === true ? 'Y' : 'N',
            ip: this.state.ip,
        }

        const result = await this.props.createOrUpdateProductShippingCostMappingRecord(data)

        if (result && result.payload.success.succeed === true) {
            toast.success('Product Shipping Cost Mapping Created Successfully')
            setTimeout(() => {
                this.props.history.push('ProductShippingCostMappingList')
            }, 2500)
            this.resetForm()
        } else if (result && result.payload.success.succeed === false) {
            toast.error('Something went wrong, Please try again')
            setTimeout(() => {
                this.resetForm()
            }, 2500)
        } else if (
            result.type === 'CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS'
        ) {
            toast.success('Product Shipping Cost Mapping Created Successfully')
            setTimeout(() => {
                this.props.history.push('ProductShippingCostMappingList')
            }, 2500)
            this.resetForm()
        } else {
            toast.error('Something went wrong, Please try again')
            setTimeout(() => {
                this.resetForm()
            }, 2500)
        }
    }

    render() {

        return (
            <div id='wrapper'>
                <CreateProductShippingCostMapping
                    key='CreateProductShippingCostMapping'
                    name='Create Product Shipping Cost Mapping'
                    {...this.state}
                    handleChange={this.handleChange}
                    handleParentCheck={this.handleParentCheck}
                    allVerifiedProducts={this.props.allVerifiedProducts}
                    shippingType={this.props.shippingType}
                    courierProfile={this.props.courierProfile}
                    shippingOptions={this.props.shippingOptions}
                    saveProductShippingCostMapping={this.saveProductShippingCostMapping}
                />
                <ToastContainer autoClose={1500} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.shippingReducer.productShippingCostMapping,
    allVerifiedProducts: state.productReducer.allVerifiedProducts,
    shippingType: state.shippingReducer.shippingType,
    courierProfile: state.shippingReducer.courierProfile,
    shippingOptions: state.shippingReducer.shippingOptions
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAllVerifiedProductsRecord: () =>
            dispatch(productAction.getAllVerifiedProductsRecord()),
        getShippingTypeRecord: () =>
            dispatch(shippingAction.getShippingTypeRecord()),
        getShippingOptionsRecord: () =>
            dispatch(shippingAction.getShippingOptionsRecord()),
        getCourierProfileRecord: () =>
            dispatch(shippingAction.getCourierProfileRecord()),
        createOrUpdateProductShippingCostMappingRecord: (data) =>
            dispatch(shippingAction.createOrUpdateProductShippingCostMappingRecord(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createProductShippingCostMappingContainer)
