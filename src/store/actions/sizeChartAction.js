//import services
import sizeChartServices from "../services/sizeChartServices";

//Declare Types Start
export const POST_SIZE_CHART_ATTRIBUTE = "POST_SIZE_CHART_ATTRIBUTE";
export const POST_SIZE_CHART_ATTRIBUTE_SUCCESS =
  "POST_SIZE_CHART_ATTRIBUTE_SUCCESS";
export const POST_SIZE_CHART_ATTRIBUTE_ERROR =
  "POST_SIZE_CHART_ATTRIBUTE_ERROR";
export const POST_SIZE_CHART_ATTRIBUTE_RESET =
  "POST_SIZE_CHART_ATTRIBUTE_RESET";

export const GET_SIZE_CHART_ATTRIBUTE = "GET_SIZE_CHART_ATTRIBUTE";
export const GET_SIZE_CHART_ATTRIBUTE_SUCCESS =
  "GET_SIZE_CHART_ATTRIBUTE_SUCCESS";
export const GET_SIZE_CHART_ATTRIBUTE_ERROR = "GET_SIZE_CHART_ATTRIBUTE_ERROR";
export const GET_SIZE_CHART_ATTRIBUTE_RESET = "GET_SIZE_CHART_ATTRIBUTE_RESET";

export const GET_ALL_SIZE_CHART_ATTRIBUTE = "GET_ALL_SIZE_CHART_ATTRIBUTE";
export const GET_ALL_SIZE_CHART_ATTRIBUTE_SUCCESS =
  "GET_ALL_SIZE_CHART_ATTRIBUTE_SUCCESS";
export const GET_ALL_SIZE_CHART_ATTRIBUTE_ERROR =
  "GET_ALL_SIZE_CHART_ATTRIBUTE_ERROR";
export const GET_ALL_SIZE_CHART_ATTRIBUTE_RESET =
  "GET_ALL_SIZE_CHART_ATTRIBUTE_RESET";

export const GET_SINGLE_SIZE_CHART_ATTRIBUTE =
  "GET_SINGLE_SIZE_CHART_ATTRIBUTE";
export const GET_SINGLE_SIZE_CHART_ATTRIBUTE_SUCCESS =
  "GET_SINGLE_SIZE_CHART_ATTRIBUTE_SUCCESS";
export const GET_SINGLE_SIZE_CHART_ATTRIBUTE_ERROR =
  "GET_SINGLE_SIZE_CHART_ATTRIBUTE_ERROR";
export const GET_SINGLE_SIZE_CHART_ATTRIBUTE_RESET =
  "GET_SINGLE_SIZE_CHART_ATTRIBUTE_RESET";

export const ADD_OR_EDIT_SIZE_CHART = "ADD_OR_EDIT_SIZE_CHART";
export const ADD_OR_EDIT_SIZE_CHART_SUCCESS = "ADD_OR_EDIT_SIZE_CHART_SUCCESS";
export const ADD_OR_EDIT_SIZE_CHART_ERROR = "ADD_OR_EDIT_SIZE_CHART_ERROR";
export const ADD_OR_EDIT_SIZE_CHART_RESET = "ADD_OR_EDIT_SIZE_CHART_RESET";

export const GET_SIZE_CHART_TEMPLATE = "GET_SIZE_CHART_TEMPLATE";
export const GET_SIZE_CHART_TEMPLATE_SUCCESS =
  "GET_SIZE_CHART_TEMPLATE_SUCCESS";
export const GET_SIZE_CHART_TEMPLATE_ERROR = "GET_SIZE_CHART_TEMPLATE_ERROR";
export const GET_SIZE_CHART_TEMPLATE_RESET = "GET_SIZE_CHART_TEMPLATE_RESET";

export const GET_SINGLE_SIZE_CHART_TEMPLATE = "GET_SINGLE_SIZE_CHART_TEMPLATE";
export const GET_SINGLE_SIZE_CHART_TEMPLATE_SUCCESS =
  "GET_SINGLE_SIZE_CHART_TEMPLATE_SUCCESS";
export const GET_SINGLE_SIZE_CHART_TEMPLATE_ERROR =
  "GET_SINGLE_SIZE_CHART_TEMPLATE_ERROR";
export const GET_SINGLE_SIZE_CHART_TEMPLATE_RESET =
  "GET_SINGLE_SIZE_CHART_TEMPLATE_RESET";

export const GET_SELLER_WISE_SIZE_CHART_LIST =
  "GET_SELLER_WISE_SIZE_CHART_LIST";
export const GET_SELLER_WISE_SIZE_CHART_LIST_SUCCESS =
  "GET_SELLER_WISE_SIZE_CHART_LIST_SUCCESS";
export const GET_SELLER_WISE_SIZE_CHART_LIST_ERROR =
  "GET_SELLER_WISE_SIZE_CHART_LIST_ERROR";
export const GET_SELLER_WISE_SIZE_CHART_LIST_RESET =
  "GET_SELLER_WISE_SIZE_CHART_LIST_RESET";

export const GET_SIZE_CHART_SUMMARY_TEMPLATE =
"GET_SIZE_CHART_SUMMARY_TEMPLATE";
export const GET_SIZE_CHART_SUMMARY_TEMPLATE_SUCCESS =
"GET_SIZE_CHART_SUMMARY_TEMPLATE_SUCCESS";
export const GET_SIZE_CHART_SUMMARY_TEMPLATE_ERROR =
"GET_SIZE_CHART_SUMMARY_TEMPLATE_ERROR";
export const GET_SIZE_CHART_SUMMARY_TEMPLATE_RESET =
"GET_SIZE_CHART_SUMMARY_TEMPLATE_RESET";

//Declare Types End

// Create Size Chart Attribute Start
export function createSizeChartAttributeRecord(data) {
  return async (dispatch) => {
    dispatch(createSizeChartAttribute());
    return await sizeChartServices
      .createOrUpdateSizeChartAttribute(data)
      .then((response) => dispatch(createSizeChartAttributeSuccess(response)))
      .catch((error) => dispatch(createSizeChartAttributeError(error)));
  };
}
export function createSizeChartAttribute() {
  return {
    type: POST_SIZE_CHART_ATTRIBUTE,
  };
}
export function createSizeChartAttributeSuccess(success) {
  return {
    type: POST_SIZE_CHART_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}
export function createSizeChartAttributeError(error) {
  return {
    type: POST_SIZE_CHART_ATTRIBUTE_ERROR,
    payload: { error },
  };
}
// Create Size Chart Attribute End

// Get Size Chart Attribute List Start
export function getSizeChartAttributeRecord(currentPage, itemsPerPage, name) {
  return async (dispatch) => {
    dispatch(getSizeChartAttribute());
    return await sizeChartServices
      .getSizeChartAttribute(currentPage, itemsPerPage, name)
      .then((response) => dispatch(getSizeChartAttributeSuccess(response)))
      .catch((error) => dispatch(getSizeChartAttributeError(error)));
  };
}
export function getSizeChartAttribute() {
  return {
    type: GET_SIZE_CHART_ATTRIBUTE,
  };
}
export function getSizeChartAttributeSuccess(success) {
  return {
    type: GET_SIZE_CHART_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}
export function getSizeChartAttributeError(error) {
  return {
    type: GET_SIZE_CHART_ATTRIBUTE_ERROR,
    payload: { error },
  };
}
// Get Size Chart Attribute List End

// Get All Size Chart Attribute List Start
export function getAllSizeChartAttributeRecord() {
  return async (dispatch) => {
    dispatch(getAllSizeChartAttribute());
    return await sizeChartServices
      .getAllSizeChartAttribute()
      .then((response) => dispatch(getAllSizeChartAttributeSuccess(response)))
      .catch((error) => dispatch(getAllSizeChartAttributeError(error)));
  };
}
export function getAllSizeChartAttribute() {
  return {
    type: GET_ALL_SIZE_CHART_ATTRIBUTE,
  };
}
export function getAllSizeChartAttributeSuccess(success) {
  return {
    type: GET_ALL_SIZE_CHART_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}
export function getAllSizeChartAttributeError(error) {
  return {
    type: GET_ALL_SIZE_CHART_ATTRIBUTE_ERROR,
    payload: { error },
  };
}
// Get All Size Chart Attribute List End

// Get Single Size Chart Attribute Start
export function getSingleSizeChartAttributeRecord(attributeId) {
  return async (dispatch) => {
    dispatch(getSingleSizeChartAttribute());
    return await sizeChartServices
      .getSingleSizeChartAttribute(attributeId)
      .then((response) =>
        dispatch(getSingleSizeChartAttributeSuccess(response))
      )
      .catch((error) => dispatch(getSingleSizeChartAttributeError(error)));
  };
}
export function getSingleSizeChartAttribute() {
  return {
    type: GET_SINGLE_SIZE_CHART_ATTRIBUTE,
  };
}
export function getSingleSizeChartAttributeSuccess(success) {
  return {
    type: GET_SINGLE_SIZE_CHART_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}
export function getSingleSizeChartAttributeError(error) {
  return {
    type: GET_SINGLE_SIZE_CHART_ATTRIBUTE_ERROR,
    payload: { error },
  };
}
// Get Single Size Chart Attribute End

// Create Size Chart Start
export function AddOrEditSizeChartRecord(data) {
  return async (dispatch) => {
    dispatch(AddOrEditSizeChart());
    return await sizeChartServices
      .AddOrEditSizeChart(data)

      .then((response) => dispatch(AddOrEditSizeChartSuccess(response)))
      .catch((error) => dispatch(AddOrEditSizeChartError(error)));
  };
}

export function AddOrEditSizeChart() {
  return {
    type: ADD_OR_EDIT_SIZE_CHART,
  };
}

export function AddOrEditSizeChartSuccess(success) {
  return {
    type: ADD_OR_EDIT_SIZE_CHART_SUCCESS,
    payload: { success },
  };
}

export function AddOrEditSizeChartError(error) {
  return {
    type: ADD_OR_EDIT_SIZE_CHART_ERROR,
    payload: { error },
  };
}
export function AddOrEditSizeChartReset() {
  return {
    type: ADD_OR_EDIT_SIZE_CHART_RESET,
  };
}
// Create Size Chart End

// Get Size Chart Template Start
export function getSizeChartTemplateRecord(
  currentPage,
  itemPerPage,
  templateNameApi,
  templateCodeApi,
  isInternationalApi,
  isActiveApi
) {
  return async (dispatch) => {
    dispatch(getSizeChartTemplate());
    return await sizeChartServices
      .getSizeChartTemplate(
        currentPage,
        itemPerPage,
        templateNameApi,
        templateCodeApi,
        isInternationalApi,
        isActiveApi
      )
      .then((response) => dispatch(getSizeChartTemplateSuccess(response)))
      .catch((error) => dispatch(getSizeChartTemplateError(error)));
  };
}
export function getSizeChartTemplate() {
  return {
    type: GET_SIZE_CHART_TEMPLATE,
  };
}
export function getSizeChartTemplateSuccess(success) {
  return {
    type: GET_SIZE_CHART_TEMPLATE_SUCCESS,
    payload: { success },
  };
}
export function getSizeChartTemplateError(error) {
  return {
    type: GET_SIZE_CHART_TEMPLATE_ERROR,
    payload: { error },
  };
}
// Get Size Chart Template End

// Get Single  Size Chart Template Start
export function getSingleSizeChartTemplateRecord(id) {
  return async (dispatch) => {
    dispatch(getSingleSizeChartTemplate());
    return await sizeChartServices
      .getSingleSizeChartTemplate(id)
      .then((response) => dispatch(getSingleSizeChartTemplateSuccess(response)))
      .catch((error) => dispatch(getSingleSizeChartTemplateError(error)));
  };
}
export function getSingleSizeChartTemplate() {
  return {
    type: GET_SINGLE_SIZE_CHART_TEMPLATE,
  };
}
export function getSingleSizeChartTemplateSuccess(success) {
  return {
    type: GET_SINGLE_SIZE_CHART_TEMPLATE_SUCCESS,
    payload: { success },
  };
}
export function getSingleSizeChartTemplateError(error) {
  return {
    type: GET_SINGLE_SIZE_CHART_TEMPLATE_ERROR,
    payload: { error },
  };
}
export function getSingleSizeChartTemplateReset() {
  return {
    type: GET_SINGLE_SIZE_CHART_TEMPLATE_RESET,
  };
}

// Get Single Size Chart Template End


// Get Seller Wise Size Chart List Start
export function getSellerWiseSizeChartListRecord(shopId) {
  return async (dispatch) => {
    dispatch(getSellerWiseSizeChartList());
    return await sizeChartServices
      .getSellerWiseSizeChartList(shopId)
      .then((response) => dispatch(getSellerWiseSizeChartListSuccess(response)))
      .catch((error) => dispatch(getSellerWiseSizeChartListError(error)));
  };
}
export function getSellerWiseSizeChartList() {
  return {
    type: GET_SELLER_WISE_SIZE_CHART_LIST,
  };
}
export function getSellerWiseSizeChartListSuccess(success) {
  return {
    type: GET_SELLER_WISE_SIZE_CHART_LIST_SUCCESS,
    payload: { success },
  };
}
export function getSellerWiseSizeChartListError(error) {
  return {
    type: GET_SELLER_WISE_SIZE_CHART_LIST_ERROR,
    payload: { error },
  };
}
export function getSellerWiseSizeChartListReset() {
  return {
    type: GET_SELLER_WISE_SIZE_CHART_LIST_RESET,
  };
}
// Get Seller Wise Size Chart List End

// Get Single  Size Chart Template Start
export function getSizeChartSummaryTemplateRecord(categoryId) {
  return async (dispatch) => {
    dispatch(getSizeChartSummaryTemplate());
    return await sizeChartServices
      .getSizeChartSummaryTemplate(categoryId)
      .then((response) => dispatch(getSizeChartSummaryTemplateSuccess(response)))
      .catch((error) => dispatch(getSizeChartSummaryTemplateError(error)));
  };
}
export function getSizeChartSummaryTemplate() {
  return {
    type: GET_SIZE_CHART_SUMMARY_TEMPLATE,
  };
}
export function getSizeChartSummaryTemplateSuccess(success) {
  return {
    type: GET_SIZE_CHART_SUMMARY_TEMPLATE_SUCCESS,
    payload: { success },
  };
}
export function getSizeChartSummaryTemplateError(error) {
  return {
    type: GET_SIZE_CHART_SUMMARY_TEMPLATE_ERROR,
    payload: { error },
  };
}
export function getSizeChartSummaryTemplateReset() {
  return {
    type: GET_SIZE_CHART_SUMMARY_TEMPLATE_RESET,
  };
}
// Get Single Size Chart Template End
