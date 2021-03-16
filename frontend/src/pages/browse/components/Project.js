import React from 'react'

function Project(props) {

	return (
		<div className='col-lg-3 project'>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.data.name}</h5>
					<small>{props.data.owner}</small>
					<p className="card-text">{props.data.description}</p>
				</div>
			</div>
		</div>
	)
}

export default Project