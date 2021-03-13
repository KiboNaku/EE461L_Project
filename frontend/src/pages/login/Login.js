import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import * as admission from '../../api_calls/admission'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: true,
        }
        this.emailSignIn = this.emailSignIn.bind(this);
        this.emailRegister = this.emailRegister.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.switchToRegister = this.switchToRegister.bind(this);
        this.switchToLogin = this.switchToLogin.bind(this);
    }

    emailSignIn(email, password) {
        admission.login({ email: email, password: password })
            .then(res => {
                console.log("Logged in with response", res);
            })
    }

    emailRegister(firstName, lastName, email, password) {
        admission.register({ firstName: firstName, lastName: lastName, email: email, password: password })
            .then(res => {
                console.log("Registered with response", res);
            })
    }

    googleSignIn() {
        console.log("Signing in with Google.");
    }

    switchToRegister() {
        this.setState({ isLogin: false });
    }

    switchToLogin() {
        this.setState({ isLogin: true });
    }

    render() {
        return (
            <div className="w-100 boring-background max-height container overflow-hidden">
                <Container fluid className="vertical-center">

                    <Row className="justify-content-center">
                        <Col xs={4}>
                            <Card className="text-center px-5 py-5 white-background">
                                {
                                    this.state.isLogin ?
                                        <LoginForm
                                            onSubmit={this.emailSignIn}
                                            switch={this.switchToRegister}
                                            googleSignIn={this.googleSignIn} /> :
                                        <RegisterForm
                                            onSubmit={this.emailRegister}
                                            switch={this.switchToLogin}
                                            googleSignIn={this.googleSignIn} />
                                }
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login
