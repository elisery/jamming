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
      [ {Name: 'Rise Up', Artist: 'Andra Day', Album: 'Cheers to the Fall', ID: 'abc', URI: ''},
        {Name: 'Lovesick', Artist: 'Jacob Whitesides', Album: 'Lovesick - Single', ID: 'def', URI: ''},
        {Name: 'ILYSB', Artist: 'LANY', Album: 'Make Out', ID: 'ghi', URI: ''}
      ],
      playlistName: 'My list',
      playlistTracks:
      [ {Name: 'On a Good Day', Artist: 'Oceanlab', Album: 'Anjunabeats', ID: '123', URI: ''},
        {Name: 'Oceans Away', Artist: 'ARIZONA', Album: 'Oceans Away', ID: '456', URI: ''},
        {Name: 'The Best Crew', Artist: 'Tep No', Album: 'The Best Crew - Single', ID: '789', URI: ''}
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    var checkTrack = this.state.playlistTracks.find(theTrack => theTrack.ID === track.ID);
    if (checkTrack === undefined) {
      let newList = this.state.playlistTracks.concat(track);
      this.setState({playlistTracks: newList});
    }
  }

  removeTrack(track) {
    let newList = this.state.playlistTracks.filter(theTrack => theTrack.ID !== track.ID);
    this.setState({playlistTracks: newList});

  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    //Generates an array of uri values called trackURIs
    //from the playlistTracks property.
    let trackURIs = [];
    trackURIs = this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.URI);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: 'New Playlist'});
    this.setState({searchResults: []});
  }

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
