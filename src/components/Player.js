import React from 'react'
import Counter from './Counter'

import './Player.css'

const Player = props => {
  return (
    <div>
      <div className="player">
        <div className="player-name">
          <span className="remove-player" onClick={()=> props.removePlayer(props.index)}>
          ✖
          </span>
          {props.name}
        </div>
        <div className="player-score">
          <Counter 
          index={props.index}
          score={props.score} />
        </div>
      </div>
    </div>
  )
}

export default Player;