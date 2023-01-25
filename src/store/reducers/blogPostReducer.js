import {
    GET_BLOG_POST,
    GET_BLOG_POST_SUCCESS,
    GET_BLOG_POST_ERROR,

    CREATE_OR_UPDATE_BLOG_POST,
    CREATE_OR_UPDATE_BLOG_POST_SUCCESS,
    CREATE_OR_UPDATE_BLOG_POST_ERROR

} from "../actions/blogPostAction"

const initialState = {
    blogs: [],
    data: {},
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    updating: false,
    updated: false,
    error: null,
}

export default function blogPostReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BLOG_POST:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null,
            }

        case GET_BLOG_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                blogs: action.payload.success,
            }

        case GET_BLOG_POST_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error,
                blogs: [],
            }

            
        case CREATE_OR_UPDATE_BLOG_POST:
            return {
                ...state,
                saving: true,
                saved: false,
                error: null,
            }

        case CREATE_OR_UPDATE_BLOG_POST_SUCCESS:
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload.success,
            }

        case CREATE_OR_UPDATE_BLOG_POST_ERROR:
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
