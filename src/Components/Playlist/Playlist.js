import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isRemoval: true};
    this.handleNameChange = this.handleNameChange.bind(this);
    console.log(this.state.isRemoval);
  }

  handleNameChange(e) {
    const newListName = e.target.value;
    this.props.onNameChange(newListName);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}
        isRemoval={this.state.isRemoval}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
