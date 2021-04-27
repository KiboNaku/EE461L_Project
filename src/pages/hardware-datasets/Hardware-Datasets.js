import React, { Component } from 'react'
import { Form, Card } from 'react-bootstrap'
import "../home/Home.css"
import { Link } from "react-router-dom"
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
            // hwInput: [],
            successString: "",
            errorString: "",
            error: 0,
            links: [
                {
                    title: "Blood Pressure in Salt-Sensitive Dahl Rats",
                    link: "https://physionet.org/static/published-projects/bpssrat/blood-pressure-in-salt-sensitive-dahl-rats-1.0.0.zip"
                },
                {
                    title: "Complex Upper-Limb Movements",
                    link: "https://physionet.org/static/published-projects/culm/complex-upper-limb-movements-1.0.0.zip"
                },
                {
                    title: "ECG-ID Database",
                    link: "https://physionet.org/static/published-projects/ecgiddb/ecg-id-database-1.0.0.zip"
                },
                {
                    title: "Fantasia Database",
                    link: "https://physionet.org/static/published-projects/iafdb/intracardiac-atrial-fibrillation-database-1.0.0.zip"
                },
                {
                    title: "Intracardiac Atrial Fibrillation Database",
                    link: "https://physionet.org/static/published-projects/fantasia/fantasia-database-1.0.0.zip"
                },
                {
                    title: "Noise Enhancement of Sensorimotor Function",
                    link: "https://physionet.org/static/published-projects/nesfdb/noise-enhancement-of-sensorimotor-function-1.0.0.zip"
                },
                {
                    title: "Physiologic Response to Changes in Posture",
                    link: "https://physionet.org/static/published-projects/prcp/physiologic-response-to-changes-in-posture-1.0.0.zip"
                },
                {
                    title: "Sleep Bioradiolocation Database",
                    link: "https://physionet.org/static/published-projects/sleepbrl/sleep-bioradiolocation-database-1.0.0.zip"
                },
                {
                    title: "Tappy Keystroke Data",
                    link: "https://physionet.org/static/published-projects/tappy/tappy-keystroke-data-1.0.0.zip"
                },
                {
                    title: "Wrist PPG During Exercise",
                    link: "https://physionet.org/static/published-projects/wrist/wrist-ppg-during-exercise-1.0.0.zip"
                }
            ]
        }
        this.fixString = this.fixString.bind(this);
        this.retrieveHWInfo = this.retrieveHWInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFormInfo = this.getFormInfo.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    fixString(hardware) {
        if (!hardware) {
            return "0";
        }
        else {
            return hardware
        }
    }

    componentDidMount() {
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

    getFormInfo() {
        var hw = [];
        this.state.hwList.map((item) => (
            hw.push(this.fixString(this.state[item.hardware_name]))
        ))
        // console.log(hw);
        return hw;
    }

    checkOut() {
        this.setState({ successString: "" });
        this.setState({ errorString: "" });
        var hwInput = this.getFormInfo();
        handleHardware.rentHW({
            rentHardware: hwInput
        }).then(res => {
            if (res.data.success === 0) {
                this.setState({ successString: res.data.data });  // shows a success banner when hw is rented
                this.retrieveHWInfo();
            }
            else {
                this.setState({ errorString: res.data.error })
            }
        }).catch(err => {
            let response = err.response;        // this correctly shows an error banner when the user tries 
            if (response !== null && typeof response !== "undefined") {    // to rent hw when they are not logged in
                if (response.status === 403) {
                    this.setState({ errorString: "You need to be logged in to rent hardware." });
                }
            }
        });
    }

    /*Things to display on hardware-datasets page */
    render() {
        return (
            <div className="full-screen-height">
                <div className="dark-background hardware-page" >
                    {this.state.successString != "" && <Card.Text className="text-light">Success! {this.state.successString}</Card.Text>}
                    {this.state.errorString != "" && <Card.Text className="text-danger">Error: {this.state.errorString}</Card.Text>}
                    <Card className="hardware-card light-background text-light">
                        <Card.Header className="table-header">Hardware Sets</Card.Header>
                        <Card.Body className="hardware-card-body">
                            <table id="fixed-table" className="table table-bordered hardware-table text-light">
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
                                            <td>{item.available_count}</td>
                                            <td>
                                                {this.props.loggedIn ?
                                                    <Form>
                                                        <Form.Control className="textbox" name={item.hardware_name} type="number" placeholder="Desired Checkout Amount" min="0" max={item.available_count} onChange={this.handleChange} />
                                                    </Form> :
                                                    <Card.Text>N/A</Card.Text>
                                                }

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row justify-content-center">
                                {this.props.loggedIn ?
                                    <button id="modalButton" type="button" className="btn button-primary btn-md"
                                        data-toggle="modal" data-target="#check-modal">
                                        Checkout
                                    </button> :
                                    <Card.Text>You must <Link className="a-light" to="/login">login/register</Link> before you can purchase hardware sets.</Card.Text>
                                }

                                <CheckModal content={this.state.error ? <ErrorMessage errorString={this.state.errorString} /> :
                                    <CheckCart hw={this.getFormInfo()} checkOut={this.checkOut} />} />
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="hardware-card light-background text-light">
                        <Card.Header className="table-header">DataSets</Card.Header>
                        <Card.Body className="hardware-card-body">
                            <table className="table table-bordered hardware-table text-light">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Download Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.links.map(l => {
                                            return (
                                                <tr>
                                                    <td>{l.title}</td>
                                                    <td>
                                                        <a className="a-light" href={l.link}>Click to download</a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

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
