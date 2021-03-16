import React, { Component } from "react";

class BrowsingItems extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let projects = this.props.setProjectData();
		return (
			<div>
				<div className="row">
					{projects}
				</div>
			</div>
		)
	}
}

export default BrowsingItems
