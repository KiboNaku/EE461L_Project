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
            errorString: "",
            error: 0 
        }
        this.fixString = this.fixString.bind(this);
        this.retrieveHWInfo = this.retrieveHWInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    fixString(hardware) {
        if(!hardware){
            return "0";
        }
        else {
            return hardware
        }
    }

    componentDidMount(){
        this.retrieveHWInfo();
    }

    retrieveHWInfo() {
        handleHardware.fetchHW().then(response => {
            // console.log(response.data);
            this.setState({ hwList: response.data.HWSets });
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.name + " was set to " + event.target.value)
    }

    checkOut() {
        // TODO: write this function so that it accurately decrements all of the hardware sets that the user checks out,
        // as well as checking that there are enough sets to match what the user is asking for
        this.setState({errorString: ""})
        handleHardware.rentHW({HWSet1: this.fixString(this.props.hwSet1), 
            HWSet2: this.fixString(this.props.hwSet2), HWSet3: this.fixString(this.props.hwSet3), 
            HWSet4: this.fixString(this.props.hwSet4), HWSet5: this.fixString(this.props.hwSet5)
        }).then(res => {
            console.log("tried to rent, backend response:", res);
            let errorNum = res.data.success;
            let error = res.data.error;
            if(errorNum < 0){
                this.setState({errorString: error});
                console.log(error)
            }
        })
        // TODO: handle the return value from handleHardware.rentHW(), including displaying errors and fixing the available hardware nums
    }

    /*Things to display on hardware-datasets page */
    render() {
        return (
            <div className="dark-background hardware-page">
                <div className="full-screen-height">
                {/* TODO: figure out how the next line works (if it does) */}
                {this.state.errorString != "" && <Card.Text className="text-danger">Error: {this.state.errorString}</Card.Text>}
                <Card className="hardware-card light-background text-light" style={{ margin: 20 }}>
                    <Card.Header>Hardware Sets</Card.Header>
                    <Card.Body>
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
                                <CheckCart hwSet1={this.state.HWSet1} hwSet2={this.state.HWSet2} hwSet3={this.state.HWSet3}
                                    hwSet4={this.state.HWSet4} hwSet5={this.state.HWSet5} checkOut={this.checkOut} />} />
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
