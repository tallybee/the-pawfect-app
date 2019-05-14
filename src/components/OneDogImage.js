import React from 'react'
import { Link } from 'react-router-dom'

export default function OneDogImage (props) {
	
	const { images } = props 
	
	console.log(props)

	return (
		<div className="one-dog-image">
			<h1>This one Dog</h1>

			<br></br>

			<Link to="/">Back</Link>
			
			<div>
			{ images && images.map(url => <img key={url} src={ url } alt="Dog" />) }
			{ !images && 'Loading...' }
			</div>		
		</div>
	)
}