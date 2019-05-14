import React from 'react'

export default function DogBreedImages(props) {
  const { images } = props
  return (
    <div className='dog-breed-images'>
      <h1>Dog Breeds Images</h1>
        Here are 10 pictures of {props.breed}
      
      <div>
        { images && images.map(url => <img key={ url } src={ url } alt="Dog" />) }
        { !images && 'Loading...' }
      </div>
    </div>
  )
}