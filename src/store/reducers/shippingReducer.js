import {
  CREATE_OR_UPDATE_SHIPPING_TYPE,
  CREATE_OR_UPDATE_SHIPPING_TYPE_SUCCESS,
  CREATE_OR_UPDATE_SHIPPING_TYPE_ERROR,
  GET_SHIPPING_TYPE,
  GET_SHIPPING_TYPE_SUCCESS,
  GET_SHIPPING_TYPE_ERROR,
  CREATE_OR_UPDATE_COURIER_PROFILE,
  CREATE_OR_UPDATE_COURIER_PROFILE_SUCCESS,
  CREATE_OR_UPDATE_COURIER_PROFILE_ERROR,
  GET_COURIER_PROFILE,
  GET_COURIER_PROFILE_SUCCESS,
  GET_COURIER_PROFILE_ERROR,
  CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE,
  CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_SUCCESS,
  CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_ERROR,
  GET_COURIER_PRODUCT_TYPE,
  GET_COURIER_PRODUCT_TYPE_SUCCESS,
  GET_COURIER_PRODUCT_TYPE_ERROR,
  CREATE_OR_UPDATE_SHIPPING_OPTIONS,
  CREATE_OR_UPDATE_SHIPPING_OPTIONS_SUCCESS,
  CREATE_OR_UPDATE_SHIPPING_OPTIONS_ERROR,
  GET_SHIPPING_OPTIONS,
  GET_SHIPPING_OPTIONS_SUCCESS,
  GET_SHIPPING_OPTIONS_ERROR,
  CREATE_SHIPPING_COST,
  CREATE_SHIPPING_COST_SUCCESS,
  CREATE_SHIPPING_COST_ERROR,
  UPDATE_SHIPPING_COST,
  UPDATE_SHIPPING_COST_SUCCESS,
  UPDATE_SHIPPING_COST_ERROR,
  GET_SHIPPING_COST,
  GET_SHIPPING_COST_SUCCESS,
  GET_SHIPPING_COST_ERROR,
  CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING,
  CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS,
  CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_ERROR,
  GET_PRODUCT_SHIPPING_COST_MAPPING,
  GET_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS,
  GET_PRODUCT_SHIPPING_COST_MAPPING_ERROR,
  GET_COURIER_COST,
  GET_COURIER_COST_SUCCESS,
  GET_COURIER_COST_ERROR,
  CREATE_OR_UPDATE_COURIER_COST,
  CREATE_OR_UPDATE_COURIER_COST_SUCCESS,
  CREATE_OR_UPDATE_COURIER_COST_ERROR,
  CALCULATE_SHIPPING_COST,
  CALCULATE_SHIPPING_COST_SUCCESS,
  CALCULATE_SHIPPING_COST_ERROR,
} from "../actions/shippingAction";

const intialState = {
  shippingType: [],
  courierProfile: [],
  courierProductType: [],
  shippingOptions: [],
  shippingCost: [],
  productShippingCostMapping: [],
  courierCost: [],
  calculateShippingCost: [],
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    //----------------SHIPPING_TYPE------------------
    case GET_SHIPPING_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SHIPPING_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shippingType: action.payload.success,
      };

    case GET_SHIPPING_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shippingType: [],
      };

    case CREATE_OR_UPDATE_SHIPPING_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_OR_UPDATE_SHIPPING_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_SHIPPING_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    //-----------------COURIER_PROFILE---------------------
    case GET_COURIER_PROFILE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_COURIER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        courierProfile: action.payload.success,
      };

    case GET_COURIER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        courierProfile: [],
      };

    case CREATE_OR_UPDATE_COURIER_PROFILE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_OR_UPDATE_COURIER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_COURIER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    //-----------------COURIER_PRODUCT_TYPE---------------------

    case GET_COURIER_PRODUCT_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_COURIER_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        courierProductType: action.payload.success,
      };

    case GET_COURIER_PRODUCT_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        courierProductType: [],
      };

    case CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    ///---------------------SHIPPING_OPTIONS--------------------------

    case GET_SHIPPING_OPTIONS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shippingOptions: action.payload.success,
      };

    case GET_SHIPPING_OPTIONS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shippingOptions: [],
      };

    case CREATE_OR_UPDATE_SHIPPING_OPTIONS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_OR_UPDATE_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_SHIPPING_OPTIONS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    ///---------------------SHIPPING_COST--------------------------

    case GET_SHIPPING_COST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shippingCost: action.payload.success,
      };

    case GET_SHIPPING_COST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shippingCost: [],
      };

    case CREATE_SHIPPING_COST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_SHIPPING_COST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    case UPDATE_SHIPPING_COST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case UPDATE_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case UPDATE_SHIPPING_COST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    ///---------------------PRODUCT_SHIPPING_COST_MAPPING--------------------------

    case GET_PRODUCT_SHIPPING_COST_MAPPING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        productShippingCostMapping: action.payload.success,
      };

    case GET_PRODUCT_SHIPPING_COST_MAPPING_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        productShippingCostMapping: [],
      };

    case CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_PRODUCT_SHIPPING_COST_MAPPING_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    ///---------------------Courier Cost--------------------------

    case GET_COURIER_COST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_COURIER_COST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        courierCost: action.payload.success,
      };

    case GET_COURIER_COST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        courierCost: [],
      };

    case CREATE_OR_UPDATE_COURIER_COST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_OR_UPDATE_COURIER_COST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_COURIER_COST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };

    // Calculate Shipping Cost Start
    case CALCULATE_SHIPPING_COST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CALCULATE_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        calculateShippingCost: action.payload.success,
      };

    case CALCULATE_SHIPPING_COST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        calculateShippingCost: {},
      };
    // Calculate Shipping Cost End

    default:
      return state;
  }
}
