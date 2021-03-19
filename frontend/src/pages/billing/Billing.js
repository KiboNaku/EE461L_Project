import React, { Component } from "react";
import {  Button, Card, Container, Row, Col} from "react-bootstrap";
import AddressForm from './components/AddressForm';
import PricingDisplay from "./components/PricingDisplay";
import PaymentForm from "./components/PaymentForm";

class Billing extends Component {
  constructor() {
    super();
    this.state = {
      billingAddress: false,
    };
    this.differentBilling = this.differentBilling.bind(this);
    this.sameBilling = this.sameBilling.bind(this);
  }
  differentBilling() {
    this.setState({ billingAddress: true });
  }
  sameBilling() {
    this.setState({ billingAddress: false });
  }
  render() {
    var show;
    if (this.state.billingAddress == false) {
      show = false;
    } else {
      show = true;
    }
    return (
      <div>
        <div id="Billing" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 class="h2">Billing</h1>
        </div>
        <div id="billing-body">
          <Container fluid>
            <Row>
              <Col>
                <div style={{ display: "flex" }} class="mb-3">
                    <Card style={{ marginRight: "auto", width:"auto", height:"auto"}}>
                        <Card.Header>
                            <h4>Shipping Information</h4>
                        </Card.Header>
                        <Card.Body>
                            <AddressForm/>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{ display: "flex" }} class="mb-3">
                    <Card style={{ marginRight: "auto", width:"auto", height:"auto"}}>
                        <Card.Header>
                        <h4>Payment Information</h4>
                        </Card.Header>
                        <Card.Body>
                            <PaymentForm/>
                        </Card.Body>
                    </Card>
                </div>
              </Col>
              <Col>
                <PricingDisplay/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button>Submit</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Billing;
