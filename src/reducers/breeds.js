const initialState = {
  selectedDogBreed: "",
  correctDogBreed: "",
  roundsPlayed: 0,
  score: 0,
  previousBreeds: [],
  buttonColors: ["blue", "blue", "blue"],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CORRECT_BREED": {
      return {
        ...state,
        correctDogBreed: action.payload,
        buttonColors: initialState.buttonColors
      };
    }
    case "CORRECT_GUESS": {
      const newButtonColors = [...state.buttonColors]
      newButtonColors[action.index] = 'green'
      return {
        ...state,
        selectedDogBreed: action.payload,
        score: state.score + 1,
        roundsPlayed: state.roundsPlayed + 1,
        previousBreeds: [...state.previousBreeds, action.payload],
        buttonColors: newButtonColors
      };
    }
    case "WRONG_GUESS": {
      const newButtonColors = [...state.buttonColors]
      newButtonColors[action.index] = 'red'
      return {
        ...state,
        selectedDogBreed: action.payload,
        roundsPlayed: state.roundsPlayed + 1,
        previousBreeds: [...state.previousBreeds, action.payload],
        buttonColors: newButtonColors
      };
    }
    case "START_NEW_GAME": {
      return initialState
    }
    default:
      return state;
  }
}
