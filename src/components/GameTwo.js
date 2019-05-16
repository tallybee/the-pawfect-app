import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";
import DoggoHappy from '../img/doggohappy.png'
import DoggoSad from '../img/doggosad.png'
import soundwin from '../sounds/shootingstar.mp3'
import soundfail from '../sounds/fail.mp3'
import Sound from 'react-sound'

import "./GameTwo.css";

class GameTwo extends Component {
  state = { 
    options: [],
    correctDogBreed: null,
    images: null 
  }

  componentDidMount() {
    request
      .get(`https://dog.ceo/api/breeds/list/all`)
      .then(response => {
        const breeds = Object.keys(response.body.message);
        this.updateOptions(breeds);
      })
      .catch(console.error);
  }

  updateOptions(breeds) {
    this.setState({
      options: [
        breeds[Math.floor(Math.random() * breeds.length)],
        breeds[Math.floor(Math.random() * breeds.length)],
        breeds[Math.floor(Math.random() * breeds.length)]
      ]
    });
    this.setCorrect();
    this.getImage();
  }

  setCorrect = () => {
    this.setState({
      correctDogBreed: this.state.options[Math.floor(Math.random() * 3)]
    });
    this.props.dispatch({
      type: "ADD_CORRECT_BREED",
      payload: this.state.correctDogBreed
    });
  };

  getImage = () => {
    const imageOne = request.get(`https://dog.ceo/api/breed/${encodeURIComponent(
      this.state.options[0])}/images/random`)
    const imageTwo = request.get(`https://dog.ceo/api/breed/${encodeURIComponent(
      this.state.options[1])}/images/random`)
    const imageThree = request.get(`https://dog.ceo/api/breed/${encodeURIComponent(
      this.state.options[2])}/images/random`)

    Promise.all([imageOne, imageTwo, imageThree])
      .then(responses => {
        this.setState({
          images: responses.map(response => response.body.message)
        })
      })
      
   };


  handleChoice = guessedBreed => {
    if (
      guessedBreed === this.props.correctDogBreed &&
      this.props.roundsPlayed < 5
    ) {
      this.props.dispatch({
        type: "CORRECT_GUESS",
        payload: guessedBreed
      });
      this.componentDidMount();
    } else if (
      guessedBreed !== this.props.correctDogBreed &&
      this.props.roundsPlayed < 5
    ) {
      this.props.dispatch({
        type: "WRONG_GUESS",
        payload: guessedBreed
      });
      this.componentDidMount();
    } else {
      this.props.dispatch({
        type: "START_NEW_GAME"
      });
      this.componentDidMount();
    }
  };

  restarteGame() {
    window.location.reload()
  }

  render() {
    if (this.props.roundsPlayed === 5 && this.props.score === 5) {
      return (
        <div className='GameWin'>
          <img src={DoggoHappy} alt="Dog sad"/>
          <h2>You WIN</h2>
          <div>
            <h3>You have {this.props.score} correct guesses.</h3>
            <Sound
              url={soundwin}
              playStatus={Sound.status.PLAYING}
              playFromPosition={100 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              loop={true}
            />
          </div>
          <div>
            <h3>You are the most pawfect doggo lover!</h3>
          </div>
          <button onClick={this.restarteGame}>Start New Game</button>
        </div>
      )
    } else if (this.props.roundsPlayed === 5 && this.props.score < 5) {
      const categories = [
        "You are not that much into doggos, are you?",
        "This made me wanna howl",
        "Still room for imp-woof-ment!",
        "Pawsitive result",
        "You still have a lot to learn",
        "You know some dawgs!0",
        "Keep going",
        "You are getting better",
        "That's the spirit",
        "Amazing"
      ]
      return (
        <div className='GameOver'>
          <img src={DoggoSad} alt="Dog sad"/>
          <h2>GAME OVER</h2>
          <div>
            <h3>You have {this.props.score} correct guesses.</h3>
            <Sound
              url={soundfail}
              playStatus={Sound.status.PLAYING}
              playFromPosition={100 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              loop={true}
            />
          </div>
          <div>
            <h3>{categories[Math.floor(this.props.score/2)]}</h3>
          </div>
          <button onClick={this.restartGame}>Start New Game</button>
        </div>
      )
    }
    
    return (
      this.state.images !== null &&
      <div>
        <h1>Find the {this.props.correctDogBreed}!</h1>
        <div className='Image-container'>
          <h4>Where am I?</h4>
          <img src={this.state.images[0]} alt='first' onClick={() => this.handleChoice(this.state.options[0])} />
          
          <img src={this.state.images[1]} alt='second' onClick={() => this.handleChoice(this.state.options[1])} />
          
          <img src={this.state.images[2]} alt='third' onClick={() => this.handleChoice(this.state.options[2])} />
          
          <h3>You guessed {this.props.score} breed out of {this.props.roundsPlayed} dogs.</h3>
        </div>
    </div>
  );}
}

const mapStateToProps = state => {
  return {
    state: state,
    correctDogBreed: state.correctDogBreed,
    selectedDogBreed: state.selectedDogBreed,
    roundsPlayed: state.roundsPlayed,
    score: state.score
  };
};

export default connect( mapStateToProps)(GameTwo);

