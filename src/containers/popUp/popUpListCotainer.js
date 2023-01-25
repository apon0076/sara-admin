import React, { Component } from "react";
import PopUpList from "../../components/popUp/PopUpList";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as popUpAction from "../../store/actions/popUpAction";
////////////////END/////////////////

class popUpListCotainer extends Component {
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
        this.setState({ 
          searchId: target.value 
        });

        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getPopUpRecord();
        } else {
          await this.props.getProductByIdRecord(searchBy);
        }
        break;

      default:
    }
  };

  componentDidMount = async () => {
    await this.props.getPopUpRecord();
  };

  deletePopUpBanner = async (id, imageName) => {

    const data = {
      id: id,
      imageName: imageName,
    };

    await this.props.deletePopUpRecord(data);
    await this.props.getPopUpRecord();
  };

  render() {
    return (
      <PopUpList
        key="PopUpList"
        {...this.state}
        banners={this.props.banners}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deletePopUpBanner={this.deletePopUpBanner}
      />
    );
  }
}

// Making available in  props
const mapStateToProps = (state) => ({
  data: state.popUpReducer.data,
  banners: state.popUpReducer.banners,
  loading: state.popUpReducer.loading,
  error: state.popUpReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteProduct: state.deleteProduct,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPopUpRecord: () => 
      dispatch(popUpAction.getPopUpRecord()),
    getPopUpByIdRecord: (index) =>
      dispatch(popUpAction.getPopUpByIdRecord(index)),
    deletePopUpRecord: (data) => 
      dispatch(popUpAction.deletePopUpRecord(data)),
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(popUpListCotainer);
