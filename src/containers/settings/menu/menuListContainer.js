import React, { Component } from "react";
import MenuList from "../../../components/settings/menu/MenuList";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";

import * as menuAction from "../../../store/actions/menuAction";
// import {
//   getMenuRecord,
//   getMenuByIdRecord,
//   deleteMenuRecord,
// } from "../../../store/actions/menuAction";
// import menuReducer from "../../../store/reducers/menuReducer";

////////////////END/////////////////

class menuListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "searchId":
        //////debugger;
        this.setState({ searchId: target.value });
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getMenuRecord();
        } else {
          await this.props.getMenuByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getMenuRecord();
  };

  deleteMenu = async (id) => {
    //////debugger;

    await this.props.deleteMenuRecord(id);
    await this.props.getMenuRecord();
  };

  render() {
    return (
      <MenuList
        key="MenuList"
        {...this.state}
        menus={this.props.menus}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteMenu={this.deleteMenu}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  menus: state.menuReducer.menus,
  loading: state.menuReducer.loading,
  error: state.menuReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteMenu: state.deleteMenu,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMenuRecord: () => dispatch(menuAction.getMenuRecord()),
    getMenuByIdRecord: (index) => dispatch(menuAction.getMenuByIdRecord(index)),
    deleteMenuRecord: (index) => dispatch(menuAction.deleteMenuRecord(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(menuListContainer);
