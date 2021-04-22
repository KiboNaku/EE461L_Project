import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import * as admission from '../../api_calls/admission'

import "./Login.css";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            message: null,
            isLogin: true,
            hasLoggedIn: false,
            loginError: null,
            registerError: null,
        }
        this.emailSignIn = this.emailSignIn.bind(this);
        this.emailRegister = this.emailRegister.bind(this); 
        this.switchToRegister = this.switchToRegister.bind(this);
        this.switchToLogin = this.switchToLogin.bind(this);
    }

    emailSignIn(email, password) {
        this.setState({ loginError: null, loading: true });
        admission.login({ email: email, password: password })
            .then(res => {
                let errorCode = res.data.success;
                let error = res.data.error;
                let token = res.data.token;

                this.setState({loading: false});
                if (errorCode < 0) {
                    this.setState({ loginError: error });
                } else {
                    localStorage.setItem("token", token);
                    this.props.login();
                }
            });
    }

    emailRegister(username, email, password) {
        this.setState({ registerError: null, loading: true });
        admission.register({ username: username, email: email, password: password })
            .then(res => {
                let errorCode = res.data.success;
                let error = res.data.error;
                let token = res.data.token;
                
                this.setState({loading: false});
                if (errorCode < 0) {
                    this.setState({ registerError: error });
                } else {
                    localStorage.setItem("token", token);
                    this.props.login();
                }
            });
    }

    switchToRegister() {
        this.setState({ isLogin: false });
    }

    switchToLogin() {
        this.setState({ isLogin: true });
    }

    render() {

        if(this.props.loggedIn){
            return <Redirect to='/' />
        }

        return (
            <div className="dark-background max-height container overflow-hidden">
                <Container fluid className="vertical-center login-form-container">
                    <Row className="justify-content-center">
                        <Col xs={10} sm={9} md={6} lg={5} xl={4}>
                            <Card className="text-center px-sm-2 py-sm-2 px-md-5 py-md-5 light-background text-light">
                                {
                                    this.state.isLogin ?
                                        <LoginForm
                                            error={this.state.loginError}
                                            loading={this.state.loading}
                                            onSubmit={this.emailSignIn}
                                            switch={this.switchToRegister}
                                            googleSignIn={this.googleSignIn} /> :
                                        <RegisterForm
                                            error={this.state.registerError}
                                            loading={this.state.loading}
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
