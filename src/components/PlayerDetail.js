import React, { Component } from 'react'

import './PlayerDetail.css'

export default class PlayerDetail extends Component {
  render() {
    if ( this.props.selectedPlayer){
      return (
        <div>
          <h3>{this.props.selectedPlayer.name}</h3>
          <ul>
            <li>
                <span>Score: </span>
                {this.props.selectedPlayer.score}
            </li>
            <li>
                <span>Created: </span>
                {this.props.selectedPlayer.created}
            </li>
            <li>
                <span>Updated: </span>
                {this.props.selectedPlayer.updated}
            </li>
        </ul>
        </div>
      );
    }
    else {
      return (<p>Click on a player to see more details</p>);
    }
  }
}
