import React from 'react'

export default function OneDogImage (props) {
	
	const { images } = props	

	return (
		<div className="one-dog-image">
			<h1>What breed am I?</h1>					
			<div>
			{ images && <img style={styles.img} key={images} src={ images } alt="Dog" /> }
			{ !images && 'Loading...' }
			</div>		
		</div>
	)
}

const styles = {
	img: {
		width: '350px',
		borderRadius: '20px'
	}
}