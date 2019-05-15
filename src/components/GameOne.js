import React, { Component } from 'react'
import OneDogImageContainer from './OneDogImageContainer'
import Game from './game1'
import { GameOneOptionsContainer } from './GameOneOptionsContainer';

export default class GameOne extends Component {
  render() {
    return (
      <div>
        <OneDogImageContainer/>
        <GameOneOptionsContainer/>
        <Game />
      </div>
    )
  }
}
