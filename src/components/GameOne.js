import React, { Component } from 'react'
import OneDogImageContainer from './OneDogImageContainer'
import Game from './game1'

export default class GameOne extends Component {
  render() {
    return (
      <div>
        <h2>Game One</h2>
        <p>TESTING</p>
        <OneDogImageContainer/>
        <Game />
      </div>
    )
  }
}
