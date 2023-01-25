import {
    GET_PROMOTION_DETAILS,
    GET_PROMOTION_DETAILS_SUCCESS,
    GET_PROMOTION_DETAILS_ERROR

} from "../actions/promotionDetailsAction"

const initialState = {
    promotionDetails: [],
    data: {},
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    error: null,
}

export default function promotionDetailsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROMOTION_DETAILS:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            }

        case GET_PROMOTION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                promotionDetails: action.payload.success,
            }

        case GET_PROMOTION_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
                promotionDetails: [],
            }

        default:
            return state
    }
}
