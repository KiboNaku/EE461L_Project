import React, { Component } from 'react'
import { Card, Table } from "react-bootstrap";
import * as fetch from "./../../../api_calls/fetchInformation"

class ProfileHardware extends Component {

    constructor() {
        super();
        this.state = {
            rented: []
        }
    }

    componentDidMount() {
        fetch
            .fetchUserHardware()
            .then(res => {
                this.setState({ rented: res.data.rented_hardware });
            });
    }

    render() {

        console.log(this.state)
        return (
            <div>
                <div id="ProfileHardware" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Hardware</h1>
                </div>
                <Card className="mb-3 light-background">
                    <Card.Header>Checked Out Hardware</Card.Header>
                    <Card.Body>
                        <Table className="text-light profile-table" bordered >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    this.state.rented.map((hw, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{hw.name}</td>
                                                <td>{hw.amount}</td>
                                                <td>$$$</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                {/* <Card className="light-background">
                    <Card.Header>Hardware Wishlist</Card.Header>
                    <Card.Body>
                        <Table className="text-light profile-table" bordered>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HWSet1</td>
                                    <td>1</td>
                                    <td>$$$</td>
                                </tr>
                                <tr>
                                    <td>HWSet2</td>
                                    <td>1</td>
                                    <td>$$$</td>
                                </tr>
                                <tr>
                                    <td>HWSet3</td>
                                    <td>3</td>
                                    <td>$$$</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total: $$$</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card> */}
            </div>
        )
    }
}
export default ProfileHardware
