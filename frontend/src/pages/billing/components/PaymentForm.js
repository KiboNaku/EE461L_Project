import React, { Component } from 'react'
import {Form, Col} from "react-bootstrap";

class PaymentForm extends Component {
    render() {
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <h6 style={{marginRight:"auto"}}>Credit Card</h6>
                </div>
                <Form>
                    <Form.Group controlId="formGridCardNum">
                        <Form.Control placeholder="Card Number" />
                    </Form.Group>

                    <Form.Group controlId="formGridCardName">
                        <Form.Control placeholder="Name on card" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCardExpiration">
                        <Form.Control type="firstName" placeholder="Expiration date (MM/YY)" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSecurityCode">
                        <Form.Control type="lastName" placeholder="Security Code" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}
export default PaymentForm
