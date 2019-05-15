import React, { Component } from 'react'
import OneDogImage from './OneDogImage'
import request from 'superagent'
import { connect } from "react-redux";

export class OneDogImageContainer extends Component {

	state = { images: null,
				name: null }

	componentDidMount() {

		request
			.get(`https://dog.ceo/api/breeds/image/random`)
			.then(response => this.updateImages(response.body.message))
			.then(response => this.updateCorrectDogBreed(this.state))
			.catch(console.error)
	}

	updateImages = (images) => {
		this.setState({
				images: images,
				name: images.split('/')[4]
		})
	}

	updateCorrectDogBreed = (images) => {
		console.log('images', images)
		this.props.dispatch({
			type: "ADD_CORRECT_BREED",
			payload: this.state.name
			// payload: images.split('/')[4]
		})
	}

	handleChoice = (guessedBreed) => {
    if (guessedBreed === this.props.correctDogBreed) {
      this.props.dispatch({
        type: "CORRECT_GUESS",
        payload: guessedBreed
      });
    } else {
      this.props.dispatch({
        type: "WRONG_GUESS",
        payload: guessedBreed
      });
  };
}

	render() {
		return (
			<div>
				<OneDogImage images={ this.state.images } />
				{this.state.name}
			</div>
		)
	}

}

const mapStatetoProps = state => {
	return state
}

export default connect (mapStatetoProps)(OneDogImageContainer)
