import React, { Component } from 'react'
import SellerNavbar from '../../components/shared/sellernavbar/SellerNavbar'
import sellerService from '../../store/services/sellerService'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as sellerAction from '../../store/actions/sellerAction'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import authenticationService from '../../store/services/authenticationService'

class sellerNavBarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      loginSuccessful: false,
      redirectTo: null,
      searchBy: '',
      shopName: '',
    }

    this.sellerlogOut = this.sellerlogOut.bind(this)
  }

  handleChange = (e) => {
    const { target } = e
    switch (target.name) {
      case 'searchBy':
        this.setState({ searchBy: target.value })
        break

      default:
    }
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let userId = sellerService.getEmployeeId()
    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/sellerLogin')
    }
    //End Temporary Authentication
    await this.props.getSellerProfileByIdRecord(userId)
    await this.props.getShopDetailsBySellerIdRecord(userId)

    this.props.sellerProfile[0] &&
      this.setState({
        shopName: this.props.sellerProfile[0].shopName,
      })
  }

  sellerlogOut = async () => {
    await this.props.isDeAuthenticateSeller()
    return <Redirect to='/SellerLogin' />
  }

  render() {
    return (
      <div id='wrapper'>
        <SellerNavbar
          key='SellerNavbar'
          {...this.state}
          handleChange={this.handleChange}
          sellerlogOut={this.sellerlogOut}
          sellerProfileById={this.props?.sellerProfileById}
          sellerId={this.props.sellerProfile[0]?.sellerId}
          // sellerProfile={this.props.sellerProfile}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.sellerReducer.data,
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
  sellerProfile: state.sellerProfileReducer.shopDetails,
})

const mapDispatchToProps = (dispatch) => {
  return {
    isAuthenticateSeller: () => dispatch(sellerAction.isAuthenticateSeller()),
    isDeAuthenticateSeller: () =>
      dispatch(sellerAction.isDeAuthenticateSeller()),
    getSellerProfileByIdRecord: (index) =>
      dispatch(sellerProfileAction.getSellerProfileByIdRecord(index)),
    getShopDetailsBySellerIdRecord: (index) =>
      dispatch(sellerProfileAction.getShopDetailsBySellerIdRecord(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sellerNavBarContainer)
