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
						<p>Tag1: </p>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								name="tag1A"
								value={this.props.filter.tag1A}
								onChange={this.props.handleChange} />
							<label className="form-check-label" for="tag1A">A</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								name="tag1B"
								value={this.props.filter.tag1B}
								onChange={this.props.handleChange} />
							<label className="form-check-label" for="tag1B">B</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								name="tag1C"
								value={this.props.filter.tag1C}
								onChange={this.props.handleChange} />
							<label className="form-check-label" for="tag1C">C</label>
						</div>
					</div>
					<div className="form-group">
						<p>Tag2: </p>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								name="tag2a"
								value={this.props.filter.tag2a}
								onChange={this.props.handleChange} />
							<label className="form-check-label" for="tag2a">a</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								name="tag2b"
								value={this.props.filter.tag2b}
								onChange={this.props.handleChange} />
							<label className="form-check-label" for="tag2b">b</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								name="tag2c"
								value={this.props.filter.tag2c}
								onChange={this.props.handleChange} />
							<label className="form-check-label" for="tag2c">c</label>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Filter
