import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseForm from './BaseForm'

class RegisterForm extends Component {

    constructor() {
        super();
        this.state = { username: "", email: "", password: "" };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        this.props.onSubmit(this.state.username, this.state.email, this.state.password);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        let title = "Welcome";
        let subtitle = "Looking to create and share projects? Create an account today to get started.";
        let footer = "Already have an account?";
        let switchText = "Login here.";
        let form = (
            <Form>
                <Form.Group>
                    <Form.Control className="textbox" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Control className="textbox" name="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Control className="textbox" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                </Form.Group>

                <Button onClick={this.onSubmit} className="w-100 button-primary">
                    Register
                </Button>
            </Form>
        );

        return (
            <div id="login-page-div">
                <BaseForm 
                    loading={this.props.loading}
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

export default RegisterForm
