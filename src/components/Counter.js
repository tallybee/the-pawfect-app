import React from 'react'

import './Counter.css'

const Counter = props => {
  return (
    <div className='counter'> 
      <div className="counter-score">{props.score}</div>
    </div>
  )
}

export default Counter
