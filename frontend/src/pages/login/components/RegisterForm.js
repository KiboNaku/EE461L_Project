import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseForm from './BaseForm'

class RegisterForm extends Component {

    constructor() {
        super();
        this.state = { firstName: "", lastName: "", email: "", password: "" };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        console.log("state:", this.state);
        console.log(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
        this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    render() {
        let title = "Welcome";
        let subtitle = "Looking to create and share projects? Create an account today to get started.";
        let footer = "Already have an account?";
        let switchText = "Login here.";
        let form = (
            <Form>
                <Form.Group>
                    <Form.Control name="firstName" type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Control name="lastName" type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Control name="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.onSubmit} className="w-100">
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

export default RegisterForm
