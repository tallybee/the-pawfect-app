import React from 'react'
import '../css/DogBreedImages.css'

export default function DogBreedImages(props) {
  const { images } = props
  return (
    <div className='dog-breed-images'>
      <h1>{props.breed} Images</h1>
        <p>Here are 10 images</p>
      
      <div className='Image-list'>
        { images && images.map(url => <img key={ url } src={ url } alt="Dog" />) }
        { !images && 'Loading...' }
      </div>
    </div>
  )
}