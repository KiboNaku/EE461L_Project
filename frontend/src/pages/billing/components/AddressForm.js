import React, { Component } from "react";
import {Form, Col} from "react-bootstrap";

class AddressForm extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Control type="firstName" placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formLastName">
              <Form.Control type="lastName" placeholder="Last Name" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Control placeholder="Address" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Control placeholder="Apartment, studio, etc. (optional)" />
          </Form.Group>

          <Form.Group controlId="formGridCity">
              <Form.Control placeholder="City" />
            </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCountry">
            <Form.Control as="select" defaultValue="Choose">
                <option>Country</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Control as="select" defaultValue="Choose">
                <option>State</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Control placeholder="Zip" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridPhone">
              <Form.Control placeholder="Phone" />
            </Form.Group>
        </Form>
      </div>
    );
  }
}
export default AddressForm;
