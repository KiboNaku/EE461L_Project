import React, { Component } from "react";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: ""
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div className="col-lg-6 mx-auto">
				<div className="input-group rounded">
					<input
						type="search"
						className="textbox form-control rounded searchbar"
						placeholder="Search by ID"
						aria-label="Search"
						aria-describedby="search-addon"
						name="searchInput"
						value={this.state.searchInput}
						onChange={this.handleChange} />
					<button className="input-group-text border-0 button-primary searchbar-button" id="search-addon" onClick={() => this.props.search(this.state.searchInput)}>
						<SearchOutlinedIcon />
					</button>
				</div>
			</div>
		)
	}
}

export default SearchBar