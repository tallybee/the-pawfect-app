import React, { Component } from 'react'
import OneDogImage from './OneDogImage'
import request from 'superagent'

export default class OneDogImageContainer extends Component {

	state = { images: null }

	componentDidMount() {

		request
			.get(`https://dog.ceo/api/breeds/image/random`)
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
				Is this thing on?
			</div>
		)
	}

}