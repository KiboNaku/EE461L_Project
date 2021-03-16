import React from 'react'
import AddIcon from '@material-ui/icons/Add';

function Project(props) {

	return (
		<div className='col-lg-3 col-sm-6 project'>
			<div className="card">
				<div className="card-body">
					<div className="project-header">
						<AddIcon
							type="button"
							className="project-add"
							onClick={() => props.joinProject(props.data.id)}
						/>
						<h5 className="card-title">{props.data.name}</h5>
					</div>
					<small className="project-owner">Created by: {props.data.owner}</small>
					{props.data.tag1 &&
						props.data.tag1.map(tag => {
							return <span className="badge badge-info project-tag"> {tag}</span>
						})
					}
					{props.data.tag2 &&
						props.data.tag2.map(tag => {
							return <span className="badge badge-danger project-tag"> {tag}</span>
						})
					}
					< p className="card-text project-description">{props.data.description}</p>
				</div>
			</div>
		</div >
	)
}

export default Project