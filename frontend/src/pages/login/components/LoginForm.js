import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseForm from './BaseForm'

class LoginForm extends Component {

    render() {
        let formData = { email: "", password: "" };
        let title = "Welcome Back";
        let subtitle = "Login to stay up to date on your latest projects.";
        let footer = "Don't have an account?";
        let switchText = "Register here.";
        let form = (
            <Form>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email Address" value={formData.email} onChange={(event) => {
                        formData.email = event.target.value;
                    }} />
                </Form.Group>

                <Form.Group>
                    <Form.Control type="password" placeholder="Password" value={formData.password} onChange={(event) => {
                        formData.password = event.target.value;
                    }} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => { this.props.onSubmit(formData) }} className="w-100">
                    Login
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

export default LoginForm
