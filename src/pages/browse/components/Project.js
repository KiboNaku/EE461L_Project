import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

function Project(props) {
	// only show the first 200 characters of project description 
	let description = props.data.description.substring(0, 200)
	description = props.data.description.length > 200 ? description + " ..." : description

	return (
		<div className='col-lg-4 col-sm-6 col-md-6 project'>
			<div className="card light-background text-light">
				<div className="card-body">
					<div className="project-header">
						<AddIcon
							type="button"
							className="project-add a-dark"
							onClick={() => props.joinProject(props.data.id)}
						/>
						<Link className="a-dark" to={{
							pathname: "/project-details/" + props.data.id,
							state: { projectId: props.data.id }
						}}>
							<h5 className="card-title">{props.data.name}</h5>
						</Link>
					</div>
					<small className="project-owner">ID: {props.data.id}</small>
					<small className="project-owner">Created by: {props.data.owner}</small>
					{
						props.data.tags.map((tag, i) => {
							return (
								<small key={i} className="project-tag">{tag.name}</small>
							)
						})
					}
					< p className="card-text project-description">{description}</p>
					<Link className="a-dark" to={{
						pathname: "/project-details/" + props.data.id,
						state: { projectId: props.data.id }
					}}>
						<small>View Details</small>
					</Link>
				</div>
			</div>
		</div >
	)
}

export default Project