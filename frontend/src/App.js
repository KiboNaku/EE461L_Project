import Header from './pages/home/components/Header'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import ProjectDetails from './pages/project-details/ProjectDetails';
import Browse from './pages/browse/Browse';
import Hardware from './pages/hardware-datasets/Hardware-Datasets';
import ProjectAdd from './pages/project-add/ProjectAdd';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Project from './pages/profile/components/Project';
import React, { Component } from 'react';
import * as tokenCalls from './api_calls/tokenCalls';
import * as adm from './api_calls/admission';

class App extends Component {

	constructor() {
		super();
		this.state = {
			loggedIn: false,
		}
		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
		this.validateToken = this.validateToken.bind(this);
	}

	logIn() {
		this.setState({ loggedIn: true });
	}

	logOut() {
		console.log("logged out")
		this.setState({ loggedIn: false });
		localStorage.removeItem("token");
		adm
			.logout()
			.then(res => {
				// TODO
			})
			.catch(err => {
				// TODO
			});
	}

	validateToken() {

		// TODO: consider refreshing the page when the token expires
		let token = localStorage.getItem("token");
		if (token !== null && typeof token !== 'undefined') {
			tokenCalls
				.validate({ "token": localStorage.getItem("token") })
				.then(res => {
					this.logIn();
				})
				.catch(err => {
					this.logOut();
					let response = err.response;
					if (response !== null && typeof response !== "undefined") {
						if (response.status === 403) {
							this.setState({ loggedIn: false });
						}
					}
				});
		}
	}

	componentDidMount() {
		this.validateToken();
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header loggedIn={this.state.loggedIn} />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/login">
							<Login login={this.logIn} />
						</Route>
						<Route
							path={"/project-details/:projectId"}
							component={ProjectDetails}
						/>
						<Route path="/project-add">
							<ProjectAdd />
						</Route>
						<Route path="/profile">
							<Profile logout={this.logOut} />
						</Route>
						<Route path="/browse">
							<Browse
								loggedIn={this.state.loggedIn}
								validateToken={this.validateToken} />
						</Route>
						<Route path="/hardware">
							<Hardware />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
