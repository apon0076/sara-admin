import React, { Component } from "react"
import SellerCommission from "../../components/seller/SellerCommission"
import authenticationService from "../../store/services/authenticationService"

class sellerCommissionContainer extends Component {
  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "2") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/sellerLogin")
    }
    //End Temporary Authentication
  }


  render() {
    return (
      <>
        <div className="page-wrapper">
          <div className="container-fluid">
             
              <div className="pdf-container">
              <SellerCommission/>
              
              </div>
              
            
          </div>
        </div>
      </>
    )
  }
}


export default sellerCommissionContainer
