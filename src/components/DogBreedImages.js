import React from 'react'
import { Link } from 'react-router-dom'

export default function DogBreedImages(props) {
  const { images } = props
  return (
    <div className='dog-breed-images'>
      <h1>Dog Breeds Images</h1>
      This page will show images of the {props.breed} breed
      <p><Link to="/" > Go Back</Link></p>
      <div>
        { images && images.map(url => <img key={ url } src={ url } alt="Dog" />) }
        { !images && 'Loading...' }
      </div>
    </div>
  )
}