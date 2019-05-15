import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import Home from './components/Home'
import DogBreedList from './components/DogBreedList'
import GameOne from './components/GameOne'
import GameTwo from './components/GameTwo'

import './App.css';
import logo from './img/doggo.png'
import DogBreedImagesContainer from './components/DogBreedImagesContainer';
import Scoreboard from './components/Scoreboard';

function App() {
  return (
    <Route>
      <div className='App'>
        <h1>The Pawfect App</h1>
      <ul className="header">
        <li><NavLink to="/">Home</NavLink></li> |
        <li><NavLink to="/dogsBreedList">Dogs List</NavLink></li> |
        <li><NavLink to="/gameOne">Game One</NavLink></li> |
        <li><NavLink to="/gameTwo">Game Two</NavLink></li>
        <li><NavLink to="/gameOne">Game One</NavLink></li> |
        <li><NavLink to="/scoreBoard">ScoreBoard</NavLink></li>
      </ul>
      <img src={logo} alt='Logo' />
      <div className="content">
        <Route exact path="/" component={Home}/>
        <Route path="/dogsBreedList" component={DogBreedList}/>
        <Route path="/dog-breeds/:breed" component={DogBreedImagesContainer} />
        <Route path="/gameOne" component={GameOne} />
        <Route path="/gameTwo" component={GameTwo} />
        <Route path="/scoreBoard" component={Scoreboard} />
      </div>
    </div>
    </Route>
  );
}

export default App;
