import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  constructor(props){
    super(props);
    //Sets state for search result tracks as '+'
    this.state = {isRemoval: false};
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}
        isRemoval={this.state.isRemoval}/>
      </div>
    );
  }
}

export default SearchResults;
