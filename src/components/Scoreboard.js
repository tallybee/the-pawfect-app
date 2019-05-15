import React, { Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PlayerActionCreators from '../actions/player';
import AddPlayer from './AddPlayer';
import Player from './Player';
import PlayerDetail from './PlayerDetail';

import './Scoreboard.css'

class Scoreboard extends Component {

 render() {    
    const { dispatch, players, selectedPlayerIndex } = this.props;
    const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer, dispatch);
    const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreators(PlayerActionCreators.updatePlayerScore, dispatch);
    const selectPlayer = bindActionCreators(PlayerActionCreators.selectPlayer, dispatch);

    let selectedPlayer;
    if(selectedPlayerIndex !== -1){
      selectedPlayer = players[selectedPlayerIndex];
    }

    
    const playerComponents = players.map((player, index) => (
      <Player 
        index={index}
        name={player.name}
        score={player.score}
        key={player.name}
        updatePlayerScore={updatePlayerScore}
        removePlayer={removePlayer}
        selectPlayer={selectPlayer}
      />
    ));

    return (
      <div className="scoreboard">
        <div className="players">
          { playerComponents }
        </div>
        <AddPlayer addPlayer={addPlayer} />
        <div className="player-detail">
          <PlayerDetail selectedPlayer={selectedPlayer}/>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = state => (
  {
    players: state.players,
    selectedPlayerIndex: state.selectedPlayerIndex
  }
);

export default connect(mapStateToProps)(Scoreboard);