import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

class RegisterForm extends Component {

    render() {
        return (
            <div id="register-page-div">
                <Card.Body>

                    <Card.Title>Register</Card.Title>

                    <Form>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="example@gmail.com" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="12345678" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Reenter Password</Form.Label>
                            <Form.Control type="password" placeholder="12345678" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Already have an account? <a href="#" onClick={this.props.switch}>Login here.</a>
                </Card.Footer>
            </div>
        );
    }
}

export default RegisterForm
