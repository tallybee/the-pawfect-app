import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default class Home extends Component {
  render() {
    return (
      <div className='Home-app'>
        <h1>Welcome</h1>
        <p>HI and welcome to the Pawfect app! Fur-tastic to see you here. Wanna hear a joke?</p>

        <p>Q: What do you call a sad pup?</p>
        <p>A: mellon collie</p>

        <p>Now that we’ve got your attention, let’s learn some dog breeds! It might be a ruff ride at first, but we’ve got some hints for you.</p>
        <p>We made two games for you, so you don’t pug-get any breeds! In <strong>“GUESS MY BREED”</strong>, look at a pic of doggo and choose which one it is. In <strong>“GUESS MY FACE”</strong>, you’ll have to figure out which of the pics belongs to the breed! And to finish off..</p>
        <p>Where do dogs go after their tails fall off?
        The re-tail store.</p>
        <p>And if you wanna expend your doggo knowledge before jump into the games, head to the “DOG BREEDS” section!</p>
        <Link to={"/gameOne"} className='game-link'>GUESS MY BREED:</Link> &nbsp; You will see a pawcture of a doggo, and you will have to choose the right answer.
        <br/>
        <Link to={"/gameTwo"} className='game-link'>GUESS MY FACE:</Link> &nbsp; You will see 3 different doggos, and you will have to click on the right pawcture.
      </div>
    )
  }
}
