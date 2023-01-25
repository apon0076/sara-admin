import { Modal } from "antd";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_OR_EDIT_SIZE_CHART_RESET,
  getSellerWiseSizeChartListRecord,
  getSingleSizeChartTemplateRecord,
  getSingleSizeChartTemplateReset,
  getSizeChartSummaryTemplateRecord
} from "../../store/actions/sizeChartAction";
import CreateNewSizeChart from "./CreateNewSizeChart";

const SizeChart = ({ selectedSizeChart, onSizeChartOptionsChange,shopId,categoryId }) => {
  const [createNewSizeChartModal, setCreateNewSizeChartModal] = useState(false);
  const [chooseTemplate, setChooseTemplate] = useState(null);
  const [actionStatus, setActionStatus] = useState();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [modelImageTitle, setModelImageTitle] = useState("");
  const [modelImageDescription, setModelImageDescription] = useState("");
  const [guideImageTitle, setGuideImageTitle] = useState("");
  const [guideImageDescription, setGuideImageDescription] = useState("");
  const [sizeMeasurementValue, setSizeMeasurementValue] = useState([]);

  const dispatch = useDispatch();
  //Fetch Single Size Chart Template API Call
  useEffect(() => {
    chooseTemplate !== null &&
      chooseTemplate !== undefined &&
    dispatch(getSingleSizeChartTemplateRecord(chooseTemplate));
  }, [dispatch, chooseTemplate]);

  // Fetch Seller Wise Size Chart List API Call
  useEffect(() => {
    shopId!==undefined && dispatch(getSellerWiseSizeChartListRecord(shopId));
  }, [dispatch, shopId]);

  //Get Data Form Reducers
  const {
    size_chart_summary_template_list,
    size_chart_single_data,
    loading,
    seller_wise_size_chart_list,
  } = useSelector((state) => state.sizeChartReducers);

  // Handle Modal Close
  const handleModalCancel = () => {
    setChooseTemplate(null);
    setCreateNewSizeChartModal(false);
    dispatch({ type: ADD_OR_EDIT_SIZE_CHART_RESET });
    dispatch(getSingleSizeChartTemplateReset());
    shopId!==undefined && dispatch(getSellerWiseSizeChartListRecord(shopId));
  };

  // Create New Size Chart For Seller
  const handleCreateNewSizeChart = (e) => {
    e.preventDefault();
    setCreateNewSizeChartModal(true);
    setActionStatus("C");
    categoryId && dispatch(getSizeChartSummaryTemplateRecord(categoryId));
  };

  // View More of Selected Size Chart
  const handleViewMore = (e) => {
    e.preventDefault();
    setActionStatus("U");
    setChooseTemplate(selectedSizeChart?.sizeChartId);
    setCreateNewSizeChartModal(true);
  };
  return (
    <div>
      <label
        style={{
          width: "100%",
          borderBottom: "1px solid #e5ebec",
        }}
        class="control_label"
      >
        Size Chart
      </label>
      <div className="row">
        <div className="col-md-8">
          <Dropdown
            className="w-full"
            value={selectedSizeChart}
            options={seller_wise_size_chart_list?.success?.data}
            onChange={onSizeChartOptionsChange}
            optionLabel="chartName"
            placeholder="Select a Size Chart Name"
          />
        </div>
        <div className="col-md-4">
          <Button
            onClick={(e) => handleCreateNewSizeChart(e)}
            className="w-full"
            label="Create New"
          />
        </div>
      </div>
      {selectedSizeChart?.sizeChartId !== undefined ? (
        <div
          style={{
            backgroundColor: "rgba(0,128,0,0.3)",
            border: "1px solid rgba(0,128,0,1)",
          }}
          className="px-10 py-4 mt-7 rounded-6 w-full flex items-center justify-between"
        >
          <p className="fs-15 m-0" style={{ color: "#000", lineHeight: "0" }}>
            {selectedSizeChart?.chartName}
          </p>
          <Button
            onClick={(e) => handleViewMore(e)}
            style={{ padding: "3px 16px" }}
            label="View More"
          />
        </div>
      ) : null}
      <Modal
        title="Create New Size Chart"
        centered
        visible={createNewSizeChartModal}
        onCancel={() => {
          handleModalCancel();
        }}
        width={1500}
      >
        <CreateNewSizeChart
          shopId={shopId}
          setCreateNewSizeChartModal={setCreateNewSizeChartModal}
          chooseTemplate={chooseTemplate}
          setChooseTemplate={setChooseTemplate}
          actionStatus={actionStatus}
          size_chart_summary_template_list={size_chart_summary_template_list}
          size_chart_single_data={size_chart_single_data}
          loading={loading}
          name={name}
          setName={setName}
          code={code}
          setCode={setCode}
          modelImageTitle={modelImageTitle}
          setModelImageTitle={setModelImageTitle}
          modelImageDescription={modelImageDescription}
          setModelImageDescription={setModelImageDescription}
          guideImageTitle={guideImageTitle}
          setGuideImageTitle={setGuideImageTitle}
          guideImageDescription={guideImageDescription}
          setGuideImageDescription={setGuideImageDescription}
          selectedSizeChart={selectedSizeChart}
          setSizeMeasurementValue={setSizeMeasurementValue}
          sizeMeasurementValue={sizeMeasurementValue}
        />
      </Modal>
    </div>
  );
};

export default SizeChart;
