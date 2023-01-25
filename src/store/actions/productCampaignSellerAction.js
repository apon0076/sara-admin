import productCampaignSellerService from "../services/productCampaignSellerService";

export const ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER = "ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER";
export const ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_SUCCESS =
  "ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_SUCCESS";
export const ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_ERROR =
  "ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_ERROR";

export const GET_PRODUCT_CAMPAIGN_SELLER = "GET_PRODUCT_CAMPAIGN_SELLER";
export const GET_PRODUCT_CAMPAIGN_SELLER_SUCCESS =
  "GET_PRODUCT_CAMPAIGN_SELLER_SUCCESS";
export const GET_PRODUCT_CAMPAIGN_SELLER_ERROR =
  "GET_PRODUCT_CAMPAIGN_SELLER_ERROR";

export function addOrEditProductCampaignSellerRecord(productVariantOption) {
  return async (dispatch) => {
    dispatch(addOrEditProductCampaignSeller());
    return await productCampaignSellerService
      .addOrEditProductCampaignSeller(productVariantOption)

      .then((response) =>
        dispatch(addOrEditProductCampaignSellerSuccess(response.data))
      )
      .catch((error) => dispatch(addOrEditProductCampaignSellerError(error)));
  };
}

export function addOrEditProductCampaignSeller() {
  return {
    type: ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER,
  };
}

export function addOrEditProductCampaignSellerSuccess(success) {
  return {
    type: ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_SUCCESS,
    payload: { success },
  };
}

export function addOrEditProductCampaignSellerError(error) {
  return {
    type: ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_ERROR,
    payload: { error },
  };
}

export function getProductCampaignSellerRecord() {
  return async (dispatch) => {
    dispatch(getProductCampaignSeller())
    return await productCampaignSellerService
      .getProductCampaignSeller()
      
      .then((response) => dispatch(getProductCampaignSellerSuccess(response.data)))
      .catch((error) => dispatch(getProductCampaignSellerError(error)))
  }
}

export function getProductCampaignSeller() {
  return {
    type: GET_PRODUCT_CAMPAIGN_SELLER,
  }
}

export function getProductCampaignSellerSuccess(success) {
  return {
    type: GET_PRODUCT_CAMPAIGN_SELLER_SUCCESS,
    payload: { success },
  }
}

export function getProductCampaignSellerError(error) {
  return {
    type: GET_PRODUCT_CAMPAIGN_SELLER_ERROR,
    payload: { error },
  }
}