import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    const remove = this.props.isRemoval;
    this.state = {isRemoval: remove};
  }
  render () {

    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track track={track} key={track.id} onAdd={this.props.onAdd}
              onRemove={this.props.onRemove} isRemoval={this.state.isRemoval}/>;
          })
        }
      </div>
    );
  }
}

export default TrackList;
