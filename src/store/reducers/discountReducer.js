//////////////////CALLING NECESSARY ACTION/////////////////////////////
import {
    GET_DISCOUNT,
    GET_DISCOUNT_SUCCESS,
    GET_DISCOUNT_ERROR,

    GET_DISCOUNT_BY_ID,
    GET_DISCOUNT_BY_ID_SUCCESS,
    GET_DISCOUNT_BY_ID_ERROR,

    CREATE_DISCOUNT,
    CREATE_DISCOUNT_SUCCESS,
    CREATE_DISCOUNT_ERROR,
    
    UPDATE_DISCOUNT,
    UPDATE_DISCOUNT_SUCCESS,
    UPDATE_DISCOUNT_ERROR,
    DELETE_DISCOUNT,

    DELETE_DISCOUNT_SUCCESS,
    DELETE_DISCOUNT_ERROR

} from "../actions/discountAction"

/////////////////END OF CALLING//////////////////////////////

const initialState = {
    discounts: [],
    data: {},
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    error: null,
}

export default function discountReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DISCOUNT:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            }

        case GET_DISCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                discounts: action.payload.success,
            }

        case GET_DISCOUNT_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
                discounts: [],
            }


        case GET_DISCOUNT_BY_ID:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            }

        case GET_DISCOUNT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                discounts: action.payload.success,
            }

        case GET_DISCOUNT_BY_ID_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
                data: [],
            }


        case CREATE_DISCOUNT:
            return {
                ...state,
                saving: true,
                saved: false,
                error: null,
            }

        case CREATE_DISCOUNT_SUCCESS:
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload.success,
            }

        case CREATE_DISCOUNT_ERROR:
            return {
                ...state,
                saving: false,
                saved: false,
                error: action.payload.error,
                data: {},
            }


        case UPDATE_DISCOUNT:
            return {
                ...state,
                updating: true,
                updated: false,
                error: null,
            }

        case UPDATE_DISCOUNT_SUCCESS:
            return {
                ...state,
                updating: false,
                updated: true,
                data: action.payload.success,
            }

        case UPDATE_DISCOUNT_ERROR:
            return {
                ...state,
                updating: false,
                updated: false,
                error: action.payload.error,
                data: {},
            }

            
        case DELETE_DISCOUNT:
            return {
                ...state,
                deleting: true,
                deleted: false,
                error: null,
            }

        case DELETE_DISCOUNT_SUCCESS:
            return {
                ...state,
                deleting: false,
                deleted: true,
                data: action.payload.success,
            }

        case DELETE_DISCOUNT_ERROR:
            return {
                ...state,
                deleting: false,
                deleted: false,
                error: action.payload.error,
                data: {},
            }

        default:
            return state
    }
}
