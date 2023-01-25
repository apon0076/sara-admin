import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateAds from '../../../components/settings/ads/CreateAds'
import { toast, ToastContainer } from 'react-toastify'
import authenticationService from '../../../store/services/authenticationService'
import * as adsAction from '../../../store/actions/adsAction'
import Resizer from 'react-image-file-resizer'

class createAdsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adsInfoId: '',
      adsName: '',
      adsDetails: '',
      adsTypeId: '',
      imageTypeId: '',
      adsLocationId: '',
      isChecked: true,
      items: [],
      advertisingImages: [],
      adsItems: {
        adsImageId: '',
        adsImageUrl: '',
        adsImageUrlFileName: '',
        file: '',
        files: [],
        fileName: '',
        uploadedImages: [],
        adsImageSeoName: '',
        displayOrder: '',
        adsLink: '',
        isActive: "Y",
        isDelete: 'N',
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveAds = this.saveAds.bind(this)
    this.addItem = this.addItem.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.clearData = this.clearData.bind(this)
    this.sliderImageUrlHandler = this.sliderImageUrlHandler.bind(this)
    this.largeBannerImageUrlHandler = this.largeBannerImageUrlHandler.bind(this)
    this.mediumBannerImageUrlHandler =
      this.mediumBannerImageUrlHandler.bind(this)
    this.smallBannerImageUrlHandler = this.smallBannerImageUrlHandler.bind(this)
    this.noticeImageUrlHandler = this.noticeImageUrlHandler.bind(this)
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    //End Temporary Authentication
  }

  sliderImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            1185,
            439,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('slider Image Selected.')
            },
            'base64',
            1185,
            439
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  largeBannerImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            1090,
            245,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('large Banner Image Selected.')
            },
            'base64',
            1090,
            245
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  mediumBannerImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            530,
            285,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('medium Banner Image Selected.')
            },
            'base64',
            530,
            285
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  smallBannerImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            390,
            193,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('small Banner Image Selected.')
            },
            'base64',
            390,
            193
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  noticeImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            720,
            720,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('Notice Image Selected.')
            },
            'base64',
            720,
            720
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  popupImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            720,
            720,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('Notice Image Selected.')
            },
            'base64',
            720,
            720
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  desktopBannerImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error('Select a valid image.')
        return false
      }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            1620,
            250,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('Notice Image Selected.')
            },
            'base64',
            1620,
            250
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  mobileBannerImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            1080,
            200,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                adsImageUrl: uri,
                adsImageUrlFileName: imageFile.name,
              })
              toast.success('Notice Image Selected.')
            },
            'base64',
            1080,
            200
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  _uploadImageCallBack(file) {
    let uploadedImages = this.state.uploadedImages

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }

    uploadedImages.push(imageObject)

    this.setState({ uploadedImages: uploadedImages })
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } })
    })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const { target } = e
    switch (target.name) {
      case 'adsInfoId':
        this.setState({ adsInfoId: target.value })
        break
      case 'adsName':
        this.setState({ adsName: target.value })
        break
      case 'adsDetails':
        this.setState({ adsDetails: target.value })
        break
      case 'adsTypeId':
        this.setState({ adsTypeId: target.value * 1 })
        break
      case 'imageTypeId':
        this.setState({ imageTypeId: target.value * 1 })
        break
      case 'adsLocationId':
        this.setState({ adsLocationId: target.value * 1 })
        break
      default:
    }
  }

  addItem(e) {
    e.preventDefault()
    const newItem = this.state?.adsItems
    let { adsImageSeoName, adsLink,displayOrder } = newItem
    if (newItem?.adsImageSeoName && newItem?.adsLink !== '') {
      const items = [...this.state?.items, newItem]
      const advertisingImages = [
        ...this.state?.advertisingImages,
        {
          adsImageId: 0,
          adsImageUrl: this.state?.adsImageUrl,
          adsImageSeoName,
          adsLink,
          isActive: this.state?.isChecked === true ? 'Y' : 'N',
          adsInfoId: 0,
          displayOrder
        },
      ]
      this.setState({
        advertisingImages: advertisingImages,
        items: items,
        adsItems: {
          adsImageId: '',
          adsImageUrl: '',
          adsImageSeoName: '',
          adsLink: '',
          isActive: 'Y',
          adsInfoId: 0,
          displayOrder:''
        },
      })
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const { target } = e
    switch (target.name) {
      case 'adsImageId':
        this.setState({
          adsItems: {
            ...this.state?.adsItems,
            adsImageId: target.value,
          },
        })
        break
      case 'adsImageSeoName':
        this.setState({
          adsItems: {
            ...this.state?.adsItems,
            adsImageSeoName: target.value,
          },
        })
        break
      case 'displayOrder':
        this.setState({
          adsItems: {
            ...this.state?.adsItems,
            displayOrder: Number(target.value),
          },
        })
        break
      case 'adsImageUrl':
        this.setState({
          adsItems: {
            ...this.state?.adsItems,
            adsImageUrl: target.value,
          },
        })
        break
      case 'adsLink':
        this.setState({
          adsItems: {
            ...this.state?.adsItems,
            adsLink: target.value,
          },
        })
        break
      case 'isChecked':
        this.setState({ isChecked: !this.state?.isChecked,
          adsItems: {
            ...this.state?.adsItems,
            isActive: target.checked,
          }, })
        break
      case 'adsInfoId':
        this.setState({
          adsItems: {
            ...this.state?.adsItems,
            adsInfoId: target.value,
          },
        })
        break
      default:
    }
  }

  deleteItem(i) {
    const filteredItems = [
      ...this.state?.advertisingImages.slice(0, i),
      ...this.state?.advertisingImages.slice(i + 1),
    ]
    this.setState({
      advertisingImages: filteredItems,
    })
  }

  saveAds = async (e) => {
    e.preventDefault()
    const data = {
      adsInfoId: this.state?.adsInfoId * 1,
      adsName: this.state?.adsName,
      adsDetails: this.state?.adsDetails,
      adsTypeId: this.state?.adsTypeId * 1,
      imageTypeId: this.state?.imageTypeId * 1,
      adsLocationId: this.state?.adsLocationId * 1,
      isDelete: 'N',
    }

    if (data?.adsInfoId === '') {
      data.adsInfoId = 0
    }

    var finalData = {}

    finalData = {
      adsInfoId: data?.adsInfoId,
      adsName: data?.adsName,
      adsDetails: data?.adsDetails,
      adsTypeId: data?.adsTypeId,
      imageTypeId: data?.imageTypeId,
      adsLocationId: data?.adsLocationId,
      advertisingImages: this.state?.advertisingImages,
      isDelete: 'N',
    }

    const result = await this.props.createAdsRecord(finalData)
    if (result.type === 'CREATE_ADS_SUCCESS') {
      toast.success('Ads Created Successfully')
      setTimeout(() => {
        this.props.history.push('AdsList')
      }, 2500)
      this.clearData()
    } else {
      toast.error("Ads Couldn't be Created")
      setTimeout(() => {
        this.props.history.push('CreateAds')
      }, 2500)
    }
    e.preventDefault()
  }

  clearData = (e) => {
    this.setState({
      adsInfoId: '',
      adsName: '',
      adsDetails: '',
      adsTypeId: '',
      imageTypeId: '',
      adsLocationId: '',
      items: [],
      advertisingImages: [],
      adsItems: {
        adsImageId: '',
        adsImageUrl: '',
        file: '',
        files: [],
        fileName: '',
        uploadedImages: [],
        adsImageSeoName: '',
        adsLink: '',
        isActive: true,
      },
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <ToastContainer autoClose={1500} />
        <CreateAds
          key='CreateAds'
          name='Create Ads'
          {...this.state}
          handleChange={this.handleChange}
          sliderImageUrlHandler={this.sliderImageUrlHandler}
          largeBannerImageUrlHandler={this.largeBannerImageUrlHandler}
          mediumBannerImageUrlHandler={this.mediumBannerImageUrlHandler}
          smallBannerImageUrlHandler={this.smallBannerImageUrlHandler}
          noticeImageUrlHandler={this.noticeImageUrlHandler}
          popupImageUrlHandler={this.popupImageUrlHandler}
          desktopBannerImageUrlHandler={this.desktopBannerImageUrlHandler}
          mobileBannerImageUrlHandler={this.mobileBannerImageUrlHandler}
          _uploadImageCallBack={this._uploadImageCallBack}
          values={this.values}
          saveAds={this.saveAds}
          addItem={this.addItem}
          handleInput={this.handleInput}
          deleteItem={this.deleteItem}
          clearData={this.clearData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.adsReducer?.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAdsRecord: () => dispatch(adsAction.getAdsRecord()),
    createAdsRecord: (data) => dispatch(adsAction.createAdsRecord(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createAdsContainer)
