import React, { Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PlayerActionCreators from '../actions/player';
import AddPlayer from './AddPlayer';
import Player from './Player';
// import PlayerDetail from './PlayerDetail';

import './Scoreboard.css'

class Scoreboard extends Component {

 render() {    
    const { dispatch, players } = this.props;

    const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer, dispatch);

    const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer, dispatch);
    
    const playerComponents = players.map((player, index) => (
      <Player 
        index={index}
        name={player.name}
        score={player.score}
        key={player.name}
        removePlayer={removePlayer}
      />
    ));

    return (
      <div>
        <h1>Scoreboard</h1>
        <div className="scoreboard">
          <div className="players">
            { playerComponents }
          </div>
          <AddPlayer addPlayer={addPlayer} />
        </div>   
      </div>   
    );
  }
}

const mapStateToProps = state => (
  {
    players: state.players
  }
);

export default connect(mapStateToProps)(Scoreboard);