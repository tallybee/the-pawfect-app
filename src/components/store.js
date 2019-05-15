import { createStore } from "redux";
import { arrowFunctionExpression } from "@babel/types";
import Game from './game1'

const initialState = {
  selectedDogBreed: '', 
  correctDogBreed: '',
  roundsPlayed: 0,
  score: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CORRECT_BREED": {
      return {
        ...state,
        correctDogBreed: action.payload
      }
    }

    case "CORRECT_GUESS": {
      return {
        ...state,
        selectedDogBreed: action.payload,
        score: state.score + 1,
        roundsPlayed: state.roundsPlayed +1
      };
    }
      case "WRONG_GUESS": {
        return {
          ...state,
          selectedDogBreed: action.payload,
          roundsPlayed: state.roundsPlayed +1
        }
      }
  }
  return state
};

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, enhancer);

export default store;


// const randomDogBreedPicture = (randomDogBreed) => {
//   const randomIndex = Math.floor(Math.random() * dogBreeds.length)
//   return randomDogBreed[randomIndex];
// }