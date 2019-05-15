import React, { Component } from 'react'
import OneDogImageContainer from './OneDogImageContainer'
import { GameOneOptionsContainer } from './GameOneContainer';
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
        <div>
        <button onClick={() => this.handleChoice(this.props.correctDogBreed)}>
        { this.props.correctDogBreed }
        </button>
        <button onClick={() => this.handleChoice("not hound")}>
          {" "}
          wrong breed{" "}
        </button>
        <button onClick={() => this.handleChoice("a cat")}> wrong breed </button>
        </div>
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