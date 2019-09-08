import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome } from '../../utils/navigation'
import { Alert } from 'react-native'
// Signin User
export function signinUserSuccess(res) {
	return {
		type: types.SIGNIN_USER_SUCCESS,
		user: res.user,//res.userInfo,
		token: res.token//res.token
	};
}

export function signinUserFail(res) {
	return {
		type: types.SIGNIN_USER_FAIL,
		message: res.msg
	};
}
/*
"status": 1,
    "msg": "Success",
    "meta": {
        "ID": 65,
        "token": "",
        "email": "test@test.com",
        "firstName": "test",
        "lastName": "test",
        "profile": null
    }
*/
export function signinUser(user, status) {
	console.log('User to be logged in: ', user)
	console.log('State: ', status)
	return function (dispatch) {
		if (status) {
			console.log(API_URL + 'login')
			axios.post(API_URL + 'login', {
				email: user.email,
				password: user.password
			})
				.then(res => {
					console.log('LoginResponse: ', res)
					dispatch(signinUserSuccess({
						user: {
							email: user.email,
							fname: res.data.meta.firstname,
							lname: res.data.meta.lastname,
							password: user.password
						},
						token: res.data.meta.token
					}));
					_signInAsync(user)
				})
				.catch(error => {
					console.log("Error Logging In: ", error); //eslint-disable-line
					//dispatch(signinUserFail(error.response));
					Alert.alert('Server Error', 'We could not sing you in, You are offline, you can sync later')
					dispatch(signinUserSuccess({ user, token: '' }));
					_signInAsync(user)
				});
		} else {
			Alert.alert('Offline', 'You are offline, you can sync when you are online')
			dispatch(signinUserSuccess({ user, token: '' }));
			_signInAsync(user)
		}

	};
}

_signInAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			//console.log("The user has been stored locallkky")
			goHome();
		})
		.catch(err => {
			//alert('error: jhggkj', err);
		})
};

// Signup User
export function signupUserSuccess(res) {
	return {
		type: types.SIGNUP_USER_SUCCESS,
		//message: 'SignedUp'//res.message
		user: res.user,
		token: res.token
	};
}

export function signupUserFail(res) {
	return {
		type: types.SIGNUP_USER_FAIL,
		message: res.message
	};
}

export function signupUser(user, status) {
	console.log('User to be signed up: ', user)
	return function (dispatch) {

		if (status) {
			console.log(API_URL + 'user')
			axios.put(API_URL + 'user', {
				email: user.email,
				password: user.password
			})
				.then(res => {
					console.log('registerResponse: ', res)
					dispatch(signupUserSuccess({
						user: {
							email: user.email,
							//fname: res.data.meta.firstname,
							//lname: res.data.meta.lastname,
							password: user.password
						},
						token: res.data.meta.token
					}));
					_signUpAsync(user)
				})
				.catch(error => {
					console.log("Error registering: ", error); //eslint-disable-line
					//dispatch(signinUserFail(error.response));
					Alert.alert(
						'Server Error',
						'We could not sing you up, you can try later. or You can Sign In and register later with same credentials'
					)
					//dispatch(signupUserSuccess({ user, token: '' }));
					//_signupAsync(user)
				});
		} else {
			Alert.alert(
				'Offline',
				'You are offline, you can Sign Up when you are online. or You can Sign In and register later with same credentials'
			)
			//dispatch(signupUserSuccess({ user, token: '' }));
			//_signupAsync(user)
		}
	};
}

_signupAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			//console.log("The user has been stored locally")
			Alert.alert('Signed Up', 'You can Sign In now!')
			//goHome();
		})
		.catch(err => {
			Alert.alert('error: ', err);
		})
};

export function setStatusSuccess(status) {
	return {
		type: types.SET_STATUS,
		status: status
	}
}

export function setStatus(status) {
	return function (dispatch) {
		dispatch(setStatusSuccess(status));
	}
}

// Error Clear
export function clearErrorSUCCESS() {
	return {
		type: types.CLEAR_AUTH_ERROR,
		message: null
	}
}

export function clearError() {
	return function (dispatch) {
		dispatch(clearErrorSUCCESS());
	};
}
