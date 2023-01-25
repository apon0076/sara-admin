import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { Component } from "react";
import Resizer from "react-image-file-resizer";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditBlogPost from "../../components/blog/EditBlogPost";
import * as blogCategoryAction from "../../store/actions/blogCategoryAction";
import * as blogPostAction from "../../store/actions/blogPostAction";
import * as profileAction from "../../store/actions/profileAction";
import authenticationService from "../../store/services/authenticationService";
import sellerService from "../../store/services/sellerService";
class editBlogPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: 0,
      postCategoryId: "",
      selectedPostCategoryId: "",
      blogCategoryName: "",
      errorBlogCategoryName: "",
      postTitle: "",
      errorPostTitle: "",
      postDescription: "",
      errorPostDescription: "",
      featureImagePath: "",
      metaKeywords: "",
      errorMetaKeywords: "",
      metaDescription: "",
      errorMetaDescription: "",
      externalLink: "",
      errorExternalLink: "",
      metaAuthor: "",
      errorMetaAuthor: "",
      status: "Y",
      isActive: true,
      ip: "",
      blogCategories: [],
      showFile: "",
      file: "", // to store the Single pictures in base64 format.
      files: [],
      fileName: "",
      uploadedImages: [],
      editorState: EditorState.createEmpty(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.featureImageHandler = this.featureImageHandler.bind(this);
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this);
    this.postDescriptionChange = this.postDescriptionChange.bind(this);
    this.updateBlogPost = this.updateBlogPost.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleParentCheck = this.handleParentCheck.bind(this);
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId();
    if (roleId === "1") {

      this.setState({
        authenticated: true,
        loginSuccessful: true,
        postId: this.props.location.state.rowData.postId,
        postCategoryId: this.props.location.state.rowData.postCategoryId,
        blogCategoryName: this.props.location.state.rowData.blogCategoryName,
        postTitle: this.props.location.state.rowData.postTitle,
        postDescription: this.props.location.state.rowData.postDescription,
        featureImagePath: this.props.location.state.rowData.featureImagePath,
        metaKeywords: this.props.location.state.rowData.metaKeywords,
        metaDescription: this.props.location.state.rowData.metaDescription,
        metaAuthor: this.props.location.state.rowData.metaAuthor,
        externalLink: this.props.location.state.rowData.externalLink,
        status: this.props.location.state.rowData.status === "Y" ? true : false,
        isActive:
          this.props.location.state.rowData.isActive === "Y" ? true : false,
      });
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      });
      this.props.history.push("/Login");
    }
    //End Temporary Authentication
    await this.props.getBlogCategoryRecord();
    this.setState({ blogCategories: this.props.blogCategoryDetails });

    let userId = await sellerService.getEmployeeId();
    await this.props.getProfileByIdRecord(userId);
    {
      this.props.profileById.map((profile) =>
        this.setState({
          metaAuthor: profile.adminName,
        })
      );
    }
    const html = this.state.postDescription;
    const blocksFromHTML = convertFromHTML(html);
    const content = ContentState.createFromBlockArray(blocksFromHTML);
    this.setState({
      editorState: EditorState.createWithContent(content),
    });
  };

  featureImageHandler = (event) => {
    const imageFile = event.target.files[0];

    var fileInput = false;
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error("Select a valid image.");
        return false;
      }
      fileInput = true;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            1200,
            628,
            "JPEG",
            100,
            0,
            (uri) => {
              this.setState({
                featureImagePath: uri,
                showFile: URL.createObjectURL(imageFile),
                featureImageName: imageFile.name,
              });
              toast.success("Image Selected.");
            },
            "base64",
            1200,
            628
          );
        } catch (err) {
          toast.error("Something went wrong!");
        }
      }
    }
  };

  _uploadImageCallBack(file) {
    let uploadedImages = this.state.uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    uploadedImages.push(imageObject);

    this.setState({ uploadedImages: uploadedImages });
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  }

  postDescriptionChange = (editorState) => {
    let value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
      postDescription: value,
      errorPostDescription:
        value.length < 10 ? "Atleast 10 characaters required" : "",
    });
  };

  // postDescriptionChange = (editorState) => {
  //   this.setState({
  //     editorState,
  //     postDescription: editorState.data,
  //     errorPostDescription:
  //       editorState.data.length < 10 ? "Atleast 10 characaters required" : "",
  //   });
  // };

  handleChange = (e) => {
    const { target } = e;
    const { value } = e.target;
    switch (target.name) {
      case "selectedPostCategoryId":
        this.setState({
          selectedPostCategoryId: target.value,
          postCategoryId: target.value.blogCategoryId,
          errorBlogCategoryName:
            target.value.length < 1 ? "Select one category" : "",
        });
        break;
      case "postTitle":
        this.setState({
          postTitle: target.value,
          errorPostTitle:
            value.length < 5 ? "Atleast 5 characaters required" : "",
        });
        break;
      case "metaKeywords":
        this.setState({
          metaKeywords: target.value,
          errorMetaKeywords:
            value.length < 3 ? "Atleast 3 characaters required" : "",
        });
        break;
      case "metaDescription":
        this.setState({
          metaDescription: target.value,
          errorMetaDescription:
            value.length < 10 ? "Atleast 10 characaters required" : "",
        });
        break;
      case "metaAuthor":
        this.setState({
          metaAuthor: target.value,
          errorMetaAuthor:
            value.length < 10 ? "Atleast 10 characaters required" : "",
        });
        break;
      case "externalLink":
        this.setState({
          externalLink: target.value,
        });
        break;
      default:
    }
  };

  handleParentCheck = (e) => {
    const isActive = e.target.checked;
    this.setState({ isActive });
  };

  updateBlogPost = async (e) => {
    e.preventDefault();
    if (this.state.postCategoryId === "") {
      let msg = "Please Select a Category!!!";
      toast.error(msg);
      return;
    }

    if (this.state.postTitle === "") {
      let msg = "Post Title is required!!!";
      toast.error(msg);
      return;
    }

    if (this.state.postDescription === "") {
      let msg = "Post Description is required!!!";
      toast.error(msg);
      return;
    }

    if (this.state.metaKeywords === "") {
      let msg = "Meta keywords are required!!!";
      toast.error(msg);
      return;
    }

    if (this.state.metaDescription === "") {
      let msg = "Meta Description is required!!!";
      toast.error(msg);
      return;
    }

    if (this.state.metaAuthor === "") {
      let msg = "Meta Author is required!!!";
      toast.error(msg);
      return;
    }

    if (this.state.featureImagePath === "") {
      let msg = "Plese Upload a Blog Post Image !!";
      toast.error(msg);
      return;
    }

    const data = {
      postId: this.state.postId,
      postCategoryId: this.state.postCategoryId,
      postTitle: this.state.postTitle,
      postDescription: this.state.postDescription,
      featureImagePath: this.state.featureImagePath,
      metaKeywords: this.state.metaKeywords,
      metaDescription: this.state.metaDescription,
      metaAuthor: this.state.metaAuthor,
      externalLink: this.state.externalLink,
      status: this.state.status,
      isActive: this.state.isActive === true ? "Y" : "N",
      ip: this.state.ip,
    };

    const result = await this.props.createOrUpdateBlogPostRecord(data);

    if (result && result?.payload?.success?.succeed === true) {
      toast.success("Blog Post Updated Successfully");
      setTimeout(() => {
        this.props.history.push("BlogPostList");
      }, 2500);
      this.resetForm();
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error("Something went wrong, Please try again");
      setTimeout(() => {
        this.resetForm();
      }, 2500);
    } else if (result.type === "CREATE_OR_UPDATE_BLOG_POST_SUCCESS") {
      toast.success("Blog Post Updated Successfully");
      setTimeout(() => {
        this.props.history.push("BlogPostList");
      }, 2500);
      this.resetForm();
    } else {
      toast.error("Something went wrong, Please try again");
      setTimeout(() => {
        this.resetForm();
      }, 2500);
    }
  };

  resetForm = () => {
    this.setState({
      postCategoryId: "",
      postTitle: "",
      errorPostTitle: "",
      postDescription: "",
      errorPostDescription: "",
      featureImagePath: "",
      metaKeywords: "",
      errorMetaKeywords: "",
      metaDescription: "",
      errorMetaDescription: "",
      metaAuthor: "",
      errorMetaAuthor: "",
      externalLink: "",
      errorExternalLink: "",
      status: "Y",
      isActive: false,
      ip: "",
      blogCategories: [],
      editorState: EditorState.createEmpty(),
    });
  };

  render() {
    return (
      <div id="wrapper">
        <EditBlogPost
          key="EditBlogPost"
          name="Edit Blog Post"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          updateBlogPost={this.updateBlogPost}
          featureImageHandler={this.featureImageHandler}
          _uploadImageCallBack={this._uploadImageCallBack}
          postDescriptionChange={this.postDescriptionChange}
          blogCategoryDetails={this.props.blogCategoryDetails}
        />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.blogCategoryReducer.data,
  blogCategoryDetails: state.blogCategoryReducer.blogCategoryDetails.filter(
    (item) => item.isActive === "Y"
  ),
  profileById: state.profileReducer.profileById,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileByIdRecord: (data) =>
      dispatch(profileAction.getProfileByIdRecord(data)),
    getBlogCategoryRecord: () =>
      dispatch(blogCategoryAction.getBlogCategoryRecord()),
    createOrUpdateBlogPostRecord: (data) =>
      dispatch(blogPostAction.createOrUpdateBlogPostRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editBlogPostContainer);
