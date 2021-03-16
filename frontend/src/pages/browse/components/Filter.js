import React, { Component } from 'react';

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div>
				<form>
					<div className="form-group">
						<p>Programming Language: </p>
						<div className="form-check">
							<input type="checkbox" className="form-check-input" id="filterLang1" />
							<label className="form-check-label" for="filterLang1">C</label>
						</div>
						<div className="form-check">
							<input type="checkbox" className="form-check-input" id="filterLang1" />
							<label className="form-check-label" for="filterLang1">C++</label>
						</div>
						<div className="form-check">
							<input type="checkbox" className="form-check-input" id="filterLang1" />
							<label className="form-check-label" for="filterLang1">Java</label>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Filter
