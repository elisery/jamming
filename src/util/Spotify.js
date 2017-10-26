const clientID = '08000524db984cd48fe1a597db2fecad';
const redirectURI = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  //Create token for connecting to the Spotify API
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
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
    return new Promise((resolve) => {
        return resolve(accessToken);
    });
  },

  //Search Spotify
  search(searchTerm) {
    //Get access token then connect send search request to Spotify API
    return Spotify.getAccessToken().then(() => {
      return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      });
    }
    ).then (response => {
          if(response.ok) {
            return response.json();
          } else {
            throw new Error('Request failed!');
          }
      }, networkError => console.log(networkError.message)
    ).then (jsonResponse => {
      if(jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(track => {
          return {
            ID: track.id,
            Name: track.name,
            Artist: track.artists[0].name,
            Album: track.album.name,
            URI: track.uri
          };
        });
      } else {
        return [];
      }
    });
  },

  //Save playlist to Spotify
  savePlaylist(playlistName, trackURIs) {
    //Get access token
    this.getAccessToken();
    let userID = '';
    let playlistID = '';

    if (playlistName === '' && trackURIs === []) {
      return;
    }
    let defaultAccessToken = accessToken;

    //Send GET request to Spotify API for username
    return fetch(`https://api.spotify.com/v1/me`,
    {
      headers: {Authorization: `Bearer ${defaultAccessToken}`}
    }).then (response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed!');
      }
    }, networkError => console.log(networkError.message)
    ).then (jsonResponse => {
      if (jsonResponse.id) {
        //return user ID
        return userID = jsonResponse.id;
      }
    }).then (() => {
      const spotifyPostPlaylist = `https://api.spotify.com/v1/users/${userID}/playlists`;

      //Send POST request to Spotify API to create new playlist
      return fetch(spotifyPostPlaylist, {
        headers: {Authorization: `Bearer ${defaultAccessToken}`},
        method: 'POST',
        body: JSON.stringify({'name': playlistName})
      });
    }).then (response => {
      if (response.ok) {
        console.log('accessed playlist');
        return response.json();
      } else {
        throw new Error('Query playlist ID failed!');
      }
    }, networkError => console.log(networkError.message)
    ).then (jsonResponse => {
      if (jsonResponse.id) {
        playlistID = jsonResponse.id;
        //Return playlist ID
        return playlistID = jsonResponse.id;
      }
    }).then (() => {
      const spotifyPostTracks = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;

      //Send POST request to Spotify API to save track URIs passed to function
      return fetch(spotifyPostTracks, {
        headers: {Authorization: `Bearer ${defaultAccessToken}`},
        method: 'POST',
        body: JSON.stringify({'uris': trackURIs})
      });
    }).then (response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Save tracks failed!');
      }
    }, networkError => console.log(networkError.message)
    ).then (jsonResponse => {
      if (jsonResponse.id) {
        return playlistID = jsonResponse.id;
      }
    });
  }
};

export default Spotify;
