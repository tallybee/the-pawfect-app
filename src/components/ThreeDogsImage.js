import React from 'react'

<<<<<<< HEAD
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
=======
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
>>>>>>> 0a57e0eab71278afbb678566cc4e32a4e2fae6c8
}