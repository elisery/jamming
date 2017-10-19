import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults:
      [ {name: 'Rise Up', artist: 'Andra Day', album: 'Cheers to the Fall'},
        {name: 'Lovesick', artist: 'Jacob Whitesides', album: 'Lovesick - Single'},
        {name: 'ILYSB', artist: 'LANY', album: 'Make Out'}
      ],
      playlistName: 'My list',
      playlistTracks:
      [ {name: 'On a Good Day', artist: 'Oceanlab', album: 'Anjunabeats'},
        {name: 'Oceans Away', artist: 'ARIZONA', album: 'Oceans Away'},
        {name: 'The Best Crew', artist: 'Tep No', album: 'The Best Crew - Single'}
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    var checkTrack = this.playlistTracks.find(theTrack => theTrack.id === track.id);
    if (checkTrack === null) {
      let newList = this.state.playlistTracks.concat(track);
      this.setState({playlistTracks: newList});
    }
  }

  removeTrack(track) {
    //var checkTrack = this.playlistTracks.find(theTrack => theTrack.id === track.id);
    //if (checkTrack !== null) {
    let newList = this.playlistTracks.filter(theTrack => theTrack.id !== track.id);
    this.setState({playlistTracks: newList});
    //}
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
