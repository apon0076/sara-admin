import {
  ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER,
  ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_SUCCESS,
  ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_ERROR,

  GET_PRODUCT_CAMPAIGN_SELLER,
  GET_PRODUCT_CAMPAIGN_SELLER_SUCCESS,
  GET_PRODUCT_CAMPAIGN_SELLER_ERROR

} from "../actions/productCampaignSellerAction";

const initialState = {
  campaignSellers: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case GET_PRODUCT_CAMPAIGN_SELLER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_PRODUCT_CAMPAIGN_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        campaignSellers: action.payload.success,
      }

    case GET_PRODUCT_CAMPAIGN_SELLER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        campaignSellers: [],
      }
      
    default:
      return state;
  }
}
