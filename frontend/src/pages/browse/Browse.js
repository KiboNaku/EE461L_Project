import React, { Component } from "react";
import Header from "./../home/components/Header";
import Filter from "./components/Filter";
import BrowsingItems from "./components/BrowsingItems";

class Browse extends Component {

	constructor() {
		super();
		this.state = {
		}
	}

	render() {
		return (
			<div className="full-screen-height">
				<Header />
				<div className="col">
					<Filter />
				</div>
				<div className="col-8">
					<BrowsingItems />
				</div>
			</div>
		)
	}
}

export default Browse
