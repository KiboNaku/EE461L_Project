import React, { Component } from 'react'
import { Form, Card } from 'react-bootstrap'
import "../home/Home.css"
import { Link } from "react-router-dom"
import CheckCart from "./components/CheckCart.js"
import ErrorMessage from "./components/ErrorMessage.js" //currently never displayed
import CheckModal from "./components/CheckModal.js"
import * as handleHardware from '../../api_calls/handleHardware'
import * as fetchDatasets from '../../api_calls/datasets'
import DefaultLoader from "./../_utils/DefaultLoader";
import "./Hardware.css"

class HardwareDatasets extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            hwList: [],
            successString: "",
            errorString: "",
            error: 0,
            datasets: []
        }
        this.fixString = this.fixString.bind(this);
        this.retrieveHWInfo = this.retrieveHWInfo.bind(this);
        this.retrieveDatasetInfo = this.retrieveDatasetInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFormInfo = this.getFormInfo.bind(this);
        this.getModalInfo = this.getModalInfo.bind(this);
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
        this.retrieveDatasetInfo();
    }

    retrieveHWInfo() {
        handleHardware.fetchHW().then(response => {
            // console.log(response.data);
            this.setState({ hwList: response.data.HWSets, loading: false })
        })
    }

    retrieveDatasetInfo() {
        fetchDatasets.fetchDatasets().then(response => {
            // console.log(response.data);
            this.setState({ datasets: response.data.Datasets, loading: false });
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
        return hw;
    }

    getModalInfo(){
        var hw = {};
        this.state.hwList.map((item) => (
            hw[item.hardware_name] = this.fixString(this.state[item.hardware_name])
        ))
        return hw;
    }

    checkOut() {
        this.setState({ successString: "", errorString: "", loading: true });
        var hwInput = this.getFormInfo();
        handleHardware.rentHW({
            rentHardware: hwInput
        }).then(res => {
            if (res.data.success === 0) {
                this.setState({ successString: res.data.data });  // shows a success banner when hw is rented
                this.state.hwList.map((item) => (
                    this.setState({[item.hardware_name]: ""})
                ));
                this.retrieveHWInfo();
            }
            else {
                this.setState({ errorString: res.data.error })
            }
            this.setState({loading: false});
        }).catch(err => {
            let response = err.response;        // this correctly shows an error banner when the user tries 
            if (response !== null && typeof response !== "undefined") {    // to rent hw when they are not logged in
                if (response.status === 403) {
                    this.setState({ errorString: "You need to be logged in to rent hardware." });
                }
            }
            this.setState({loading: false});
            this.state.hwList.map((item) => (
                this.fixString(this.setState({[item.name]: ""})
            )))
        });
    }

    /*Things to display on hardware-datasets page */
    render() {
        return (
            <div className="full-screen-height">
                <div className="dark-background hardware-page" >
                    {this.state.successString != "" && <Card.Text className="text-light">Success! {this.state.successString}</Card.Text>}
                    {this.state.errorString != "" && <Card.Text className="text-danger">Error: {this.state.errorString}</Card.Text>}
                    <Card className="hardware-card light-background text-light" title="hardware">
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
                                    {this.state.loading? 
                                        <tr>
                                            <td colspan="3"><DefaultLoader loading={this.state.loading}/></td>
                                        </tr>: 
                                        this.state.hwList.map((item) => (
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
                                        ))
                                    }
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
                                    <CheckCart hw={this.getModalInfo()} hwList={this.state.hwList} checkOut={this.checkOut} />} />
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="hardware-card light-background text-light" title="datasets">
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
                                {this.state.loading? 
                                        <tr>
                                            <td colspan="3"><DefaultLoader loading={this.state.loading}/></td>
                                        </tr>: 
                                        this.state.datasets.map((item) => (
                                            <tr key={item.dataset_name}>
                                                <td>{item.dataset_name}</td>
                                                <td>
                                                    <a className="a-light" href={item.download_link}>Click to download</a>
                                                </td>
                                            </tr>
                                        ))
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
