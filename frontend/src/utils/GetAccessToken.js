import queryString from 'query-string';

const getWindowURLParsed = () => queryString.parse(window.location.hash);
const getCurrentTime = () => new Date().getTime();
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const setLocalAccessToken = token => window.localStorage.setItem('spotify_access_token', token);
const setTokenTimestamp = value => window.localStorage.setItem('spotify_token_timestamp', value);

export default function getAccessToken() {
  const timestamp = getTokenTimestamp();
  const currentTime = getCurrentTime();
  const localAccessToken = getLocalAccessToken();
  const twentyFourHourInMS = 24 * 60 * 60 * 1000;

  //If ther is access token and refresh time has not been expired
  if (localAccessToken && timestamp - currentTime > 0) {
    return localAccessToken;
  }

  //If nothing has been stored in the local storage - first time visiting the page
  if (!localAccessToken || !timestamp) {
    //Check the url for access token and refersh token
    const result = getWindowURLParsed();
    if (result.access_token && result.refresh_token) {
      const { access_token, refresh_token } = result;
      const currentTime = new Date().getTime() + parseInt(twentyFourHourInMS);
      console.log(currentTime);
      setTokenTimestamp(currentTime);
      setLocalAccessToken(access_token);
      setLocalRefreshToken(refresh_token);
      return access_token;
    }
    return null;
  }
  return null;
}
