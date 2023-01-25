import discountSummaryService from "../services/discountSummaryService"

export const GET_DISCOUNT_SUMMARY = "GET_DISCOUNT_SUMMARY"
export const GET_DISCOUNT_SUMMARY_SUCCESS = "GET_DISCOUNT_SUMMARY_SUCCESS"
export const GET_DISCOUNT_SUMMARY_ERROR = "GET_DISCOUNT_SUMMARY_ERROR"

export const CREATE_OR_UPDATE_DISCOUNT_SUMMARY = "CREATE_OR_UPDATE_DISCOUNT_SUMMARY"
export const CREATE_OR_UPDATE_DISCOUNT_SUMMARY_SUCCESS = "CREATE_OR_UPDATE_DISCOUNT_SUMMARY_SUCCESS"
export const CREATE_OR_UPDATE_DISCOUNT_SUMMARY_ERROR = "CREATE_OR_UPDATE_DISCOUNT_SUMMARY_ERROR"

export function getDiscountSummaryRecord() {
    return async (dispatch) => {
        dispatch(getDiscountSummary())
        return await discountSummaryService
            .getDiscountSummary()
            
            .then((response) => dispatch(getDiscountSummarySuccess(response.data)))
            .catch((error) => dispatch(getDiscountSummaryError(error)))
    }
}

export function getDiscountSummary() {
    return {
        type: GET_DISCOUNT_SUMMARY,
    }
}

export function getDiscountSummarySuccess(success) {
    return {
        type: GET_DISCOUNT_SUMMARY_SUCCESS,
        payload: { success },
    }
}

export function getDiscountSummaryError(error) {
    return {
        type: GET_DISCOUNT_SUMMARY_ERROR,
        payload: { error },
    }
}

export function createOrUpdateDiscountSummaryRecord(discountSummary) {
    return async (dispatch) => {
        dispatch(createOrUpdateDiscountSummary())
        return await discountSummaryService
            .createOrUpdateDiscountSummary(discountSummary)

            .then((response) => dispatch(createOrUpdateDiscountSummarySuccess(response)))
            .catch((error) => dispatch(createOrUpdateDiscountSummaryError(error)))
    }
}

export function createOrUpdateDiscountSummary() {
    return {
        type: CREATE_OR_UPDATE_DISCOUNT_SUMMARY,
    }
}

export function createOrUpdateDiscountSummarySuccess(success) {
    return {
        type: CREATE_OR_UPDATE_DISCOUNT_SUMMARY_SUCCESS,
        payload: { success },
    }
}

export function createOrUpdateDiscountSummaryError(error) {
    return {
        type: CREATE_OR_UPDATE_DISCOUNT_SUMMARY_ERROR,
        payload: { error },
    }
}