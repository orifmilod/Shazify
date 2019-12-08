import getAccessToken from '../utils/getAccessToken';
const accessToken = getAccessToken();

const headers = {
  Authorization: `Bearer ${accessToken}`,
  Accept: "application/json",
  "Content-Type": "application/json"
}

export async function getPlaylist(playlistID) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, { headers });
    return await response.json();
  }
  catch (error) {
    throw new Error(error);
  }
};

export async function getFeaturedPlaylists() {
  try {
    const limit = 50;
    const country = "PL"; //TODO: get this from User
    const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=${limit}`, { headers });
    return await response.json();
  }
  catch (error) {
    throw new Error(error);
  }
};
