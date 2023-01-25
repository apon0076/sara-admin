import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SizeChartEditAttribute from "../../components/sizeChart/SizeChartEditAttribute";
import ViewSizeChartAttributeList from "../../components/sizeChart/ViewSizeChartAttributeList";
import {
  createSizeChartAttributeRecord,
  getSingleSizeChartAttributeRecord,
  getSizeChartAttributeRecord,
  POST_SIZE_CHART_ATTRIBUTE_RESET,
  GET_SIZE_CHART_ATTRIBUTE_RESET
} from "../../store/actions/sizeChartAction";

const SizeChartAttributeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [itemPerPage, setItemPerPage] = useState(10);
  const [attributeName, setAttributeName] = useState("");
  const [attributeNameApi, setAttributeNameApi] = useState("");
  const [attributeId, setAttributeId] = useState(0);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editAttributeName, setEditAttributeName] = useState("");
  const [editAttributeDisplayOrder, setEditAttributeDisplayOrder] =
    useState("");
  const [editAttributeIsActive, setEditAttributeIsActive] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    get_size_chart_attribute,
    loading,
    get_single_size_chart_attribute,
    single_loading,
    post_size_chart_attribute,
    error,
  } = useSelector((state) => state.sizeChartReducers);
  
  useEffect(() => {
    dispatch(
      getSizeChartAttributeRecord(currentPage, itemPerPage, attributeNameApi)
    );
  }, [currentPage, dispatch, itemPerPage, attributeNameApi]);

  const handleSearchAttribute = () => {
    setAttributeNameApi(attributeName);
    setCurrentPage(1);
  };
  const handleCrossSearchAttribute = () => {
    setAttributeNameApi("");
    setCurrentPage(1);
  };

  const handleEditModalShow = (attributeId) => {
    setEditModalShow(true);
    dispatch(getSingleSizeChartAttributeRecord(attributeId));
  };

  useEffect(() => {
    get_single_size_chart_attribute?.success?.data &&
      setAttributeId(
        get_single_size_chart_attribute?.success?.data[0]?.attributeId
      );
    get_single_size_chart_attribute?.success?.data &&
      setEditAttributeName(
        get_single_size_chart_attribute?.success?.data[0]?.attributeName
      );
    get_single_size_chart_attribute?.success?.data &&
      setEditAttributeDisplayOrder(
        get_single_size_chart_attribute?.success?.data[0]?.displayOrder
      );
    get_single_size_chart_attribute?.success?.data &&
      setEditAttributeIsActive(
        get_single_size_chart_attribute?.success?.data[0]?.isActive === "Y"
          ? true
          : false
      );
  }, [get_single_size_chart_attribute]);

  const handleAttributeUpdateSubmit = (e) => {
    e.preventDefault();
    const updated_Attribute_data = {
      attributeId: attributeId,
      attributeName: editAttributeName,
      displayOrder: editAttributeDisplayOrder,
      isActive: editAttributeIsActive === true ? "Y" : "N",
    };

    dispatch(createSizeChartAttributeRecord(updated_Attribute_data));
  };

  useEffect(() => {
    if (
      post_size_chart_attribute?.success?.data &&
      post_size_chart_attribute?.success?.data?.succeed === true &&
      loading === false
    ) {
      toast.success("Attribute Updated Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        dispatch({ type: POST_SIZE_CHART_ATTRIBUTE_RESET });
        setEditModalShow(false);
        dispatch(
          getSizeChartAttributeRecord(
            currentPage,
            itemPerPage,
            attributeNameApi
          )
        );
        history.push("/size-chart-attributes-list");
      }, 1500);
    } else if (
      post_size_chart_attribute?.success?.data &&
      post_size_chart_attribute?.success?.data?.succeed === false &&
      loading === false
    ) {
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ type: POST_SIZE_CHART_ATTRIBUTE_RESET });
      setEditModalShow(true);
    } else if (loading === false && error) {
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ POST_SIZE_CHART_ATTRIBUTE_RESET });
      setEditModalShow(true);
    }
  }, [dispatch, error, history, loading, post_size_chart_attribute]);
  return (
    <>
      <ToastContainer autoClose={1500} />
      <div id="wrapper">
        <ViewSizeChartAttributeList
          get_size_chart_attribute={get_size_chart_attribute}
          loading={loading}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setTotalPage={setTotalPage}
          totalPage={totalPage}
          setTotalItems={setTotalItems}
          totalItems={totalItems}
          setItemPerPage={setItemPerPage}
          itemPerPage={itemPerPage}
          setAttributeName={setAttributeName}
          attributeName={attributeName}
          handleSearchAttribute={handleSearchAttribute}
          handleCrossSearchAttribute={handleCrossSearchAttribute}
          handleEditModalShow={handleEditModalShow}
        />
      </div>
      {editModalShow === true
        ? !single_loading && (
            <Modal
              title={`EDIT SIZE CHART ATTRIBUTES`}
              centered
              visible={editModalShow}
              onOk={() => setEditModalShow(false)}
              onCancel={() => setEditModalShow(false)}
              width={1000}
            >
              <SizeChartEditAttribute
                loading={loading}
                setEditAttributeName={setEditAttributeName}
                editAttributeName={editAttributeName}
                setEditAttributeDisplayOrder={setEditAttributeDisplayOrder}
                editAttributeDisplayOrder={editAttributeDisplayOrder}
                setEditAttributeIsActive={setEditAttributeIsActive}
                editAttributeIsActive={editAttributeIsActive}
                setEditModalShow={setEditModalShow}
                handleAttributeUpdateSubmit={handleAttributeUpdateSubmit}
              />
            </Modal>
          )
        : null}
    </>
  );
};

export default SizeChartAttributeList;
