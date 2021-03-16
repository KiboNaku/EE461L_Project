import React, { Component } from 'react';

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tag1: {
				A: false,
				B: false,
				C: false,
			},
			tag2: {
				a: false,
				b: false,
				c: false
			}
		}
	}

	render() {
		return (
			<div>
				<form>
					<div className="form-group">
						<p>Tag1: </p>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="tag1A" />
							<label className="form-check-label" for="tag1A">A</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="tag1B" />
							<label className="form-check-label" for="tag1B">B</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="tag1C" />
							<label className="form-check-label" for="tag1C">C</label>
						</div>
					</div>
					<div className="form-group">
						<p>Tag2: </p>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="tag2A" />
							<label className="form-check-label" for="tag2A">a</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="tag2B" />
							<label className="form-check-label" for="tag2B">b</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="tag2C" />
							<label className="form-check-label" for="tag2C">c</label>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Filter
