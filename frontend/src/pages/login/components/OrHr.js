import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

class OrHr extends Component {

    render() {
        return (
            <Row className={this.props.className}>
                <Col><hr /></Col>
                <Col>OR</Col>
                <Col><hr /></Col>
            </Row>
        );
    }
}

export default OrHr
