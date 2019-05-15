import React, { Component } from 'react'
import OneDogImageContainer from './OneDogImageContainer'
import { connect } from "react-redux";
import request from 'superagent'

class GameOne extends Component {
  state = { wrongOptionOne: null,
    wrongOptionTwo: null }

  componentDidMount() {
  request
    .get(`https://dog.ceo/api/breeds/list/all`)
    .then(response => {const breeds = Object.keys(response.body.message)
    this.updateOptions(breeds)})
    .catch(console.error)        
  }

  updateOptions(breeds) {
    this.setState({
        wrongOptionOne: breeds[Math.floor(Math.random() * (breeds.length))],
        wrongOptionTwo: breeds[Math.floor(Math.random() * (breeds.length))]
    })
  }

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
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    correctDogBreed: state.correctDogBreed,
    selectedDogBreed: state.selectedDogBreed
  };
};

export default connect( mapStateToProps)(GameOne);