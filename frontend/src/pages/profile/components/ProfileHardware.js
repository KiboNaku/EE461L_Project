import React, { Component } from 'react'
import { Form, Card, Table, Dropdown, DropdownButton } from "react-bootstrap";
import * as fetch from "./../../../api_calls/fetchInformation"
import * as handleHardware from '../../../api_calls/handleHardware'

class ProfileHardware extends Component {

    constructor() {
        super();
        this.state = {
            rented: [],
            price_per_unit: [20, 10, 50, 15, 5],
            projects: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.fixString = this.fixString.bind(this);
        this.returnHW = this.returnHW.bind(this);

        this.assignHW = this.assignHW.bind(this);
    }

    componentDidMount() {
        fetch
            .fetchUserHardware()
            .then(res => {
                this.setState({ rented: res.data.rented_hardware });
            });

        fetch    
            .fetchUserProjects()
            .then(res => {
                this.setState({projects: res.data.owned_projects});
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.name + " was set to " + event.target.value)
    }

    fixString(hardware) {
        if (!hardware) {
            return "0";
        }
        else {
            return hardware
        }
    }

    returnHW() {
        console.log(this.state.HWSet1)
        console.log(this.state.HWSet2)
        handleHardware.returnHW({
            HWSet1: this.fixString(this.state.HWSet1),
            HWSet2: this.fixString(this.state.HWSet2), HWSet3: this.fixString(this.state.HWSet3),
            HWSet4: this.fixString(this.state.HWSet4), HWSet5: this.fixString(this.state.HWSet5)
        }).then(res => {
            if (res.data.success === 0) {
                // this.setState({ successString: res.data.data });  // shows a success banner when hw is rented
                this.retrieveHWInfo();
            }
            else {
                this.setState({ errorString: res.data.error })
            }
         })
        //  .catch(err => {
        //     let response = err.response;        // this correctly shows an error banner when the user tries 
        //     if (response !== null && typeof response !== "undefined") {    // to rent hw when they are not logged in
        //         if (response.status === 403) {
        //             this.setState({ errorString: "Something went wrong" });
        //         }
        //     }
        // });
    }

    assignHW(){
        
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
                                    <th>Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.rented.map((hw, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{hw.name}</td>
                                                <td>{hw.amount}</td>
                                                {/* TODO: make this display the actual cost of the rented HW */}
                                                <td id="hw_price">$$$</td>
                                                <td>
                                                <Form>
                                                    <Form.Control name={hw.name} type="number" placeholder="Desired Return Amount" min="0" max={hw.amount} onChange={this.handleChange} />
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
                    <Card.Header>Projects</Card.Header>
                    <Card.Body>
                        <Table className="text-light profile-table" bordered >
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Hardware</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // needs to be projects not rented
                                    this.state.projects.map((project, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{project.name}</td>
                                                {
                                                    this.state.rented.map((hw, i) => {
                                                        return(
                                                            <td>
                                                                <DropdownButton key={i} className="" title="Select Hardware">
                                                                    <Dropdown.Item>{hw.name}</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        );
                                                    })
                                                }
                                                <td>
                                                <Form>
                                                    <Form.Control name={project.name} type="number" placeholder="Amount to Assign" min="0"/>
                                                </Form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                        <button type="button" className="btn button-primary" onClick={this.assignHW}>Assign</button>
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
