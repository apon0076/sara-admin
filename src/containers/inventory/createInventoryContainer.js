import React, { Component } from "react";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import * as inventoryAction from "../../store/actions/inventoryAction";
/////////////////////////Sku Dropdown Purpose/////////////////////////////////////////
import * as productAction from "../../store/actions/productAction";
import CreateInventory from "../../components/inventory/CreateInventory";
////////////////END//////////////////////////////////////////////////////////////

class createInventoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryId: "",
      productId: "",
      productSku: "",
      colorId: "",
      sizeId: "",
      quantity: "",
      price: "",
      items: [],
      inventoryItems: [],
      rows: [0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
    this.clearData = this.clearData.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
  }

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const { target } = e;

    switch (target.name) {
      case "sizeId":
        this.setState({ sizeId: target.value });
        break;

      case "quantity":
        this.setState({ quantity: target.value });
        break;

      case "price":
        this.setState({ price: target.value });
        break;

      default:
    }

    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };

    this.setState({
      rows,
    });

    this.setState((prevState) => ({
      items: [...prevState.items, target.name, target.value],
    }));

    const { items } = this.state;

    //items.push({ name: target.name, value: target.value });

    /*     if (target.name === "sizeId") {
      items.push({ sizeId: target.value });
    }
    if (target.name === "quantity") {
      items.push({ quantity: target.value });
    }
    if (target.name === "price") {
      items.push({ price: target.value });
    } */

    if (target.name === "price") {
      items.push({
        sizeId: this.state.sizeId,
        quantity: this.state.quantity,
        price: target.value,
      });
    }

    this.setState({
      items,
    });
  };

  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };

  handleAddRow = (e) => {
    e.preventDefault();

    const item = {
      sizeId: "",
      quantity: "",
      price: "",
    };

    this.setState({
      rows: [...this.state.rows, item],
    });
  };

  componentDidMount = async () => {
    await this.props.getProductRecord();
  };


  checkValidation = (e) => {
    e.preventDefault();
    if (this.state.productSku === "") {
      let msg = "Please select Sku!!!";
      toast.info(msg);
      return;
    } else if (this.state.colorId === "") {
      let msg = "Please select Color!!!";
      toast.info(msg);
      return;
    } else if (this.state.sizeId === "") {
      let msg = "Please select Size!!!";
      toast.info(msg);
      return;
    } else if (this.state.quantity === "") {
      let msg = "Please select Quantity!!!";
      toast.info(msg);
      return;
    } else if (this.state.price === "") {
      let msg = "Please select Price!!!";
      toast.info(msg);
      return;
    } else {
      this.saveInventory(e);
    }
  };

  handleChange2 = async (e) => {
    const { target } = e;

    switch (target.name) {
      case "inventoryId":
        this.setState({ inventoryId: target.value });

        break;

      case "productSku":
        this.setState({ productSku: target.value });

        let searchBy = target.value;
        if (searchBy > 0) {
          await this.props.getColorByIdRecord(searchBy);
          await this.props.getSizeByIdRecord(searchBy);
        }
        break;

      case "colorId":
        this.setState({ colorId: target.value });
        break;

      default:
    }
  };

  saveInventory = async (e) => {
    e.preventDefault();

    const data = {
      inventoryId: this.state.inventoryId,
      productId: this.state.productSku,
      colorId: this.state.colorId,
      items: this.state.items,
    };

    data.InventoryDetails = data.items;

    if (data.inventoryId === "") {
      data.inventoryId = 0;
    }

    const result = await this.props.createInventoryRecord(data);
    toast.success(result.type);
    this.clearData(e);
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      inventoryId: "",
      productId: "",
      productSku: "",
      colorId: "",
      sizeId: "",
      price: "",
      quantity: "",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateInventory
          key="CreateInventory"
          name="Add Inventory"
          {...this.state}
          handleChange={this.handleChange}
          handleChange2={this.handleChange2}
          values={this.values}
          productColors={this.props.productColors}
          products={this.props.products}
          productSizes={this.props.productSizes}
          handleAddRow={this.handleAddRow}
          handleRemoveRow={this.handleRemoveRow}
          checkValidation={this.checkValidation}
        />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  productColors: state.productReducer.productColors,
  productSizes: state.productReducer.productSizes,
  data: state.inventoryReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductRecord: () => 
      dispatch(productAction.getProductRecord()),
    getColorByIdRecord: (index) =>
      dispatch(productAction.getColorByIdRecord(index)),
    getSizeByIdRecord: (index) =>
      dispatch(productAction.getSizeByIdRecord(index)),
    createInventoryRecord: (data) =>
      dispatch(inventoryAction.createInventoryRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createInventoryContainer);
