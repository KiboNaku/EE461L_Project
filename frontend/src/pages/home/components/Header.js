import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
				<span className="navbar-brand">
					{/* TODO: change home to website name instead */}
					<Link to='/'> Home</Link>
				</span>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to='/'> About</Link>
						</li>
						<li className="nav-item">
							<Link to='/'> Pricing</Link>
						</li>
						<li className="nav-item">
							<Link to='/'> Services</Link>
						</li>
						<li className="nav-item">
							<Link to='/login'> Login</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}

export default Header
