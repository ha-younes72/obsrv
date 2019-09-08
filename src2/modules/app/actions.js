import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome } from '../../utils/navigation'
import { ToastAndroid, Alert } from "react-native";
import { Navigation } from 'react-native-navigation';
import * as authActions from '../authentication/actions';
import AsyncStorage from '@react-native-community/async-storage';


export function addPhotoSuccess(imgUri) {
	return {
		type: types.ADD_TO_NEWOBSERVATIONS_SUCCESS,
		imgUri: imgUri
	}
}

export function addPhoto(img, user) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email);
		var data = JSON.parse(jdata)
		console.log('data: ', data)
		if (data === null) {
			await AsyncStorage.setItem(user.email, JSON.stringify({
				newObservations: [{
					img: img
				}]
			}))
				.then(() => {
					console.log("The observation has been stored locallkky")
					dispatch(addPhotoSuccess(img));
					//goHome();
				})
				.catch(err => {
					Alert.alert('Could not save locally', err);
				})
		} else {
			if (data.newObservations) {
				console.log("Adding New Observation")
				data.newObservations = [...data.newObservations, { img: img }]
				console.log("String to be saved: ", JSON.stringify(data))
				await AsyncStorage.setItem(user.email, JSON.stringify(data))
					.then(() => {
						dispatch(addPhotoSuccess(img));
					})
					.catch((err) => {
						Alert.alert('Could not save locally', err);
					})
			} else {
				console.log("Setting New Observation")
				data.newObservations = [{ img: img }]
				await AsyncStorage.setItem(user.email, JSON.stringify(data))
					.then(() => {
						dispatch(addPhotoSuccess(img));
					})
					.catch((err) => {
						Alert.alert('Could not save locally', err);
					})
			}
		}
	};
}

export function addTimeandLocSuccess(time, lon, lat) {
	return {
		type: types.ADD_TIME_AND_LOC_TO_NEWOBSERVATIONS_SUCCESS,
		time: time,
		lon: lon,
		lat: lat
	}
}

export function addTimeandLoc(time, lon, lat, user, currentIndex) {
	return async function (dispatch) {
		//AsyncStorage.removeItem(user.email)
		//= null
		var jdata = await AsyncStorage.getItem(user.email)

		console.log('currentIndex: ', currentIndex)
		const data = JSON.parse(jdata)
		console.log('jdata: ', data)
		if (data === null) {
			console.log('Nothing')
		}
		//console.log('jdata newobservation: ',jdata.newObservations)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: time,
				lon: lon,
				lat: lat
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: time,
					lon: lon,
					lat: lat
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}

		dispatch(addTimeandLocSuccess(time, lon, lat));
	};
}

export function addHumanstoNewObservationSuccess(human) {
	return {
		type: types.ADD_HUMANS_TO_NEWOBSERVATIONS_SUCCESS,
		human: human
	}
}

export function addHumanstoNewObservation(human, user, currentIndex) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email);

		var data = JSON.parse(jdata)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: data.newObservations[0].time,
				lon: data.newObservations[0].lon,
				lat: data.newObservations[0].lat,
				text: String(human[0].num) + ' ' + human[0].species,
				human: human,
				animal: data.newObservations[0].animal ? data.newObservations[0].animal : null
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: data.newObservations[currentIndex].time,
					lon: data.newObservations[currentIndex].lon,
					lat: data.newObservations[currentIndex].lat,
					text: String(human[0].num) + ' ' + human[0].species,
					human: human,
					animal: data.newObservations[currentIndex].animal ? data.newObservations[currentIndex].animal : null
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}
		dispatch(addHumanstoNewObservationSuccess(human));
	};
}

export function addAnimalstoNewObservationSuccess(animal) {
	return {
		type: types.ADD_ANIMALS_TO_NEWOBSERVATIONS_SUCCESS,
		animal: animal
	}
}
export function addAnimalstoNewObservation(animal, user, currentIndex) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email);
		var data = JSON.parse(jdata)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: data.newObservations[0].time,
				lon: data.newObservations[0].lon,
				lat: data.newObservations[0].lat,
				text: String(animal[0].num) + ' ' + animal[0].species,
				animal: animal,
				human: data.newObservations[0].human ? data.newObservations[0].human : null
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: data.newObservations[currentIndex].time,
					lon: data.newObservations[currentIndex].lon,
					lat: data.newObservations[currentIndex].lat,
					text: String(animal[0].num) + ' ' + animal[0].species,
					animal: animal,
					human: data.newObservations[currentIndex].human ? data.newObservations[currentIndex].human : null
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}
		dispatch(addAnimalstoNewObservationSuccess(animal));
	};
}

// Signin User
export function retrieveNewObservationsSuccess(res, index) {
	return {
		type: types.RETRIEVE_NEW_OBSERVATIONS_SUCCESS,
		newObservations: res,
		currentIndex: index
	};
}

export function retrieveObservationsSuccess(res) {
	return {
		type: types.RETRIEVE_OBSERVATIONS_SUCCESS,
		observations: res
	};
}

export function retrieveObservations(status, user, token) {
	return async function (dispatch) {
		if (status) {
			//online

			//console.log(API_URL + 'observations')
			//Alert.alert('Token:', token)
			var config = {
				headers: { 'Authorization': token }
			};

			var bodyParameters = {

			};
			axios.get(API_URL + 'observations', bodyParameters, config)
				.then(res => {
					console.log('Observations: ', res)
					dispatch(retrieveObservationsSuccess(res.meta));
					_saveObservations(res.meta, user)
					//goHome();
				})
				.catch(async (error) => {
					Alert.alert('Server Err', 'We could not retrieve the observations.')
					//_loadObservations(user)
					const jdata = await AsyncStorage.getItem(user.email)
					const data = JSON.parse(jdata)
					console.log('Load Obsrv: ', data)
					if (data === null) {
						Alert.alert('No local data', 'You have no observations, you can add one by pressing Log.')
					} else {
						if (data.observations) {
							dispatch(retrieveObservationsSuccess(data.observations))
						}
						if (data.newObservations) {
							dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
						}
					}
					console.log(error); //eslint-disable-line
				});

		} else {
			//offline
			Alert.alert('Offline', 'We could not retrieve the observations.')
			//_loadObservations(user)
			const jdata = await AsyncStorage.getItem(user.email)
			if (jdata === null) {
				Alert.alert('No local data', 'You have no observations, you can add one by pressing Log.')
			} else {
				const data = JSON.parse(jdata)
				console.log('Load Obsrv1: ', data)
				if (data.observations) {
					console.log('Load Obsrv2: ', data)
					dispatch(retrieveObservationsSuccess(data.observations))
				}
				if (data.newObservations) {
					console.log('Load Obsrv3: ', data)
					dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
				}
			}
		}
	};
}

async function _saveObservations(data, user) {
	const jdata = await AsyncStorage.getItem(user.email)
	if (jdata !== null) {
		const ndata = JSON.parse(jdata)
		if (ndata.newObservations) {
			await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data, newObservations: ndata.newObservations }))
				.then(() => {
				})
				.catch(err => {
					console.log('error:', err);
				})
		} else {
			await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data }))
				.then(() => {
				})
				.catch(err => {
					console.log('error:', err);
				})
		}
	} else {
		await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data }))
			.then(() => {
			})
			.catch(err => {
				console.log('error:', err);
			})
	}
}

async function _saveSyncObservations(data, user) {
	await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data }))
		.then(() => {
		})
		.catch(err => {
			console.log('error:', err);
		})
}

export function syncObservationsSuccess(res) {
	return {
		type: types.SYNC_OBSERVATIONS_SUCCESS,
		observations: res
	};
}

export function syncObservations(status, user, token, newObservations) {
	//retrieveObservations
	return async function (dispatch) {
		if (status) {
			var config = {
				headers: { 'Authorization': token }
			};

			var bodyParameters = {

			};
			axios.get(API_URL + 'observations', bodyParameters, config)
				.then(res => {
					console.log('Observations: ', res)
					var config = {
						headers: { 'Authorization': token }
					};

					var bodyParameters = {
						data: newObservations
					};

					axios.put(API_URL + 'observations', bodyParameters, config)
						.then(res2 => {
							console.log('Observations: ', res2)
							dispatch(syncObservationsSuccess(res2.meta.concat(newObservations)));
							_saveSyncObservations(res2.meta.concat(newObservations), user)
						})
						.catch(async (error) => {
							Alert.alert('Server Err', 'We could not upload the new observations.')
							dispatch(retrieveObservationsSuccess(res.meta))
							_saveObservations(res.meta, user)
						});
					//goHome();
				})
				.catch(async (error) => {
					Alert.alert('Server Err', 'We could not retrieve the observations.')
				});
		} else {
			Alert.alert('Offline', 'You can try later. you are offline')
		}

	}
}