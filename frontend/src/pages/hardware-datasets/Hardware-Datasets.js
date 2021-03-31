import React, { Component } from 'react'
import { Form, Card } from 'react-bootstrap'
// import Header from "../home/components/Header"
import "../home/Home.css"
import CheckCart from "./components/CheckCart.js"
import ErrorMessage from "./components/ErrorMessage.js" //currently never displayed
import CheckModal from "./components/CheckModal.js"
import * as handleHardware from '../../api_calls/handleHardware'
import "./Hardware.css"

class HardwareDatasets extends Component {

    constructor() {
        super();
        this.state = {
            hwList: [],
            // hwSet1: "",
            // hwSet2: "",
            // hwSet3: "",
            // hwSet4: "",
            // hwSet5: "",
            errorString: "",
            error: false // currently is never set to true
        }
        this.retrieveHWInfo = this.retrieveHWInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.displayCart = this.displayCart.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    componentDidMount(){
        this.retrieveHWInfo();
    }

    retrieveHWInfo() {
        handleHardware.fetchHW().then(response => {
            console.log(response.data);
            this.setState({ hwList: response.data.HWSets });
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.name + " was set to " + event.target.value)
    }

    displayCart(){

    }

    checkOut() {
        // TODO: write this function so that it accurately decrements all of the hardware sets that the user checks out,
        // as well as checking that there are enough sets to match what the user is asking for
    }

    /*Things to display on hardware-datasets page */
    render() {
        return (
            <div className="dark-background hardware-page">
                <div className="full-screen-height">
                <Card className="hardware-card light-background text-light" style={{ margin: 20 }}>
                    <Card.Header>Hardware Sets</Card.Header>
                    <Card.Body>
                        {/* <button type="button" className="btn btn-primary btn-md"
                            onClick={this.retrieveHWInfo}>
                            log info
                            </button> */}
                        <table id="fixed-table" className="table table-striped table-bordered hardware-table text-light">
                            <thead>
                                <tr>
                                    <th style={{ width: 200 }}>Name</th>
                                    <th style={{ width: 200 }}>Sets Available</th>
                                    <th style={{ width: 150 }}>Checkout Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.hwList.map((item) => (
                                    <tr key={item.hardware_name}>
                                        <td>{item.hardware_name}</td>
                                        {/* TODO: fix this value to reflect hwset1 */}
                                        <td>{item.available_count}</td>
                                        <td>
                                            <Form>
                                                <Form.Control name={item.hardware_name} type="number" placeholder="Desired Checkout Amount" min="0" max={item.available_count} onChange={this.handleChange} />
                                            </Form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row justify-content-center">
                            <button id="modalButton" type="button" className="btn button-primary btn-md"
                                data-toggle="modal" data-target="#check-modal">
                                Checkout
                            </button>
                            <CheckModal content={this.state.error ? <ErrorMessage errorString={this.state.errorString} /> :
                                <CheckCart hwSet1={this.state.HWSet1} hwSet2={this.state.HWSet2} hwSet3={this.state.HWSet3} hwSet4={this.state.HWSet4} hwSet5={this.state.HWSet5} />} />
                        </div>
                    </Card.Body>
                </Card>
                <Card className="light-background text-light" style={{ margin: 20 }}>
                    <Card.Header>DataSets</Card.Header>
                    <Card.Body>
                        <table className="table table-bordered hardware-table text-light">
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
                                        <a className="a-light" href="/resources/1000Pi.txt" download="1000Pi.txt">Click to download</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
                </div>
            </div>
        )
    }
}

export default HardwareDatasets
