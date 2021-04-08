import React, { Component } from "react";
import Filter from "./components/Filter";
import BrowsingItems from "./components/BrowsingItems";
import { fetchProjects } from "./../../api_calls/fetchInformation";
import { joinProject } from "./../../api_calls/editProject";
import Project from "./components/Project";
import SearchBar from "./components/SearchBar";
import {Link} from "react-router-dom"

import "./Browse.css";

class Browse extends Component {

	constructor() {
		super();
		this.state = {
			projects: [],
			filteredProjects: [],
			// filter: {
			// 	tag1A: true,
			// 	tag1B: true,
			// 	tag1C: true,
			// 	tag2a: true,
			// 	tag2b: true,
			// 	tag3c: true,
			// },
			filtered: false,
			checked: 0,
			searched: false
		}

		this.setProjectData = this.setProjectData.bind(this)
		this.joinProject = this.joinProject.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.search = this.search.bind(this)
		this.filterProject = this.filterProject.bind(this)
	}

	componentDidMount() {

		fetchProjects().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.projects
				let list = []
				for (const i in data) {
					list.push(data[i])
				}
				// console.log(list)
				this.setState({ projects: list, filteredProjects: list })
			}
		})
	}

	filterProject() {
		let filteredProject = this.state.filtered == undefined || !this.state.filtered ?
			this.state.projects :
			this.state.projects
				.filter(project =>
					(this.state.tag1A && project.tag1.includes("A")) ||
					(this.state.tag1B && project.tag1.includes("B")) ||
					(this.state.tag1C && project.tag1.includes("C")) ||
					(this.state.tag2a && project.tag2.includes("a")) ||
					(this.state.tag2b && project.tag2.includes("b")) ||
					(this.state.tag2c && project.tag2.includes("c"))
				)
		this.setState({ filteredProjects: filteredProject })
	}

	setProjectData() {
		return this.state.filteredProjects.map(project => {
			return (<Project
				data={project}
				joinProject={this.joinProject}
			/>
			)
		})
	}

	joinProject(id) {
		this.props.validateToken()
		// get user information => if not logged in, go to login page instead 
		if (!this.props.loggedIn) {
			window.open("/login", "_blank")
		}
		else {
			let project = null
			this.state.projects.map(p => {
				if (p.id == id) {
					project = p;
				}
			})

			joinProject(localStorage.getItem("token"), project).then(res => {
				if (res.error) {
					alert(res.error)
				} else {
					alert("Joined project sucessfully!")
				}
			})
		}
	}

	handleFilterChange = (event) => {
		const target = event.target
		const value = target.checked
		const name = target.name
		this.setState({ [name]: value })
		// console.log(name, value)
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

	search(projectID) {
		// console.log(projectID)
		let filteredProject = this.state.projects
			.filter(project =>
				project.id == projectID
			)
		filteredProject.length == 0 ? this.setState({ filteredProjects: this.state.projects }) :
			this.setState({ filteredProjects: filteredProject })
	}

	render() {
		return (
			<div className="container dark-background ">
				<SearchBar search={this.search} />
				<div className="mt-3">
					<Link to="/project-add" className="btn button-primary">+ Add Project</Link>
				</div>
				<div className="row">
					{/* <div className="col browse-filter text-light">
						<Filter
							handleChange={this.handleFilterChange}
							filter={this.state.filter}
						/>
					</div> */}
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
