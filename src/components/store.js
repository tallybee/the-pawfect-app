import { createStore } from "redux";
import { arrowFunctionExpression } from "@babel/types";
import Game from './game1'

const initialState = {
  selectedDogBreed: '', 
  correctDogBreed: 'hound',
  roundsPlayed: 0,
  score: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CORRECT_DOG': {
      return {
        ...state,
        selectedDogBreed: state.selectedDogBreed,
        score: 1,
        roundsPlayed: state.roundsPlayed +1
      };
    }
      case 'WRONG_DOG': {
        return {
          ...state,
          roundsPlayed: state.roundsPlayed +1
        }
      }

    case "INCREMENT_SCORE": {
      return {
        ...state,
        score: state.score + 1
      }
    }
  }

  console.log("no switch", action)
  return state
};

export const whichDog = (correctDogBreed, value) => {
  if (correctDogBreed === value) {
    console.log("WOOF!");
    // initialState.roundsPlayed +=1;
    // initialState.correctGuesses +=1;
    return Game;
  } else {
    console.log("OUUUU");
    // initialState.roundsPlayed +=1;
    return Game;
  }
};

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, enhancer);

export default store;


// const randomDogBreedPicture = (randomDogBreed) => {
//   const randomIndex = Math.floor(Math.random() * dogBreeds.length)
//   return randomDogBreed[randomIndex];
// }