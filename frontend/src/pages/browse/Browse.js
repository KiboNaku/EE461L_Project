import React, { Component } from "react";
import Header from "./../home/components/Header";
import Filter from "./components/Filter";
import BrowsingItems from "./components/BrowsingItems";
import { fetchProjects } from "./../../api_calls/fetchInformation";
import Project from "./components/Project";

import "./Browse.css"

class Browse extends Component {

	constructor() {
		super();
		this.state = {
			projects: [
				// temporary data
				{
					name: "project 1",
					owner: "User A",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					name: "project 2",
					owner: "User B",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					name: "project 3",
					owner: "User C",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					name: "project 4",
					owner: "User D",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					name: "project 5",
					owner: "User E",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				}
			]
		}

		this.setProjectData = this.setProjectData.bind(this)
	}

	componentDidMount() {

		fetchProjects().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.profile_pics
				let list = []
				for (const i in data) {
					list.push(data[i]['project'])
				}
				this.setState({ projects: list })
			}
		})
	}

	setProjectData() {
		return this.state.projects.map(project => {
			return (<Project
				data={project}
			/>
			)
		})
	}

	render() {
		return (
			<div className="container">
				<Header />
				<div className="row browse">
					<div className="col browse-filter">
						<Filter />
					</div>
					<div className="col-9">
						<BrowsingItems
							setProjectData={this.setProjectData}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Browse
