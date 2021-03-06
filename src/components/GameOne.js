import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";
import DoggoHappy from '../img/doggohappy.png'
import DoggoSad from '../img/doggosad.png'
import soundwin from '../sounds/shootingstar.mp3'
import soundfail from '../sounds/fail.mp3'
import Sound from 'react-sound'

import "../css/GameOne.css";

const Mousetrap = require("mousetrap");

class GameOne extends Component {

  state = {
    options: [],
    correctDogBreed: null,
    images: null,
  };

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
    request
      .get(
        `https://dog.ceo/api/breed/${encodeURIComponent(
          this.state.correctDogBreed
        )}/images/random`
      )
      .then(response => this.updateImages(response.body.message))
      .catch(console.error);
  };

  updateImages(images) {
    this.setState({
      images: images
    });
  }

  handleChoice = guessedBreed => {
    if (
      guessedBreed === this.props.correctDogBreed &&
      this.props.roundsPlayed < 10
    ) {
      this.props.dispatch({
        type: "CORRECT_GUESS",
        payload: guessedBreed
      });
      this.componentDidMount();
    } else if (
      guessedBreed !== this.props.correctDogBreed &&
      this.props.roundsPlayed < 10
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

  restartGame() {
    window.location.reload();
  }

  hint = () => {
    const hint = `The name of my breed has the letter ${this.props.correctDogBreed.split('')[Math.floor(Math.random() * this.props.correctDogBreed.length)]} in it.`

    if (this.props.roundsPlayed === 3 && this.props.score < 5) {
      return hint.toUpperCase()
    } else if (this.props.roundsPlayed === 6 && this.props.score < 10) {
      return hint.toUpperCase()
    }
  };

  showPercentage = () => {
    if (this.props.roundsPlayed !== 0) 
      { return `You have a score of ${Math.round((this.props.score/this.props.roundsPlayed)*100)}%.`
  }
}

  render() {
    Mousetrap.bind("1", () => this.handleChoice(this.state.options[0]));
    Mousetrap.bind("2", () => this.handleChoice(this.state.options[1]));
    Mousetrap.bind("3", () => this.handleChoice(this.state.options[2]));
    Mousetrap.bind("enter", () => this.restartGame());

    if (this.props.roundsPlayed === 10 && this.props.score === 10) {
      return (
        <div className='GameWin'>
          <img src={DoggoHappy} alt="Dog sad"/>
          <h2>You WIN</h2>
          <div>
            <h3>You guessed {this.props.score} out of {this.props.roundsPlayed} ({Math.round((this.props.score/this.props.roundsPlayed)*100)}%)!</h3>
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
          <button onClick={this.restartGame}>Start New Game</button>
        </div>
      )
    } else if (this.props.roundsPlayed === 10 && this.props.score < 10) {
      const categories = [
        "You are not that much into doggos, are you?",
        "This made me wanna howl",
        "Still room for imp-woof-ment!",
        "Pawsitive result",
        "You still have a lot to learn",
        "You know some dawgs!",
      ];
      
      return (
        <div className='GameOver'>
          <img src={DoggoSad} alt="Dog sad"/>
          <h2>GAME OVER</h2>
          <div>
            <h3>You guessed {this.props.score} out of {this.props.roundsPlayed} ({Math.round((this.props.score/this.props.roundsPlayed)*100)}%).</h3>
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
        <div className='Option-buttons'>
          <h1>What breed am I?</h1>
          <img src={this.state.images} alt="dawg" />
          <div>
            <h4>Check me out, dawg!</h4>
            <h3>{this.hint()}</h3>
            <button onClick={() => this.handleChoice(this.state.options[0])}>
              {" "}
              1.
              {this.state.options[0]}
            </button>
            <button onClick={() => this.handleChoice(this.state.options[1])
            }>
              {" "}
              2.
              {this.state.options[1]}
            </button>
            <button onClick={() => this.handleChoice(this.state.options[2])}>
              {" "}
              3. {this.state.options[2]}{" "}
            </button>
            <h3>The last dog was a {this.props.previousBreeds[this.props.previousBreeds.length-1]}</h3>
            <h3>{this.showPercentage()}</h3>
            <h3>
              You guessed {this.props.score} breed out of {" "}
              {this.props.roundsPlayed} dogs.
            </h3>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    correctDogBreed: state.correctDogBreed,
    selectedDogBreed: state.selectedDogBreed,
    roundsPlayed: state.roundsPlayed,
    score: state.score,
    previousBreeds: state.previousBreeds
  };
};

export default connect(mapStateToProps)(GameOne);
