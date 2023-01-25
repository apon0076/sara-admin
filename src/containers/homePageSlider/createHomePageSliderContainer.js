import React, { Component } from "react"
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux"
import * as homePageSliderAction from "../../store/actions/homePageSliderAction"
import CreateHomePageSlider from "../../components/homePageSlider/CreateHomePageSlider"
////////////////END//////////////////////////////////////////////////////////////

class homePageSliderListContainer extends Component {
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
    }

    this.handleChange = this.handleChange.bind(this)
    this.fileUploadHandler = this.fileUploadHandler.bind(this)
    this.clearData = this.clearData.bind(this)
    this.onImgLoad = this.onImgLoad.bind(this)
  }

  componentDidMount = () => {
    //this.refs.categoryName.focus();
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
    let result = ""
    let selectedFile = e.target.files[0]

    for (let i = 0; i < selectedFile.length; i++) {
      result = result + selectedFile[i]
    }

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
    /*     let isActive = "";
                let isChecked = this.activeYn.current.checked;
                if (isChecked === true) {
                  isActive = "Y";
                } else {
                  isActive = "N";
                } */
    //var result = this.validate(this.state.categoryName);

    //let file = this.state.file;

    const data = {
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

    if (data.sliderId === "") {
      data.sliderId = 0
    }

    await this.props.createHomePageSliderRecord(data)
    this.clearData(e)
  }

  editHomePageSlider = (id, name, activeYn) => {

    if (activeYn === "Y") {
      this.setState({ activeYn: this.state.checked })
    } else {
      this.setState({ activeYn: this.state.unchecked })
    }

    this.setState({ brandId: id, brandName: name })
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
        <CreateHomePageSlider
          key="CreateHomePageSlider"
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
  data: state.homePageSliderReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createHomePageSliderRecord: (data) =>
      dispatch(homePageSliderAction.createHomePageSliderRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homePageSliderListContainer)
