import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseForm from './BaseForm'

class LoginForm extends Component {

    constructor() {
        super();
        this.state = { email: "", password: "" };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        this.props.onSubmit(this.state.email, this.state.password);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        let title = "Welcome Back";
        let subtitle = "Login to stay up to date on your latest projects.";
        let footer = "Don't have an account?";
        let switchText = "Register here.";
        let form = (
            <Form>
                <Form.Group>
                    <Form.Control name="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" onClick={this.onSubmit} className="w-100">
                    Login
                </Button>
            </Form>
        );

        return (
            <div id="login-page-div">
                <BaseForm
                    error={this.props.error}
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
