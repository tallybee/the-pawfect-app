import React, { Component } from 'react'
import OneDogImageContainer from './OneDogImageContainer'
import Game from './game1'

export default class GameOne extends Component {
  render() {
    return (
      <div>
        <OneDogImageContainer/>
        <Game />
      </div>
    )
  }
}
