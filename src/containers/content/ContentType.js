/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import ContentTypeList from "../../components/content/ContentTypeList";
import CreateContentType from "../../components/content/CreateContentType";
import EditContentType from "../../components/content/EditContentType";
import {
  createOrUpdateContentTypeRecord,
  getContentTypeRecord,
} from "../../store/actions/contentAction";

export default function ContentType() {
  const [contentTypePageOptions, setContentTypePageOptions] = useState(1);
  const [contentTypeName, setContentTypeName] = useState("");
  const [contentActive, setContentActive] = useState(true);
  const [contentTypeNameEdit, setContentTypeNameEdit] = useState("");
  const [contentActiveEdit, setContentActiveEdit] = useState(true);
  const [contentTypeId, setContentTypeId] = useState(0);
  const [contentTypeDataById, setContentTypeDataById] = useState(null);

  const dispatch = useDispatch();

  const createContentType = async (e) => {
    e.preventDefault();
    if (contentTypeName === "") {
      toast.error("Content Type is required");
      return;
    }
    const contentTypeData = {
      contentTypeName,
      isActive: contentActive === true ? "Y" : "N",
    };

    dispatch(createOrUpdateContentTypeRecord(contentTypeData));
  };
  const updateContentType = async (e) => {
    e.preventDefault();
    if (contentTypeNameEdit === "") {
      toast.error("Content Type is required");
      return;
    }
    const contentTypeData = {
      contentTypeId,
      contentActive: contentTypeNameEdit,
      isActive: contentActiveEdit === true ? "Y" : "N",
    };

    dispatch(createOrUpdateContentTypeRecord(contentTypeData));
  };

  const { data, contentTypeList, loading } = useSelector(
    (state) => state.contentReducer
  );

  useEffect(() => {
    if (data?.data?.succeed) {
      contentTypePageOptions === 1 && toast.success("New Content Type Created");
      contentTypePageOptions === 3 && toast.info("Content Type Updated");
      setContentTypeName("");
      setContentActive(true);
      setContentTypeNameEdit("");
      setContentActiveEdit(true);
      setTimeout(() => setContentTypePageOptions(2), 2000);
    }
  }, [data?.data]);

  useEffect(() => {
    contentTypePageOptions === 2 && dispatch(getContentTypeRecord());
  }, [contentTypePageOptions]);

  useEffect(() => {
    contentTypeDataById &&
      setContentTypeNameEdit(contentTypeDataById?.contentTypeName);
    setContentActiveEdit(contentTypeDataById?.isActive === "Y" ? true : false);
    setContentTypeId(contentTypeDataById?.contentTypeId);
  }, [contentTypeDataById]);

  return (
    <div>
      {contentTypePageOptions === 1 && (
        <CreateContentType
          setContentTypePageOptions={setContentTypePageOptions}
          setContentTypeName={setContentTypeName}
          contentTypeName={contentTypeName}
          setContentActive={setContentActive}
          contentActive={contentActive}
          createContentType={createContentType}
        />
      )}
      {contentTypePageOptions === 2 && (
        <ContentTypeList
          setContentTypePageOptions={setContentTypePageOptions}
          contentTypeList={contentTypeList}
          loading={loading}
          setContentTypeDataById={setContentTypeDataById}
        />
      )}
      {contentTypePageOptions === 3 && (
        <EditContentType
          setContentTypePageOptions={setContentTypePageOptions}
          setContentTypeNameEdit={setContentTypeNameEdit}
          contentTypeNameEdit={contentTypeNameEdit}
          setContentActiveEdit={setContentActiveEdit}
          contentActiveEdit={contentActiveEdit}
          createContentType={createContentType}
          contentTypeDataById={contentTypeDataById}
          updateContentType={updateContentType}
        />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
}
