import React, { Component } from "react";
import ChangeSellerPassword from "../../components/sellerProfile/ChangeSellerPassword";
import { toast, ToastContainer } from "react-toastify";
import authenticationService from "../../store/services/authenticationService";
import { connect } from "react-redux";
import * as sellerProfileAction from "../../store/actions/sellerProfileAction";

class changeSellerPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerId: "",
      sellerEmail: "",
      oldPassword: "",
      newPassword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateSellerPassword = this.updateSellerPassword.bind(this);
    this.clearData = this.clearData.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.removeLocalStorage = this.removeLocalStorage.bind(this);
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId();
    if (roleId === "2") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        sellerId: this.props.sellerProfileById.sellerId,
        sellerEmail: this.props.sellerProfileById.sellerEmail,
      });
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      });
      this.props.history.push("/SellerLogin");
    }
    //End Temporary Authentication
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.updateSellerPassword(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "sellerEmail":
        this.setState({ sellerEmail: target.value });
        break;

      case "oldPassword":
        this.setState({ oldPassword: target.value });
        break;

      case "newPassword":
        this.setState({ newPassword: target.value });
        break;

      default:
    }
  };

  //////debugger;

  checkValidation = async (e) => {
    e.preventDefault();
    if (this.state.oldPassword === "") {
      let msg = "Please Enter Old Password!!!";
      toast.warning(msg);
      return;
    } else if (this.state.newPassword === "") {
      let msg = "Please Enter New Password!!!";
      toast.warning(msg);
      return;
    } else {
      this.updateSellerPassword(e);
    }
  };

  updateSellerPassword = async (e) => {
    e.preventDefault();
    //////debugger;
    const data = {
      sellerId: this.state.sellerId,
      sellerEmail: this.state.sellerEmail,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
    };
    let result = await this.props.updateSellerPasswordRecord(data);

    if (result.payload && result.payload.success.succeed === true) {
      toast.success("Password Changed Successfully!");
      setTimeout(() => {
        // this.props.history.push("/SellerProfile");
        // this.sellerlogOut();
        this.removeLocalStorage();
        this.props.history.push("/SellerLogin");
      }, 2000);
    }
    if (result.payload && result.payload.success.succeed !== true) {
      toast.warning(result.payload.success.errors[0]);
      setTimeout(() => {
        this.clearData();
      }, 2000);
    }
  };

  clearData = () => {
    this.setState({
      oldPassword: "",
      newPassword: "",
    });
  };

  removeLocalStorage = async () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-access-employeeId");
    localStorage.removeItem("x-access-roleId");
    localStorage.removeItem("x-access-token-expiration");
  };

  render() {

    return (
      <div id="wrapper">
        <ChangeSellerPassword
          key="ChangeSellerPassword"
          name="Update Seller Password"
          {...this.state}
          handleChange={this.handleChange}
          sellerProfileById={this.props.sellerProfileById}
          checkValidation={this.checkValidation}
          sellerlogOut={this.sellerlogOut}
        />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.sellerProfileReducer.data,
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateSellerPasswordRecord: (data) =>
      dispatch(sellerProfileAction.updateSellerPasswordRecord(data)),

    getSellerProfileByIdRecord: (index) =>
      dispatch(sellerProfileAction.getSellerProfileByIdRecord(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(changeSellerPasswordContainer);
