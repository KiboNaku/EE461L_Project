import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import AddressForm from './components/AddressForm';
import PricingDisplay from "./components/PricingDisplay";
import PaymentForm from "./components/PaymentForm";

class Billing extends Component {
	constructor() {
		super();
		this.state = {
			billingAddress: false,
		};
		this.toggleBilling = this.toggleBilling.bind(this);
	}
	toggleBilling() {
		const { billingAddress } = this.state;
		this.setState({ billingAddress: !billingAddress, });
	}

	render() {
		const { billingAddress } = this.state;
		return (
			<div>
				<div id="Billing" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
					<h1 class="h2">Billing</h1>
				</div>
				<div id="billing-body">
					<Container fluid>
						<Row>
							<Col md={8}>
								<div style={{ display: "flex" }} className="mb-3">
									<Card className="light-background" style={{ marginRight: "auto", width: "80%", height: "auto" }}>
										<Card.Header>
											<h4>Shipping Information</h4>
										</Card.Header>
										<Card.Body>
											<AddressForm />
										</Card.Body>
									</Card>
								</div>
								<div style={{ display: "flex" }} className="mb-3">
									<Card className="light-background" style={{ marginRight: "auto", width: "auto", height: "auto" }}>
										<Card.Header>
											<h4>Payment Information</h4>
										</Card.Header>
										<Card.Body>
											<PaymentForm />
										</Card.Body>
									</Card>
								</div>
								<div style={{ display: "flex" }} className="mb-3">
									<span>
										<input type="checkbox" onClick={this.toggleBilling}></input>
										<label>Is your billing diffferent from your shipping?</label>
									</span>
								</div>
								<div style={{ display: "flex" }} className="mb-3">
									{billingAddress && (
										<Card className="light-background" style={{ marginRight: "auto", width: "80%", height: "auto" }}>
											<Card.Header>
												<h4>Billing Information</h4>
											</Card.Header>
											<Card.Body>
												<AddressForm />
											</Card.Body>
										</Card>
									)}
								</div>
							</Col>
							<Col md={4}>
								<div style={{ display: "flex" }}>
									<Card className="light-background" style={{ marginLeft: "auto", width: "80%", height: "45%" }}>
										<Card.Header>Items</Card.Header>
										<Card.Body>
											<PricingDisplay />
										</Card.Body>
									</Card>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button className="button-primary">Submit</Button>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}
export default Billing;
