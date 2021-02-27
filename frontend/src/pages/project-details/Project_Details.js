import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

class Project_Details extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: true,
        };
    }

    render() {
        return (
            <div className="w-100 boring-background max-height container overflow-hidden">
                <Container fluid className="vertical-center">

                    <Row>
                        <Col>
                            Project Name
                        </Col>
                        <Col>
                            edit
                        </Col>
                        <Col>
                            +
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Owner, Name 1, Name 2, ...
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Description
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Tags
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Materials
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Project_Details
