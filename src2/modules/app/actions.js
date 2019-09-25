import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome } from '../../utils/navigation'
import { ToastAndroid, Alert } from "react-native";
import { Navigation } from 'react-native-navigation';
import * as authActions from '../authentication/actions';
import AsyncStorage from '@react-native-community/async-storage';
//var FormData = require('form-data');
//var fs = require('fs');
var RNFS = require('react-native-fs');

export function addTempObservationSuccess(obsrv){
	return {
		type: types.ADD_TEMP_OBSERVATION_SUCCESS,
		obsrv: obsrv
	}
}

export function addTempObservation(obsrv) {
	return function (dispatch) {
		console.log('I amd here')
		dispatch(addTempObservationSuccess(obsrv))
	}
	
}

export function addPhotoTimeandLocSuccess(img){
	return {
		type: types.ADD_IMG_TIME_LOCATION_SUCCESS,
		img: img
	}
}

export function addPhotoTimeandLoc(img) {
	return function (dispatch) {
		dispatch(addPhotoTimeandLocSuccess(img))
	}
}

export function addAnimalsSuccess(params) {
	return{
		type: types.ADD_ANIMALS_SUCCESS,
		animal: params
	}
}

export function addAnimals(params) {
	return function (dispatch) {
		dispatch(addAnimalsSuccess(params))
	}
}

export function addPhotoSuccess(img) {
	return {
		type: types.ADD_TO_NEWOBSERVATIONS_SUCCESS,
		img: img,
		//imgData: imgData
	}
}
export function addPhoto(img, user) {
	return async function (dispatch) {
		//AsyncStorage.removeItem(user.email)
		const jdata = await AsyncStorage.getItem(user.email);
		var data = JSON.parse(jdata)
		console.log('data: ', data)
		if (data === null) {
			await AsyncStorage.setItem(user.email, JSON.stringify({
				newObservations: [{
					img: img,
				}]
			}))
				.then(() => {
					console.log("The observation has been stored locally")
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

			//console.log(API_URL + 'sessionObservations?id=81000')
			var config = {
				headers: { 'Authorization': token }
			};

			// var bodyParameters = {

			// };
			axios.get(API_URL + 'sessionObservations?id=81000', config)
				.then(async (res) => {
					console.log('Observations: ', res.data.meta)
					dispatch(retrieveObservationsSuccess(res.data.meta));
					//await AsyncStorage.removeItem(user.email)
					const jdata = await AsyncStorage.getItem(user.email)
					const data = JSON.parse(jdata)
					console.log('Load Obsrv: ', data)
					if (data === null) {
						//Alert.alert('No local data', 'You have no observations, you can add one by pressing Log.')
					} else {
						if (data.newObservations) {
							dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
						}
					}
					_saveObservations(res.data.meta, user)
					//goHome();
				})
				.catch(async (error) => {
					Alert.alert('Server Err', 'We could not retrieve the observations.')
					//_loadObservations(user)
					const jdata = await AsyncStorage.getItem(user.email)
					const data = JSON.parse(jdata)
					console.log('Load Obsrv: ', data)
					if (data === null) {
						dispatch(retrieveObservationsSuccess([]))
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
				dispatch(retrieveObservationsSuccess([]))
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
	console.log('I am saving')
	const jdata = await AsyncStorage.getItem(user.email)
	if (jdata !== null) {
		const ndata = JSON.parse(jdata)
		if (ndata.newObservations) {
			await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data, newObservations: ndata.newObservations }))
				.then(() => {
					console.log('I have saved 1')
				})
				.catch(err => {
					console.log('error:', err);
				})
		} else {
			await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data }))
				.then(() => {
					console.log('I have saved 2')
				})
				.catch(err => {
					console.log('error:', err);
				})
		}
	} else {
		await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data }))
			.then(() => {
				console.log('I have saved 3')
			})
			.catch(err => {
				console.log('error:', err);
			})
	}
}

async function _saveSyncObservations(data, user) {
	const saved = await AsyncStorage.getItem(user.email)
	const savedJson = JSON.parse(saved)
	await AsyncStorage
		.setItem(
			user.email,
			JSON.stringify(
				!savedJson.newObservations ? {
					observations: data
				} : {
						observations: data,
						newObservations: savedJson.newObservations
					}
			))
		.then(() => {
		})
		.catch(err => {
			console.log('error:', err);
		})
}

async function _saveSyncedObservation(data, index, user) {
	
	const saved = await AsyncStorage.getItem(user.email)
	var savedJson = JSON.parse(saved)
	if (savedJson.observations) {
		savedJson.observations = savedJson.observations.concat([data])
		const length = savedJson.newObservations.length
		savedJson.newObservations = index === 0 ?
			[] :
			index === length - 1 ?
				savedJson.newObservations.slice(0, length - 1) :
				savedJson.newObservations.slice(0, index).concat(savedJson.newObservations.slice(index + 1, length))
		await AsyncStorage.setItem(user.email, JSON.stringify(savedJson))
			.then(() => {
			})
			.catch(err => {
				console.log('error:', err);
			})
	} else {
		savedJson.observations = [data]
		const length = savedJson.newObservations.length
		savedJson.newObservations = index === 0 ?
			[] :
			index === length - 1 ?
				savedJson.newObservations.slice(0, length - 1) :
				savedJson.newObservations.slice(0, index).concat(savedJson.newObservations.slice(index + 1, length))
		await AsyncStorage.setItem(user.email, JSON.stringify(savedJson))
			.then(() => {
			})
			.catch(err => {
				console.log('error:', err);
			})
	}
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

			axios.get(API_URL + 'sessionObservations?id=81000', config)
				.then(async (res) => {
					console.log('Observations: ', res)
					await _saveSyncObservations(res.data.meta, user)
						.then(resSync => {
							newObservations.map((newObservation, currentIndex) => {
								console.log('Obsrv to be uploaded: ', newObservation)
								RNFS
									.stat(newObservation.img.path)
									.then(statRes => {
										console.log('Stat Result: ', statRes)
									})
									.catch(err => {
										console.log('Stat Err: ', err)
									})
								var uploadUrl = API_URL + 'observation';

								var files = [{
									name: 'photoFile',
									filename: newObservation.img.fileName,
									filepath: newObservation.img.path,
									filetype: newObservation.img.type
								}];

								var uploadBegin = (response) => {
									var jobId = response.jobId;
									console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
								};

								var uploadProgress = (response) => {
									var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
									console.log('UPLOAD IS ' + percentage + '% DONE!');
								};

								// upload files
								RNFS.uploadFiles({
									toUrl: uploadUrl,
									files: files,
									method: 'PUT',
									headers: {
										//'Accept': 'application/json',
										'Authorization': token
									},
									fields:
									{
										sessionID: JSON.stringify(newObservation.sessionID),
										//userID: 11,
										animal: JSON.stringify(newObservation.animal),
										human: JSON.stringify(newObservation.human),
										activity: JSON.stringify(newObservation.activity),
										text: newObservation.text,
										lat: JSON.stringify(newObservation.lat),
										lon: JSON.stringify(newObservation.lon),
										time: newObservation.time,
									},
									begin: uploadBegin,
									progress: uploadProgress
								}).promise.then((response) => {
									if (response.statusCode == 200) {
										console.log('FILES UPLOADED!', JSON.parse(response.body)); // response.statusCode, response.headers, response.body
										//newObservation.img = newObservation.img.uri
										dispatch(uploadNewObservationSuccess({ ...newObservation, img: newObservation.img.uri }, currentIndex, user.email))
										Alert.alert('Success', 'Observation Uploaded!')
										//return ({ newObservation: { ...newObservation, img: newObservation.img.uri }, index: currentIndex})
										//console.log('Put New Response: ', response)
									} else {
										dispatch(uploadNewObservationFail(newObservation, currentIndex))
										Alert.alert('SERVER ERROR', JSON.stringify(response))
										console.log('SERVER ERROR');
									}
								})
									.catch((err) => {
										if (err.description === "cancelled") {
											console.log('Upload Cancelled')
											// cancelled by user
										}
										dispatch(uploadNewObservationFail(newObservation, currentIndex))
										Alert.alert('ERROR', JSON.stringify(err))
										console.log('Err Uploading: ', err);
									});

								/*
								axios.put(API_URL + 'observation', bodyParameters, config)
									.then(res2 => {
										console.log('Sync Res2: ', res2)
										dispatch(syncObservationsSuccess(res2.data.meta.concat(newObservations)));
										_saveSyncObservations(res2.data.meta.concat(newObservations), user)
									})
									.catch(error => {
										console.log('Sync Error: ', error)
										Alert.alert('Server Err', 'We could not upload the new observations.')
										dispatch(retrieveObservationsSuccess(res.data.meta))
										_saveObservations(res.data.meta, user)
									});
									*/
							})
						})
						.catch(errSync => {
							console.log('We could not save the observations', errSync)
							Alert.alert('Save Err', 'We could not save the retrieved observations.')
						})
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

export function uploadNewObservationSuccess(obsrv, index, email) {
	return {
		type: types.UPLOAD_NEW_OBSERVATION_SUCCESS,
		newObservation: obsrv,
		index: index,
		email: email
	}
}

export function uploadNewObservationFail(obsrv, index) {
	return {
		type: types.UPLOAD_NEW_OBSERVATION_FAIL,
		newObservation: obsrv,
		index: index
	}
}

export function uploadTempObservationSuccess(obsrv, index, email) {
	return {
		type: types.UPLOAD_TEMP_OBSERVATION_SUCCESS,
		newObservation: obsrv,
		index: index,
		email: email
	}
}

export function uploadTempObservationFail(obsrv, index, email) {
	return {
		type: types.UPLOAD_TEMP_OBSERVATION_FAIL,
		newObservation: obsrv,
		index: index,
		email: email
	}
}

export function uploadNewObservation(status, user, token, tempObservation, currentIndex) {
	return function (dispatch) {
		if (status) {

			console.log('Obsrv to be uploaded: ', tempObservation)
			RNFS
				.stat(tempObservation.img.path)
				.then(statRes => {
					console.log('Stat Result: ', statRes)
				})
				.catch(err => {
					console.log('Stat Err: ', err)
				})
			var uploadUrl = API_URL + 'observation';

			var files = [{
				name: 'photoFile',
				filename: tempObservation.img.fileName,
				filepath: tempObservation.img.path,
				filetype: tempObservation.img.type
			}];

			var uploadBegin = (response) => {
				var jobId = response.jobId;
				console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
			};

			var uploadProgress = (response) => {
				var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
				console.log('UPLOAD IS ' + percentage + '% DONE!');
			};

			// upload files
			RNFS.uploadFiles({
				toUrl: uploadUrl,
				files: files,
				method: 'PUT',
				headers: {
					//'Accept': 'application/json',
					'Authorization': token
				},
				fields:
				{
					sessionID: JSON.stringify(tempObservation.sessionID),
					//userID: 11,
					animal: JSON.stringify(tempObservation.animal),
					human: JSON.stringify(tempObservation.human),
					activity: JSON.stringify(tempObservation.activity),
					text: tempObservation.text,
					lat: JSON.stringify(tempObservation.lat),
					lon: JSON.stringify(tempObservation.lon),
					time: tempObservation.time,
				},
				begin: uploadBegin,
				progress: uploadProgress
			}).promise.then((response) => {
				if (response.statusCode == 200) {
					console.log('FILES UPLOADED!', JSON.parse(response.body)); // response.statusCode, response.headers, response.body
					//tempObservation.img = tempObservation.img.uri
					dispatch(uploadTempObservationSuccess({...tempObservation, img: tempObservation.img.uri}, currentIndex, user.email))
					//_saveSyncedObservation(tempObservation, currentIndex, user)
					Alert.alert('Success', 'Observation Uploaded!')
					//console.log('Put New Response: ', response)
				} else {
					dispatch(uploadTempObservationFail(tempObservation, currentIndex, user.email))
					Alert.alert('SERVER ERROR', JSON.stringify(response))
					console.log('SERVER ERROR');
				}
			})
				.catch((err) => {
					if (err.description === "cancelled") {
						console.log('Upload Cancelled')
						// cancelled by user
					}
					dispatch(uploadTempObservationFail(tempObservation, currentIndex, user.email))
					Alert.alert('ERROR', JSON.stringify(err))
					console.log('Err Uploading: ', err);
				});
			//console.log('Token: ', token)
			/*var config = {
				headers: {
					'Authorization': token,
					Accept: "application/json",
					//"Content-Type": "multipart/form-data",
				}
			};
			var data = new FormData();
			Object.entries(newObservations[currentIndex]).map(([key, value]) => {
				//console.log('Key: ', key)
				//console.log('Value: ', value)
				if (key === 'img') {
					data.append('photoFile',
						{ uri: value, });
				} else {
					data.append(key, value)
				}
			});
	
			console.log('FormData: ', data)
	
			var bodyParameters = {
				data: data
			}
			*/

			/*var form = new FormData();
	
			Object.entries(newObservations[currentIndex]).map(([key, value]) => {
				//console.log('Key: ', key)
				//console.log('Value: ', value)
				if (key === 'img') {
					const stream = value//fs.createReadStream(value);
					form.append('photoFile', stream);
				} else {
					form.append(key, value)
				}
			});
	
			console.log('FormData: ', form)
	
			// In Node.js environment you need to set boundary in the header field 'Content-Type' by calling method `getHeaders`
			const formHeaders = form.getHeaders();
	
			axios.put(API_URL + 'observation', form, {
				headers: {
					'Authorization': token,
					...formHeaders,
				},
			})
				.then(response => {
					console.log('Upload Response: ', response)
				})
				.catch(error => {
					console.log('Upload Error: ', error)
				})
			*/
			/*fetch(API_URL + 'observation', {
				method: "put",
				headers: {
					Accept: "application/x-www-form-urlencoded",
					Authorization: token,
				},
				body: bodyParameters,
			}).then(res => res.json())
				.then(res => {
					Alert.alert(
						"Success",
						"Bill of Loading Uploaded Successfully!"
					);
					dispatch(uploadNewObservationSuccess(newObservations[currentIndex], currentIndex))
					console.log('Put New Response: ', res)
				})
				.catch(err => {
					dispatch(uploadNewObservationFail(newObservations[currentIndex], currentIndex))
					//console.log('Put New Error: ', error.response ? error.response : error)
					console.error("error uploading images: ", err);
				});
				*/
			/*axios.put(API_URL + 'observation', bodyParameters, config)
				.then(response => {
					dispatch(uploadNewObservationSuccess(newObservations[currentIndex], currentIndex))
					console.log('Put New Response: ', response)
				})
				.catch(error => {
					dispatch(uploadNewObservationFail(newObservations[currentIndex], currentIndex))
					console.log('Put New Error: ', error.response ? error.response : error)
				});*/
		} else {
			dispatch(uploadTempObservationFail(tempObservation, currentIndex, user.email))
			Alert.alert('Offline', 'You can sync later')
		}
	}
}
