const SET_USER_DATA = 'SET_USER_DATA'
const SET_CURRENT_SEARCH = 'SET_CURRENT_SEARCH'
const SET_CURRENT_TRACK_ID = 'SET_CURRENT_TRACK_ID'
const SET_FEATURED_PLAYLIST = 'SET_FEATURED_PLAYLIST'

const initialState = {
  userData: {},
  searchedTrack: '',
  playingTrackID: '',
  featuredPlaylist: [],
}

//REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action

  const cases = {
    [SET_USER_DATA]: () => ({ ...state, userData: payload }),
    [SET_CURRENT_SEARCH]: () => ({ ...state, searchedTrack: payload }),
    [SET_CURRENT_TRACK_ID]: () => ({ ...state, playingTrackID: payload }),
    [SET_FEATURED_PLAYLIST]: () => ({ ...state, featuredPlaylist: payload }),
  }

  return cases[type] ? cases[type]() : state
}

//ACTIONS
export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data,
})

export const setFeaturedPlaylist = (playlist) => ({
  type: SET_FEATURED_PLAYLIST,
  payload: playlist,
})

export const setCurrentTrackID = (id) => ({
  type: SET_CURRENT_TRACK_ID,
  payload: id,
})
