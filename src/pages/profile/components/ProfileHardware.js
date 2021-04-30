import React, { Component } from 'react'
import { Form, Card, Table, Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import * as fetch from "./../../../api_calls/fetchInformation"
import * as handleHardware from '../../../api_calls/handleHardware'
import AssignHardware from '../../_utils/AssignHardware'
import UnassignHardware from '../../_utils/UnassignHardware'
import DefaultLoader from "./../../_utils/DefaultLoader";

class ProfileHardware extends Component {

    constructor() {
        super();
        this.state = {
            hwLoading: true,
            projLoading: true,
            rented: [],
            price_per_unit: [20, 10, 50, 15, 5], // currently unused
            errorString: "",
            projects: [],
            assign: {
                project: null,
                hw: null,
                amount: 0,
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.fixString = this.fixString.bind(this);
        this.getFormInfo = this.getFormInfo.bind(this);
        this.returnHW = this.returnHW.bind(this);
        this.assignHw = this.assignHw.bind(this);
    }

    
    componentDidMount() {
        fetch
            .fetchUserHardware()
            .then(res => {
                this.setState({ rented: res.data.rented_hardware, hwLoading: false });
            });

        fetch
            .fetchUserProjects()
            .then(res => {
                this.setState({ projects: res.data.owned_projects, projLoading: false });
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    fixString(hardware) {
        if (!hardware) {
            return "0";
        }
        else {
            return hardware
        }
    }

    assignHw(){
        this.setState({hwLoading: true});
        fetch
            .fetchUserHardware()
            .then(res => {
                this.setState({ rented: res.data.rented_hardware, hwLoading: false });
            });
    }

    getFormInfo() {
        var hw = {};
        this.state.rented.map((item) => (
            hw[item.name] = this.fixString(this.state[item.name])
        ))
        return hw;
    }

    returnHW() {
        this.state.errorString = "";
        var returnList = this.getFormInfo();
        this.setState({ hwLoading: true });
        handleHardware.returnHW({
            returnHW: returnList
        }).then(res => {
            if (res.data.success === 0) {
                fetch.fetchUserHardware().then(res => {
                    this.setState({ rented: res.data.rented_hardware, hwLoading: false });
                    this.state.rented.map((item) => (
                        this.setState({[item.name]: ""})
                    ))
                });
            } else {
                this.setState({ errorString: res.data.error, hwLoading: false });
            }
        })
    }

    render() {

        return (
            <div>
                <div id="ProfileHardware" className="d-flex justify-content-center flex-wrap flex-md-nowrap pb-2 mb-3 border-bottom">
                    <h1 className="profile-header">Hardware</h1>
                </div>
                <Card className="mb-3 light-background">
                    <Card.Header>Checked Out Hardware</Card.Header>
                    <Card.Body className="hardware-card-body">
                        {this.state.errorString != "" && <Card.Text className="text-danger">Error: {this.state.errorString}</Card.Text>}
                        <Table className="text-light profile-table" bordered >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.hwLoading ?

                                        <tr>
                                            <td colSpan="4"><DefaultLoader loading={this.state.hwLoading} /></td>
                                        </tr> :
                                        this.state.rented.map((hw, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{hw.name}</td>
                                                    <td>{hw.amount}</td>
                                                    {/* TODO: make this display the actual cost of the rented HW */}
                                                    <td id="hw_price">$$$</td>
                                                    <td>
                                                        <Form>
                                                            <Form.Control className="textbox" name={hw.name} type="number" placeholder="Desired Return Amount" min="0" max={hw.amount}
                                                                onChange={this.handleChange} />
                                                        </Form>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                            </tbody>
                        </Table>
                        <button type="button" className="btn button-primary" onClick={this.returnHW}>Return Hardware</button>
                    </Card.Body>
                </Card>
                <Card className="mb-3 light-background">
                    <Card.Header>Assign Hardware to Projects</Card.Header>
                    <Card.Body className="hardware-card-body">
                        <AssignHardware assignHw = {this.assignHw}/>
                    </Card.Body>
                </Card>
                <Card className="mb-3 light-background">
                    <Card.Header>Unassign Hardware from Projects</Card.Header>
                    <Card.Body className="hardware-card-body">
                        <UnassignHardware assignHw = {this.assignHw}/>
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
