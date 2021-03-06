import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import DefaultLoader from "./../../_utils/DefaultLoader";

class BaseForm extends Component {

    render() {
        return (
            <div>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.subtitle}</Card.Text>
                    {this.props.error != null && <Card.Text className="text-danger">Error: {this.props.error}</Card.Text>}

                    {this.props.loading? <DefaultLoader loading={this.props.loading}/>: this.props.form}
                </Card.Body>
                <Card.Footer>
                    {this.props.footer} <a className="a-light" href="#" onClick={this.props.switch}>{this.props.switchText}</a>
                </Card.Footer>
            </div>
        );
    }
}

export default BaseForm
