import React, { Component } from 'react'
import { Form, Card } from 'react-bootstrap'
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
            successString: "",
            errorString: "",
            error: 0,
            link1: "https://physionet.org/static/published-projects/bpssrat/blood-pressure-in-salt-sensitive-dahl-rats-1.0.0.zip",
            link2: "https://physionet.org/static/published-projects/culm/complex-upper-limb-movements-1.0.0.zip",
            link3: "https://physionet.org/static/published-projects/ecgiddb/ecg-id-database-1.0.0.zip",
            link4: "https://physionet.org/static/published-projects/iafdb/intracardiac-atrial-fibrillation-database-1.0.0.zip",
            link5: "https://physionet.org/static/published-projects/fantasia/fantasia-database-1.0.0.zip",
            link6: "https://physionet.org/static/published-projects/nesfdb/noise-enhancement-of-sensorimotor-function-1.0.0.zip",
            link7: "https://physionet.org/static/published-projects/prcp/physiologic-response-to-changes-in-posture-1.0.0.zip",
            link8: "https://physionet.org/static/published-projects/sleepbrl/sleep-bioradiolocation-database-1.0.0.zip",
            link9: "https://physionet.org/static/published-projects/tappy/tappy-keystroke-data-1.0.0.zip",
            link10: "https://physionet.org/static/published-projects/wrist/wrist-ppg-during-exercise-1.0.0.zip" 
        }
        this.fixString = this.fixString.bind(this);
        this.retrieveHWInfo = this.retrieveHWInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            console.log(response.data);
            this.setState({ hwList: response.data.HWSets });
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.name + " was set to " + event.target.value)
    }

    checkOut() {
        this.setState({ successString: "" })
        this.setState({ errorString: "" })
        handleHardware.rentHW({
            HWSet1: this.fixString(this.state.HWSet1),
            HWSet2: this.fixString(this.state.HWSet2), HWSet3: this.fixString(this.state.HWSet3),
            HWSet4: this.fixString(this.state.HWSet4), HWSet5: this.fixString(this.state.HWSet5)
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
                    <Card className="hardware-card light-background text-light" style={{ margin: 20 }}>
                        <Card.Header className="display-4">Hardware Sets</Card.Header>
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
                                                    <Form.Control className="textbox" name={item.hardware_name} type="number" placeholder="Desired Checkout Amount" min="0" max={item.available_count} onChange={this.handleChange} />
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
                        <Card.Header className="display-4">DataSets</Card.Header>
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
                                        <td>Blood Pressure in Salt-Sensitive Dahl Rats</td>
                                        <td>
                                            <a href={this.state.link1}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Complex Upper-Limb Movements</td>
                                        <td>
                                            <a href={this.state.link2}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ECG-ID Database</td>
                                        <td>
                                            <a href={this.state.link3}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fantasia Database</td>
                                        <td>
                                            <a href={this.state.link4}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Intracardiac Atrial Fibrillation Database</td>
                                        <td>
                                            <a href={this.state.link5}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Noise Enhancement of Sensorimotor Function</td>
                                        <td>
                                            <a href={this.state.link6}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Physiologic Response to Changes in Posture</td>
                                        <td>
                                            <a href={this.state.link7}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sleep Bioradiolocation Database</td>
                                        <td>
                                            <a href={this.state.link8}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tappy Keystroke Data</td>
                                        <td>
                                            <a href={this.state.link9}>Click to download</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Wrist PPG During Exercise</td>
                                        <td>
                                            <a href={this.state.link10}>Click to download</a>
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