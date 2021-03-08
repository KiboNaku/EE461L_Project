import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './../Home.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		}
		// TODO: get login information from backend  
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
					<span className="nav-brand">
						{/* TODO: change home to website name instead */}
						<Link to="/"> <h2>Home</h2></Link>
					</span>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item nav-link">
								<Link to="/"> Projects</Link>
							</li>
							<li className="nav-item nav-link">
								<Link to="/"> Services</Link>
							</li>
							{this.state.loggedIn ?
								<li className="nav-item nav-link">
									<Link to="/profile"><AccountCircleIcon /></Link>
								</li>
								:
								<li className="nav-item nav-link">
									<Link to="/login"> Login</Link>
								</li>
							}
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Header
