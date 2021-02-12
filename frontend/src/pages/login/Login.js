import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

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

    emailSignIn(email, password){
        console.log("Signing in with email");
    }

    emailRegister(firstName, lastName, email, password){
        console.log("Registering with email");
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
