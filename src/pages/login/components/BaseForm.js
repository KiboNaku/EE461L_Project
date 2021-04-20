import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import OrHr from './OrHr'

class BaseForm extends Component {

    render() {
        return (
            <div>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.subtitle}</Card.Text>
                    {this.props.error != null && <Card.Text className="text-danger">Error: {this.props.error}</Card.Text>}

                    {this.props.form}
                    <OrHr className="my-4" />
                    <GoogleButton
                        className="w-100 google-button"
                        label="Continue with Google"
                        onClick={() => this.props.googleClick()}
                        style={{
                            backgroundColor: "#23967f",
                            color: "white",
                            borderColor: "#23967f",
                            borderRadius: ".25rem"
                        }}
                    />
                </Card.Body>
                <Card.Footer>
                    {this.props.footer} <a className="a-light" href="#" onClick={this.props.switch}>{this.props.switchText}</a>
                </Card.Footer>
            </div>
        );
    }
}

export default BaseForm
