import React, { Component } from "react"
import EditHomePageSlider from "../../components/homePageSlider/EditHomePageSlider"

////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux"

import * as homePageSliderAction from "../../store/actions/homePageSliderAction"
// import {
//   getHomePageSliderByIdRecord,
//   updateHomePageSliderRecord,
// } from "../../store/actions/homePageSliderAction";
// import homePageSliderReducer from "../../store/reducers/homePageSliderReducer";
import Url from '../../utils/baseUrl'
////////////////END/////////////////

const baseUrl = Url

class editHomePageSliderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderId: "",
      sliderName: "",
      description: "",
      url: "",
      displayOrder: "",
      imageName: "",
      sliderImage: "",
      imageType: "",
      files: [],
      selectedFile: null,
      activeYn: "",
      sliderImageDup: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.fileUploadHandler = this.fileUploadHandler.bind(this)
    this.clearData = this.clearData.bind(this)
    this.onImgLoad = this.onImgLoad.bind(this)
  }

  componentDidMount = async () => {
    //////debugger;

    await this.props.getHomePageSliderByIdRecord(this.props.match.params.id)
    //////debugger;
    this.props.sliders.forEach((element) => {
      this.setState({
        sliderId: element.sliderId,
        sliderName: element.sliderName,
        description: element.description,
        url: element.url,
        displayOrder: element.displayOrder,
        imageName: element.imageName,
        imageType: element.imageType,
        activeYn: element.activeYn,
        sliderImage: baseUrl.concat(element.sliderImage),
        sliderImageDup: element.sliderImage,
      })
    })
  }

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.fileSelectedHandler(e)
    }
  }

  handleChange = (e) => {
    const { target } = e
    switch (target.name) {
      case "sliderId":
        this.setState({ sliderId: target.value })
        break

      case "sliderName":
        this.setState({ sliderName: target.value })
        break

      case "description":
        this.setState({ description: target.value })
        break

      case "url":
        this.setState({ url: target.value })
        break
      case "displayOrder":
        this.setState({ displayOrder: target.value })
        break

      case "selectedFile":
        this.setState({ selectedFile: target.files[0] })
        break

      case "activeYn":
        this.setState({ activeYn: target.value })
        break

      default:
    }
  }

  fileSelectedHandler = (e) => {
    //////debugger;

    this.setState({ file: e.target.files[0] })
    if (e.target.files.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {

        this.sliderImage = e.target.result

        this.setState({
          imgSrc: [reader.result],
        })

        this.setState({ sliderImage: e.target.result })
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  fileMultiSelectedHandler = (e) => {
    // let result = "";
    // let selectedFile = e.target.files[0];
    // for (var i = 0; i < selectedFile.length; i++) {
    //   result += selectedFile[i];
    // }
  }

  onImgLoad = ({ target: img }) => {
    this.setState({
      width: img.width,
      height: img.height,
    })
  }

  fileUploadHandler = async (e) => {
    e.preventDefault()
    //////debugger;
    /*     
      let isActive = "";
      let isChecked = this.activeYn.current.checked;
      if (isChecked === true) {
        isActive = "Y";
      } else {
        isActive = "N";
      }
    */
    // var result = this.validate(this.state.categoryName);

    let file = this.state.file
    let data = ""
    if (typeof file === undefined || file === null) {
      data = {
        sliderId: this.state.sliderId,
        sliderName: this.state.sliderName,
        description: this.state.description,
        url: this.state.url,
        displayOrder: this.state.displayOrder,
        imageName: this.state.imageName,
        sliderImage: this.state.sliderImageDup,
        imageType: this.state.imageType,
        activeYn: "Y",
      }
    } else {
      data = {
        sliderId: this.state.sliderId,
        sliderName: this.state.sliderName,
        description: this.state.description,
        url: this.state.url,
        displayOrder: this.state.displayOrder,
        imageName: this.state.file.name,
        sliderImage: this.state.sliderImage,
        imageType: this.state.file.type,
        activeYn: "Y",
      }
    }

    if (data.sliderId === "") {
      data.sliderId = 0
    }

    await this.props.updateHomePageSliderRecord(data)
    this.clearData(e)
    this.props.history.push("/HomePageSliderList")
  }

  clearData = (e) => {
    e.preventDefault()
    this.setState({
      sliderId: "",
      sliderName: "",
      description: "",
      url: "",
      displayOrder: "",
      imageName: "",
      sliderImage: "",
      imageType: "",
      activeYn: "",
      files: undefined,
      imgSrc: undefined,
    })
  }

  render() {
    return (
      <div id="wrapper">
        <EditHomePageSlider
          key="EditHomePageSlider"
          name="Update Home Page Slider"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          fileSelectedHandler={this.fileSelectedHandler}
          fileUploadHandler={this.fileUploadHandler}
          onImgLoad={this.onImgLoad}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sliders: state.homePageSliderReducer.sliders,
  data: state.homePageSliderReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateHomePageSliderRecord: (data) =>
      dispatch(homePageSliderAction.updateHomePageSliderRecord(data)),
    getHomePageSliderByIdRecord: (index) =>
      dispatch(homePageSliderAction.getHomePageSliderByIdRecord(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editHomePageSliderContainer)
