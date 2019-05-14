import React from 'react'

export default function DogBreedImages(props) {
  const { images } = props
  return (
    <div className='dog-breed-images'>
      <h1>{props.breed} Images</h1>
        <p>Her are 10 images</p>
      
      <div style={styles.divImg}>
        { images && images.map(url => <img style={styles.img} key={ url } src={ url } alt="Dog" />) }
        { !images && 'Loading...' }
      </div>
    </div>
  )
}

const styles = {
  divImg: {
    columns: '5',
    margin: '25px'

  },
  
  img: {
    borderRadius: '10px',
    border: '1px solid #000',
    padding: '5px',
    width: '200px'
  }
}