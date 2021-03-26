import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<nav className="navbar navbar-expand-lg justify-content-between">
					<span className="nav-brand">
						{/* TODO: change home to website name instead */}
						<Link className="a-dark" to="/"> <h2>Home</h2></Link>
					</span>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<MenuOutlinedIcon className="a-dark" />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							{/*Current navbar items*/}
							<li className="nav-item nav-link">
								<Link className="a-dark" to="/browse"> Projects</Link>
							</li>
							<li className="nav-item nav-link">
								<Link className="a-dark" to="/"> Services</Link>
							</li>
							<li className="nav-item nav-link">
								<Link className="a-dark" to="/hardware"> Hardware/Datasets</Link>
							</li>
							<li className="navbar-item nav-link">
								<Link className="a-dark" to="/profile"> Profile</Link>
							</li>
							{/* Toggle Profile if login true */}
							{this.props.loggedIn ?
								<li className="nav-item nav-link">
									<Link className="a-dark" to="/profile"><AccountCircleIcon /></Link>
								</li>
								:
								<li className="nav-item nav-link">
									<Link className="a-dark" to="/login"> Login</Link>
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
