import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './DogList.css'

export default class DogsList extends Component {

  renderDogBreed(breed) {
    return <li className='li-list' key={breed}>
        <Link className='li-link' to={ `/dog-breeds/${breed}` }>{breed}</Link>
    </li>
  }

  render() {
    const { dogBreeds } = this.props
    return (
        <div className="dogs-list">
        <h1>Dogs List</h1>

        { !dogBreeds && 'Loading' }
        { <ul className='ul-list'>
        { dogBreeds && dogBreeds.map(this.renderDogBreed) }
        </ul> }
        </div>
      )
  }
}