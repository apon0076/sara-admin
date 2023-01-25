import {
    GET_DISCOUNT_SUMMARY,
    GET_DISCOUNT_SUMMARY_SUCCESS,
    GET_DISCOUNT_SUMMARY_ERROR,

    CREATE_OR_UPDATE_DISCOUNT_SUMMARY,
    CREATE_OR_UPDATE_DISCOUNT_SUMMARY_SUCCESS,
    CREATE_OR_UPDATE_DISCOUNT_SUMMARY_ERROR

} from "../actions/discountSummaryAction"

const initialState = {
    discountSummary: [],
    data: {},
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    error: null,
}

export default function discountSummaryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DISCOUNT_SUMMARY:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            }

        case GET_DISCOUNT_SUMMARY_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                discountSummary: action.payload.success,
            }

        case GET_DISCOUNT_SUMMARY_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
                discountSummary: [],
            }

            
        case CREATE_OR_UPDATE_DISCOUNT_SUMMARY:
            return {
                ...state,
                saving: true,
                saved: false,
                error: null,
            }

        case CREATE_OR_UPDATE_DISCOUNT_SUMMARY_SUCCESS:
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload.success,
            }

        case CREATE_OR_UPDATE_DISCOUNT_SUMMARY_ERROR:
            return {
                ...state,
                saving: false,
                saved: false,
                error: action.payload.error,
                data: {},
            }
        default:
            return state
    }
}
