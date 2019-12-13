import { UPDATE_CURRENT_SEARCH, UPDATE_CURRENT_TRACK_ID, UPDATE_USER_DATA } from '../constant/actionTypes';

const initialState = {
  userData: {},
  searchedTrack: '',
  playingTrackID: '',
}

export default function name(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_SEARCH:
      return {
        ...state,
        searchedTrack: action.payload
      }
    case UPDATE_CURRENT_TRACK_ID:
      return {
        ...state,
        playingTrackID: action.payload
      }
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload
      }

    default:
      return state
  }
} 