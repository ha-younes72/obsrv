import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import AsyncStorage from '@react-native-community/async-storage'

export default function (state = initialState.app, action) {
	switch (action.type) {

		case types.RETRIEVE_OBSERVATIONS_SUCCESS:
			return {
				...state,
				observations: action.observations
			}

		case types.RETRIEVE_NEW_OBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.newObservations,
				currentIndex: action.currentIndex
			}

		case types.SYNC_OBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: [],
				observations: action.observations
			}

		case types.ADD_TEMP_OBSERVATION_SUCCESS:
			return {
				...state,
				tempObservation: { activity: action.obsrv }
			}

		case types.ADD_IMG_TIME_LOCATION_SUCCESS:
			return {
				...state,
				tempObservation: { ...state.tempObservation, ...action.img }
			}

		case types.ADD_ANIMALS_SUCCESS:
			return {
				...state,
				tempObservation: { ...state.tempObservation, animal: action.animal }
			}
		case types.ADD_HUMANS_SUCCESS:
			return {
				...state,
				tempObservation: { ...state.tempObservation, human: action.human }
			}

		case types.ADD_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: [...state.newObservations, { img: action.img }],
				currentIndex: state.currentIndex + 1,
				wantToAddPhoto: true
			}

		case types.ADD_TIME_AND_LOC_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.currentIndex === 0
					?
					[{
						img: state.newObservations[0].img,
						time: action.time,
						lon: action.lon,
						lat: action.lat
					}]
					:
					state.newObservations.slice(0, state.currentIndex).concat(
						[{
							img: state.newObservations[state.currentIndex].img,
							time: action.time,
							lon: action.lon,
							lat: action.lat
						}].concat(state.newObservations.slice(state.currentIndex + 1))
					),
				wantToAddPhoto: false
			}

		case types.ADD_HUMANS_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.currentIndex === 0
					?
					[{
						img: state.newObservations[0].img,
						time: state.newObservations[0].time,
						lon: state.newObservations[0].lon,
						lat: state.newObservations[0].lat,
						text: String(action.human[0].num) + ' ' + action.human[0].species,
						human: action.human,
						animal: state.newObservations[0].animal ? state.newObservations[0].animal : null
					}]
					:
					state.newObservations.slice(0, state.currentIndex).concat(
						[{
							img: state.newObservations[state.currentIndex].img,
							time: state.newObservations[state.currentIndex].time,
							lon: state.newObservations[state.currentIndex].lon,
							lat: state.newObservations[state.currentIndex].lat,
							text: String(action.human[0].num) + ' ' + action.human[0].species,
							human: action.human,
							animal: state.newObservations[state.currentIndex].animal ? state.newObservations[state.currentIndex].animal : null
						}].concat(state.newObservations.slice(state.currentIndex + 1))
					)
			}

		case types.ADD_ANIMALS_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.currentIndex === 0
					?
					[{
						img: state.newObservations[0].img,
						time: state.newObservations[0].time,
						lon: state.newObservations[0].lon,
						lat: state.newObservations[0].lat,
						text: String(action.animal[0].num) + ' ' + action.animal[0].species,
						animal: action.animal,
						human: state.newObservations[0].human ? state.newObservations[0].human : null
					}]
					:
					state.newObservations.slice(0, state.currentIndex).concat(
						[{
							img: state.newObservations[state.currentIndex].img,
							time: state.newObservations[state.currentIndex].time,
							lon: state.newObservations[state.currentIndex].lon,
							lat: state.newObservations[state.currentIndex].lat,
							text: String(action.animal[0].num) + ' ' + action.animal[0].species,
							animal: action.animal,
							human: state.newObservations[state.currentIndex].human ? state.newObservations[state.currentIndex].human : null
						}].concat(state.newObservations.slice(state.currentIndex + 1))
					)
			}

		case types.UPLOAD_NEW_OBSERVATION_SUCCESS:
			//state.newObservations.splice(action.index, 1)
			AsyncStorage
				.setItem(
					action.email, JSON.stringify({
						//...state,
						observations: state.observations.concat(action.newObservation),
						//newObservations: state.newObservations
						//currentIndex: state.currentIndex - 1,
						newObservations: action.index === 0
							?
							[]
							:
							state.newObservations.slice(0, action.index).concat(state.newObservations.slice(action.index + 1, state.newObservations.length))
					}))
			return {
				...state,
				observations: state.observations.concat(action.newObservation),
				currentIndex: state.currentIndex - 1,
				newObservations: action.index === 0
					?
					[]
					:
					state.newObservations.slice(0, action.index).concat(state.newObservations.slice(action.index + 1, state.newObservations.length))
			}

		case types.UPLOAD_NEW_OBSERVATION_FAIL:
			//state.newObservations[action.index] = action.newObservation
			return {
				...state,
				//newObservations: state.newObservations.concat(action.newObservation),
				//currentIndex: state.currentIndex + 1
				//observations: state.observations.concat(action.newObservation),
				/*newObservations: action.index === 0
					?
					[action.newObservation]
					:
					state.newObservations.slice(0, action.index).concat([action.newObservation])*/
			}

		case types.UPLOAD_TEMP_OBSERVATION_SUCCESS:
			AsyncStorage
				.setItem(
					action.email, JSON.stringify({
						observations: state.observations.concat(action.newObservation),
						newObservations: state.newObservations
					}))
			return {
				...state,
				observations: state.observations.concat(action.newObservation)
			}

		case types.UPLOAD_TEMP_OBSERVATION_FAIL:
			AsyncStorage
				.setItem(
					action.email, JSON.stringify({
						observations: state.observations,
						newObservations: state.newObservations.concat(action.newObservation)
					}))
			return {
				...state,
				newObservations: state.newObservations.concat(action.newObservation),
				currentIndex: state.currentIndex + 1
			}

		default:
			return state;
	}
}
