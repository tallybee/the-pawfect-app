import React, { Component } from 'react'
import DogsListContainer from './DogsListContainer';
import { Route } from 'react-router-dom'

export default class DogBreedList extends Component {
  render() {
    return (
      <div>
        <Route component={DogsListContainer}></Route>
      </div>
    )
  }
}
