import { connect } from "react-redux";
import React from "react";
import store, { whichDog } from "./store";
import { tsConstructorType } from "@babel/types";
const redux = require("redux");

const dogBreeds = [
  "afghan",
  "basset",
  "blood",
  "english",
  "ibizan",
  "walker"
];

// const randomDogBreed = (dogBreeds) => {
//   const randomIndex = Math.floor(Math.random() * dogBreeds.length)
//   return dogBreeds[randomIndex]
// };

// const pictures = ['an', 'array', 'of', 'dog', 'pictures'];

// {
//   type: "INCREMENT_SCORE"
// }

function makeNewQuestion() {
  // get 3 random ones
  // shuffle
  return ({
    type: "SET_QUESTION",
    payload: {
      correctChoice: 1,
      answers: ["ghj", "dfgd", "sdhsdh"]
    }
  })
}



// const selectedDogBreedPicture = (pictures) => {
//   return picture[randomIndex]
// }

const correctDogBreed = 'hound';

class Game extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedDogBreed: {}, 
  //     correctDogBreed: 'hound',
  //     roundsPlayed: 0,
  //     score: 0 };
  //   this.handleChoice = this.handleChoice.bind(this)
  // }
  
  handleChoice = breedname => {

    this.props.dispatch({
      type: 'CORRECT_ANSWER',
      payload: {
        breedname
      }
    })
    
    // console.log('first, state is...', event.target, event.target.value)
    // this.setState({ 
    //   selectedDogBreed: event.target.value,
    // });
    // console.log('second, state is...' + this.state)
    // const value = this.state.selectedDogBreed;
    // this.props.whichDog(this.state.selectedDogBreed, value);
    // console.log('final state...' + this.state)
  }

  render() {
    return (
      <>
      <h3>What am I?</h3>
      {/* <img value = {this.selectedDogBreed} value='hound'/> */}
      <p onClick={() => this.handleChoice("hound")} type='CORRECT_ANSWER' > correctDogBreed </p>
      <p onClick={() => this.handleChoice("not hound")} type='WRONG_ANSWER'> wrong breed </p>
      <p onClick={() => this.handleChoice("a cat")} > wrong breed </p>
    </>
    )};
};

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state)
  return {
    state
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     whichDog: selectedDogBreed => dispatch(whichDog(selectedDogBreed))
//   }
// }

export default connect(
  mapStateToProps,
 // mapDispatchToProps
)(Game);