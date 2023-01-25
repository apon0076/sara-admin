import React, { Component } from "react";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
///////////////////////////////END/////////////////////////////////////////
///////////////Bellow part is used for to load BussinessType Dropdown////////////////////
import * as bussinessTypeAction from "../../store/actions/bussinessTypeAction";
import * as shopAction from "../../store/actions/shopAction";
import CreateShop from "../../components/shop/CreateShop";

////////////////////////END/////////////////////////////////////////////////////////

class createShopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //sellerId: null,
      shopName: "",
      bussinessTypeId: "",
      //shopDescription: '',
      binNo: "",
      shopCity: "",
      shopState: "",
      zipCode: "",
      shopAddress: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveShop = this.saveShop.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = async () => {
    //////debugger;
    // For Login Check
    // let userId = shopService.getEmployeeId();

    // if (userId != null) {
    //   this.setState({
    //     authenticated: true,
    //     loginSuccessful: true,
    //   });
    // } else {
    //   this.setState({
    //     authenticated: false,
    //     loginSuccessful: false,
    //   });

    //   this.props.history.push('/SellerLogin');
    // }

    await this.props.getBussinessTypeRecord();
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveShop(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      // case "sellerId":
      //   this.setState({ sellerId: target.value });
      //   break;

      case "shopName":
        this.setState({ shopName: target.value });
        break;

      case "bussinessTypeId":
        this.setState({ bussinessTypeId: target.value });
        break;

      // case "shopDescription":
      // this.setState({ shopDescription: target.value });
      // break;

      case "binNo":
        this.setState({ binNo: target.value });
        break;

      case "shopCity":
        this.setState({ shopCity: target.value });
        break;

      case "shopState":
        this.setState({ shopState: target.value });
        break;

      case "zipCode":
        this.setState({ zipCode: target.value });
        break;

      case "shopAddress":
        this.setState({ shopAddress: target.value });
        break;

      default:
    }
  };

  saveShop = async (e) => {
    //e.preventDefault();

    //////debugger;

    const data = {
      shopName: e.shopName,
      bussinessTypeId: e.bussinessTypeId,
      //shopDescription: e.shopDescription,
      binNo: e.binNo,
      shopCity: e.shopCity,
      shopState: e.shopState,
      zipCode: e.zipCode,
      shopAddress: e.shopAddress,
    };

    await this.props.createShopRecord(data);

    this.clearData(data);
  };

  // editVendor = (id, name, activeYn) => {
  //   //////debugger;

  //   if (activeYn === "Y") {
  //     this.setState({ activeYn: this.state.checked });
  //   } else {
  //     this.setState({ activeYn: this.state.unchecked });
  //   }

  //   this.setState({ categoryId: id, categoryName: name });
  // };

  clearData = (e) => {
    //e.preventDefault();
    this.setState({
      shopName: "",
      bussinessTypeId: "",
      //shopDescription: "",
      binNo: "",
      shopCity: "",
      shopState: "",
      zipCode: "",
      shopAddress: "",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateShop
          key="CreateShop"
          name="Add Category"
          {...this.state}
          bussinessTypes={this.props.bussinessTypes}
          handleChange={this.handleChange}
          values={this.values}
          saveShop={this.saveShop}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bussinessTypes: state.bussinessTypeReducer.bussinessTypes,
  data: state.vendorReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBussinessTypeRecord: () =>
      dispatch(bussinessTypeAction.getBussinessTypeRecord()),

    createShopRecord: (data) => dispatch(shopAction.createShopRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createShopContainer);
