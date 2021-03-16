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
					id: 0,
					name: "Project 1",
					owner: "User A",
					tag1: ["A"],
					tag2: [],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 1,
					name: "Project 2",
					owner: "User B",
					tag1: ["B", "C"],
					tag2: ["a"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 2,
					name: "Project 3",
					owner: "User C",
					tag1: ["D"],
					tag2: ["b"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 3,
					name: "Project 4",
					owner: "User D",
					tag1: [],
					tag2: ["c", "d"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 4,
					name: "Project 5",
					owner: "User E",
					tag1: ["E", "F", "G"],
					tag2: [],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 0,
					name: "Project 1",
					owner: "User A",
					tag1: ["A"],
					tag2: [],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 1,
					name: "Project 2",
					owner: "User B",
					tag1: ["B", "C"],
					tag2: ["a"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 2,
					name: "Project 3",
					owner: "User C",
					tag1: ["D"],
					tag2: ["b"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 3,
					name: "Project 4",
					owner: "User D",
					tag1: [],
					tag2: ["c", "d"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 4,
					name: "Project 5",
					owner: "User E",
					tag1: ["E", "F", "G"],
					tag2: [],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 0,
					name: "Project 1",
					owner: "User A",
					tag1: ["A"],
					tag2: [],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 1,
					name: "Project 2",
					owner: "User B",
					tag1: ["B", "C"],
					tag2: ["a"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 2,
					name: "Project 3",
					owner: "User C",
					tag1: ["D"],
					tag2: ["b"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 3,
					name: "Project 4",
					owner: "User D",
					tag1: [],
					tag2: ["c", "d"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 4,
					name: "Project 5",
					owner: "User E",
					tag1: ["E", "F", "G"],
					tag2: [],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				}
			]
		}

		this.setProjectData = this.setProjectData.bind(this)
		this.joinProject = this.joinProject.bind(this)
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
				joinProject={this.joinProject}
			/>
			)
		})
	}

	joinProject(id) {
		console.log(id)
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
							projects={this.state.projects}
							setProjectData={this.setProjectData}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Browse
