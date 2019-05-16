import React, { Component } from 'react'
import OneDogImage from './OneDogImage'
import request from 'superagent'
import { connect } from "react-redux";

export class OneDogImageContainer extends Component {

	state = { images: null }

	componentDidMount() {

		request
			.get(`https://dog.ceo/api/breeds/image/random`)
			.then(response => this.updateImages(response.body.message))
			.catch(console.error)
	}

	updateImages = (images) => {
		this.setState({
				images: images
		})
		console.log(this.state)
	}

	render() {
		return (
			<div>
				<OneDogImage images={ this.state.images } />		
				<div>
					<p>Check me out, dawg!!</p>
				</div>
			</div>
		)
	}

}

const mapStatetoProps = state => {
	return state
}

export default connect (mapStatetoProps)(OneDogImageContainer)
