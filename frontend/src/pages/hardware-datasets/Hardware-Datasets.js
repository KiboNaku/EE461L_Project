import React, { Component } from 'react'
import { Form, Button, Card, Modal, Table } from 'react-bootstrap'
import Header from "../home/components/Header"
import "../home/Home.css"
import CheckCart from "./components/CheckCart.js"
import ErrorMessage from "./components/ErrorMessage.js" //currently never displayed
import CheckModal from "./components/CheckModal.js"
import * as handleHardware from '../../api_calls/handleHardware'

class HardwareDatasets extends Component {

    constructor() {
        super();
        this.state = {
            hwSet1: "",
            hwSet2: "",
            hwSet3: "",
            hwSet4: "",
            hwSet5: "",
            // errorString: "",
            error: false // currently is never set to true
        }
        this.retrieveHWInfo = this.retrieveHWInfo.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    retrieveHWInfo(){
        console.log(handleHardware.fetchHW());
        return(handleHardware.fetchHW().data);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.name + " was set to " + event.target.value)
    }

    checkOut() {
        // TODO: write this function so that it accurately decrements all of the hardware sets that the user checks out,
        // as well as checking that there are enough sets to match what the user is asking for
    }

    /*Things to display on hardware-datasets page */
    render() {
        return (
            <div className="full-screen-height">
                <Card style={{ margin: 20 }}>
                    <Card.Header>Hardware Sets</Card.Header>
                    <Card.Body>
                    <button type="button" className="btn btn-primary btn-md"
                                onClick={this.retrieveHWInfo}>
                                log info
                            </button>
                        <table id="fixed-table" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: 200 }}>Name</th>
                                    <th style={{ width: 200 }}>Sets Available</th>
                                    <th style={{ width: 150 }}>Checkout Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HWSet1</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>{this.retrieveHWInfo.value}</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet1" type="number" placeholder="Desired Checkout Amount" min="0" value={this.statehwSet1} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet2</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>25</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet2" type="number" placeholder="Desired Checkout Amount" min="0" value={this.statehwSet2} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet3</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>5</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet3" type="number" placeholder="Desired Checkout Amount" min="0" value={this.statehwSet3} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet4</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>15</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet4" type="number" placeholder="Desired Checkout Amount" min="0" value={this.statehwSet4} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet5</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>50</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet5" type="number" placeholder="Desired Checkout Amount" min="0" value={this.statehwSet5} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row justify-content-center">
                            <button id="modalButton" type="button" className="btn btn-primary btn-md"
                                data-toggle="modal" data-target="#check-modal" onClick={this.displayCart}>
                                Checkout
                            </button>
                            <CheckModal content={this.state.error ? <ErrorMessage errorString={this.state.errorString} /> :
                                <CheckCart hwSet1={this.state.hwSet1} hwSet2={this.state.hwSet2} hwSet3={this.state.hwSet3} hwSet4={this.state.hwSet4} hwSet5={this.state.hwSet5} />} />
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ margin: 20 }}>
                    <Card.Header>DataSets</Card.Header>
                    <Card.Body>
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Download Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* TODO: fix this to list a real dataset later on */}
                                    <td>1000 Pi Digits</td>
                                    <td>
                                        {/* TODO: fix to download a real dataset from our site later on */}
                                        <a href="/resources/1000Pi.txt" download="1000Pi.txt">Click to download</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default HardwareDatasets
