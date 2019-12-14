import {
  UPDATE_USER_DATA,
  UPDATE_CURRENT_SEARCH,
  UPDATE_CURRENT_TRACK_ID,
  UPDATE_FUTURED_PLAYLIST,
} from '../constant/actionTypes';

const initialState = {
  userData: {},
  searchedTrack: '',
  playingTrackID: '',
  featuredPlaylist: [],
}

export default function name(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CURRENT_SEARCH:
      return {
        ...state,
        searchedTrack: payload
      }

    case UPDATE_CURRENT_TRACK_ID:
      return {
        ...state,
        playingTrackID: payload
      }

    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: payload
      }

    case UPDATE_FUTURED_PLAYLIST:
      return {
        ...state,
        featuredPlaylist: payload
      }

    default:
      return state
  }
} 