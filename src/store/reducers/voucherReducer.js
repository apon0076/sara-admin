import {
    GET_VOUCHER,
    GET_VOUCHER_SUCCESS,
    GET_VOUCHER_ERROR,

    CREATE_OR_UPDATE_VOUCHER,
    CREATE_OR_UPDATE_VOUCHER_SUCCESS,
    CREATE_OR_UPDATE_VOUCHER_ERROR,

    CHECK_VOUCHER,
    CHECK_VOUCHER_SUCCESS,
    CHECK_VOUCHER_ERROR,
    CHECK_VOUCHER_RESET

} from "../actions/voucherAction"

const initialState = {
    vouchers: [],
    voucherValidity: [],
    data: {},
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    updating: false,
    updated: false,
    error: null,
}

export default function voucherReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VOUCHER:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            }

        case GET_VOUCHER_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                vouchers: action.payload.success,
            }

        case GET_VOUCHER_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
                vouchers: [],
            }


        case CREATE_OR_UPDATE_VOUCHER:
            return {
                ...state,
                saving: true,
                saved: false,
                error: null,
            }

        case CREATE_OR_UPDATE_VOUCHER_SUCCESS:
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload.success,
            }

        case CREATE_OR_UPDATE_VOUCHER_ERROR:
            return {
                ...state,
                saving: false,
                saved: false,
                error: action.payload.error,
                data: {},
            }

        case CHECK_VOUCHER:
            return { 
                ...state, 
                loading: true 
            };

        case CHECK_VOUCHER_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                voucherValidity: action.payload 
            };

        case CHECK_VOUCHER_ERROR:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        case CHECK_VOUCHER_RESET:
            return { 
                voucherValidity: [], 
                loading: false, 
                error: null 
            };

        default:
            return state
    }
}