import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseForm from './BaseForm'

class RegisterForm extends Component {

    render() {
        let title = "Welcome";
        let subtitle = "Looking to create and share projects? Create an account today to get started.";
        let footer = "Already have an account?";
        let switchText = "Login here.";
        let form = (
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>

                <Form.Group>
                    <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>

                <Form.Group>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.props.onSubmit} className="w-100">
                    Register
                </Button>
            </Form>
        );

        return (
            <div id="login-page-div">
                <BaseForm 
                    title={title} 
                    subtitle={subtitle}
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

export default RegisterForm
