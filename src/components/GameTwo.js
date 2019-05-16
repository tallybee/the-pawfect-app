import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";
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
    console.log(this.state, "1")
    if (this.props.roundsPlayed === 5) {
      const categories = ['are not much into dogs, are you?', "were lucky once or twice, but you don't really know dogs", 'can still improve', 'you are getting there',  'know ya dawgs!', 'are the most pawfect dog lover!' ]
      return (
        <div>
          <h2>Game Over</h2>
          <div>
            <h3>You have {this.props.score} correct guesses.</h3>
          </div>
          <div>
          <h3>You {categories[this.props.score]}</h3>
        </div>
          <button onClick={this.restarteGame}>Start New Game</button>
        </div>)
    } else {
    return ( this.state.images !== null && <div>
        <h1>Find the {this.props.correctDogBreed}!</h1>
        <div>
          <h4>Where am I?</h4>
          <img src={this.state.images[0]} alt='first'/>
        <button onClick={() => this.handleChoice(this.state.options[0])}>
          {this.state.options[0]}        
        </button>
        <img src={this.state.images[1]} alt='second'/>
        <button onClick={() => this.handleChoice(this.state.options[1])}>
          {this.state.options[1]}        
        </button>
        <img src={this.state.images[2]} alt='third'/>
        <button onClick={() => this.handleChoice(this.state.options[2])}> {this.state.options[2]} </button>
        <h3>You guessed the breed of {this.props.score} out of {this.props.roundsPlayed} dogs.</h3>
        </div>
      </div>
    );}
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

export default connect( mapStateToProps)(GameTwo);

const styles = {
  img: {
    width: '350px',
    borderRadius: '10px'
  }
}

