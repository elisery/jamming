const clientID = '08000524db984cd48fe1a597db2fecad';
const redirectURI = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      const url = window.location.href;
      accessToken = url.match(/access_token=([^&]*)/)[1];
      const expiresIn = url.match(/expires_in=([^&]*)/)[1];
        window.setTimeout(() => {
            accessToken = '';
        }, expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
    } else {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  }
    return new Promise((resolve) => {
        return resolve(accessToken);
    });
  }

};

export default Spotify;
