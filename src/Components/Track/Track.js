import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    //If isRemove, render a track with '+' beside it, else render track with '-'
    const isRemove = this.props.isRemoval;
    if (isRemove === true) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.Name}</h3>
          <p>{this.props.track.Artist} | {this.props.track.Album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
