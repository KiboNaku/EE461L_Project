import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseForm from './BaseForm'

class LoginForm extends Component {

    render() {
        let title = "Login";
        let footer = "Don't have an account?";
        let switchText = "Register here.";
        let form = (
            <Form>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="example@gmail.com" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="12345678" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.props.onSubmit}>
                    Login
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
