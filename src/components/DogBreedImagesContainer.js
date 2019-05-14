import React, { Component } from 'react'
import DogBreedImages from './DogBreedImages'
import request from 'superagent'

export default class DogBreedImagesContainer extends Component {

    state = { images: null }

    componentDidMount() {
        const breed = this.props.match.params.breed
        request
            .get(`https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images/10`)
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
                <DogBreedImages images={ this.state.images } />
                Here are 10 images from the { this.props.match.params.breed } breed.
                
            </div>
    }

}