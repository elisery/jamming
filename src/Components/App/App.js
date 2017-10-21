import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults:
      [ {name: 'Rise Up', artist: 'Andra Day', album: 'Cheers to the Fall', id: '', uri: ''},
        {name: 'Lovesick', artist: 'Jacob Whitesides', album: 'Lovesick - Single',id: '', uri: ''},
        {name: 'ILYSB', artist: 'LANY', album: 'Make Out', id: '', uri: ''}
      ],
      playlistName: 'My list',
      playlistTracks:
      [ {name: 'On a Good Day', artist: 'Oceanlab', album: 'Anjunabeats', id: '', uri: ''},
        {name: 'Oceans Away', artist: 'ARIZONA', album: 'Oceans Away', id: '', uri: ''},
        {name: 'The Best Crew', artist: 'Tep No', album: 'The Best Crew - Single', id: '', uri: ''}
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    var checkTrack = this.state.playlistTracks.find(theTrack => theTrack.id === track.id);
    if (checkTrack === null) {
      let newList = this.state.playlistTracks.concat(track);
      this.setState({playlistTracks: newList});
    }
  }

  removeTrack(track) {
    //var checkTrack = this.playlistTracks.find(theTrack => theTrack.id === track.id);
    //if (checkTrack !== null) {
    let newList = this.state.playlistTracks.filter(theTrack => theTrack.id !== track.id);
    this.setState({playlistTracks: newList});
    //}
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  //I'm not sure about this search method
  savePlaylist() {
    //Generates an array of uri values called trackURIs
    //from the playlistTracks property.
    let trackURIs = [];
    trackURIs = this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    });
  }

  search(searchTerm) {
    console.log(searchTerm);
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
