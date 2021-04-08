import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

function Project(props) {

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
					{/* {props.data.tag1 &&
						props.data.tag1.map(tag => {
							return <span className="badge badge-info project-tag"> {tag}</span>
						})
					}
					{props.data.tag2 &&
						props.data.tag2.map(tag => {
							return <span className="badge badge-danger project-tag"> {tag}</span>
						})
					} */}
					< p className="card-text project-description">{props.data.description}</p>
				</div>
			</div>
		</div >
	)
}

export default Project