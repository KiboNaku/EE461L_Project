import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

class LoginForm extends Component {

    render() {
        return (
            <div id="login-page-div">
                <Card.Body>

                    <Card.Title>Login</Card.Title>

                    <Form>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="example@gmail.com" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="12345678" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Don't have an account? <a href="#" onClick={this.props.switch}>Register here.</a>
                </Card.Footer>
            </div>
        );
    }
}

export default LoginForm
