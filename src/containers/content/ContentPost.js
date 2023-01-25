/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ContentPostList from "../../components/content/ContentPostList";
import CreateContentPost from "../../components/content/CreateContentPost";
import EditContentPost from "../../components/content/EditContentPost";
import {
  createOrUpdateContentPostRecord,
  createOrUpdateContentPostReset,
  getContentPostRecord,
  getContentTypeRecord,
} from "../../store/actions/contentAction";

const ContentPost=()=> {
  let location = useHistory();
  const content_filter_tab = location?.location?.search?.substring(6);
  const [selectedContentTypeName, setSelectedContentTypeName] = useState("");
  const [pageNameCreate, setPageNameCreate] = useState("");
  const [pageLinkCreate, setPageLinkCreate] = useState("");
  const [displayOrderCreate, setDisplayOrderCreate] = useState(0);
  const [showInHomePageCreate, setShowInHomePageCreate] = useState(true);
  const [contentActiveCreate, setContentActiveCreate] = useState(true);
  const [contentDynamicCreate, setContentDynamicCreate] = useState(true);
  const [iconPath, setIconPath] = useState("");
  const [featureImagePath, setFeatureImagePath] = useState("");
  const [pageDescriptionCreate, setPageDescriptionCreate] = useState("");
  const [showImageFile, setShowImageFile] = useState("");
  const [showIconFile, setShowIconFile] = useState("");
  const [pageNameUpdate, setPageNameUpdate] = useState("");
  const [pageLinkUpdate, setPageLinkUpdate] = useState("");
  const [displayOrderUpdate, setDisplayOrderUpdate] = useState(0);
  const [showInHomePageUpdate, setShowInHomePageUpdate] = useState(true);
  const [contentActiveUpdate, setContentActiveUpdate] = useState(true);
  const [contentDynamicUpdate, setContentDynamicUpdate] = useState(true);
  const [pageDescriptionUpdate, setPageDescriptionUpdate] = useState("");
  const [singleContentData, setSingleContentData] = useState(null);
  const [contentId, setContentId] = useState(0);
  const dispatch = useDispatch();
  const iconImageHandler = (e) => {
    const iconImageFile = e?.target?.files[0];
    setShowIconFile(URL.createObjectURL(iconImageFile));
    var fileReader = new FileReader();
    var base64;
    fileReader.onload = function (fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      // Set Data
      setIconPath(base64);
    };
    // Convert data to base64
    fileReader.readAsDataURL(iconImageFile);
    e.target.value = null;
  };
  const featureImageHandler = (event) => {
    const imageFile = event.target.files[0];
    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false;
    if (imageFile) {
      fileInput = true;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            1000,
            1000,
            "JPEG",
            100,
            0,
            (uri) => {
              setFeatureImagePath(uri);
              setShowImageFile(URL.createObjectURL(imageFile));
              toast.success("Image Selected.");
            },
            "base64",
            1000,
            1000
          );
        } catch (err) {
          toast.error("Something went wrong!");
        }
      }
    }
  };
  const handlePageDescription = (event, editor) => {
    const data = editor.getData();
    content_filter_tab === "create" && setPageDescriptionCreate(data);

    content_filter_tab === "update" && setPageDescriptionUpdate(data);
  };
  const createContentPost = async (e) => {
    e.preventDefault();

    if (selectedContentTypeName?.contentTypeId === undefined) {
      toast.error("Content Type is required");
      return;
    }
    if (pageNameCreate === "") {
      toast.error("Page Name is required");
      return;
    }
    if (pageLinkCreate === "") {
      toast.error("Page Link is required");
      return;
    }
    const contentPostData = {
      contentTypeId: selectedContentTypeName?.contentTypeId,
      pageName: pageNameCreate,
      slug: pageLinkCreate,
      featuredImage: featureImagePath,
      pageDesciption: pageDescriptionCreate,
      others: "",
      iconPath: iconPath,
      showInHomePage: showInHomePageCreate === true ? "Y" : "N",
      isActive: contentActiveCreate === true ? "Y" : "N",
      isUrlStatus: contentDynamicCreate === true ? "Y" : "N",
      displayOrder: displayOrderCreate,
    };

    dispatch(createOrUpdateContentPostRecord(contentPostData));
  };

  const updateContentPost = async (e) => {
    e.preventDefault();
    if (selectedContentTypeName?.contentTypeId === undefined) {
      toast.error("Content Type is required");
      return;
    }
    if (pageNameUpdate === "") {
      toast.error("Page Name is required");
      return;
    }
    if (pageLinkUpdate === "") {
      toast.error("Page Link is required");
      return;
    }
    const contentPostUpdateData = {
      contentId: contentId,
      contentTypeId: selectedContentTypeName?.contentTypeId,
      pageName: pageNameUpdate,
      slug: pageLinkUpdate,
      featuredImage: featureImagePath ? featureImagePath : "",
      pageDesciption: pageDescriptionUpdate,
      others: "",
      iconPath: iconPath ? iconPath : "",
      showInHomePage: showInHomePageUpdate === true ? "Y" : "N",
      isActive: contentActiveUpdate === true ? "Y" : "N",
      isUrlStatus: contentDynamicUpdate === true ? "Y" : "N",
      displayOrder: displayOrderUpdate,
    };
    dispatch(createOrUpdateContentPostRecord(contentPostUpdateData));
  };

  const { data, contentTypeList, contentPostList, loading, error } =
    useSelector((state) => state.contentReducer);

  useEffect(() => {
    if (data?.data?.succeed) {
      content_filter_tab === "create" &&
        toast.success("New Content Type Created!");
      content_filter_tab === "update" && toast.info("Content Type Updated");

      resetAll();

      setTimeout(() => location.push("/content-post?type=post-list"), 1500);
    }
    if (error) {
      toast.error("Something went wrong.");
      return;
    }
    dispatch(createOrUpdateContentPostReset());
  }, [data?.data, error]);

  useEffect(() => {
    dispatch(getContentTypeRecord());
  }, []);

  useEffect(() => {
    dispatch(getContentPostRecord());
  }, [data?.data]);

  const resetAll = () => {
    setPageNameCreate("");
    setPageLinkCreate("");
    setDisplayOrderCreate(0);
    setShowInHomePageCreate(true);
    setContentActiveCreate(true);
    setContentDynamicCreate(true);
    setPageNameUpdate("");
    setPageLinkUpdate("");
    setDisplayOrderUpdate(0);
    setShowInHomePageUpdate(true);
    setContentActiveUpdate(true);
    setContentDynamicUpdate(true);
    setIconPath("");
    setShowIconFile("");
    setFeatureImagePath("");
    setShowImageFile("");
    setPageDescriptionCreate("");
    setPageDescriptionUpdate("");
    setContentId(0);
    setSelectedContentTypeName("");
  };

  useEffect(() => {
    if (singleContentData !== undefined && singleContentData !== null) {
      setSelectedContentTypeName({
        contentTypeId: singleContentData?.contentTypeId,
        contentTypeName: singleContentData?.contentTypeName,
        isActive: "Y",
      });
      setPageNameUpdate(singleContentData?.pageName);
      setPageLinkUpdate(singleContentData?.slug);
      setDisplayOrderUpdate(singleContentData?.displayOrder);
      setPageDescriptionUpdate(
        singleContentData?.pageDesciption
          ? singleContentData?.pageDesciption
          : ""
      );
      setShowInHomePageUpdate(
        singleContentData?.showInHomePage === "Y" ? true : false
      );
      setContentActiveUpdate(
        singleContentData?.isActive === "Y" ? true : false
      );

      setContentDynamicUpdate(
        singleContentData?.isUrlStatus === "Y" ? true : false
      );

      setContentId(singleContentData?.contentId);

      setFeatureImagePath(singleContentData?.featuredImage);

      setIconPath(singleContentData?.iconPath);
    }
  }, [singleContentData]);

  useEffect(() => {
    location?.location?.state?.contentData &&
      setSingleContentData(location?.location?.state?.contentData);
  }, [location?.location?.state?.contentData]);

  return (
    <div>
      {content_filter_tab === "create" && (
        <CreateContentPost
          createContentPost={createContentPost}
          contentTypeList={contentTypeList}
          setSelectedContentTypeName={setSelectedContentTypeName}
          selectedContentTypeName={selectedContentTypeName}
          setPageNameCreate={setPageNameCreate}
          pageNameCreate={pageNameCreate}
          setPageLinkCreate={setPageLinkCreate}
          pageLinkCreate={pageLinkCreate}
          iconPath={iconPath}
          setDisplayOrderCreate={setDisplayOrderCreate}
          displayOrderCreate={displayOrderCreate}
          setContentActiveCreate={setContentActiveCreate}
          contentActiveCreate={contentActiveCreate}
          setContentDynamicCreate={setContentDynamicCreate}
          contentDynamicCreate={contentDynamicCreate}
          iconImageHandler={iconImageHandler}
          featureImageHandler={featureImageHandler}
          featureImagePath={featureImagePath}
          showImageFile={showImageFile}
          showIconFile={showIconFile}
          handlePageDescription={handlePageDescription}
          pageDescriptionCreate={pageDescriptionCreate}
          setShowInHomePageCreate={setShowInHomePageCreate}
          showInHomePageCreate={showInHomePageCreate}
        />
      )}
      {content_filter_tab === "post-list" && (
        <ContentPostList contentPostList={contentPostList} loading={loading} />
      )}
      {content_filter_tab === "update" && (
        <EditContentPost
          updateContentPost={updateContentPost}
          contentTypeList={contentTypeList}
          setSelectedContentTypeName={setSelectedContentTypeName}
          selectedContentTypeName={selectedContentTypeName}
          setPageNameUpdate={setPageNameUpdate}
          pageNameUpdate={pageNameUpdate}
          setPageLinkUpdate={setPageLinkUpdate}
          pageLinkUpdate={pageLinkUpdate}
          setDisplayOrderUpdate={setDisplayOrderUpdate}
          displayOrderUpdate={displayOrderUpdate}
          setContentActiveUpdate={setContentActiveUpdate}
          contentActiveUpdate={contentActiveUpdate}
          iconPath={iconPath}
          featureImagePath={featureImagePath}
          iconImageHandler={iconImageHandler}
          featureImageHandler={featureImageHandler}
          showImageFile={showImageFile}
          showIconFile={showIconFile}
          setContentDynamicUpdate={setContentDynamicUpdate}
          contentDynamicUpdate={contentDynamicUpdate}
          handlePageDescription={handlePageDescription}
          pageDescriptionUpdate={pageDescriptionUpdate}
          setShowInHomePageUpdate={setShowInHomePageUpdate}
          showInHomePageUpdate={showInHomePageUpdate}
          singleContentData={location?.location?.state?.contentData}
        />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
}
export default ContentPost;
