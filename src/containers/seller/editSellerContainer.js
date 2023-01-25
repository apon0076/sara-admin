import React, { Component } from "react"
import EditSeller from "../../components/seller/EditSeller"

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux"
// import { bindActionCreators } from "redux";

import * as sellerAction from "../../store/actions/sellerAction"
// import {
//   updateSellerRecord,
//   getSellerByIdRecord,
// } from "../../store/actions/sellerAction";
// import sellerReducer from "../../store/reducers/sellerReducer";

///////////////////////////////END/////////////////////////////////////////

///////////////Bellow part is used for to load BussinessType Dropdown////////////////////
import * as bussinessTypeAction from "../../store/actions/bussinessTypeAction"
// import { getBussinessTypeByIdRecord } from "../../store/actions/bussinessTypeAction";
// import bussinessTypeReducer from "../../store/reducers/bussinessTypeReducer";
// import { element } from "prop-types";
////////////////////////END/////////////////////////////////////////////////////////

class editSellerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerId: "",
      sellerName: "",
      bussinessTypeId: "",
      binNo: "",
      city: "",
      state: "",
      zipCode: "",
      url: "",
      contactNo: "",
      email: "",
      address: "",
      activeYn: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateSeller = this.updateSeller.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  componentDidMount = async () => {
    //////debugger;

    await this.props.getSellerByIdRecord(this.props.match.params.id)

    this.props.sellers.forEach((element) => {
      this.setState({
        sellerId: element.sellerId,
        sellerName: element.sellerName,
        bussinessTypeId: element.bussinessTypeId,
        binNo: element.binNo,
        city: element.city,
        state: element.state,
        zipCode: element.zipCode,
        url: element.url,
        contactNo: element.contactNo,
        email: element.email,
        address: element.address,
        activeYn: element.activeYn,
      })
    })

    await this.props.getBussinessTypeByIdRecord(this.state.bussinessTypeId)
  }

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.updateSeller(e)
    }
  }

  handleChange = (e) => {
    const { target } = e
    switch (target.name) {
      case "sellerId":
        this.setState({ sellerId: target.value })
        break

      case "sellerName":
        this.setState({ sellerName: target.value })
        break

      case "bussinessTypeId":
        this.setState({ bussinessTypeId: target.value })
        break

      case "binNo":
        this.setState({ binNo: target.value })
        break
      case "city":
        this.setState({ city: target.value })
        break

      case "state":
        this.setState({ state: target.value })
        break

      case "zipCode":
        this.setState({ zipCode: target.value })
        break
      case "url":
        this.setState({ url: target.value })
        break

      case "contactNo":
        this.setState({ contactNo: target.value })
        break

      case "email":
        this.setState({ email: target.value })
        break

      case "address":
        this.setState({ address: target.value })
        break

      case "activeYn":
        this.setState({ activeYn: target.value })
        break

      default:
    }
  }

  updateSeller = async (e) => {
    //////debugger;
    e.preventDefault()
    /*     let isActive = "";
                    let isChecked = this.activeYn.current.checked;
                    if (isChecked === true) {
                      isActive = "Y";
                    } else {
                      isActive = "N";
                    } */
    //var result = this.validate(this.state.categoryName);

    const data = {
      sellerId: this.state.sellerId,
      sellerName: this.state.sellerName,
      bussinessTypeId: this.state.bussinessTypeId,
      binNo: this.state.binNo,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      url: this.state.url,
      contactNo: this.state.contactNo,
      email: this.state.email,
      address: this.state.address,
      activeYn: "Y",
    }

    if (data.sellerId === "") {
      data.sellerId = 0
    }

    await this.props.updateSellerRecord(data)

    this.clearData(e)
    this.props.history.push("/SellerList")
  }

  clearData = (e) => {
    e.preventDefault()
    this.setState({
      sellerId: "",
      sellerName: "",
      bussinessTypeId: "",
      binNo: "",
      city: "",
      state: "",
      zipCode: "",
      url: "",
      contactNo: "",
      email: "",
      address: "",
      activeYn: "",
    })
  }

  render() {
    return (
      <div id="wrapper">
        <EditSeller
          key="EditSeller"
          name="Update Seller"
          {...this.state}
          sellers={this.props.sellers}
          bussinessTypes={this.props.bussinessTypes}
          handleChange={this.handleChange}
          values={this.values}
          updateSeller={this.updateSeller}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  bussinessTypes: state.bussinessTypeReducer.bussinessTypes,
  data: state.vendorReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBussinessTypeByIdRecord: (index) =>
      dispatch(bussinessTypeAction.getBussinessTypeByIdRecord(index)),

    getSellerByIdRecord: (index) =>
      dispatch(sellerAction.getSellerByIdRecord(index)),

    updateSellerRecord: (data) =>
      dispatch(sellerAction.updateSellerRecord(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(editSellerContainer)
