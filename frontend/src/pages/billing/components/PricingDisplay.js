import React, { Component } from 'react'
import {Card, Container, Row, Col} from "react-bootstrap";

class PricingDisplay extends Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <Card style={{ marginLeft: "auto", width:"250px", height:"300px"}}>
                    <Card.Header>Items</Card.Header>
                    <Card.Body>
                        {/**TODO: have methods to add items, not hardcoded
                         * also have them listed more prettily
                         */}
                        <li>HWSet 1</li>
                        <li>HWSet 2</li>
                        <li>HWSet 3</li>
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-3 border-top">
                           <Container>
                                <Row>
                                   <Col>
                                        {/**TODO: need to caluclated prices of HW items */}
                                        <div style={{ display: "flex" }}>
                                            <h6 style={{marginRight: "auto"}}>
                                                Sub Total</h6>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <h6 style={{marginRight: "auto"}}>
                                                Shipping</h6>
                                        </div>
                                   </Col>
                                   <Col>
                                    <div style={{ display: "flex" }}>
                                        <h6 style={{marginLeft: "auto"}}>
                                            $$$</h6>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <h6 style={{marginLeft: "auto"}}>
                                            $$$</h6>
                                    </div>
                                   </Col>
                               </Row>
                            </Container> 
                        </div>
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-3 border-top">
                           <Container>
                               <Row>
                                   <Col>
                                   <div style={{ display: "flex" }}>
                                       <h6 style={{marginRight: "auto"}}>
                                           Total</h6>
                                   </div>
                                   </Col>
                                   <Col>
                                   <div style={{ display: "flex" }}>
                                       <h6 style={{marginLeft: "auto"}}>
                                           $$$</h6>
                                   </div>
                                   </Col>
                               </Row>
                            </Container> 
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default PricingDisplay
