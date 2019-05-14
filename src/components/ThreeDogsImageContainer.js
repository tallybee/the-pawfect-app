import React, { Component } from 'react'
import ThreeDogsImage from './ThreeDogsImage'
import request from 'superagent'

export default class ThreeDogsImageContainer extends Component {

    state = { images: null }

    componentDidMount() {
        const breed = this.props.match.params.breed
        request
            .get(`https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images/random/3`)
            .then(response => this.updateImages(response.body.message))
            .catch(console.error)
    }

    updateImages(images) {
        this.setState({
            images: images
        })
    }

    render() {
        return <div>
                <ThreeDogsImage images={ this.state.images } />
                This page will show images of the { this.props.match.params.breed } breed.
                
            </div>
    }

}