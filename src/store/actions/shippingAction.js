import shippingService from "../services/shippingService";

export const GET_SHIPPING_TYPE = "GET_SHIPPING_TYPE";
export const GET_SHIPPING_TYPE_SUCCESS = "GET_SHIPPING_TYPE_SUCCESS";
export const GET_SHIPPING_TYPE_ERROR = "GET_SHIPPING_TYPE_ERROR";

export const CREATE_OR_UPDATE_SHIPPING_TYPE = "CREATE_OR_UPDATE_SHIPPING_TYPE";
export const CREATE_OR_UPDATE_SHIPPING_TYPE_SUCCESS =
  "CREATE_OR_UPDATE_SHIPPING_TYPE_SUCCESS";
export const CREATE_OR_UPDATE_SHIPPING_TYPE_ERROR =
  "CREATE_OR_UPDATE_SHIPPING_TYPE_ERROR";

export const CREATE_OR_UPDATE_COURIER_PROFILE =
  "CREATE_OR_UPDATE_COURIER_PROFILE";
export const CREATE_OR_UPDATE_COURIER_PROFILE_SUCCESS =
  "CREATE_OR_UPDATE_COURIER_PROFILE_SUCCESS";
export const CREATE_OR_UPDATE_COURIER_PROFILE_ERROR =
  "CREATE_OR_UPDATE_COURIER_PROFILE_ERROR";

export const GET_COURIER_PROFILE = "GET_COURIER_PROFILE";
export const GET_COURIER_PROFILE_SUCCESS = "GET_COURIER_PROFILE_SUCCESS";
export const GET_COURIER_PROFILE_ERROR = "GET_COURIER_PROFILE_ERROR";

export const GET_COURIER_PRODUCT_TYPE = "GET_COURIER_PRODUCT_TYPE";
export const GET_COURIER_PRODUCT_TYPE_SUCCESS =
  "GET_COURIER_PRODUCT_TYPE_SUCCESS";
export const GET_COURIER_PRODUCT_TYPE_ERROR = "GET_COURIER_PRODUCT_TYPE_ERROR";

export const CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE =
  "CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE";
export const CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_SUCCESS =
  "CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_SUCCESS";
export const CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_ERROR =
  "CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_ERROR";

export const GET_SHIPPING_OPTIONS = "GET_SHIPPING_OPTIONS";
export const GET_SHIPPING_OPTIONS_SUCCESS = "GET_SHIPPING_OPTIONS_SUCCESS";
export const GET_SHIPPING_OPTIONS_ERROR = "GET_SHIPPING_OPTIONS_ERROR";

export const CREATE_OR_UPDATE_SHIPPING_OPTIONS =
  "CREATE_OR_UPDATE_SHIPPING_OPTIONS";
export const CREATE_OR_UPDATE_SHIPPING_OPTIONS_SUCCESS =
  "CREATE_OR_UPDATE_SHIPPING_OPTIONS_SUCCESS";
export const CREATE_OR_UPDATE_SHIPPING_OPTIONS_ERROR =
  "CREATE_OR_UPDATE_SHIPPING_OPTIONS_ERROR";

export const GET_SHIPPING_COST = "GET_SHIPPING_COST";
export const GET_SHIPPING_COST_SUCCESS = "GET_SHIPPING_COST_SUCCESS";
export const GET_SHIPPING_COST_ERROR = "GET_SHIPPING_COST_ERROR";

export const CREATE_SHIPPING_COST = "CREATE_SHIPPING_COST";
export const CREATE_SHIPPING_COST_SUCCESS = "CREATE_SHIPPING_COST_SUCCESS";
export const CREATE_SHIPPING_COST_ERROR = "CREATE_SHIPPING_COST_ERROR";

export const UPDATE_SHIPPING_COST = "UPDATE_SHIPPING_COST";
export const UPDATE_SHIPPING_COST_SUCCESS = "UPDATE_SHIPPING_COST_SUCCESS";
export const UPDATE_SHIPPING_COST_ERROR = "UPDATE_SHIPPING_COST_ERROR";

export const GET_PRODUCT_SHIPPING_COST_MAPPING =
  "GET_PRODUCT_SHIPPING_COST_MAPPING";
export const GET_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS =
  "GET_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS";
export const GET_PRODUCT_SHIPPING_COST_MAPPING_ERROR =
  "GET_PRODUCT_SHIPPING_COST_MAPPING_ERROR";

export const CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING =
  "CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING";
export const CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS =
  "CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS";
export const CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_ERROR =
  "CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_ERROR";

export const GET_COURIER_COST = "GET_COURIER_COST";
export const GET_COURIER_COST_SUCCESS = "GET_COURIER_COST_SUCCESS";
export const GET_COURIER_COST_ERROR = "GET_COURIER_COST_ERROR";

export const CREATE_OR_UPDATE_COURIER_COST = "CREATE_OR_UPDATE_COURIER_COST";
export const CREATE_OR_UPDATE_COURIER_COST_SUCCESS =
  "CREATE_OR_UPDATE_COURIER_COST_SUCCESS";
export const CREATE_OR_UPDATE_COURIER_COST_ERROR =
  "CREATE_OR_UPDATE_COURIER_COST_ERROR";

export const CALCULATE_SHIPPING_COST = "CALCULATE_SHIPPING_COST";
export const CALCULATE_SHIPPING_COST_SUCCESS =
  "CALCULATE_SHIPPING_COST_SUCCESS";
export const CALCULATE_SHIPPING_COST_ERROR = "CALCULATE_SHIPPING_COST_ERROR";
//-------------------------ShippingType----------------------

export function getShippingTypeRecord() {
  return async (dispatch) => {
    dispatch(getShippingType());
    return await shippingService
      .getShippingType()

      .then((response) => dispatch(getShippingTypeSuccess(response.data)))
      .catch((error) => dispatch(getShippingTypeError(error)));
  };
}

export function getShippingType() {
  return {
    type: GET_SHIPPING_TYPE,
  };
}

export function getShippingTypeSuccess(success) {
  return {
    type: GET_SHIPPING_TYPE_SUCCESS,
    payload: { success },
  };
}

export function getShippingTypeError(error) {
  return {
    type: GET_SHIPPING_TYPE_ERROR,
    payload: { error },
  };
}

export function createOrUpdateShipppingTypeRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateShipppingType());
    return await shippingService
      .createOrUpdateShippingType(data)

      .then((response) =>
        dispatch(createOrUpdateShipppingTypeSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdateShipppingTypeError(error)));
  };
}

export function createOrUpdateShipppingType() {
  return {
    type: CREATE_OR_UPDATE_SHIPPING_TYPE,
  };
}

export function createOrUpdateShipppingTypeSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_SHIPPING_TYPE_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateShipppingTypeError(error) {
  return {
    type: CREATE_OR_UPDATE_SHIPPING_TYPE_ERROR,
    payload: { error },
  };
}

////-----------------------CourierProfile-------------------------

export function getCourierProfileRecord() {
  return async (dispatch) => {
    dispatch(getCourierProfile());
    return await shippingService
      .getCourierProfile()

      .then((response) => dispatch(getCourierProfileSuccess(response.data)))
      .catch((error) => dispatch(getCourierProfileError(error)));
  };
}

export function getCourierProfile() {
  return {
    type: GET_COURIER_PROFILE,
  };
}

export function getCourierProfileSuccess(success) {
  return {
    type: GET_COURIER_PROFILE_SUCCESS,
    payload: { success },
  };
}

export function getCourierProfileError(error) {
  return {
    type: GET_COURIER_PROFILE_ERROR,
    payload: { error },
  };
}

export function createOrUpdateCourierProfileRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateCourierProfile());
    return await shippingService
      .createOrUpdateCourierProfile(data)

      .then((response) =>
        dispatch(createOrUpdateCourierProfileSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdateCourierProfileError(error)));
  };
}

export function createOrUpdateCourierProfile() {
  return {
    type: CREATE_OR_UPDATE_COURIER_PROFILE,
  };
}

export function createOrUpdateCourierProfileSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_COURIER_PROFILE_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateCourierProfileError(error) {
  return {
    type: CREATE_OR_UPDATE_COURIER_PROFILE_ERROR,
    payload: { error },
  };
}

//------------------------CourierProductType-----------------------

export function getCourierProductTypeRecord() {
  return async (dispatch) => {
    dispatch(getCourierProductType());
    return await shippingService
      .getCourierProductType()

      .then((response) => dispatch(getCourierProductTypeSuccess(response.data)))
      .catch((error) => dispatch(getCourierProductTypeError(error)));
  };
}

export function getCourierProductType() {
  return {
    type: GET_COURIER_PRODUCT_TYPE,
  };
}

export function getCourierProductTypeSuccess(success) {
  return {
    type: GET_COURIER_PRODUCT_TYPE_SUCCESS,
    payload: { success },
  };
}

export function getCourierProductTypeError(error) {
  return {
    type: GET_COURIER_PRODUCT_TYPE_ERROR,
    payload: { error },
  };
}

export function createOrUpdateCourierProductTypeRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateCourierProductType());
    return await shippingService
      .createOrUpdateCourierProductType(data)

      .then((response) =>
        dispatch(createOrUpdateCourierProductTypeSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdateCourierProductTypeError(error)));
  };
}

export function createOrUpdateCourierProductType() {
  return {
    type: CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE,
  };
}

export function createOrUpdateCourierProductTypeSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateCourierProductTypeError(error) {
  return {
    type: CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_ERROR,
    payload: { error },
  };
}

//------------------ShippingOptions-----------------

export function getShippingOptionsRecord() {
  return async (dispatch) => {
    dispatch(getShippingOptions());
    return await shippingService
      .getShippingOptions()

      .then((response) => dispatch(getShippingOptionsSuccess(response.data)))
      .catch((error) => dispatch(getShippingOptionsError(error)));
  };
}

export function getShippingOptions() {
  return {
    type: GET_SHIPPING_OPTIONS,
  };
}

export function getShippingOptionsSuccess(success) {
  return {
    type: GET_SHIPPING_OPTIONS_SUCCESS,
    payload: { success },
  };
}

export function getShippingOptionsError(error) {
  return {
    type: GET_SHIPPING_OPTIONS_ERROR,
    payload: { error },
  };
}

export function createOrUpdateShippingOptionsRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateShippingOptions());
    return await shippingService
      .createOrUpdateShippingOptions(data)

      .then((response) =>
        dispatch(createOrUpdateShippingOptionsSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdateShippingOptionsError(error)));
  };
}

export function createOrUpdateShippingOptions() {
  return {
    type: CREATE_OR_UPDATE_SHIPPING_OPTIONS,
  };
}

export function createOrUpdateShippingOptionsSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_SHIPPING_OPTIONS_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateShippingOptionsError(error) {
  return {
    type: CREATE_OR_UPDATE_SHIPPING_OPTIONS_ERROR,
    payload: { error },
  };
}

//----------------ShippingCost-------------------//

export function getShippingCostRecord(
  shippingTypeId = 0,
  shippingOptionsId = 0
) {
  return async (dispatch) => {
    dispatch(getShippingCost());
    return await shippingService
      .getShippingCost(shippingTypeId, shippingOptionsId)

      .then((response) => dispatch(getShippingCostSuccess(response.data)))
      .catch((error) => dispatch(getShippingCostError(error)));
  };
}

export function getShippingCost() {
  return {
    type: GET_SHIPPING_COST,
  };
}

export function getShippingCostSuccess(success) {
  return {
    type: GET_SHIPPING_COST_SUCCESS,
    payload: { success },
  };
}

export function getShippingCostError(error) {
  return {
    type: GET_SHIPPING_COST_ERROR,
    payload: { error },
  };
}

export function createShippingCostRecord(data) {
  return async (dispatch) => {
    dispatch(createShippingCost());
    return await shippingService
      .createShippingCost(data)

      .then((response) => dispatch(createShippingCostSuccess(response.data)))
      .catch((error) => dispatch(createShippingCostError(error)));
  };
}

export function createShippingCost() {
  return {
    type: CREATE_SHIPPING_COST,
  };
}

export function createShippingCostSuccess(success) {
  return {
    type: CREATE_SHIPPING_COST_SUCCESS,
    payload: { success },
  };
}

export function createShippingCostError(error) {
  return {
    type: CREATE_SHIPPING_COST_ERROR,
    payload: { error },
  };
}

export function updateShippingCostRecord(data) {
  return async (dispatch) => {
    dispatch(updateShippingCost());
    return await shippingService
      .updateShippingCost(data)

      .then((response) => dispatch(updateShippingCostSuccess(response.data)))
      .catch((error) => dispatch(updateShippingCostError(error)));
  };
}

export function updateShippingCost() {
  return {
    type: UPDATE_SHIPPING_COST,
  };
}

export function updateShippingCostSuccess(success) {
  return {
    type: UPDATE_SHIPPING_COST_SUCCESS,
    payload: { success },
  };
}

export function updateShippingCostError(error) {
  return {
    type: UPDATE_SHIPPING_COST_ERROR,
    payload: { error },
  };
}

//----------------ProductShippingCostMapping-------------------//

export function getProductShippingCostMappingRecord() {
  return async (dispatch) => {
    dispatch(getProductShippingCostMapping());
    return await shippingService
      .getProductShippingCostMapping()

      .then((response) =>
        dispatch(getProductShippingCostMappingSuccess(response.data))
      )
      .catch((error) => dispatch(getProductShippingCostMappingError(error)));
  };
}

export function getProductShippingCostMapping() {
  return {
    type: GET_PRODUCT_SHIPPING_COST_MAPPING,
  };
}

export function getProductShippingCostMappingSuccess(success) {
  return {
    type: GET_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS,
    payload: { success },
  };
}

export function getProductShippingCostMappingError(error) {
  return {
    type: GET_PRODUCT_SHIPPING_COST_MAPPING_ERROR,
    payload: { error },
  };
}

export function createOrUpdateProductShippingCostMappingRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateProductShippingCostMapping());
    return await shippingService
      .createOrUpdateProductShippingCostMapping(data)

      .then((response) =>
        dispatch(createOrUpdateProductShippingCostMappingSuccess(response.data))
      )
      .catch((error) =>
        dispatch(createOrUpdateProductShippingCostMappingError(error))
      );
  };
}

export function createOrUpdateProductShippingCostMapping() {
  return {
    type: CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING,
  };
}

export function createOrUpdateProductShippingCostMappingSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateProductShippingCostMappingError(error) {
  return {
    type: CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_ERROR,
    payload: { error },
  };
}

//----------------Courier Cost-------------------//

export function getCourierCostRecord() {
  return async (dispatch) => {
    dispatch(getCourierCost());
    return await shippingService
      .getCourierCost()

      .then((response) => dispatch(getCourierCostSuccess(response.data)))
      .catch((error) => dispatch(getCourierCostError(error)));
  };
}

export function getCourierCost() {
  return {
    type: GET_COURIER_COST,
  };
}

export function getCourierCostSuccess(success) {
  return {
    type: GET_COURIER_COST_SUCCESS,
    payload: { success },
  };
}

export function getCourierCostError(error) {
  return {
    type: GET_COURIER_COST_ERROR,
    payload: { error },
  };
}

export function createOrUpdateCourierCostRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateCourierCost());
    return await shippingService
      .createOrUpdateCourierCost(data)

      .then((response) =>
        dispatch(createOrUpdateCourierCostSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdateCourierCostError(error)));
  };
}

export function createOrUpdateCourierCost() {
  return {
    type: CREATE_OR_UPDATE_COURIER_COST,
  };
}

export function createOrUpdateCourierCostSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_COURIER_COST_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateCourierCostError(error) {
  return {
    type: CREATE_OR_UPDATE_COURIER_COST_ERROR,
    payload: { error },
  };
}

// Calculate Shipping Cost Start
export function calculateShippingCostRecord(
  countryId,
  cityId,
  areaId,
  productSingleId,
  productSingleQty
) {
  return async (dispatch) => {
    dispatch(calculateShippingCost());
    return await shippingService
      .calculateShippingCost(
        countryId,
        cityId,
        areaId,
        productSingleId,
        productSingleQty
      )

      .then((response) => dispatch(calculateShippingCostSuccess(response)))
      .catch((error) => dispatch(calculateShippingCostError(error)));
  };
}

export function calculateShippingCost() {
  return {
    type: CALCULATE_SHIPPING_COST,
  };
}

export function calculateShippingCostSuccess(success) {
  return {
    type: CALCULATE_SHIPPING_COST_SUCCESS,
    payload: { success },
  };
}

export function calculateShippingCostError(error) {
  return {
    type: CALCULATE_SHIPPING_COST_ERROR,
    payload: { error },
  };
}

// Calculate Shipping Cost End
