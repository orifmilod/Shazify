import getAccessToken from '../utils/getAccessToken'
const accessToken = getAccessToken()

const headers = {
  Authorization: `Bearer ${accessToken}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function getPlaylistData(playlistID) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}`,
      { headers }
    )
    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function getUserPlaylist() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers,
    })
    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function getFeaturedPlaylists(limit, country) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=${limit}`,
      { headers }
    )
    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function getUserData() {
  try {
    const respone = await fetch('https://api.spotify.com/v1/me', { headers })
    return await respone.json()
  } catch (error) {
    throw error
  }
}

export async function searchTrack(search) {
  try {
    const SEARCH_LIMIT = 40

    const respone = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=track&market=PL&limit=${SEARCH_LIMIT}`,
      { headers }
    )
    return await respone.json()
  } catch (error) {
    throw error
  }
}
