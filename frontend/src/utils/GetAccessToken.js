import queryString from 'query-string';
import axios from 'axios';


const getCurrentTime = () => new Date().getTime();
const getWindowURLParsed = () => queryString.parse(window.location.hash);
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const setTokenTimestamp = value => window.localStorage.setItem('spotify_token_timestamp', value);

const setLocalAccessToken = token => {
  const hourInMS = 24 * 60 * 1000;
  window.localStorage.setItem('spotify_access_token', token)
  const currentTime = new Date().getTime() + parseInt(hourInMS);
  setTokenTimestamp(currentTime);
}


async function refreshAccessToken() {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`)
    const { access_token } = data;
    console.log(access_token);
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  }
  catch (error) {
    console.error(error);
  }
}

export default function getAccessToken() {
  const timestamp = getTokenTimestamp();
  const currentTime = getCurrentTime();
  const localAccessToken = getLocalAccessToken();

  //If ther is access token and refresh time has not been expired
  if (localAccessToken && timestamp - currentTime > 0) {
    return localAccessToken;
  }

  if (localAccessToken && timestamp - currentTime < 0) {
    refreshAccessToken();
    return;
  }

  //If nothing has been stored in the local storage - first time visiting the page
  if (!localAccessToken || !timestamp) {
    //Check the url for access token and refersh token
    const result = getWindowURLParsed();
    if (result.access_token && result.refresh_token) {
      const { access_token, refresh_token } = result;
      setLocalAccessToken(access_token);
      setLocalRefreshToken(refresh_token);
      return access_token;
    }
    return null;
  }
  return null;
}


export function clearTokens() {
  window.localStorage.removeItem('spotify_access_token')
  window.localStorage.removeItem('spotify_refresh_token')
  window.localStorage.removeItem('spotify_token_timestamp')
}