import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default class Home extends Component {
  render() {
    return (
      <div className='Home-app'>
        <h1>Welcome</h1>
        <p>The Pawfect App is a game to test your knowledge about Doggos Breed. And before you take this pawesome chanllenge, you can always educate your self about it by going to <strong>DOGS LIST</strong>, there are 87 different breeds. But you think that you are a Doggo expect skip it and show us what you got.</p>
        <p>There is two games for you to Play. In each game you have 10 turns. To win you need to guess all 10 correctly</p>
        <Link to={"/gameOne"} className='game-link'>GAME 1:</Link> &nbsp; You will see a pawcture of a doggo, and you will have to choose the right answer.
        <br/>
        <Link to={"/gameTwo"} className='game-link'>GAME 2:</Link> &nbsp; You will see 3 different doggos, and you will have to click on the right pawcture.
      </div>
    )
  }
}
