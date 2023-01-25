import React, { Component } from "react";
import EditSubSubCategory from "../../../components/settings/subSubCategory/EditSubSubCategory";
import { toast, ToastContainer } from "react-toastify";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as subSubCategoryAction from "../../../store/actions/subSubCategoryAction";
// import { updateSubSubCategoryRecord } from "../../../store/actions/subSubCategoryAction";
// import subSubCategoryReducer from "../../../store/reducers/subSubCategoryReducer";

////////////////END/////////////////////////////////////////////////////////////////

///////////////Bellow part is used for to load category Dropdown////////////////////
import * as categoryAction from "../../../store/actions/categoryAction";
// import { getCategoryByIdRecord } from "../../../store/actions/categoryAction";
// import categoryReducer from "../../../store/reducers/categoryReducer";
////////////////////////END/////////////////////////////////////////////////////////

///////////////Bellow part is used for to load Sub category Dropdown////////////////////
import * as subCategoryAction from "../../../store/actions/subCategoryAction";
// import { getSubCategoryByIdRecord } from "../../../store/actions/subCategoryAction";
// import subCategoryReducer from "../../../store/reducers/subCategoryReducer";
////////////////////////END/////////////////////////////////////////////////////////

class editSubSubCategoryContainer extends Component {
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
    this.updateSubSubCategory = this.updateSubSubCategory.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = async () => {
    //////debugger;
    this.setState({
      subSubCategoryId: this.props.match.params.id,
      categoryId: this.props.match.params.categoryId,
      subCategoryId: this.props.match.params.subCategoryId,
      subSubCategoryName: this.props.match.params.name,
    });

    await this.props.getCategoryByIdRecord(this.props.match.params.categoryId);
    await this.props.getSubCategoryByIdRecord(
      this.props.match.params.subCategoryId
    );
    //this.refs.categoryName.focus();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.updateSubSubCategory(e);
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

        //////debugger;
        this.setState({ categoryId: target.value });
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

  updateSubSubCategory = async (e) => {
    e.preventDefault();
    //////debugger;
    /*     let isActive = "";
                    let isChecked = this.activeYn.current.checked;
                    if (isChecked === true) {
                      isActive = "Y";
                    } else {
                      isActive = "N";
                    } */
    //var result = this.validate(this.state.categoryName);

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

    let result = await this.props.updateSubSubCategoryRecord(data);
    toast.info(result.payload.success.data.message);
    this.clearData(e);
    //this.props.history.push("/SubSubCategoryList");
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      subSubCategoryId: "",
      categoryId: "",
      subCategoryId: "",
      subSubCategoryName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <EditSubSubCategory
          key="EditSubSubCategory"
          name="Update Sub Sub Category"
          {...this.state}
          categories={this.props.categories}
          subCategories={this.props.subCategories}
          handleChange={this.handleChange}
          values={this.values}
          updateSubSubCategory={this.updateSubSubCategory}
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
    getCategoryByIdRecord: (index) =>
      dispatch(categoryAction.getCategoryByIdRecord(index)),
    getSubCategoryByIdRecord: (index) =>
      dispatch(subCategoryAction.getSubCategoryByIdRecord(index)),

    updateSubSubCategoryRecord: (data) =>
      dispatch(subSubCategoryAction.updateSubSubCategoryRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editSubSubCategoryContainer);
