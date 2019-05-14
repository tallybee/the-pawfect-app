import React from 'react'

export default function ThreeDogsImage (props) {  
  const { images } = props 
  
  console.log(props)

  return (
    <div className="three-dog-image">
      <h1>Guess the Breed</h1>
      <div>
        { images && images.map(url => <img style={style.img} key={url} src={ url } alt="Dog" />) }
        { !images && 'Loading...' }
      </div>        
    </div>
  )
}

const style = {
  img: {
    width: '250px',
    margin: '5px'
  }
}