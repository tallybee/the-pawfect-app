import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";

import './GameOne.css'

class GameOne extends Component {
  state = { options: [],
            correctDogBreed: null,
            images: null }

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
        options: 
        [breeds[Math.floor(Math.random() * (breeds.length))],
        breeds[Math.floor(Math.random() * (breeds.length))], breeds[Math.floor(Math.random() * (breeds.length))]]
        }
    )
    this.setCorrect()
    this.getImage()
  }

  setCorrect = () => {
    this.setState({correctDogBreed: this.state.options[Math.floor(Math.random() * (3))]})
    console.log('working', this.state)
    this.props.dispatch({
      type: "ADD_CORRECT_BREED",
      payload: this.state.correctDogBreed
    })

  }
     getImage = () => {
      request
      .get(`https://dog.ceo/api/breed/${encodeURIComponent(this.state.correctDogBreed)}/images/random`)
      .then(response => this.updateImages(response.body.message))
			.catch(console.error)
		}

    updateImages(images) {
      this.setState({
        images: images
      })
      console.log(this.state)
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
         <img src={this.state.images} alt='dawg'/>
        <div>
        <button onClick={() => this.handleChoice(this.state.options[0])}>
        { this.state.options[0] }
        </button>
        <button onClick={() => this.handleChoice(this.state.options[1])}>
          {this.state.options[1]}        
        </button>
        <button onClick={() => this.handleChoice(this.state.options[2])}> {this.state.options[2]} </button>
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

