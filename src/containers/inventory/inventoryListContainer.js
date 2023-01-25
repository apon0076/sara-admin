import React, { Component } from "react";
import InventoryList from "../../components/inventory/InventoryList";
import { ToastContainer, toast } from "react-toastify";

////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";

import * as inventoryAction from "../../store/actions/inventoryAction";
////////////////END//////////////////////////////////////////////////////////////

class inventoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchId: "" 
    };

    this.handleChange = this.handleChange.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;

    switch (target.name) {
      case "searchId":
        this.setState({ searchId: target.value });
        let searchBy = target.value;

        if (searchBy === "") {
          await this.props.getInventoryRecord();
        } else {
          await this.props.getInventoryByIdRecord(searchBy);
        }
        break;

      default:
    }
  };
  componentDidMount = async () => {
    await this.props.getInventoryRecord();
  };

  deleteProduct = async (id) => {
    const result = await this.props.deleteInventoryRecord(id);
    toast.info(result.type);
    await this.props.getInventoryRecord();
  };

  render() {
    return (
      <div id="wrapper">
        <InventoryList
          key="InventoryList"
          name="Inventory List"
          {...this.state}
          handleChange={this.handleChange}
          deleteProduct={this.deleteProduct}
          values={this.values}
          inventories={this.props.inventories}
          loading={this.props.loading}
          error={this.props.error}
        />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  inventories: state.inventoryReducer.inventories,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInventoryByIdRecord: (index) =>
      dispatch(inventoryAction.getInventoryByIdRecord(index)),
    getInventoryRecord: () => 
      dispatch(inventoryAction.getInventoryRecord()),
    deleteInventoryRecord: (id) =>
      dispatch(inventoryAction.deleteInventoryRecord(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(inventoryListContainer);
