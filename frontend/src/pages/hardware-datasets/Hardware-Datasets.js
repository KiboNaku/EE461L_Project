import React, { Component } from 'react'
import { Form, Button, Card, Modal, Table } from 'react-bootstrap'
import Header from "../home/components/Header"
import "../home/Home.css"
import CheckCart from "./components/CheckCart.js"
import ErrorMessage from "./components/ErrorMessage.js"
import CheckModal from "./components/CheckModal.js"
import $ from "jquery";

class HardwareDatasets extends Component {

    constructor() {
        super();
        this.state = {
            hwSet1: "",
            hwSet2: "",
            hwSet3: "",
            hwSet4: "",
            hwSet5: "",
            errorString: "",
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.errorExists = this.errorExists.bind(this);
        this.findErrors = this.findErrors.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    handleChange(event) {
        // TODO: add a check for if a hwSet ask is greater than the current availability of that hwSet
        this.setState({ [event.target.name]: event.target.value });
                console.log(event.target.name + " was set to " + event.target.value)

        if(this.errorExists()){
            this.state.error = true;
            this.state.errorString = this.findErrors();
            console.log("error was found")
        } else {
            this.state.error = false;
        }
    }

    errorExists(){
        if(isNaN(this.state.hwSet1) || isNaN(this.state.hwSet2) ||isNaN(this.state.hwSet3) || isNaN(this.state.hwSet4) || isNaN(this.state.hwSet5)){
            return true;
        }
        // TODO: decide with the team if the user asking for too many of a hwset counts as an error or not
    }

    findErrors(){
        var errorString = "";
        if(isNaN(this.state.hwSet1)){
            errorString += "Checkout Amount for HWSet1 must be a number\n";
            console.log(this.state.hwSet1 + " is not a number")
        }
        if(isNaN(this.state.hwSet2)){
            errorString += "Checkout Amount for HWSet2 must be a number\n";
            console.log(this.state.hwSet2 + " is not a number")
        }
        if(isNaN(this.state.hwSet3)){
            errorString += "Checkout Amount for HWSet3 must be a number\n";
            console.log(this.state.hwSet3 + " is not a number")
        }
        if(isNaN(this.state.hwSet4)){
            errorString += "Checkout Amount for HWSet4 must be a number\n";
            console.log(this.state.hwSet4 + " is not a number")
        }
        if(isNaN(this.state.hwSet5)){
            errorString += "Checkout Amount for HWSet5 must be a number\n";
            console.log(this.state.hwSet5 + " is not a number")
        }
        return errorString;
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
                                    <td>10</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet1" type="num" placeholder="Enter Num" value={this.statehwSet1} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet2</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>25</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet2" type="num" placeholder="Enter Num" value={this.statehwSet2} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet3</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>5</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet3" type="num" placeholder="Enter Num" value={this.statehwSet3} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet4</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>15</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet4" type="num" placeholder="Enter Num" value={this.statehwSet4} onChange={this.handleChange} />
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>HWSet5</td>
                                    {/* TODO: fix this hardcoded value once profiles are implemented */}
                                    <td>50</td>
                                    <td>
                                        <Form>
                                            <Form.Control name="hwSet5" type="num" placeholder="Enter Num" value={this.statehwSet5} onChange={this.handleChange} />
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
