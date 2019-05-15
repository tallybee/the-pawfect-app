import React, { Component } from 'react'
import OneDogImageContainer from './OneDogImageContainer'
import { GameOneOptionsContainer } from './GameOneOptionsContainer';
import { connect } from "react-redux";

class GameOne extends Component {
  handleChoice = (guessedBreed) => {
    if (guessedBreed === this.props.correctDogBreed) {
      this.props.dispatch({
        type: "CORRECT_GUESS",
        payload: guessedBreed
      });
    } else {
      this.props.dispatch({
        type: "WRONG_GUESS",
        payload: guessedBreed
      });
    };
  }

  render() {
    return (
      <div>
        <OneDogImageContainer/>
        <GameOneOptionsContainer/>
        <h3>What am I?</h3>
        <p onClick={() => this.handleChoice(this.props.correctDogBreed)}>
        { this.props.correctDogBreed }
        </p>
        <p onClick={() => this.handleChoice("not hound")}>
          {" "}
          wrong breed{" "}
        </p>
        <p onClick={() => this.handleChoice("a cat")}> wrong breed </p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    correctDogBreed: state.correctDogBreed,
    selectedDogBreed: state.selectedDogBreed
  };
};

export default connect( mapStateToProps)(GameOne);