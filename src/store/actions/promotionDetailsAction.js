import promotionDetailsService from "../services/promotionDetailsService"

export const GET_PROMOTION_DETAILS = "GET_PROMOTION_DETAILS"
export const GET_PROMOTION_DETAILS_SUCCESS = "GET_PROMOTION_DETAILS_SUCCESS"
export const GET_PROMOTION_DETAILS_ERROR = "GET_PROMOTION_DETAILS_ERROR"

export function getPromotionDetailsRecord() {
    return async (dispatch) => {
        dispatch(getPromotionDetails())
        return await promotionDetailsService
            .getPromotionDetails()
            
            .then((response) => dispatch(getPromotionDetailsSuccess(response.data)))
            .catch((error) => dispatch(getPromotionDetailsError(error)))
    }
}

export function getPromotionDetails() {
    return {
        type: GET_PROMOTION_DETAILS,
    }
}

export function getPromotionDetailsSuccess(success) {
    return {
        type: GET_PROMOTION_DETAILS_SUCCESS,
        payload: { success },
    }
}

export function getPromotionDetailsError(error) {
    return {
        type: GET_PROMOTION_DETAILS_ERROR,
        payload: { error },
    }
}