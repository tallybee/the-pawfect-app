import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import Home from './components/Home'
import GameOne from './components/GameOne'
import GameTwo from './components/GameTwo'
import logo from './img/doggo.png'
import DogBreedImagesContainer from './components/DogBreedImagesContainer';
import DogsListContainer from './components/DogsListContainer';

import './App.css';

function App() {
  return (
    <Route>
      <div className='App'>
          <img className='App-img1' src={logo} alt='Logo' />
          <h1>The Pawfect App</h1>
          <img className='App-img2' src={logo} alt='Logo' />
        <ul className="header">
          <li><NavLink to="/">Home</NavLink></li> |
          <li><NavLink to="/dogsBreedList">Dogs List</NavLink></li> |
          <li><NavLink to="/gameOne">Guess my breed</NavLink></li> |
          <li><NavLink to="/gameTwo">Guess my face</NavLink></li>
        </ul>
      <div className="content">
        <Route exact path="/" component={Home}/>
        <Route path="/dogsBreedList" component={DogsListContainer}/>
        <Route path="/dog-breeds/:breed" component={DogBreedImagesContainer} />
        <Route path="/gameOne" component={GameOne} />
        <Route path="/gameTwo" component={GameTwo} />
      </div>
    </div>
    </Route>
  );
}

export default App;
