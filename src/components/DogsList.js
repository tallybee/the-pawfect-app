import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DogsList extends Component {

  renderDogBreed(breed) {
    return <li key={breed}>
        <Link  style={styles.liList} to={ `/dog-breeds/${breed}` }>{breed}</Link>
    </li>
  }

  render() {
    const { dogBreeds } = this.props
    return (
        <div className="dogs-list">
        <h1>Dogs List</h1>

        { !dogBreeds && 'Loading' }
        { <ul style={styles.uList}>
        { dogBreeds && dogBreeds.map(this.renderDogBreed) }
        </ul> }
        </div>
      )
  }
}

const styles = {
  uList: {
    columns: '6',
    listStyle: 'none',
    marginTop: '50px'
  },

  liList: {
    textDecoration: 'none',
    textTransform: 'capitalize'
  }
}