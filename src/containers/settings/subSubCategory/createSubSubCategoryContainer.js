import React, { Component } from "react";
import CreateSubSubCategory from "../../../components/settings/subSubCategory/CreateSubSubCategory";
import { toast, ToastContainer } from "react-toastify";
////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as subSubCategoryAction from "../../../store/actions/subSubCategoryAction";
// import { createSubSubCategoryRecord } from "../../../store/actions/subSubCategoryAction";
// import subSubCategoryReducer from "../../../store/reducers/subSubCategoryReducer";

////////////////END/////////////////////////////////////////////////////////////////

///////////////Bellow part is used for to load category Dropdown////////////////////
import * as categoryAction from "../../../store/actions/categoryAction";
// import { getCategoryRecord } from "../../../store/actions/categoryAction";
// import categoryReducer from "../../../store/reducers/categoryReducer";
////////////////////////END/////////////////////////////////////////////////////////

///////////////Bellow part is used for to load Sub category Dropdown////////////////////
import * as subCategoryAction from "../../../store/actions/subCategoryAction";
// import {
//   getSubCategoryRecord,
//   getSubCategoryByIdRecord,
// } from "../../../store/actions/subCategoryAction";
// import subCategoryReducer from "../../../store/reducers/subCategoryReducer";
////////////////////////END/////////////////////////////////////////////////////////

class createSubSubCategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subSubCategoryId: "",
      categoryId: "",
      subCategoryId: "",
      subSubCategoryName: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveSubSubCategory = this.saveSubSubCategory.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = async () => {
    await this.props.getCategoryRecord();
    await this.props.getSubCategoryRecord();
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveSubSubCategory(e);
    }
  };

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "subSubCategoryId":
        this.setState({ subSubCategoryId: target.value });
        break;

      case "categoryId":
        this.setState({ categoryId: target.value });

        this.setState({ categoryId: target.value });
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getSubCategoryRecord();
        } else {
          await this.props.getSubCategoryByIdRecord(searchBy);
        }

        break;

      case "subCategoryId":
        this.setState({ subCategoryId: target.value });
        break;

      case "subSubCategoryName":
        this.setState({ subSubCategoryName: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  saveSubSubCategory = async (e) => {
    e.preventDefault();

    /*     let isActive = "";
                let isChecked = this.activeYn.current.checked;
                if (isChecked === true) {
                  isActive = "Y";
                } else {
                  isActive = "N";
                } */
    //var result = this.validate(this.state.categoryName);

    if (this.state.categoryId === "Select Category") {
      let msg = "Please Select Category!!!";
      toast.info(msg);
      return;
    } else if (this.state.subCategoryName === "Select SubCategory!!!") {
      let msg = "Please Select Sub Category Name!!!";
      toast.info(msg);
      return;
    } else if (this.state.subSubCategoryName === "Select SubSubCategory!!!") {
      let msg = "Please Select SubSubCategory Name!!!";
      toast.info(msg);
      return;
    } else {
      const data = {
        subSubCategoryId: this.state.subSubCategoryId,
        categoryId: this.state.categoryId,
        subCategoryId: this.state.subCategoryId,
        subSubCategoryName: this.state.subSubCategoryName,
        activeYn: "Y",
      };

      if (data.subSubCategoryId === "") {
        data.subSubCategoryId = 0;
      }

      var result = await this.props.createSubSubCategoryRecord(data);
      toast.info(result.payload.success.data.message);
      this.clearData(e);
    }
  };

  editSubbSubCategory = (id, name, activeYn) => {
    if (activeYn === "Y") {
      this.setState({ activeYn: this.state.checked });
    } else {
      this.setState({ activeYn: this.state.unchecked });
    }

    this.setState({ sizeId: id, sizeName: name });
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      subSubCategoryId: "",
      subSubCategoryName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateSubSubCategory
          key="CreateSubSubCategory"
          name="Add Sub Sub Category"
          {...this.state}
          categories={this.props.categories}
          subCategories={this.props.subCategories}
          subSubCategoryId={this.props.subSubCategoryId}
          categoryId={this.props.categoryId}
          subCategoryId={this.props.subCategoryId}
          subSubCategoryName={this.props.subSubCategoryName}
          activeYn={this.props.activeYn}
          handleChange={this.handleChange}
          values={this.values}
          saveSubSubCategory={this.saveSubSubCategory}
          clearData={this.clearData}
          keyPressed={this.keyPressed}
        />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  subCategories: state.subCategoryReducer.subCategories,

  data: state.subSubCategoryReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryRecord: () => dispatch(categoryAction.getCategoryRecord()),
    getSubCategoryRecord: () =>
      dispatch(subCategoryAction.getSubCategoryRecord()),

    getSubCategoryByIdRecord: (index) =>
      dispatch(subCategoryAction.getSubCategoryByIdRecord(index)),

    createSubSubCategoryRecord: (data) =>
      dispatch(subSubCategoryAction.createSubSubCategoryRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createSubSubCategoryContainer);
