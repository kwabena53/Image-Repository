
import {
    GET_DATA_ERROR, GET_DATA_REQUEST, GET_DATA_SUCCESS, CLICK_LIKE,
    GET_USER_IMAGE_REQUEST,
    GET_USER_IMAGE_SUCCESS,
    GET_USER_IMAGE_ERROR,
    CLICK_MY_LIKE

} from "./action"



const INITIAL_STATE = {
    gettingData: false
}

export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
    const { type } = action;
    switch (type) {
        case GET_DATA_REQUEST:
            return {
                ...state,
                gettingData: true,
            };
        case GET_DATA_SUCCESS:
            return {
                ...state,
                apod: { ...action.data },
            };
        case GET_DATA_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case GET_USER_IMAGE_REQUEST:
            return {
                ...state,
                gettingData: true,
            };
        case GET_USER_IMAGE_SUCCESS:
            return {
                ...state,
                userImages: { ...action.data },
            };
        case GET_USER_IMAGE_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case CLICK_LIKE:
            return {
                ...state,
                userImages: {
                    ...state.userImages,
                    [action.id]: {
                        ...state.apod[action.id],
                        liked: action.isLiked
                    }
                }

            };
            case CLICK_MY_LIKE:
                return {
                    ...state,
                    apod: {
                        ...state.apod,
                        [action.id]: {
                            ...state.apod[action.id],
                            liked: action.isLiked
                        }
                    }
    
                };

        default:
            return state;
    }
}