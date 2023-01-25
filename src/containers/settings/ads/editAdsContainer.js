import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import authenticationService from '../../../store/services/authenticationService'
import * as adsAction from '../../../store/actions/adsAction'
import EditAds from '../../../components/settings/ads/EditAds'

class editAdsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adsDetails: '',
      adsInfoId: '',
      adsLocationId: '',
      adsName: '',
      adsTypeId: '',
      imageTypeId: '',
      adsImages: [],
      isDelete: 'N',
      //////////
      width: 0,
      height: 0,
      erroradsDetails: '',
      erroradsInfoId: '',
      erroradsLocationId: '',
      erroradsName: '',
      erroradsTypeId: '',
      errorimageTypeId: '',
    }

    this.editAds = this.editAds.bind(this)
    this.displayOrderChange = this.displayOrderChange.bind(this)
    this.sliderImageUrlHandler = this.sliderImageUrlHandler.bind(this)
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.keyPressed = this.keyPressed.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.renderPhotos = this.renderPhotos.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
      this.setState({
        adsDetails: this.props?.history?.location?.state?.rowData?.adsDetails,
        adsInfoId: this.props?.history?.location?.state?.rowData?.adsInfoId,
        adsLocationId:
          this.props?.history?.location?.state?.rowData?.adsLocationId,
        adsName: this.props?.history?.location?.state?.rowData?.adsName,
        adsTypeId: this.props?.history?.location?.state?.rowData?.adsTypeId,
        imageTypeId: this.props?.history?.location?.state?.rowData?.imageTypeId,
        adsImages: this.props?.history?.location?.state?.rowData?.adsImages,
        isDelete: this.props?.history?.location?.state?.rowData?.isDelete,
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

  keyPressed = (index, event) => {
    let value = event.target.value
    this.setState(
      this.state.adsImages.map((d, idx) => {
        if (index === idx) {
          d[event.target.name] = value
        }
      })
    )
  }

  displayOrderChange = (index, event) => {
    let value = event.target.value
    this.setState(
      this.state.adsImages.map((d, idx) => {
        if (index === idx) {
          d[event.target.name] = Number(value)
        }
      })
    )
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const { value } = e.target
    const { target } = e

    switch (target.name) {
      case 'adsName':
        this.setState({
          adsName: target.value,
          erroradsName:
            value.length < 3 ? 'Atleast 3 characaters required' : '',
        })
        break
      case 'adsDetails':
        this.setState({
          adsDetails: target.value,
          erroradsDetails:
            value.length < 3 ? 'Atleast 3 characaters required' : '',
        })
        break
      case 'adsTypeId':
        this.setState({
          adsTypeId: target.value,
          erroradsTypeId: target.value === '' ? 'required field' : '',
        })
        break
      case 'imageTypeId':
        this.setState({
          imageTypeId: target.value * 1,
          errorimageTypeId: target.value === '' ? 'required field' : '',
        })
        break
      case 'adsLocationId':
        this.setState({
          adsLocationId: target.value * 1,
          erroradsLocationId: target.value === '' ? 'required field' : '',
        })
        break
      default:
    }
  }

  handleParentCheck = (event, index) => {
    let value = event.target.checked
    this.setState(
      this.state.adsImages.map((d, idx) => {
        if (index === idx) {
          d[event.target.name] = value === true ? 'Y' : 'N'
        }
      })
    )
  }

  sliderImageUrlHandler = (index, event) => {
    let w, h

    if (this.state.imageTypeId === 1) {
      h = 439
      w = 1185
    } else if (this.state.imageTypeId === 2) {
      h = 245
      w = 1090
    } else if (this.state.imageTypeId === 3) {
      h = 285
      w = 530
    } else if (this.state.imageTypeId === 4) {
      h = 439
      w = 126
    } else if (this.state.imageTypeId === 5) {
      h = 720
      w = 720
    } else if (this.state.imageTypeId === 6) {
      h = 720
      w = 720
    }else if (this.state.imageTypeId === 7) {
      h = 1620
      w = 250
    }else if (this.state.imageTypeId === 8) {
      h = 1080
      w = 200
    }
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
    if (imageFile) {
      // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      //   toast.error('Select a valid image.')
      //   return false
      // }

      //2)    CHECK THE SIZE OF FILE
      let aceptedSize = imageFile.size / 1000
      if (aceptedSize > 300) {
        toast.error('Size must be less than 300 kb')
        return false
      }

      //3)     CHECK THE HEIGHT AND WIDTH OF THE IMAGE
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', (event) => {
        const _loadedImageUrl = event.target.result
        const image = document.createElement('img')
        image.src = _loadedImageUrl

        image.addEventListener('load', () => {
          const { width, height } = image
          if (width !== w || height !== h) {
            toast.error(`Size must be of ${w} x ${h} pixels`)
            return false
          } else {
            this.setState({
              adsImageUrlFileName: imageFile.name,
            })
            const reader = new FileReader()
            reader.readAsDataURL(imageFile)
            reader.onload = (e) => {
              this.state.adsImages.map((d, idx) => {
                if (index === idx) {
                  d.adsImageUrl = e.target.result
                }
              })
              toast.success('Image Selected.')
            }
          }
        })
      }
      )
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

  renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img className='product_upload_image' src={photo} alt='' key={photo} />
      )
    })
  }

  editAds = async (e) => {
    e.preventDefault()
    if (this.state?.adsName === '') {
      let msg = 'Content Name is required!!!'
      toast.error(msg)
      setInterval(() => {}, 3000)
      return
    }

    if (this.state?.adsDetails === '') {
      let msg = 'Content Details is required!!!'
      toast.error(msg)
      setInterval(() => {}, 3000)
      return
    }

    if (this.state?.adsTypeId === '') {
      let msg = 'Content Type is required!!!'
      toast.error(msg)
      setInterval(() => {}, 3000)
      return
    }

    if (this.state?.imageTypeId === '') {
      let msg = 'Content Type is required!!!'
      toast.error(msg)
      setInterval(() => {}, 3000)
      return
    }

    if (this.state?.adsLocationId === '') {
      let msg = 'Content Location is required!!!'
      toast.error(msg)
      setInterval(() => {}, 3000)
      return
    }

    let finalData = {
      adsInfoId: this.state?.adsInfoId,
      adsName: this.state?.adsName,
      adsDetails: this.state?.adsDetails,
      adsTypeId: this.state?.adsTypeId * 1,
      imageTypeId: this.state?.imageTypeId * 1,
      adsLocationId: this.state?.adsLocationId * 1,
      advertisingImages: this.state?.adsImages,
      isDelete: this.state?.isDelete,
    }

    const result = await this.props.createAdsRecord(finalData)

    if (result.type === 'CREATE_ADS_SUCCESS') {
      toast.success('Ads Updated Successfully')
      setTimeout(() => {
        this.props.history.push('AdsList')
      }, 2500)
      this.resetForm()
    }
    if (result.type === 'CREATE_ADS_ERROR') {
      toast.error('Something Went Wrong! Please Try Again Later...')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      adsInfoId: '',
      adsName: '',
      adsDetails: '',
      adsTypeId: '',
      imageTypeId: '',
      adsLocationId: '',
      items: [],
      advertisingImages: [],
      displayOrder:'',
      adsItems: {
        adsImageId: '',
        adsImageUrl: '',
        file: '',
        files: [],
        fileName: '',
        uploadedImages: [],
        adsImageSeoName: '',
        adsLink: '',
        isActive: '',
      },
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <EditAds
          key='EditAds'
          name='Edit Ads'
          {...this.state}
          handleChange={this.handleChange}
          keyPressed={this.keyPressed}
          displayOrderChange={this.displayOrderChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          editAds={this.editAds}
          resetForm={this.resetForm}
          sliderImageUrlHandler={this.sliderImageUrlHandler}
          _uploadImageCallBack={this._uploadImageCallBack}
          renderPhotos={this.renderPhotos}
          data={this.props?.history?.location?.state?.rowData}
        />
        <ToastContainer autoClose={1500} />
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

export default connect(mapStateToProps, mapDispatchToProps)(editAdsContainer)
