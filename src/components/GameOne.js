import React, { Component } from "react";
import OneDogImageContainer from "./OneDogImageContainer";
import { connect } from "react-redux";
import request from "superagent";

import './GameOne.css'

class GameOne extends Component {
  state = { wrongOptionOne: null, wrongOptionTwo: null };

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
        wrongOptionOne: breeds[Math.floor(Math.random() * (breeds.length))],
        wrongOptionTwo: breeds[Math.floor(Math.random() * (breeds.length))]
    })
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
    } else if (
      guessedBreed !== this.props.correctDogBreed &&
      this.props.roundsPlayed < 10
    ) {
      this.props.dispatch({
        type: "WRONG_GUESS",
        payload: guessedBreed
      });
    } else {
      this.props.dispatch({
        type: "START_NEW_GAME"
      });
      this.componentDidMount();
    }
  };

  render() {
    return (
      <div>
        <OneDogImageContainer/>
        <div>
        <button onClick={() => this.handleChoice(this.props.correctDogBreed)}>
        { this.props.correctDogBreed }
        </button>
        <button onClick={() => this.handleChoice(this.state.wrongOptionOne)}>
          {this.state.wrongOptionOne}        
        </button>
        <button onClick={() => this.handleChoice(this.state.wrongOptionTwo)}> {this.state.wrongOptionTwo} </button>
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
    roundsPlayed: state.roundsPlayed
  };
};

export default connect( mapStateToProps)(GameOne);

