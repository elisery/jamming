import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults:
      [ //Array of search result track objects
      ],
      playlistName: 'New Playlist',
      playlistTracks:
      [ //Array of playlist track objects
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //Add a track to a playlist from the search results if it is not already in it
  addTrack(track) {
    var checkTrack = this.state.playlistTracks.find(theTrack => theTrack.ID === track.ID);
    if (checkTrack === undefined) {
      let newList = this.state.playlistTracks.concat(track);
      this.setState({playlistTracks: newList});
    }
  }

  //Remove a track from a playlist
  removeTrack(track) {
    let newList = this.state.playlistTracks.filter(theTrack => theTrack.ID !== track.ID);
    this.setState({playlistTracks: newList});

  }

  //Set playlist name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  //Save playlist to Spotify by calling the Spotify module
  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.URI);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.updatePlaylistName('New Playlist');
      this.setState({searchResults: []});
    });
  }

  //Search Spotify by connecting to the API via the Spotify module
  search(searchTerm) {
    Spotify.search(searchTerm).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
