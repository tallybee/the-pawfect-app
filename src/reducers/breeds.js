const initialState = {
  selectedDogBreed: '', 
  correctDogBreed: '',
  roundsPlayed: 0,
  score: 0,
  previousBreeds: [],
  buttonColors: ['blue', 'green', 'red']
};

export default function reducer(state = initialState, action) {
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
        roundsPlayed: state.roundsPlayed +1,
        previousBreeds: [...state.previousBreeds, action.payload]
      };
    }
      case "WRONG_GUESS": {
        return {
          ...state,
          selectedDogBreed: action.payload,
          roundsPlayed: state.roundsPlayed +1,
          previousBreeds: [...state.previousBreeds, action.payload]
        }
      }
      case "START_NEW_GAME": {
        return {
          state: {
            selectedDogBreed: '', 
            correctDogBreed: '',
            roundsPlayed: 0,
            score: 0
          }
        }
      }
      default:
      return state
  }
};
