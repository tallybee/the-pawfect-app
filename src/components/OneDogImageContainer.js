import React, { Component } from 'react'
import OneDogImage from './OneDogImage'
import request from 'superagent'

export default class OneDogImageContainer extends Component {

	state = { images: null }

	componentDidMount() {
		const breed = this.props.match.params.breed
		request
			.get(`https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images/random`)
			.then(response => this.updateImages(response.body.message))
			.catch(console.error)
	}

	updateImages(images) {
		this.setState({
				images: images
		})
	}

	render() {
		return (
			<div>
				<OneDogImage images={ this.state.images } />
				This page will show images of the { this.props.match.params.breed } breed.				
			</div>
		)
	}

}