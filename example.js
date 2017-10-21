if (!accessToken) {
    if (window.location.href.match(/access_token=([^&]*)/)
    && window.location.href.match(/expires_in=([^&]*)/)) {
      const url = window.location.href;
      accessToken = url.match(/access_token=([^&]*)/)[1];
      const expiresIn = url.match(/expires_in=([^&]*)/)[1];
        window.setTimeout(() => {
            accessToken = '';
        }, expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
    } else {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  }

        return new Promise((resolve) => {
            return resolve(accessToken);
        });
    }
