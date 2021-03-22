import React, { Component } from "react";
import Header from "./../home/components/Header";
import Filter from "./components/Filter";
import BrowsingItems from "./components/BrowsingItems";
import { fetchProjects } from "./../../api_calls/fetchInformation";
import { joinProject } from "./../../api_calls/editProject";
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
					tag1: ["A"],
					tag2: ["b"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 3,
					name: "Project 4",
					owner: "User D",
					tag1: [],
					tag2: ["c", "a"],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
				{
					id: 4,
					name: "Project 5",
					owner: "User E",
					tag1: ["C", "A", "B"],
					tag2: [],
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et purus accumsan dui maximus consequat."
				},
			],
			filter: {
				tag1A: true,
				tag1B: true,
				tag1C: true,
				tag2a: true,
				tag2b: true,
				tag3c: true,
			},
			filtered: false,
			checked: 0
		}

		this.setProjectData = this.setProjectData.bind(this)
		this.joinProject = this.joinProject.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
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
		let filteredProject = this.state.filtered == undefined || !this.state.filtered ?
			this.state.projects :
			this.state.projects.filter(project =>
				(this.state.tag1A && project.tag1.includes("A")) ||
				(this.state.tag1B && project.tag1.includes("B")) ||
				(this.state.tag1C && project.tag1.includes("C")) ||
				(this.state.tag2a && project.tag2.includes("a")) ||
				(this.state.tag2b && project.tag2.includes("b")) ||
				(this.state.tag2c && project.tag2.includes("c"))
			)

		return filteredProject.map(project => {
			return (<Project
				data={project}
				joinProject={this.joinProject}
			/>
			)
		})
	}

	joinProject(id) {
		// get user information => if not logged in, go to login page instead 
		let user = localStorage.token
		let project = null
		this.state.projects.map(p => {
			if (p.id == id) {
				project = p;
			}
		})

		joinProject(user, project).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleFilterChange = (event) => {
		const target = event.target
		const value = target.checked
		const name = target.name
		this.setState({ [name]: value })
		console.log(name, value)
		let checked = this.state.checked
		if (value) {
			checked++
		} else {
			checked--
		}

		if (checked > 0) {
			this.setState({ filtered: true })
		} else {
			this.setState({ filtered: false })
		}

		this.setState({ checked: checked })
		this.setProjectData()
	}

	render() {
		return ( 
			<div className="container dark-background ">
				<div className="row">
					<div className="col browse-filter text-light">
						<Filter
							handleChange={this.handleFilterChange}
							filter={this.state.filter}
						/>
					</div>
					<div className="col-9 browse-content">
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
