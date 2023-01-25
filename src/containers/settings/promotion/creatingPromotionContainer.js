import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as productAction from '../../../store/actions/productAction'
import * as promotionAction from '../../../store/actions/promotionAction'
import authenticationService from '../../../store/services/authenticationService'
import CreatePromotion from '../../../components/settings/promotion/CreatePromotion'
import Resizer from 'react-image-file-resizer'

class creatingPromotionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promotionId: 0,
      name: '',

      startDate: '',
      endDate: '',

      imageType: '',
      file: '', // to store the Single pictures in base64 format.
      files: [],

      image: [],

      isActive: true,

      errorPromotionName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.savePromotion = this.savePromotion.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.promotionImageUrlHandler = this.promotionImageUrlHandler.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  promotionImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]
    var fileInput = false
    //1)    CHECK IF IT'S A IMAGE
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
            180,
            180,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                image: uri,
                brandLogoUrlFileName: imageFile.name,
              })
              toast.success('Image Selected.')
            },
            'base64',
            180,
            180
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }

      // //2)    CHECK THE SIZE OF FILE
      // let aceptedSize = imageFile.size / 1000
      // if (aceptedSize > 150) {
      //   toast.error('Size must be less than 150 kb')
      //   return false
      // }

      // //3)     CHECK THE HEIGHT AND WIDTH OF THE IMAGE
      // const reader = new FileReader()
      // reader.readAsDataURL(imageFile)
      // reader.addEventListener('load', (event) => {
      //   const _loadedImageUrl = event.target.result
      //   const image = document.createElement('img')
      //   image.src = _loadedImageUrl

      //   image.addEventListener('load', () => {
      //     const { width, height } = image
      //     if (width !== 180 || height !== 180) {
      //       toast.error('Size must be of 180 x 180 pixels')
      //       return false
      //     } else {
      //       this.setState({
      //         brandLogoUrlFileName: imageFile.name,
      //       })
      //       const reader = new FileReader()
      //       reader.readAsDataURL(imageFile)
      //       reader.onload = (e) => {
      //         this.setState({
      //           image: e.target.result,
      //         })
      //         toast.success('Image Selected.')
      //       }
      //     }
      //   })
      // })
    }
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

    // await this.props.getDiscountTypeRecord()
    // await this.props.getProductRecord()
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.savePromotion(e)
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'name':
        this.setState({
          name: target.value,
          errorPromotionName:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      default:
    }
  }

  handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    var fileInput = false
    if (!imageFile) {
      return
    }
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        this.setState({
          image: '',
        })
        toast.error('Select a valid image.')
        return false
      }
    } else {
      return
    }

    fileInput = true
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          imageFile,
          180,
          180,
          'JPEG',
          100,
          0,
          (uri) => {
            this.setState({
              image: uri,
              brandLogoUrlFileName: imageFile.name,
            })
            toast.success('Image Selected.')
          },
          'base64',
          180,
          180
        )
      } catch (err) {
        toast.error('Something went wrong!')
      }
    }
    
    // //2)    CHECK THE SIZE OF FILE
    // let aceptedSize = imageFile && imageFile.size / (1 * 1000)
    // if (aceptedSize > 150) {
    //   toast.error('Size must be less than 150 kb')
    //   this.setState({
    //     image: '',
    //   })
    //   return
    //   //return false
    // } else {
    //   //3)     CHECK THE HEIGHT AND WIDTH OF THE IMAGE
    //   const reader = new FileReader()
    //   reader.readAsDataURL(imageFile)
    //   reader.addEventListener('load', (event) => {
    //     const _loadedImageUrl = event.target.result

    //     const image = document.createElement('img')
    //     this.setState({
    //       image: '',
    //     })
    //     image.src = _loadedImageUrl
    //     this.setState({
    //       image: '',
    //     })
    //     image.addEventListener('load', () => {
    //       const { width, height } = image
    //       if (width !== 180 || height !== 180) {
    //         toast.error('Size must be of 180 x 180 pixels')
    //         this.setState({
    //           image: '',
    //         })
    //         return
    //         //  return false
    //       } else {
    //         const reader = new FileReader()
    //         reader.readAsDataURL(imageFile)
    //         reader.onload = (e) => {
    //           this.setState({
    //             image: e.target.result,
    //           })
    //           toast.success('Image Selected.')
    //         }
    //       }
    //     })
    //   })
    // }
  }

  handleStartDate = (date, dateString, id) => {
    this.setState({
      startDate: dateString,
    })
  }

  handleEndDate = (date, dateString, id) => {
    this.setState({
      endDate: dateString,
    })
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  savePromotion = async (e) => {
    e.preventDefault()

    if (this.state.name === '') {
      let msg = 'Promotion name should not be empty!!!'
      toast.error(msg)
      setTimeout(() => {}, 2000)
      return
    }

    if (this.state.image === '') {
      let msg = 'Upload an Promotion Image!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.startDate === '') {
      let msg = 'Start date should not be empty!!!'
      toast.error(msg)
      setTimeout(() => {}, 2000)
      return
    }

    if (this.state.endDate === '') {
      let msg = 'End date should not be empty!!!'
      toast.error(msg)
      setTimeout(() => {}, 2000)
      return
    }

    const data = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      image: this.state.image,
      promotionId: this.state.promotionId,
      name: this.state.name,
      isActive: this.state.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdatPromotionRecord(data)

    // if (result && result.payload.success.succeed === true) {
    //   toast.success("Promotion Created Successfully")
    //   setTimeout(() => {
    //     this.props.history.push("PromotionList")
    //   }, 2500)
    //   this.resetForm()
    // } else if (result && result.payload.success.succeed === false) {
    //   toast.error("Something went wrong, Please try again")
    //   setTimeout(() => {
    //     this.resetForm()
    //   }, 2500)
    // } else
    if (result.type === 'CREATE_OR_UPDATE_PROMOTION_SUCCESS') {
      toast.success('Promotion Created Successfully')
      setTimeout(() => {
        this.props.history.push('PromotionList')
      }, 2500)
      this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      startDate: '',
      endDate: '',
      name: '',
      isActive: false,
      image: '',
      file: '', // to store the Single pictures in base64 format.
      files: '',
      fileName: '',
      errorPromotionName: '',
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <CreatePromotion
          key='CreatePromotion'
          name='Add Promotion Type'
          {...this.state}
          handleChange={this.handleChange}
          handleStartDate={this.handleStartDate}
          handleEndDate={this.handleEndDate}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          savePromotion={this.savePromotion}
          resetForm={this.resetForm}
          promotionImageUrlHandler={this.promotionImageUrlHandler}
          handleImageChange={this.handleImageChange}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.promotionReducer.data,
  products: state.productReducer.products,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdatPromotionRecord: (data) =>
      dispatch(promotionAction.createOrUpdatePromotionRecord(data)),
    getProductRecord: () => dispatch(productAction.getProductRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(creatingPromotionContainer)
