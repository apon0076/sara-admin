import {
    GET_CURRENCY_RATE,
    GET_CURRENCY_RATE_SUCCESS,
    GET_CURRENCY_RATE_ERROR,

    CREATE_CURRENCY_RATE,
    CREATE_CURRENCY_RATE_SUCCESS,
    CREATE_CURRENCY_RATE_ERROR

} from "../actions/currencyAction";

const initialState = {
    currencyRate: [],
    data: {},
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_CURRENCY_RATE:
            return {
                ...state,
                saving: true,
                saved: false,
                error: null,
            };

        case CREATE_CURRENCY_RATE_SUCCESS:
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload.success,
            };

        case CREATE_CURRENCY_RATE_ERROR:
            return {
                ...state,
                saving: false,
                saved: false,
                error: action.payload.error,
                data: {},
            };

            
        case GET_CURRENCY_RATE:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            };

        case GET_CURRENCY_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                currencyRate: action.payload.success,
            };

        case GET_CURRENCY_RATE_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
                currencyRate: [],
            };

        default:
            return state;
    }
}
