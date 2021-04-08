import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

class BrowsingItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}

		// this.fetchMoreData = this.fetchMoreData.bind(this)
	}

	// fetchMoreData = () => {
		// setTimeout(() => {
		// 	this.setState({
		// 		projects: this.state.projects.concat(Array.from({ length: 5 }))
		// 	});
		// }, 1500);
	// };

	render() {
		return (
			<div>
				{/* maybe implement infinite scroll once backend is ready */}
				{/* <InfiniteScroll
					dataLength={this.state.projects.length/4}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<h4>Loading...</h4>}
				> */}
					<div className="row">
						{this.props.setProjectData()}
					</div>
				{/* </InfiniteScroll> */}
			</div>
		)
	}
}

export default BrowsingItems
