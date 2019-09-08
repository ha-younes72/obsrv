import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

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

		case types.ADD_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: [...state.newObservations, { img: action.imgUri }],
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

		default:
			return state;
	}
}
