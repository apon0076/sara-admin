import {
  GET_INVENTORY,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_ERROR,

  GET_INVENTORY_BY_ID,
  GET_INVENTORY_BY_ID_SUCCESS,
  GET_INVENTORY_BY_ID_ERROR,

  CREATE_INVENTORY,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_ERROR,

  UPDATE_INVENTORY,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_ERROR,

  DELETE_INVENTORY,
  DELETE_INVENTORY_SUCCESS,
  DELETE_INVENTORY_ERROR

} from "../actions/inventoryAction";

const initialState = {
  inventories: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        inventories: action.payload.success,
      };

    case GET_INVENTORY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        inventories: [],
      };


    case GET_INVENTORY_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_INVENTORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        inventories: action.payload.success,
      };

    case GET_INVENTORY_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        inventories: [],
      };


    case CREATE_INVENTORY:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_INVENTORY_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_INVENTORY_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_INVENTORY:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_INVENTORY_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_INVENTORY_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_INVENTORY:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_INVENTORY_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload.error,
        data: {},
      };

    default:
      return state;
  }
}
