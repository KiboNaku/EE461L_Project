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
        this.switchToRegister = this.switchToRegister.bind(this);
        this.switchToLogin = this.switchToLogin.bind(this);
    }

    switchToRegister() {
        this.setState({ isLogin: false });
    }

    switchToLogin() {
        this.setState({ isLogin: true });
    }

    render() {
        return (
            <div className="w-100 my-5">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col xs={4}>
                            <Card className="text-center">
                                {
                                    this.state.isLogin ? 
                                        <LoginForm switch={this.switchToRegister}/> : <RegisterForm switch={this.switchToLogin}/>
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
