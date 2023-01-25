import React, { Component } from "react";
import EditSubCategory from "../../../components/settings/subCategory/EditSubCategory";
import { toast, ToastContainer } from "react-toastify";
////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as subCategoryAction from "../../../store/actions/subCategoryAction";
// import { updateSubCategoryRecord } from "../../../store/actions/subCategoryAction";
// import subCategoryReducer from "../../../store/reducers/subCategoryReducer";

///////////////Bellow part is used for to load category Dropdown////////////////////
import * as categoryAction from "../../../store/actions/categoryAction";
// import { getCategoryByIdRecord } from "../../../store/actions/categoryAction";
// import categoryReducer from "../../../store/reducers/categoryReducer";
////////////////////////END/////////////////////////////////////////////////////////

////////////////END/////////////////

class editSubCategoryContainer extends Component {
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
    this.updateSubCategory = this.updateSubCategory.bind(this);
    this.clearData = this.clearData.bind(this);
  }
  componentDidMount = async () => {
    this.setState({
      subCategoryId: this.props.match.params.id,
      categoryId: this.props.match.params.categoryId,
      subCategoryName: this.props.match.params.name,
    });
    await this.props.getCategoryByIdRecord(this.props.match.params.categoryId);
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

      case "categoryName":
        this.setState({ categoryName: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  updateSubCategory = async (e) => {
    e.preventDefault();

    /*     let isActive = "";
                let isChecked = this.activeYn.current.checked;
                if (isChecked === true) {
                  isActive = "Y";
                } else {
                  isActive = "N";
                } */
    //var result = this.validate(this.state.categoryName);

    const data = {
      categoryId: this.state.categoryId,
      subCategoryName: this.state.subCategoryName,
      activeYn: "Y",
    };

    if (data.subCategoryId === "") {
      data.subCategoryId = 0;
    }

    let result = await this.props.updateSubCategoryRecord(data);
    toast.info(result.payload.success.data.message);
    this.clearData(e);
    //this.props.history.push("/SubCategoryList");
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      categoryId: "",
      subCategoryName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <EditSubCategory
          key="EditSubCategory"
          name="Update Sub Category"
          {...this.state}
          categories={this.props.categories}
          handleChange={this.handleChange}
          values={this.values}
          updateSubCategory={this.updateSubCategory}
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
    getCategoryByIdRecord: (index) =>
      dispatch(categoryAction.getCategoryByIdRecord(index)),

    updateSubCategoryRecord: (data) =>
      dispatch(subCategoryAction.updateSubCategoryRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editSubCategoryContainer);
