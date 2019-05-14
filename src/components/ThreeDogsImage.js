import React from 'react'
import { Link } from 'react-router-dom'

export default function ThreeDogsImage (props) {    
  const { images } = props 

  console.log(props)

  return (
      <div className="three-dog-image">
          <h1>These three dogs</h1>


          <br></br>

          <Link to="/">Back</Link>
          <div>
          { images && images.map(url => <img key={url} src={ url } alt="Dog" />) }
          { !images && 'Loading...' }
          </div>
      
      </div>
  )
}