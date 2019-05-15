import React, { Component } from 'react'
import request from 'superagent'
import { connect } from "react-redux";
export class GameOneOptionsContainer extends Component {

	state = { wrongOptionOne: null,
				wrongOptionTwo: null }

	componentDidMount() {
		request
			.get(`https://dog.ceo/api/breeds/list/all`)
			.then(response => {const breeds = Object.keys(response.body.message)
			this.updateOptions(breeds)})
			.catch(console.error)		
	}

	updateOptions(breeds) {
		this.setState({
				wrongOptionOne: breeds[Math.floor(Math.random() * (breeds.length))],
				wrongOptionTwo: breeds[Math.floor(Math.random() * (breeds.length))]
		})
	}

	render() {
		return (
			<div>
				
			</div>
		)
	}

}

const mapStatetoProps = state => {
	return state
}

export default connect (mapStatetoProps)(GameOneOptionsContainer)
