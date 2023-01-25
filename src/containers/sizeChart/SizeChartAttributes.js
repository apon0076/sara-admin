/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SizeChartCreateAttribute from "../../components/sizeChart/SizeChartCreateAttribute";
import {
  createSizeChartAttributeRecord,
  POST_SIZE_CHART_ATTRIBUTE_RESET,
} from "../../store/actions/sizeChartAction";

const SizeChartAttributes = () => {
  const [attributeName, setAttributeName] = useState("");
  const [attributeDisplayOrder, setAttributeDisplayOrder] = useState(0);
  const [attributeIsActive, setAttributeIsActive] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { post_size_chart_attribute, loading, error } = useSelector(
    (state) => state.sizeChartReducers
  );
  const handleAttributeSubmit = (e) => {
    e.preventDefault();
    const data_to_submit = {
      attributeName: attributeName,
      displayOrder: attributeDisplayOrder,
      isActive: attributeIsActive === true ? "Y" : "N",
    };
    dispatch(createSizeChartAttributeRecord(data_to_submit));
  };

  useEffect(() => {
    if (
      post_size_chart_attribute?.success?.data &&
      post_size_chart_attribute?.success?.data?.succeed === true &&
      loading === false
    ) {
      toast.success("Attribute Created Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        dispatch({ type: POST_SIZE_CHART_ATTRIBUTE_RESET });
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
    } else if (loading === false && error) {
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ POST_SIZE_CHART_ATTRIBUTE_RESET });
    }
  }, [dispatch, post_size_chart_attribute]);
  return (
    <div id="wrapper">
      <ToastContainer autoClose={1500} />
      <SizeChartCreateAttribute
        attributeName={attributeName}
        setAttributeName={setAttributeName}
        attributeDisplayOrder={attributeDisplayOrder}
        setAttributeDisplayOrder={setAttributeDisplayOrder}
        handleAttributeSubmit={handleAttributeSubmit}
        loading={loading}
        setAttributeIsActive={setAttributeIsActive}
        attributeIsActive={attributeIsActive}
      />
    </div>
  );
};

export default SizeChartAttributes;
