import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseForm from './BaseForm'

class LoginForm extends Component {

    render() {
        let title = "Register";
        let footer = "Already have an account?";
        let switchText = "Login here.";
        let form = (
            <Form>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Bob" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Davis" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="example@gmail.com" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="12345678" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.props.onSubmit}>
                    Register
                </Button>
            </Form>
        );

        return (
            <div id="login-page-div">
                <BaseForm 
                    title={title} 
                    form={form} 
                    googleClick={this.props.googleSignIn} 
                    switch={this.props.switch} 
                    footer={footer}
                    switchText={switchText}
                    />
            </div>
        );
    }
}

export default LoginForm
