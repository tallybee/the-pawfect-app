import React from 'react'
import { Link } from 'react-router-dom'

export default function OneDogImage (props) {
	
	const { images } = props 
	
	console.log('props:', props)

	return (
		<div className="one-dog-image">
			<h1>Which breed am I?</h1>

		
			<div>
			{ images && <img key={images} src={ images } alt="Dog" /> }
			{ !images && 'Loading...' }
			<br>
			</br>
			<Link to="/">Back</Link>
			</div>		
		</div>
	)
}