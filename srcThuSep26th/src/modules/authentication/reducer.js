import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.auth, action) {
    switch (action.type) {

        case types.SIGNIN_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                token: action.token
            };

        case types.SIGNIN_USER_FAIL:
            return {
                ...state,
                message: action.message,
            };

        case types.SIGNUP_USER_SUCCESS:
            return {
                ...state,
                message: action.message
                //token: action.token
            };

        case types.SIGNUP_USER_FAIL:
            return {
                ...state,
                message: action.message,
            };

        case types.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case types.CLEAR_AUTH_ERROR:
            return {
                ...state,
                message: action.message
            };

        default:
            return state;
    }
}
