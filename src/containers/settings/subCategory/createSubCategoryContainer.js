import React, { Component } from "react";
import CreateSubCategory from "../../../components/settings/subCategory/CreateSubCategory";
import { toast, ToastContainer } from "react-toastify";
////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as subCategoryAction from "../../../store/actions/subCategoryAction";
// import { createSubCategoryRecord } from "../../../store/actions/subCategoryAction";
// import subCategoryReducer from "../../../store/reducers/subCategoryReducer";

///////////////Bellow part is used for to load category Dropdown////////////////////
import * as categoryAction from "../../../store/actions/categoryAction";
// import { getCategoryRecord } from "../../../store/actions/categoryAction";
// import categoryReducer from "../../../store/reducers/categoryReducer";
////////////////////////END/////////////////////////////////////////////////////////

////////////////END/////////////////

class createSubCategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategoryId: "",
      categoryId: "",

      subCategoryName: "",
      activeYn: "",
      selectedOption: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveSubCategory = this.saveSubCategory.bind(this);
    this.clearData = this.clearData.bind(this);
  }
  componentDidMount = async () => {
    await this.props.getCategoryRecord();
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveSubCategory(e);
    }
  };

  /*   handleChange = (selectedOption) => {
   
    this.setState({ selectedOption });
  }; */

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "subCategoryId":
        this.setState({ subCategoryId: target.value });
        break;

      case "categoryId":
        this.setState({ categoryId: target.value });
        break;

      case "subCategoryName":
        this.setState({ subCategoryName: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  saveSubCategory = async (e) => {
    e.preventDefault();

    /*     let isActive = "";
            let isChecked = this.activeYn.current.checked;
            if (isChecked === true) {
              isActive = "Y";
            } else {
              isActive = "N";
            } */
    //var result = this.validate(this.state.categoryName);

    if (this.state.subCategoryName === "") {
      let msg = "Please Enter Sub Category Name!!!";
      toast.info(msg);
    } else if (this.state.categoryId === "Select Category") {
      let msg = "Please Select Category Name!!!";
      toast.info(msg);
    } else {
      const data = {
        categoryId: this.state.categoryId,
        subCategoryName: this.state.subCategoryName,
        activeYn: "Y",
      };

      if (data.subCategoryId === "") {
        data.subCategoryId = 0;
      }

      var result = await this.props.createSubCategoryRecord(data);
      toast.info(result.payload.success.data.message);
      this.clearData(e);
    }
  };

  editSubCategory = (id, name, activeYn) => {
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
      subCategoryName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateSubCategory
          key="CreateSubCategory"
          name="Add Sub Category"
          {...this.state}
          categories={this.props.categories}
          handleChange={this.handleChange}
          values={this.values}
          saveSubCategory={this.saveSubCategory}
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
  data: state.subCategoryReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryRecord: () => dispatch(categoryAction.getCategoryRecord()),

    createSubCategoryRecord: (data) =>
      dispatch(subCategoryAction.createSubCategoryRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createSubCategoryContainer);
