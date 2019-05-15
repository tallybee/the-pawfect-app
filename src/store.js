import { createStore } from "redux";
import breeds from './reducers/breeds'

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(breeds, enhancer);

export default store;


// const randomDogBreedPicture = (randomDogBreed) => {
//   const randomIndex = Math.floor(Math.random() * dogBreeds.length)
//   return randomDogBreed[randomIndex];
// }