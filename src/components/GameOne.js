import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";
import DoggoHappy from '../img/doggohappy.png'
import DoggoSad from '../img/doggosad.png'
import soundwin from '../sounds/shootingstar.mp3'
import soundfail from '../sounds/fail.mp3'
import Sound from 'react-sound'
import "./GameOne.css";

class GameOne extends Component {
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
              playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
            />
          </div>
          <div>
          <h3>You are the most pawfect doggo lover!</h3>
        </div>
          <button onClick={this.restarteGame}>Start New Game</button>
        </div>)
    } else if(this.props.roundsPlayed === 5 && this.props.score < 5) {
      const categories = [
        'You are not much into dogs, are you?',
        "You were lucky once or twice, but you don't really know dogs", 'can still improve', 
        'you are getting there', 
        'You are not there yet']

      return (
        <div className='GameOver'>
          <img src={DoggoSad} alt="Dog sad"/>
          <h2>GAME OVER</h2>
          <div>
            <h3>You have {this.props.score} correct guesses.</h3>
            <Sound
              url={soundfail}
              playStatus={Sound.status.PLAYING}
              playFromPosition={300 /* in milliseconds */}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
            />
          </div>
          <div>
          <h3>{categories[this.props.score]}</h3>
        </div>
          <button onClick={this.restarteGame}>Start New Game</button>
        </div>)
    }

    return (
      <div>
        <h1>What breed am I?</h1>
         <img style={styles.img} src={this.state.images} alt='dawg'/>
        <div>
          <h4>Check me out, dawg!</h4>
        <button onClick={() => this.handleChoice(this.state.options[0])}>
        { this.state.options[0] }
        </button>
        <button onClick={() => this.handleChoice(this.state.options[1])}>
          {this.state.options[1]}        
        </button>
        <button onClick={() => this.handleChoice(this.state.options[2])}> {this.state.options[2]} </button>
        <h3>You guessed the breed of {this.props.score} out of {this.props.roundsPlayed} dogs.</h3>
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
    score: state.score
  };
};

export default connect( mapStateToProps)(GameOne);

const styles = {
  img: {
    width: '350px',
    borderRadius: '10px'
  }
}